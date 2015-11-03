import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger.js';

import MessageHistoryController from '../../Controls/Message/MessageHistoryController.js'
import ChatMessageController from './ChatMessageController.js'

/**
 * 
 * Общие для каналов и чатов методы работы с историей реализованы 
 * в Controls/Message/MessageHistoryController
 * 
 */

export default class ChatController extends MessageHistoryController {

    constructor(params) {
        super();

        /*  реализовано в MessageHistoryController:
         *      this.history
         *      this.scrollPos
         */

        this.chat_id = params.chat_id; // если null, значит, приватов с юзером еще не было и нет истории

        // параметры собеседника
        this.interlocutor = {
            id: params.id,
            first_name: params.first_name,
            last_name: params.last_name,
            comp_name: params.comp_name,
            comp_id: params.comp_id,
            last_readed: -1,
            last_readed_ts: -1,
        }

        this.unreaded = params.unreaded;
        this.history.last_readed = params.last_readed;
        this.isReady = false;

    }

    /*  реализовано в MessageHistoryController:
     *       isGotAllMessages
     *       getFirstHistoryMsgId
     *       getLastHistoryMsgId
     *       saveScrollPosition
     *       getTotal
     *       getHistory
     *       appendHistory
     *       getMsg
     *       getUnreadedIDs
     *       _removeMsg
     *       _correctMsg 
     */

    // 
    // History
    // 

