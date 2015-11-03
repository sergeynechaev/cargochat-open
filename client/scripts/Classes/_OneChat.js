// 
// 
// 
// совсем старые приваты
// переделано на контакт-центр и каналы
// 
// 
// 

import {Api} from './../api';
import Controller from './Controller';
import {AppState} from '../Auth/Dashboard';

export default class OneChat extends Controller{

    constructor(user_id){
        super();
        this.chat_history=[];
        this.isOpen=false;
        this.user_id = user_id;
    }

    markLastMsgReaded=()=>{
        var params={
            user_id:this.user_id,
            message_id:this.chat_history[this.chat_history.length-1].id
        };
        Api.msgPrivateReaded(params).then(res=>{
            if (res.err){
                console.log("Ошибка в пометке");
                console.log(res.msg);
            } else {
                console.log("Все сообщения прочитаны");
                console.log(res);

            }
        })
    };


    sendMessage(body){
        var params={
            user_id:this.user_id,
            body:body,
            ts:new Date()
        };
        Api.msgPrivateSend(params).then(res=>{
                if (res.err){
                    console.log("Ошибка отправки сообщения");
                    console.log(res.msg);
                } else {
                    //console.log("Сообщение отправлено");
                    //console.log(res);
                    //AppState.myEvents.updateEvents()
                }
            }
        )
    };

    get_chat_history=(cb)=>{
        var params={
            limit:30,
            user_id:this.user_id
        };
        Api.msgPrivateHist(params).then(res=>{
            if (res.err){
                console.log("Ошибка получения истории");
                console.log(res.msg);
            } else {
                //console.log("HISTORY");
                //console.log(res);
                this.chat_history=res.hist;
                if (cb) cb(res.hist);
                //this.run("chat_ready", this.chat_history)
            }
        });

    };
}