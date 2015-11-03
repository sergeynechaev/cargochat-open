import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

import ChatController from '../Chat/ChatController';

export default class ChatsController extends Controller {

    constructor() {
        super();

        this.chats = [];
        this.controller = null;
        this.activeChatIndex = null;
        this.isReady = false;

        this.getChatsList();
    }

    // получение списка приватов юзера
    getChatsList =()=> {

        // logger.log('getChatsList, current user state = ' + AppState.user.state, this);
        if( !AppState.user.state ) return;

        let params = {
            fields: ['id', 'ts', 'opp_id', 'fn', 'ln', 'cid', 'cname', 'unreaded', 'lrm']
        };

        this.isReady = false;

        Api.msg_privates_list(params).then(res=>{
            if( res ){
                if( res.err ){
                    logger.log( this, 'Ошибка при получении списка приватов', res.msg, 'error' );
                    return;
                }

                let contacts = AppState.myContacts.getData();                // контакты
                let privates = ((res.data || []).length ) ? res.data : [];    // приваты

                // logger.log('contacts', this, contacts);
                // logger.log('privates', this, privates);

                let chatsData = [];
                let unreaded = [];
                this.chats = [];

                // добавляем юзеров, от которых есть сообщения, но которых нет в контактах
                // заодно формируем массив с числом непрочитанных, чтобы не бегать потом внутри chatsData
                (privates || []).forEach( (p, i) => {
                    unreaded[p.opp_id] = p.unreaded;
                    if( !contacts.some( c => c.user_id == p.opp_id ) ) {

                        // переводим названия полей в читаемые как в контактах
                        // добавляем нужные поля
                        chatsData.push( {
                                user_id: p.opp_id,
                                chat_id: p.id,
                                first_name: p.fn,
                                last_name: p.ln,
                                comp_name: p.cname,
                                comp_id: p.cid,
                                notInContact: true,
                                unreaded: p.unreaded,
                                last_readed: p.lrm,
                        });
                    }
                });

                // logger.log('chatsData', this, chatsData);

                // юзеры не в контактах будут сверху
                chatsData = chatsData.concat( contacts );
                // chatsData = contacts.concat( chatsData ); // а так - снизу

                // сливаем поля в единый массив чатов
                chatsData.forEach( contact => {
                    if( AppState.user.state.id != contact.user_id ) {
                        this.chats.push( {id: contact.user_id,
                                          user_id: contact.user_id,
                                          chat_id: contact.chat_id !== undefined ? contact.chat_id : null,
                                          first_name: contact.first_name,
                                          last_name: contact.last_name,
                                          comp_name: contact.comp_name,
                                          comp_id: contact.comp_id,
                                          unreaded: unreaded[contact.user_id] ? unreaded[contact.user_id] : 0,
                                          last_readed: contact.last_readed !== undefined ? contact.last_readed : null,
                                          in_contact: contact.notInContact ? false : true,
                                    });
                    }
                });

                // logger.log('Chats_getlist_complete', this, this.chats);

                // ставим метку, что чаты у нас получены
                this.isReady = true;
                AppState.myWatch.regUsers( this.chats.map( user => user.id) );

                this.run('Chats_getlist_complete', this.chats);
            }
        });
    }


    // DEPREACTED. Команды для старого апи.
    // 
    // тут будет получение списка приватов юзера
    // а пока эмулируем, запрашивая список контактов юзера
    // getChatsList =()=> {

    //     let contacts = AppState.myContacts.getData();   // контакты
    //     let privates = AppState.user.state.msg_private; // от кого есть непрочитанные приваты

    //     let chatsData = [];
    //     let unreaded = [];
    //     this.chats = [];

