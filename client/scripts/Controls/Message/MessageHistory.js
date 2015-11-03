var React = require('react/addons');

import moment from 'moment';

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

import Message from './Message';
import MessageNotify from './MessageNotify';
import MessageDate from './MessageDate';


/**
 * Общий компонент для каналов и чатов
 *
 * принимает в this.props.context хэндлер для работы с отдельным каналом или чатом
 * context=AppState.myChannels.activeChannel()
 * context=AppState.myChats.activeChat()
 *
 */

export default class MessageHistory extends React.Component {

    constructor( props ) {
        super( props );

        this.appendFromMessageId = null;
        this.isAppending = false;

        // активный элемент - канал или чат
        this.activeContext = null;
        this.contextType = null;
        this.id = null;

        // таймаут для запуска отметки о прочитанном сообщении
        this.markReadedTimeout = null;
        this.markReadedId = 0;
        this.isFirstLoad = false;
    }

    state = {
        history: null,
        showNewMessageAlert: false,
    }

    _getHistory() {
        this.activeContext.getHistory();
    }

    _setContext( props ) {
    	this.activeContext = props.context;
        this.contextType = props.type;
        this.id = props.context_id;

        this.isFirstLoad = true;

        // чистим таймаут для запуска отметки о прочитанном сообщении
        this._clearMarkReadedTimeout();
    }

    // подписки в зависимости от типа канал/чат
    _subs( action ) {

        // подписываемся на любое изменение истории, которые нам будет генерить контроллер канала или чата
        this.activeContext[action]('Message_history_update', this.updateHistory);

        // приход нового уведомления в канал
        this.activeContext[action]('Message_notify_send', this.onMessageNotifySend);

        // эта подписка нам нужна, чтобы дергать скролл или показывать уведомление
        // о новом сообщении в активном канале или чате
        switch( this.contextType ) {
            case 'channel':
                Events[action](Events.EV_MSG_CHANNEL_NEW, this.onMsgNew);
            break;

            case 'chat':
                Events[action](Events.EV_MSG_PRIVATE_NEW, this.onMsgNew);
            break;
        }
    }

    componentWillReceiveProps =(nextProps)=> {
        // logger.log('MH receive props');

    	this._setContext( nextProps );
        // новый id, поэтому activeChannel уже другой, нужна подписка
        this._subs( 'rem' );
        this._subs( 'on' );
        this._getHistory();
    }

    componentWillMount =()=> {
        // logger.log('MH will mount');

        this._setContext( this.props );
        this._subs( 'on' );
        this._getHistory();
    }

    // это сработает только один раз, когда юзер с другой страницы
    // ткнет на какой-либо канал. Нужно тоже восстановить скролл
    componentDidMount =()=> {
        // logger.log('MH did mount');

        this.initScroll();
    }

    componentWillUnmount = ()=>{
        // logger.log('MH will unmount');

        this._subs( 'rem' );
    }

    componentDidUpdate = ()=>{
        // logger.log('MH did update');

        // обнуляем позицию скролла
        // this.scrollToStart();

        this.initScroll();
    }

    updateHistory = (history)=>{
        // this.isAppending = false;
        this.setState({ history: history });
    }

    // приход нового уведомления в канал
    onMessageNotifySend =(event)=> {
        // если скролл не больше 150, считаем, что он был внизу, и автоматом крутим
        // в конец беседы. Если скролл больше, юзер там что-то отмотал и читает, не мешаем ему
        let elem = document.getElementById('channel-history--'+this.id);
        if( elem.scrollHeight - elem.clientHeight - elem.scrollTop <= 150) this.scrollToEnd();
    }

    // событие новое сообщение - дергаем скролл или показываем уведомление, что есть новые сообщения
    // все добавления сообщений в историю делаются контроллерами, события отслеживает контакт-центр
    onMsgNew = (event)=>{

        // для не активного в даный момент чата ничего не делаем
        // по этому событию отработает только контакт-центр
        if( !this.activeContext.isForActiveContext( event ) ) return;

        // если сообщение свое, сразу крутим вниз
        if( event.user_id == AppState.user.id ) {
            this.scrollToEnd();

        // если сообщение чужое, проверяем где скролл, 
        } else {
            let elem = document.getElementById('channel-history--'+this.id);

            // если скролл не больше 150, считаем, что он был внизу, и автоматом крутим
            // в конец беседы. Если скролл больше, юзер там что-то отмотал и читает,
            // показываем уведомление о новых сообщениях
            if( elem.scrollHeight - elem.clientHeight - elem.scrollTop > 150) {
                this.setState( {showNewMessageAlert: true} );
            } else {
                this.scrollToEnd();
            }
        }
    }


