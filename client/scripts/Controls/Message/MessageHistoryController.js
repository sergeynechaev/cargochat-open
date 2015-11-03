import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger.js';


/**
 * Общие для каналов и чатов методы работы с историей 
 * 
 */

export default class MessageHistoryController {

    constructor() {
        // super();
        this.evs = {};
        this.history = { 
        	options: {limit_default: 20,  offset: 0},
            total: null,
            last_readed: null,
        	data: []
        };
        this.scrollPos = null;
        this.history.options.limit = this.history.options.limit_default;
    }

    getTotal =()=> {
        return this.history.total;
    }

    getHistory =()=> {
        // проверяем загружена ли уже история, тогда просто отдаем ее
        if( this.isReady ) {
            this.run('Message_history_update', this.history.data);
            return;
        }
        // иначе тянем с сервера
        this.updateHistory();
    }
    
    appendHistory =()=> {
        if ( this.isGotAllMessages() ) {
            this.run('Message_history_update', this.history.data);
            return;
        }
        this.history.options.offset += this.history.options.limit;
        this.updateHistory();
    }

    // проверяем, получили ли уже все сообщения
    isGotAllMessages =()=> {
        return ( this.history.data.length >= this.history.total ) ? true : false;
    }

    getFirstHistoryMsgId =()=> {
        return (this.history.data.length) ? this.history.data[0].id : 0;
    }

    getLastHistoryMsgId =()=> {
        return (this.history.data.length) ? this.history.data[ this.history.data.length-1 ].id : 0;
    }

    // сохраняем позицию скролла, чтобы потом открыть канал на этом месте
    saveScrollPosition =(pos)=> {
        this.scrollPos = pos;
        // если в самом верху, сохраняем 1, чтобы не попасть на грабли с if(pos)
        // this.scrollPos = (pos === 0) ? 1 : pos;
    }

    // получаем массив ID непрочитанных чужих сообщений
    getUnreadedIDs =()=> {
        let unreadedList = [];
        this.history.data.forEach( msg => {
            if( msg.author.id != AppState.user.state.id && !msg.readed ) unreadedList.push( msg.id );
        });
        return unreadedList;
    }

    // для редактирования или удаления сообщения нам нужен
    // доступ к контроллеру сообщений
    // будет отдан объект MessageController, пример использования:
    // 
    // let msg = AppState.myChannels.activeChannel().getMsg(this.props.data.id);
    // msg.eraseMessage();
    getMsg =(id)=> {
        let msg = this.history.data.filter( data => {
            return data.id == id;
        });
        return (msg) ? msg[0] : null;
    }

    _removeMsg =(id)=> {
        // удаленное сообщение не исчезает из списка,
        // показываем заглушку "Сообщение удалено."
        this.history.data.forEach( data => {
            if( data.id == id ) {
                data.body = "Сообщение удалено";
                data.isDeleted = true;
            }
        });
    }

    _correctMsg =(id, body)=> {
        this.history.data.forEach( data => {
            if( data.id == id ) {
                data.body = body;
            }
        });
    }

    // помечаем чужие сообщения как непрочитанные, начиная с указанного id
    _markUnreaded =( event )=> {
        this.history.last_readed = event.lrm_id;
        this.unreaded = event.unreaded;

        // если null, значит, ничего еще не прочитано
        let lrm = (event.unreaded === null) ? 0 : event.lrm_id;

        this.history.data.forEach( message => {
            if( message.author.id != AppState.user.state.id ) {
                message.readed = (message.id > lrm) ? false : true; 
            }
        });

        // logger.log('_markUnreaded lrm='+lrm, this, this.history.data);
    }


    // подписки-отписки, пока вынесены сюда, т.к. стандартно нет
    // множественного наследования, а getOwnPropertyNames не работает с fat arrow
    // TODO: переделать, мерджить с Controller
    on =(id, hr)=> {
        var l = this.evs[id];
        l ? l.push(hr) : this.evs[id] = [hr]
    }

    run =(id, p)=> {
        var l = this.evs[id];
        if (l) {
            l.forEach(o => o(p));
        }
    }

    rem =(id, hr)=> {
        var l = this.evs[id];
        if (l) {
            this.evs[id] = l.filter(h => h != hr)
        }
    }

}
