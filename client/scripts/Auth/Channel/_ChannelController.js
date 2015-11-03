// 
// бэкап
// 
// 
// 

import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger.js';
import {Utils} from '../../utils';

import MessageHistoryController from '../../Controls/Message/MessageHistoryController.js'
import ChannelMessageController from './ChannelMessageController.js'


/**
 * Общие для каналов и чатов методы работы с историей реализованы 
 * в Controls/Message/MessageHistoryController
 */

export default class ChannelController extends MessageHistoryController {

    constructor(params) {
        super();

        // реализовано в MessageHistoryController
        // this.history
        // this.scrollPos

        this.id = params.id;
        this.title = params.title;
        this.flags = params.flags;

        this.members = [];

        // unreaded messages
        this.unreaded = params.unreaded;
        this.history.last_readed = params.lrm;
        this.history.first_unreaded = -1;
		
		this.updateHistory();
        this.updateMembers();
    }

    // реализовано в MessageHistoryController
    // isGotAllMessages
    // getFirstHistoryMsgId
    // getLastHistoryMsgId
    // saveScrollPosition
    // getTotal
    // getHistory
    // getMsg
    // getUnreadedIDs
    // _removeMsg
    // _correctMsg


    // 
    // Channel members
    // 

    getMembers(){
        return this.members
    }

    getMember(id){
        return this.members.filter(member=>{
            return member.id == id;
        })[0];
    }

    updateMembers(){

        // членов канала не может видеть юзер с флагом 1 = приглашен.
        if( this.flags == 1) return;

        Api.msg_channel_users({channel_id: this.id}).then(res => {
            if(res){
                if(res.err){
                    logger.log(this, 'Ошибка при получении участников канала', res.msg, 'error');
                    return;
                }

                this.members = res.users;
                this.run('Channel_members_update', this.members);
            }
        });
    }
    

    // 
    // Channel History
    // 
    
    appendHistory =()=> {

        if ( this.isGotAllMessages() ) {
            this.run('Channel_history_update', this.history.data);
            return;
        }

        this.history.options.offset += this.history.options.limit;
        this.updateHistory();
    }