    updateHistory =()=> {

        let params = {
            filters : [],
            fields: ['id', 'ts', 'uid', 'body']
        };

        params.orderBy = 'id';
        params.dir = 'DESC';

        // смотрим, чего и сколько у нас есть непрочитанного, и в зависимости от этого
        // корректируем оффсеты и лимиты
        if( this.unreaded > 0 ) { 
            // есть непрочитанные и last_readed = null --> непрочитаны все!
            // обнуляем офсет и лимит не ставим, апи отдаст мах 500.
            if( this.history.last_readed === null ) {
                this.history.options.offset = 0;
                this.history.options.limit = 500;

            // есть id непрочитанного и он за пределами лимита, будем выбирать прямо от него 
            // офсет обнуляем, лимит ставим чуть больше числа непрочитанных
            } else if( parseInt(this.history.last_readed) > 0 && this.unreaded >= this.history.options.limit_default) {
                params.filters.push( ["id", "gt", parseInt(this.history.last_readed)] );
                this.history.options.offset = 0;
                this.history.options.limit = parseInt(this.unreaded) + 10;
            }
        }

        // logger.log('CHAT: offset= ' + this.history.options.offset + ", limit= "+this.history.options.limit, this, params.filters);

        params.opp_user_id = this.interlocutor.id;
        params.limit = this.history.options.limit;
        params.offset = this.history.options.offset;

        Api.msg_private_hist_list( params ).then( res => {
            
            this.isReady = true;

            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при получении истории сообщений', res.msg, 'error');
                    this.run('Chat-update', undefined); // не показываем чат вообще
                    return;
                }

                this.chat_id = res.private_id;
                this.history.total = res.total;
                this.history.last_readed = res.self_lrm_id; // id последнего прочитанного сообщения пользователем (null - нет прочитанных)
                this.interlocutor.last_readed = res.opp_lrm_id;    // id последнего прочитанного сообщения собеседником
                this.interlocutor.last_readed_ts = res.opp_lrm_ts;  // utc_ts прочтения собеседником сообщения opp_lrm_id

                // logger.log('msg_private_hist_list', this, this.interlocutor);

                // если данных нет, все равно нужно вернуть пустой результат
                if( !(res.data || []).length ) {
                    this.history.data = [];
                    this.run('Message_history_update', this.history.data);
                    return;
                }

                let historyAppend = [];
                let myUserId = AppState.user.state.id;
                let myFirstName = AppState.user.state.first_name;
                let myLastName = AppState.user.state.last_name;
                let myCompName = AppState.user.state.comp.name;
                let myCompId = AppState.user.state.comp.id;

                res.data.forEach( message => {

                    // добавляем общие поля
                    message.isDeleted = false;
                    message.readed = true;          // прочитано мной
                    message.opp_readed = false;     // прочитано собеседником
                    message.user_id = message.uid;  // костыль, т.к. поля в hist_list и в ивентах не совпадают названиями

                    // свои пропускаем, чужие метим непрочитанными начиная с последнего прочитанного
                    // если null, значит, ничего еще не прочитано
                    let lrm = (this.history.last_readed === null) ? 0 : this.history.last_readed;

                    // прочитано собеседником, если null, значит, ничего еще не прочитал
                    let opp_lrm = (this.interlocutor.last_readed === null) ? 0 : this.interlocutor.last_readed;

                    // свои
                    if( message.uid == myUserId ) {
                        message.first_name = myFirstName;
                        message.last_name = myLastName;
                        message.comp_name = myCompName;
                        message.comp_id = myCompId;

                        // прочитано собеседником
                        if( message.id <= opp_lrm ) message.opp_readed = true;

                    //  чужие
                    } else {
                        message.first_name = this.interlocutor.first_name;
                        message.last_name = this.interlocutor.last_name;
                        message.comp_name = this.interlocutor.comp_name;
                        message.comp_id = this.interlocutor.comp_id;

                        // непрочитанные
                        if( message.id > lrm ) message.readed = false;
                    }

                    // сообщения с пустым body = архив, показываем "сообщение было удалено"
                    if( message.body == null ) {
                        message.isDeleted = true;
                        message.body = "Сообщение удалено";
                    }

                    historyAppend.unshift( new ChatMessageController(message, this.chat_id) );
                });

                this.history.data = historyAppend.concat( this.history.data );
                this.run('Message_history_update', this.history.data);
            }
        });
    }

    //  
    //  Действия
    //  

    sendMessage =(body)=> {
        var params={
            user_id: this.interlocutor.id,
            body: body,
        };
        Api.msg_private_send(params).then(res=>{
                if(res){
                    if (res.err){
                        // проверяем, может, юзер просто не принимает личные сообщения
                        if( res.msg.match("does not accept") ) {
                            Events.runError("Пользователь запретил прием личных сообщений.");
                        } else {
                            Events.runError(res.msg);
                            logger.log( this, 'Ошибка при отправке сообщения', res, 'error' );
                        }
                        return;
                    }
                    logger.log( this, 'Сообщение отправлено', res, res.msg );

                    // дергаем событие, что отправили сами сообщение
                    // TODO: надо ли теперь? проверить
                    this.run('Chat_message_send', res);


                } else {
                    logger.log( this, 'Неизвестная ошибка при отправке сообщения', 'error');
                    return;
                }
            });
    }

    markReaded =(id)=> {
        var params={
            user_id: this.interlocutor.id,
            message_id: id
        };
        Api.msg_private_readed(params).then(res=>{
            if (res.err){
                logger.log("Не удалось отметить сообщение прочитанным #"+id, this, res.msg, 'error');
            } else {
                logger.log("Отмечено прочитанным #"+id, this);
            }
        })
    }

    addToHistory =(event)=> {
        logger.log('addToHistory', this);
        if( event ) {
            event.readed = (event.user_id == AppState.user.state.id) ? true : false;    // для чужого ставим метку, что сообщение не прочитано
            let message = new ChatMessageController(event, this.id);
            this.history.data.push(message);
        }
    }

    markDeleted =(event)=> {
        this._removeMsg( event.id );
    }

    // запускаем обновление истории при активном чате
    runUpdate =(event)=> {
        if( AppState.myChats.activeChat() && AppState.myChats.activeChat().isForActiveContext(event) ) this.run('Message_history_update', this.history.data);
    }

    // 
    // События
    // 
    
    onMsgNew =(event)=> {
        if( event ) {
            this.addToHistory( event );
            this.runUpdate( event );    // для активного чата запускаем обновление истории
        }
    }

    onMsgUnreaded =(event)=> {
        if(event){
            this._markUnreaded( event );
            this.runUpdate( event );
        }
    }

    onMsgOppReaded =(event)=> {
        if(event){
            // помечаем, что собеседник прочитал сообщения, начиная с указанного id
            this.interlocutor.last_readed = event.interlocutor_lrm_id;

            // если null, значит, ничего еще не прочитано
            let opp_lrm = (this.interlocutor.last_readed === null) ? 0 : this.interlocutor.last_readed;

            this.history.data.forEach( message => {
                if( message.author.id == AppState.user.state.id ) {
                    message.opp_readed = (message.id <= opp_lrm) ? true : false; 
                }
            });
            this.runUpdate( event ); 
        }
    }

    onMsgErase =(event)=> {
        // Не реализовано в api
    }

    onMsgCorrect =(event)=> {
        // Не реализовано в api
    }

    // определяем, пришел ивент в активный чат или это вообще наше же сообщение
    isForActiveContext =(event)=> {
        if( event ) {
            return ( event.user_id == this.interlocutor.id || event.to_user_id == this.interlocutor.id ) ? true : false;
        }
    }

}
