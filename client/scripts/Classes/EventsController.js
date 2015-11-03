var Router = require('react-router');

import {Api} from '../api';
import Controller from './Controller';
import {logger} from './Logger';
import {Utils} from '../utils';

/**
 * Управдление событиями, приходящими от сервера
 * 
 * Экземпляр класса создается в файле Dispatcher.js и к остальным
 * файлам подключается оттуда.
 * 
 */
export default class EventsController extends Controller {

    constructor() {
        super();

        // регистриуем постоянные имена
        this.registerConst();

        // флаг открыт и зарегистрирован
        this._isReady = false;

        // параметры Web Socket
        this.ws_URI = 'ws://cargo.chat/apiws';
        this.ws = null;
        this.wsErrors = [];
        this._reconnectTO = null;
    }

    // постоянные имена событий
    const = [
        'EV_SEARCH_RESULT',
        'EV_PROFILE_UPDATE',
        'EV_COMP_DETAILS',
        'EV_COMP_STATE',
        'EV_ROUTE_CHANGED',
        'EV_SESSIONS_UPDATE',
        'EV_CHECK_EDIT',
        'EV_PROFILE_UPDATE_FAIL',
        'EV_USER_REQUESTS',
        'EV_COMPS_CHANGED',
        'EV_CLICK_ANYWHERE',
        'EV_GLOBAL_MOUSE_UP',
        'EV_USER_STATE_UPDATE',

        // system events
        'EV_SHOW_NOTIFY',
        'EV_SHOW_EVENT',
        'EV_SYSTEM_DOWN',
        'EV_SYSTEM_UP',

        // API: channel & group messages
        'EV_MSG_CHANNEL_NEW',
        'EV_MSG_CHANNEL_UNREADED',
        'EV_MSG_CHANNEL_ERASE',
        'EV_MSG_CHANNEL_CORRECT',
        'EV_MSG_CHANNEL_NEW',
        'EV_MSG_CHANNEL_INVITE',
        'EV_MSG_CHANNEL_USER_UPSERT',
        'EV_MSG_CHANNEL_USER_LEAVE',
        'EV_MSG_CHANNEL_ORDERS',
        'EV_MSG_CHANNEL_DELETED',
        'EV_INVITE_CHANNEL',
        'EV_MSG_CHANNEL',

        // API: private messages
        'EV_MSG_PRIVATE_NEW',
        'EV_MSG_PRIVATE_UNREADED',
        'EV_MSG_PRIVATE_INTERLOCUTOR_LRM',

        // API: user online-offline
        'EV_WATCH_USERS_INIT',
        'EV_USER_ONLINE',
        'EV_USER_OFFLINE',

        // Websocket
        'EV_WEBSOCKET_REG',
        'EV_WEBSOCKET_CLOSED',
        'EV_WEBSOCKET_DOWN',
        
        'EV_RELATION_REQUEST_REFUSE',
        'EV_RELATION_REQUEST_ACCEPT',
        'EV_RELATION_REQUEST_CANCEL',
        'EV_RELATION_REQUEST_MESSAGE',
        
        'EV_COMP_RELATIONS_CHANGED'
    ]

    registerConst =()=> {
        this.const.forEach( evtName => this[evtName] = evtName );
    }

    /**
     *  Web Socket
     */

    openWebSocket =() => {

        // только для авторизованного юзера
        try { this.userSid = Api.sid; } catch(e) { return }

        // не даем повторной регистрации с одной страницы, чтобы не получать двойные ивенты
        if( this._isReady ) return;

        this.ws = new WebSocket(this.ws_URI);
        this.initWebSocket();
    }

    initWebSocket =()=> {

        // Обработчики состояний сокета
        // 
        // открыт
        this.ws.onopen =(event)=> {
            logger.log(this, 'WebSocket connection established.');
            this.registerWebSocket();
        }

        // ошибка
        this.ws.onerror =(error)=> {
            logger.log(this, 'WebSocket ERROR.', error.message, 'error');
        }

        // закрыт или прерван
        this.ws.onclose =(event)=> {
            this.ws = null;
            this._isReady = false;

            if( event.wasClean ) {
                logger.log(this, 'WebSocket connection closed.', event.code, event.reason);

            } else {
                this.reconnectWebSocket( event );
                // this.run(this.EV_WEBSOCKET_DOWN, event); // deprecated
            }
        }

        // получение сообщения по сокету
        this.ws.onmessage =(event)=> {
            this.onEventReceived( event );
        }
    }