    /*
     * Scroll handlers
     */

    initScroll =()=> {

        // logger.log('initScroll');

        // если пришло новое сообщение и оно не наше, оставляем скролл на месте, показываем алерт
        if( this.state.showNewMessageAlert ) return;

        // если скролла нет, но есть непрочитанные, отмечаем их как только подгрузится история
        let elem = document.getElementById('channel-history--'+this.id);

        // logger.log('initScroll 2 = ' + this.activeContext.getTotal() + ' ' + this.activeContext.unreaded + ' elem= ' + (elem.scrollHeight-elem.clientHeight) );

        // if( this.activeContext.getTotal() && this.activeContext.unreaded > 0 && elem && (elem.scrollHeight-elem.clientHeight) <= 10 ) {
        if( this.activeContext.unreaded > 0 && elem && (elem.scrollHeight-elem.clientHeight) <= 10 ) {
            if( !this.markReadedTimeout ) this.markReadedTimeout = setTimeout(this.markReaded, 1500);
            return;
        }

        // if( this.activeContext.unreaded > 0 && this.activeContext.scrollPos === null ) {
        // logger.log('initScroll 3, scroll pos= ' + this.activeContext.scrollPos + " unreaded= " + this.activeContext.unreaded + " is first= " + this.isFirstLoad + " isAppending= " + this.isAppending);
        
        // last_readed = null --> все непрочитанные, крутим на старт
        if( this.activeContext.history.last_readed === null ) {

            // logger.log('initScroll lrm=null, scrollToStart', this);
            
            this.scrollToStart();

        // если есть непрочитанное, то крутим к нему, но только если открыли чат
        } else if( this.activeContext.unreaded > 0 && this.isFirstLoad ) {
            let unreadedList = this.activeContext.getUnreadedIDs();
            if( (unreadedList || []).length ) {
                logger.log('init SCROLL has Unreaded - scrollToMessage = ' + unreadedList[0]);

                this.scrollToMessage( parseInt(unreadedList[0]), false );
                this.isFirstLoad = false;
            }
            
        // если добавляли сообщения, крутим к предыдущему
        } else if( this.isAppending ) {
            logger.log('init SCROLL isAppending - scrollToMessage');

            this.isAppending = false;
            this.scrollToMessage( this.appendFromMessageId, false );

        // если есть сохраненное значение, крутим к нему
        } else if( this.activeContext.scrollPos > 1 ) {
            logger.log('init SCROLL SAVED - scrollToPos', this.activeContext.scrollPos );

            this.scrollToPos( this.activeContext.scrollPos );

        // иначе крутим к последнему
        } else {
            logger.log('init SCROLL else - scrollToEnd');

            this.scrollToEnd();
        }
    }