    //     // добавляем юзеров, от которых есть сообщения, но которых нет в контактах
    //     // заодно формируем массив с числом непрочитанных, чтобы не бегать потом внутри chatsData
    //     privates.forEach( (p, i) => {
    //         unreaded[p.user_id] = p.unreaded;
    //         if( !contacts.some( c => c.user_id == p.user_id ) ) {
    //             // ставим метку, что юзера еще нет в контактах
    //             privates[i].notInContact = true;
    //             chatsData.push( privates[i] );
    //         }
    //     });

    //     // юзеры не в контактах будут сверху
    //     chatsData = chatsData.concat( contacts );
    //     // chatsData = contacts.concat( chatsData ); // а так - снизу

    //     chatsData.forEach( contact => {
    //         this.chats.push( {id: contact.user_id,
    //                           first_name: contact.first_name,
    //                           last_name: contact.last_name,
    //                           comp_name: contact.comp_name,
    //                           comp_id: contact.comp_id,
    //                           unreaded: unreaded[contact.user_id] ? unreaded[contact.user_id] : 0,
    //                           in_contact: contact.notInContact ? false : true,
    //                     });
    //     });
    // }


    getAllChats =()=> {
        return this.chats;
    }

    getChat =(id)=> {

        // в компоненте уже прошла проверка на валидность id, и если это не int,
        // то здесь уже будет null
        if(!id) return undefined;

        this.activeChatIndex = null;

        this.chats.forEach( (chat, i) => {

            // для запрошенного чата создаем экземпляр чата, если еще нет,
            // и пихаем его в переменную controller
            if( chat.id == id ) {
                if( !chat.controller ) {
                    chat.controller = new ChatController( chat );
                }
                this.activeChatIndex = i;
            }

        });

        // не нашли запрошенного канала в списке
        if( this.activeChatIndex === null ) return undefined;

        if( this.chats[this.activeChatIndex] ) {
            return this.chats[this.activeChatIndex].controller;
        }
    }

    // возвращаем число непрочитанных по запрошенному чату
    getUnreadedCount =(user_id)=> {
        let unreaded = null;

        // используем some, чтобы остановить цикл, когда нашли нужный чат
        this.chats.some( chat => {
            if( chat.id == user_id ) return unreaded = chat.unreaded;
        });

        return unreaded;
    }

    // возвращаем id последнего прочитанного сообщения по запрошенному чату
    getLastReaded =(user_id)=> {
        let readed = null;

        this.chats.some( chat => {
            if( chat.id == user_id ) return readed = chat.last_readed;
        });

        return readed;
    }

    // обновляем число непрочитанных
    setUnreaded =(chatIndex, unreaded)=> {
        this.chats[chatIndex].unreaded = unreaded;

        // т.к. MessageHistory - универсальный компонент и работает и с каналами, и с чатами,
        // не забываем изменить число непрочитанных в контроллере канала/чата
        if( this.chats[chatIndex].controller ) {
            this.chats[chatIndex].controller.unreaded = unreaded;
        }
    }

    // DEPRECATED: заменено на onChatEvent
    // 
    // обновляем чат по пришедшему событию
    // updateChat =(event)=> {
    //     logger.log('updateChat 1');

    //     // свое сообщение обрабатываем отдельно
    //     if ( event.type == 'msg_private_new' && event.user_id == AppState.user.state.id ) {
    //         let activeChat = null;
    //         this.chats.some( chat => {
    //             if( chat.id == event.to_user_id) return activeChat = chat;
    //         });
    //         logger.log('updateChat 2', this, activeChat);
    //         if( activeChat && activeChat.controller ) activeChat.controller.addToHistory( event );
    //         return;
    //     }

    //     this.chats.forEach( (chat, i) => {
    //         if( chat.id == event.user_id ) {
    //             switch( event.type ) {
    //                 case 'msg_private_new':
    //                     chat.unreaded++;
    //                     // если есть контроллер, значит, уже грузили историю, надо ее обновить
    //                     if( chat.controller ) chat.controller.addToHistory( event );
    //                 break;