    closeWebSocket =() => {
        if (this.ws) this.ws.close();

        // test reconnect
        // this.reconnectWebSocket( {code: '-1', reason: 'Test event'} );
    }

    reconnectWebSocket =(event)=> {
        let lastErrorTime = this.wsErrors.length ? this.wsErrors[0].date : 0;
        let nowTime = Date.now();

        // increase reconnect time by 5 sec, reset time after every 60 sec delay
        let reconnectDelay = lastErrorTime 
                                ? nowTime - lastErrorTime + 5000 < 60000 ? nowTime - lastErrorTime + 5000 : 1000
                                : 1000;

        let reconnectText = reconnectDelay <= 1000 ? "now" : "in " + Math.round(reconnectDelay / 1000) + " sec";

        this.wsErrors.unshift({ date: nowTime, code: event.code, reason: event.reason});
        this._reconnectTO = setTimeout( this.openWebSocket, reconnectDelay );
        logger.log(this, 'WebSocket connection terminated. Code: ' + event.code + ' Reason: ' + event.reason, 'error');
        logger.log(this, 'Trying to reconnect ' + reconnectText);
    }

    registerWebSocket =()=> {
        this.wsSend('reg');
    }

    wsSend =( cm, params = {} )=> {
        logger.log(this, 'wsSend');
        console.debug(cm, params);
        
        // формируем параметры
        params.cm = cm;
        params.sid = Api.sid;

        // CONNECTING = 0
        // OPEN = 1
        // CLOSED = 2
        if( this.ws.readyState == 1 ) {
            // logger.log(this, 'WebSocket SEND: ', Utils.o2j(params));
            this.ws.send( Utils.o2j(params) );
        } else {
            logger.log(this, 'WebSocket NOT OPENED. Failed to execute command: ', Utils.o2j(params));
        }
    }

    isReady =()=> {
        return this._isReady;
    }

    /*
     *  End of Web Socket
     */
    

    // parse & run websocket event
    onEventReceived =(event)=> {
        // logger.log(this, 'WebSocket EVENT RECEIVED', event, event.data);
        this.handleEvent( Utils.j2o(event.data) );
    }

    // ищем и запускаем событие
    handleEvent =(data)=> {
        logger.log(this, 'handleEvent', data);
        
        if (data == null || 'type' in data == false) {
            logger.log(this, 'ERR: invalid ws event data');
            return;
        }
        
        switch (data['type']) {
            
            case 'reg':
                
                // ws ответил на reg
                
                if (!Utils.isNumber(data.user_id)) {
                    logger.log(this, 'ERR: ws reg failed (user_id is nan)');
                    return;
                }
                
                logger.log(this, 'WebSocket REGISTERED: user_id=' + data.user_id);
                this._isReady = true;
                this._reconnectTO = null;
                this.run(this.EV_WEBSOCKET_REG, data.user_id);

                // test reconnect
                // this._reconnectTO = setTimeout( this.closeWebSocket, 10 );
                
                break;
                
            case 'watch':
                
                // ws ответил на watch
                
                if ('online' in data == false) {
                    logger.log(this, 'ERR: ws watch failed (online required)');
                    return;
                }
                
                // подписка на обновление статусов юзеров
                logger.log(this, 'WebSocket RUN EVENT: watch_users_init', data);
                this.run(this.EV_WATCH_USERS_INIT, data);
                
                break;
                
            default:
                this.run('EV_' + data['type'].toUpperCase(), data);
                
        }
        
    }
    
    // вслывающие и исчезающие со временем уведомления
    runError=(msg)=>{
        this.run(this.EV_SHOW_NOTIFY, {type: 'error', message: msg})
    }
    runInfo=(msg)=>{
        this.run(this.EV_SHOW_NOTIFY, {type: 'info', message: msg})
    }

    // уведомления в нотифай-центр, добавляются и остаются висеть, пока их не увидит юзер
    runNotify =(event)=> {
        this.run(this.EV_SHOW_EVENT, event)
    }

}