    updateHistory =()=> {

        // историю не может видеть юзер с флагом 1 = приглашен.
        if( this.flags == 1) return;

        let params = {
            filters : [],
            fields: ['id', 'ts', 'uid', 'body', 'ln', 'fn']
        };

        params.orderBy = 'id';
        params.dir = 'DESC';

        logger.log('updateHistory -channel lrm= ' + this.history.last_readed + ' unred= ' + this.unreaded);

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
                // this.history.options.limit = (this.unreaded < this.history.options.limit_default) 
                                            // ? this.history.options.limit_default 
                                            // : parseInt(this.unreaded) + 10;
            }
        }

        logger.log('CHANNEL: offset= ' + this.history.options.offset + ", limit= "+this.history.options.limit, this, params.filters);

        params.channel_id = this.id;
        params.limit = this.history.options.limit;
        params.offset = this.history.options.offset;

        Api.msg_channel_hist_list( params ).then(res=>{

            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при получении истории сообщений', res.msg, 'error');
                    return;
                }

                logger.log('msg_channel_hist_list', this, res);

                // this.chat_id = res.private_id;
                this.history.total = res.total;
                this.history.last_readed = res.lrm_id; // id последнего прочитанного сообщения юзером
                // this.interlocutor.last_readed = res.opp_lrm_id;    // id последнего прочитанного сообщения собеседником
                // this.interlocutor.last_readed_ts = res.opp_lrm_ts;  // utc_ts прочтения собеседником сообщения opp_lrm_id

                // обнуляем id первого непрочитанного
                this.history.first_unreaded = -1;

                if( !res.data ) return;

                let historyAppend = [];
                let myUserId = AppState.user.state.id;
                let myFirstName = AppState.user.state.first_name;
                let myLastName = AppState.user.state.first_name;
                let myCompName = AppState.user.state.comp.name;
                let myCompId = AppState.user.state.comp.id;

                // пробегаемся по истории и немного модифицируем ее
                res.data.forEach( message => {

                    // добавляем общие поля
                    message.isDeleted = false;
                    message.readed = true;

                    // костыли, т.к. поля в hist_list и в ивентах не совпадают названиями
                    message.user_id = message.uid;
                    message.first_name = message.fn;
                    message.last_name = message.ln;

                    // свои пропускаем, чужие метим непрочитанными начиная с последнего прочитанного
                    // если null, значит, ничего еще не прочитано
                    let lrm = (this.history.last_readed === null) ? 0 : this.history.last_readed;

                    // свои
                    if( message.uid == myUserId ) {
                        message.comp_name = myCompName;
                        message.comp_id = myCompId;

                    //  чужие
                    } else {
                        message.comp_name = '';
                        message.comp_id = '';

                        // непрочитанные
                        if( message.id > lrm ) {

                            // ставим флаг
                            message.readed = false;

                            // запоминаем id первого непрочитанного, он нам понадобится
                            // для скролла на это сообщение внутри истории
                            if( this.history.first_unreaded == -1 ) this.history.first_unreaded = message.id;

                        }
                    }

                    // сообщения с пустым body = архив, показываем "сообщение было удалено"
                    if( message.body == null ) {
                        message.isDeleted = true;
                        message.body = "Сообщение удалено";
                    }

                    historyAppend.unshift( new ChannelMessageController(message, this.chat_id) );
                });

                // добавляем подгруженную историю в начало
                this.history.data = historyAppend.concat( this.history.data );

                this.run('Channel_history_update', this.history.data);
            }

        });
    }


    // 
    // DEPRECATED
    // старое апи
    // 
    // updateHistory(){

    //     // историю не может видеть юзер с флагом 1 = приглашен.
    //     if( this.flags == 1) return;

    // 	Api.msg_channel_hist({ channel_id: this.id, 
    //                          limit: this.history.options.limit, 
    //                          offset: this.history.options.offset}).then(res=>{

    //         if(res){
    //             if (res.err){
    //                 logger.log( this, 'Ошибка при получении истории сообщений канала', res.msg, 'error');
    //                 return;
    //             } 

    //             if( !res.hist ) return;

    //             let historyAppend = [];
    //             this.history.total = res.total;
    //             this.history.lastReaded = res.lrm_id;

    //             // сообщения с пустым body = архив, показываем "сообщение было удалено"
    //             res.hist.forEach( message => {
    //                 message.isDeleted = false;
    //                 if( message.body == null ) {
    //                     message.isDeleted = true;
    //                     message.body = "Сообщение удалено";
    //                 }
    //                 //if( message.body ) { 
				// 	   historyAppend.push( new ChannelMessageController(message, this.id) );
    //                 //}
    //             });

    //             // добавляем подгруженную историю в начало
    //             this.history.data = historyAppend.concat( this.history.data );

    //     		this.run('Channel_history_update', this.history.data);
    //         }
    //     });
    // }

    sendMessage =(body)=> {
        Api.msg_channel_send({channel_id: this.id, body: body}).then(res=>{
            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при отправке сообщения', res.msg, 'error');
                    return;
                }
                // дергаем событие, что отправили сами сообщение
                this.run('Channel_message_send', res);
            }
        });   
    }

    markReaded =(id)=> {
        var params={
            channel_id: this.id,
            message_id: id
        };
        Api.msg_channel_readed(params).then(res=>{
            if (res.err){
                logger.log("Не удалось отметить сообщение прочитанным #"+id, this, res.msg, 'error');
            } else {
                logger.log("Отмечено прочитанным #"+id, this);
            }
        })
    }

    // просто добавление нового сообщения в иторию без триггеров ивентов
    addToHistory =(event)=> {
        if( event ) {
            let message = new ChannelMessageController(event, this.id);
            this.history.data.push(message);
        }
    }

    // просто помечаем месседж как удаленный без триггеров ивентов
    markDeleted =(event)=> {
        this._removeMsg( event.id );
    }

    // проверка, что работаем с активным каналом
    // обновляем историю для своего сообщения или текущего собеседника
    isForActiveContext =(event)=> {
        logger.log('check isForActiveContext - channel', event.channel_id, this.id);
        if( event ) {
            return event.channel_id == this.id  ? true : false;
        }
    }

    // событие создание нового сообщения
    onMsgNew =(event)=> {
        if(event){
            if( !this.isForActiveContext(event) ) return;
            this.addToHistory( event );
            this.run('Channel_history_update', this.history.data);
        }
    }

    // событие удаление нового сообщения
    onMsgErase =(event)=> {
        if(event){
            logger.log('trigger onMsgChannelErase');
            this._removeMsg( event.id );
            this.run('Channel_history_update', this.history.data);
        }
    }

    // событие редактирование нового сообщения
    onMsgCorrect =(event)=> {
        if(event){
            logger.log('trigger onMsgChannelCorrect');
            this._correctMsg( event.id, event.body );
            this.run('Channel_history_update', this.history.data);
        }
    }

    // событие сообщение отмечено прочитанным
    onMsgUnreaded =(event)=> {
        if(event){
            // logger.log('history onMsgUnreaded', this, event);
            this._markUnreaded( event );
            this.run('Channel_history_update', this.history.data);
        }
    }

    msgChannelInvite =(user_id)=> {
       if(!user_id) return;

        Api.msg_channel_invite({channel_id: this.id, user_id: user_id}).then(res=>{
            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при отправке приглашения в канал', res.msg, 'error' );
                    return;
                }
                Events.runInfo( 'Приглашение отправлено пользователю' );
                this.updateMembers();
            }
        });
    }

    msgChannelJoin =()=> {
        console.log(this.id);
        Api.msg_channel_join({channel_id: this.id}).then(res=>{
            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при присоединении к каналу', res.msg, 'error' );
                    return;
                } 

                this.flags = 0;

                this.updateHistory();
                this.updateMembers();
                this.run('Channel-update', this);
            }
        });
    }

    msgChannelLeave =()=> {
        Api.msg_channel_leave({channel_id: this.id}).then(res=>{
            if (res.err){
                logger.log( this, 'Ошибка при выходе из канала', res.msg, 'error' );
                return;
            } 

            this.flags = -2;
            this.run('Channel-update', this);

            AppState.myChannels.destroyСhannel(this.id);
        });
    }

    msgChannelDelete =()=> {
        Api.msg_channel_delete({channel_id: this.id}).then(res=>{
            if (res.err){
                logger.log( this, 'Ошибка при удалении канала', res.msg, 'error' );
                return;
            } 
        });

        this.flags = -1;
        this.run('Channel-update', this);

        AppState.myChannels.destroyСhannel(this.id);
    }

    msgChannelUserLeave =(event)=> {
        if(event){
            if(event.channel_id != this.id) return;

            this.members.some((member, i)=>{
                if(member.user_id == event.user_id){
                    delete this.members[i];
                    return true;
                }
            });

            this.run('Channel_members_update', this.members);
        }
    }
}

















