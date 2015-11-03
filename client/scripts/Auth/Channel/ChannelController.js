import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger.js';

import MessageHistoryController from '../../Controls/Message/MessageHistoryController.js'
import MessageNotifyController from '../../Controls/Message/MessageNotifyController.js';
import ChannelMessageController from './ChannelMessageController.js'


/**
 * 
 * Общие для каналов и чатов методы работы с историей реализованы 
 * в Controls/Message/MessageHistoryController
 * 
 */

export default class ChannelController extends MessageHistoryController {

    constructor(params) {
        super();

        /*  реализовано в MessageHistoryController:
         *      this.history
         *      this.scrollPos
         */

        this.id = params.id;
        this.title = params.title;
        this.flags = params.flags;

        this.members = [];

        // unreaded messages
        this.unreaded = params.unreaded;
        this.history.last_readed = params.lrm;
        this.isReady = false;
		
		// this.updateHistory();
        this.updateMembers();
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
                    if( res.msg.match("relation not found") === null )
                        logger.log(this, 'Ошибка при получении участников канала', res.msg, 'error');
                    return;
                }
                // this.members = res.users.filter( user => user.user_id != AppState.user.state.id );
                this.members = res.users || [];
                AppState.myWatch.regUsers( this.members.map( user => user.user_id) );

