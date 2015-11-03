

/**
 * DEPRECATED
 *
 *
 * Класс не используется, заменен на EventsController
 * 
 */



var Router = require('react-router');

import {Api} from './../api';
import {AppState} from '../Auth/Dashboard';
import Controller from './Controller';
import OneChat from './OneChat';
import {Events, Error} from './../Dispatcher';



export default class EventsClass extends Controller {

    constructor() {
        super();
        this.events = [];
        this.version = 0;
        this.updateEvents();
    }

    ping() {
        this.timeoutId=setTimeout(this.updateEvents, 10)
    }


    watchEvents=(events)=>{
        if(events){
            var l=events.length;
            for (var i=0; i<l; i++){
                this.selector(events[i])
            }
        }
    };

    selector=(event)=>{
        switch (event.type){
            case "msg_channel_new":
                Events.run(Events.EV_MSG_CHANNEL, event);
            break;
            case "msg_channel_invite":
                // console.log("EV_INVITE_CHANNEL");
                Events.run(Events.EV_INVITE_CHANNEL, event);
            break;
            case "msg_private_new":
                //console.log("NEW PRIVATE MSG");
                Events.run(Events.EV_MSG_PRIVATE_NEW, event);
            break;
            case "msg_private_unreaded":
                //console.log("NEW event Unreaded");
                Events.run(Events.EV_NEW_PRIVATE_UNREADED, event)
            break;
        }
    };

    updateEvents = ()=> {
        //if (this.timeoutId){
        //    clearTimeout(this.timeoutId);
        //    this.timeoutId=null
        //}
        let userIsAuth = false;

        try { userIsAuth = AppState.user.isAuth(); } catch(e) {}

        if(userIsAuth) {
            Api.events(this.version, 15).then(res=> {
                if( res ) {
                    if (res.err) {
                        console.log("Ошибка в запросе EVENTS");
                        console.log(res.msg);
                    } else {
                        // console.log("EVENTS", res);
                        if (res.version===this.version){
                            //console.log("нет изменений");
                        } else {
                            this.version = res.version;
                            this.watchEvents(res.events);
                        }
                        //this.run("new_events", res)
                    }
                    this.updateEvents();
                } else {
                    console.log("EVENTS: API has returned undefined result.");
                }
            })
        }
    };

}