// eventMsgChannelNew(event){
//         var message = new ChannelMessageController(this.id, {
//                     id: event.id,
//                     ts: event.ts,
//                     user_id: event.id,
//                     first_name: event.first_name,
//                     last_name: event.last_name,
//                     body: event.body
//                 });

//         this.history.data.push(this.id, message);

//         this.run('Channel_history_update', this.history.data);
//     }

//     sendMessageToChannel(body){
//         if(!body){
//             logger.log( this, 'Ошибка при отправке сообщения: не передан текст сообщения', body );
//             return;
//         }

//         Api.msgChannelSend({channel_id: this.id, body: body}).then(res=>{
//             if(res){
//                 if (res.err){
//                     logger.log( this, 'Ошибка при отправке сообщения', res.msg );
//                     return;
//                 }

//                 var message = new ChannelMessageController(this.id, {
//                     id: event.id,
//                     ts: event.ts,
//                     user_id: event.id,
//                     first_name: event.first_name,
//                     last_name: event.last_name,
//                     body: event.body
//                 });

//                 this.history.data.push(this.id, message);

//                 this.run('Channel_history_update', this.history.data);
//             }
//         });   
//     }

//     inviteChannel(user_id){
//        if(!user_id) return;

//         Api.msgChannelInvite({channel_id: this.id, user_id: user_id}).then(res=>{
//             if(res){
//                 if (res.err){
//                     logger.log( this, 'Ошибка при отправке приглашение в канал', res.msg );
//                     return;
//                 }


//                 Events.run(Events.EV_SHOW_NOTIFY, {
//                     message: 'Приглашение отправлено пользователю',
//                     type: 'info'
//                 });

//                 this.updateMembers();
//             }
//         });
//     }; 

//     deleteChannel(){
//         this.run("Channel-update", this);
//     }



//     leave(){

//     }