                this.run('Channel_members_update', this.members);
            }
        });
    }
    

    // 
    // Channel History
    // 
    
    updateHistory =()=> {

        // историю не может видеть юзер с флагом 1 = приглашен.
        if( this.flags == 1) return;

        let params = {
            filters : [],
            fields: ['id', 'ts', 'uid', 'body', 'ln', 'fn']
        };

        params.orderBy = 'id';
        params.dir = 'DESC';

        // logger.log('updateHistory -channel lrm= ' + this.history.last_readed + ' unred= ' + this.unreaded);

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

        Api.msg_channel_hist_list( params ).then( res => {
            
            this.isReady = true;

            if( res ) {
                if( res.err ) {
                    logger.log( this, 'Ошибка при получении истории сообщений', res.msg, 'error');
                    this.run('Channel-update', undefined);  // не показываем канал вообще
                    return;
                }

                // logger.log('msg_channel_hist_list', this, res);

                this.history.total = res.total;
                this.history.last_readed = res.lrm_id;

                // если данных нет, все равно нужно вернуть пустой результат
                if( !(res.data || []).length ) {
                    this.history.data = [];
                    this.run('Message_history_update', this.history.data);
                    return;
                }

                let historyAppend = [];
                let myUserId = AppState.user.state.id;
                let myFirstName = AppState.user.state.first_name;
                let myLastName = AppState.user.state.first_name;
                let myCompName = AppState.user.state.comp.name;
                let myCompId = AppState.user.state.comp.id;

                res.data.forEach( message => {

                    // добавляем общие поля
                    message.isDeleted = false;
                    message.readed = true;          // прочитано мной
                    message.opp_readed = false;     // прочитано собеседником, хотя в каналах этого признака нет
                                                    // добавляем его для совместимости с контроллером вывода сообщений

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
                        if( message.id > lrm ) message.readed = false;
                    }

                    // сообщения с пустым body = архив, показываем "сообщение было удалено"
                    if( message.body == null ) {
                        message.isDeleted = true;
                        message.body = "Сообщение удалено";
                    }

                    historyAppend.unshift( new ChannelMessageController(message, this.id) );
                });

                this.history.data = historyAppend.concat( this.history.data );
                this.run('Message_history_update', this.history.data);
            }

        });
    }

    sendMessage =(body)=> {
        Api.msg_channel_send({channel_id: this.id, body: body}).then(res=>{
            if(res){
                if (res.err){
                    logger.log( this, 'Ошибка при отправке сообщения', res.msg, 'error');
                    return;
                }
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

    markDeleted =(event)=> {
        this._removeMsg( event.id );
    }

    addToHistory =(event)=> {
        if( event ) {
            event.readed = (event.user_id == AppState.user.state.id) ? true : false;    // для чужого ставим метку, что сообщение не прочитано
            let message = new ChannelMessageController(event, this.id);
            this.history.data.push(message);
        }
    }

    // добавление события в историю канала
    notifyToHistory =(event)=> {

        // юзер принял приглашение и присоединился к каналу
        if( event.type == 'msg_channel_user_upsert' && event.flags == 0 && event.user_id != AppState.user.state.id ) {
            let body = 'Присоединился пользователь ' + event.first_name + " " + event.last_name + ' из компании "' + event.comp_name + '"';
            let message = new MessageNotifyController(body, this.id);
            this.history.data.push(message);
            event.isNotify = true;
        }

        // вышел из канала
        if( event.type == 'msg_channel_user_leave' && event.user_id != AppState.user.state.id ) {
            // let body = 'Пользователь ' + event.first_name + " " + event.last_name + ' из компании "' + event.comp_name + '"';
            // апи пока не отдает в этой команде фио юзера
            let body = 'Пользователь # ' + event.user_id + ' покинул группу';
            let message = new MessageNotifyController(body, this.id);
            this.history.data.push(message);
            event.isNotify = true;
        }

    }


    // проверка, что работаем с активным каналом
    // обновляем историю для своего сообщения или текущего собеседника
    isForActiveContext =(event)=> {
        logger.log('check isForActiveContext - channel', event.channel_id, this.id);
        if( event ) {
            return event.channel_id == this.id  ? true : false;
        }
    }


    // обработчики событий

    onMsgNew =(event)=> {
        if( event ) {
            this.addToHistory( event );
            this.runUpdate( event );    // для активного канала запускаем обновление истории
        }
    }

    onMsgErase =(event)=> {
        if( event ) {
            logger.log('trigger onMsgChannelErase');
            this._removeMsg( event.id );
            this.runUpdate( event );
        }
    }

    onMsgCorrect =(event)=> {
        if( event ) {
            logger.log('trigger onMsgChannelCorrect');
            this._correctMsg( event.id, event.body );
            this.runUpdate( event );
        }
    }

    onMsgUnreaded =(event)=> {
        if( event ) {
            this._markUnreaded( event );
            this.runUpdate( event );
        }
    }

    onMsgChannelUserLeave =(event)=> {
        if( event ) {
            this.members.some( (member, i) => {
                if( member.user_id == event.user_id ) {
                    delete this.members[i];
                    return true;
                }
            });
            this.run('Channel_members_update', this.members);

            // показываем в истории канала это событие
            this.notifyToHistory( event );
            this.runUpdate( event );
        }
    }

    onMsgChannelUserUpsert =(event)=> {
        if( event ) {
            this.updateMembers();
            this.run('Channel_members_update', this.members);

            // показываем в истории канала это событие
            this.notifyToHistory( event );
            this.runUpdate( event );
        }
    }

    // запускаем обновление истории при активном канале
    runUpdate =(event)=> {
        if( AppState.myChannels.activeChannel() && AppState.myChannels.activeChannel().isForActiveContext(event) ) {

            this.run('Message_history_update', this.history.data);

            // если слали уведомление в канал, дергаем ивент, чтобы по нему понять, крутить скролл вниз или нет
            // важно: этот ивент должен быть дернут после Message_history_update
            if( event.isNotify === true ) {
                this.run('Message_notify_send', event);
            }
        }
    }

    // действия

    msgChannelInvite =(user_id)=> {
        if(!user_id) return;
        Api.msg_channel_invite({channel_id: this.id, user_id: user_id}).then(res=>{
            if(res){
                if (res.err) {
                    logger.log( this, 'Ошибка при отправке приглашения в канал', res.msg, 'error' );
                    return;
                }
                Events.runInfo( 'Приглашение отправлено пользователю' );
                this.updateMembers();

                // т.к. апи считает непринявших приглашение тоже юзерами, нужно обновить
                // число участников в контакт-центре
                AppState.myChannels.onMyInviteToСhannel(this.id);
            }
        });
    }

    msgChannelLeave =()=> {
        Api.msg_channel_leave({channel_id: this.id}).then(res=>{
            if (res.err) {
                logger.log( this, 'Ошибка при выходе из канала', res.msg, 'error' );
                return;
            } 
            this.flags = -2;
            this.run('Channel-update', this);

            // также нужно удалить канал из контакт-центра
            AppState.myChannels.destroyСhannel(this.id);
        });
    }

    msgChannelJoin =()=> {
        Api.msg_channel_join({channel_id: this.id}).then(res=>{
            if(res) {
                if(res.err) {
                    logger.log( this, 'Ошибка при присоединении к каналу', res.msg, 'error' );
                    return;
                }
                this.flags = 0;
                this.updateMembers();
                this.run('Channel-update', this);

                // this.updateHistory();
            }
        });
    }

    msgChannelDelete =()=> {
        Api.msg_channel_delete({channel_id: this.id}).then(res=>{
            if (res.err) {
                logger.log( this, 'Ошибка при удалении канала', res.msg, 'error' );
                return;
            } 
        });
        this.flags = -1;
        this.run('Channel-update', this);

        // также нужно удалить канал из контакт-центра
        AppState.myChannels.destroyСhannel(this.id);
    }

}