    // юзер крутит скролл
    onScrollHandler =(e)=> {

        let elem = e.target;
        let elemPos = Math.ceil( elem.scrollTop );

        // logger.log('onScrollHandler, elemPos= ' + elemPos);

        // на случай, если юзер беспорядочно елозит скроллом туда-сюда,
        // по таймауту запускаем проверку на отметку прочитанных месседжей
        if( !this.markReadedTimeout && this.activeContext ) {

            // logger.log('unreaded= ' + this.activeContext.unreaded + " elePos= " + elemPos + " prevPos= " + this.activeContext.scrollPos);

            // запускаем проверку, для одного непрочитанного - сразу
            // если несколько непрочитанных - только если изменилось положение скролла
            // это нужно для того, чтобы при открытии истории на непрочитанном сообщении 
            // не срабатывало их автоматическое прочтение (если сообщений несколько)
            if( this.activeContext.unreaded == 1
                || (this.activeContext.unreaded > 1 && elemPos != this.activeContext.scrollPos) ) {
                    this.markReadedTimeout = setTimeout(this.markReaded, 1500);
            }
            // this.markReadedTimeout = setTimeout(this.markReaded, 1500);
        }

        // logger.log('onScrollHandler scroll= ' + elem.scrollHeight + ", client= " + elem.clientHeight + ", top= " + elem.scrollTop);
        // logger.log('onScrollHandler res=', elem.scrollHeight - elem.clientHeight - elem.scrollTop);
        
        // запоминаем позицию скролла, чтобы вернуться к ней при открытии канала
        this.activeContext.saveScrollPosition( elemPos );
        // this.saveScrollPos();

        // пытаемся подгрузить историю, только если еще не все загрузили
        if( elem.scrollTop < 10 
            && !this.isAppending
            && !this.activeContext.isGotAllMessages() ) {
                    this.isAppending = true;
                    // запоминаем текущее первое сообщение, чтобы после добавления отмотать к нему
                    this.appendFromMessageId = this.activeContext.getFirstHistoryMsgId();
                    this.activeContext.appendHistory();
        }
    }

    // прокрутка скролла к определенному сообщению
    scrollToMessage =( id, alignToTop = true )=> {

        // logger.log('trigger scrollToMessage');

        if( !id ) return;
        let elem = document.getElementById('message--'+id);
        if( elem) {
            elem.scrollIntoView( alignToTop );
            this.saveScrollPos();
        }
    }

    // прокрутка в конец
    scrollToEnd =()=> {
        // переход к последнему сообщению работает криво - скролл немного не докручивается до конца
        // this.scrollToMessage( this.activeContext.getLastHistoryMsgId(), false );

        // брутфорсный скролл на самый конец
        let elem = document.getElementById('channel-history--'+this.id);
        if( elem) elem.scrollTop = elem.scrollHeight - elem.clientHeight;
        this.saveScrollPos();
    }

    // прокрутка в начало
    scrollToStart =()=> {
        // logger.log('trigger scrollToStart');

        let elem = document.getElementById('channel-history--'+this.id);
        if( elem) elem.scrollTop = 0;
        this.saveScrollPos();
    }

    // прокрутка на определенную позицию
    scrollToPos =(pos)=> {
        // logger.log('trigger scrollToPos');

        if( !pos ) return;
        let elem = document.getElementById('channel-history--'+this.id);
        if( elem) {
            elem.scrollTop = pos;
            this.saveScrollPos();
        }
    }

    // запоминаем позицию скролла в текущем контексте
    saveScrollPos =()=> {
        let elem = document.getElementById('channel-history--'+this.id);
        let elemPos = null;
        if( elem) elemPos = Math.ceil( elem.scrollTop );
        if( this.activeContext && !this.isFirstLoad ) {
            this.activeContext.saveScrollPosition( elemPos );
            logger.log('trigger saveScrollPos pos= '+elemPos, this, this.activeContext);
        }
    }

    /*
     * End od Scroll
     */


    // отмечаем сообщение как прочитанное, как только оно появилось в области видимости
    markReaded =()=> {

        let unreadedList = this.activeContext.getUnreadedIDs();

        // logger.log('trigger markReaded', this, unreadedList);

        // все прочитаны - ничего не делаем
        if( !(unreadedList || []).length ) {
            this._clearMarkReadedTimeout();
            return;
        }

        let container = document.getElementById('channel-history--'+this.id);
        if( !container ) return;
        let contHeight = container.clientHeight;
        let contScrollTop = container.scrollTop;
        let contClientTop = container.clientTop;

        // logger.log('trigger markReaded', this, container, unreadedList);
        // сортируем по убыванию, функция нужна, чтобы не наступить на грабли со сравнением строк
        // unreadedList.sort( (a, b) => {return b-a} );

        // т.к. апи понимает только команду <id последнего прочитанного сообщения (null - прочитанных нет)>
        // начинаем искать с хвоста, определеляем последнее сообщение и его id
        for( let i = unreadedList.length-1; i >= 0; i-- ) {

            let elem = document.getElementById('message--'+unreadedList[i]);

            // logger.log('markReaded find elem=', this, elem);

            if( elem ) {
                let elemOffsetTop = elem.offsetTop;
                let elemHeight = elem.clientHeight;
                // let top = parseInt(elem.getBoundingClientRect().top);

                let isBelowViewport = (contHeight + contScrollTop <= elemOffsetTop) ? true : false;
                let isAboveViewport = (elemHeight + elemOffsetTop <= contScrollTop + 10) ? true : false;

                // logger.log('markReaded find below='+ isBelowViewport + " above="+ isAboveViewport);

                if( !isBelowViewport && !isAboveViewport && unreadedList[i] > this.markReadedId ) {

                    logger.log('in viewport! mark readed elem=' + unreadedList[i]);

                    // апи выдаст ошибку, если будем ставить метку на сообщение с таким же id, 
                    // поэтому запоминаем, чтобы следующий запрос отсылать на сообщение c бОльшим id
                    this.markReadedId = unreadedList[i];

                    this.activeContext.markReaded(unreadedList[i]);

                    // перестаем бегать по непрочитанным
                    break;
                }
            }
        }

        logger.log('----');

        this._clearMarkReadedTimeout();
    }