    //                 case 'msg_private_unreaded':
    //                     // logger.log('updateChat set unreaded', this, event.unreaded);
    //                     chat.unreaded = event.unreaded;
    //                 break;

    //                 case 'msg_private_interlocutor_lrm':
    //                     if( chat.controller ) chat.controller.onMsgOppReaded( event );
    //                 break;

    //                 case 'msg_private_erase':
    //                     if( chat.controller ) chat.controller.markDeleted( event );
    //                 break;
    //             }
    //         }
    //     });
    //     // this.run('Chats_getlist_complete', this.chats);
    // }

    // обработка ивентов по чату
    onChatEvent =(event)=> {

        // свое сообщение обрабатываем отдельно и возвращаемся
        // для своего нам не нужно уведомление в нотифай-центр и увеличивать число непрочитанных
        if ( event.type == 'msg_private_new' && event.user_id == AppState.user.state.id ) {
            let activeChat = null;
            this.chats.some( chat => {
                if( chat.id == event.to_user_id) return activeChat = chat;
            });
            // logger.log('updateChat - on msg SELF', this);
            if( activeChat ) this.runChatEvent(event, activeChat, 'onMsgNew');
            return;
        }

        this.chats.forEach( (chat, i) => {
            if( chat.id == event.user_id ) {

                switch( event.type ) {

                    //  новое сообщение
                    case 'msg_private_new':
                        // изменяем число непрочитанных в контакт-центре
                        this.setUnreaded(i, chat.unreaded + 1);

                        // обновляем контакт-центр
                        this.run('Chats_update', this.chats);

                        // уведомления в нотифай-центр
                        if( this.activeChat() ) {
                            if( !this.activeChat().isForActiveContext(event) ) {
                                // показываем уведомление только если чат, в который оно пришло, не активен
                                Events.runNotify( event );
                            }
                        // находимся где-то на другой странице, показываем уведомление
                        } else {
                            Events.runNotify( event );
                        }

                        // передаем событие дальше в контроллер активного чата,
                        // он обновит данные и сам разберется, делать апдейт истории или нет
                        this.runChatEvent(event, chat, 'onMsgNew');

                    break;

                    // обновилось число непрочитанных
                    case 'msg_private_unreaded':
                        this.setUnreaded(i, event.unreaded);
                        this.run('Chats_update', this.chats);
                        this.runChatEvent(event, chat, 'onMsgUnreaded');

                    break;

                    // собеседник прочитал какое-то наше сообщение
                    case 'msg_private_interlocutor_lrm':
                        this.runChatEvent(event, chat, 'onMsgOppReaded');
                    break;

                    // удаление сообщения (апи еще не готово)
                    case 'msg_private_erase':
                        if( chat.controller ) chat.controller.markDeleted( event );
                    break;
                }

            } // if
        }); // forEach
    }

    runChatEvent =(event, activeChat, action)=> {
        // если чат еще не загружался, ничего не делаем, т.к. вся история потом все равно подтянется с сервера при загрузке чата
        if( !activeChat.controller ) return;

        // запускаем событие
        let actionToRun = activeChat.controller[action];
        if( typeof actionToRun == 'function') actionToRun( event );
    }

    // возвращаем ссылку на активный в данный момент чат
    activeChat =()=> {
        if( this.chats[this.activeChatIndex] ){
            return this.chats[this.activeChatIndex].controller;
        }
    }

    openChat =(id)=> {
        this.run('Chats_open', id);
    }

    closeChat =(id)=> {
        this.run('Chats_close', id);
    }

    createChat(id) {}


    msgChatInvite(event) {

        // this.chats.push({
        //     id: event.iser_id,
        //     unreaded: 0,
        // });

        // Events.run(Events.EV_SHOW_NOTIFY, {
        //     message: 'Вас пригласили в приватную беседу ',
        //     type: 'info'
        // }); 

        // this.run('ContactCenter_channel-update', this.chats);
    }

}