    _clearMarkReadedTimeout =()=> {
        if( this.markReadedTimeout ) clearTimeout( this.markReadedTimeout );
        this.markReadedTimeout = null;
    }

    // алерт-уведомление о том, что внизу появились новые сообщения
    showNewMessages =()=> {
        this.scrollToEnd();
        // сохраняем новую позицию скролла
        let elem = document.getElementById('channel-history--'+this.id);
        let elemPos = Math.ceil( elem.scrollTop );
        this.activeContext.saveScrollPosition( elemPos );
        this.setState( {showNewMessageAlert: false} );
    }

    render = ()=>{

        let alert = null;

        // logger.log('render MH= ' + this.activeContext.isReady);

        if( !this.activeContext.isReady ) {
            alert = <div className="channel__history-alert">Загрузка сообщений...</div>;
        } else if( this.state.showNewMessageAlert ) {
            alert = <div className="channel__history-alert">Есть новые сообщения. &nbsp; <span className="channel__history-alert-action" onClick={this.showNewMessages}>Посмотреть</span></div>;
        }

        let History = null;

        if( (this.state.history || []).length == 0  ) {
            History = <div>Нет сообщений</div>

        } else {
            let msgDate = null;
            moment.locale('ru');
            // let options = { month: 'long', day: 'numeric'};

            History = this.state.history.map( (msg, i) => {

                // вставляем дату
                // let d = new Date( msg.ts * 1000 );
                let historyDate = null;
                let printDate = Math.ceil( msg.ts / 24 / 3600 );

                if( msgDate != printDate ) {
                    msgDate = printDate;
                    historyDate = <MessageDate date={moment(msg.ts * 1000).format("D MMMM")} />
                }

                // if( msgDate != d.toLocaleString('ru-RU', options) ) {
                //     msgDate = d.toLocaleString('ru-RU', options);
                //     historyDate = <MessageDate date={msgDate} />
                // }

                // событие
                if(msg.id === -1 ) {
                    return ( <div key={i}>
                                {historyDate}
                                <MessageNotify context={this.activeContext} data={msg}/>
                             </div> 
                    )
                // настоящий месседж
                } else {
                    return ( <div key={i}>
                                {historyDate}
                                <Message context={this.activeContext} data={msg}/>
                             </div> 
                    )
                }
            });
        }

        // подгоняем высоту под экран
        let historyStyle = {
            height: Utils.getClientHeight() - 250 + "px",
        };

        return (
            <div className="channel__history" style={historyStyle} id={"channel-history--"+this.id} onScroll={this.onScrollHandler}>
                {alert}
                {History}
            </div>
        )
    }
};


 // <div className="channel__content">
 //                <div className="channel__history" style={historyStyle} id={"channel-history--"+this.id} onScroll={this.onScrollHandler}>
 //                    {History}
 //                </div>
 //                {alert}
 //            </div>

// <div>
//                 <div className="channel__history" style={historyStyle} id={"channel-history--"+this.id} onScroll={this.onScrollHandler}>
//                     {History}
//                 </div>
//                 {alert}
//             </div>