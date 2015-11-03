import Controller from './Controller';
import {Events, Error} from './../Dispatcher';
import {Api} from './../api';
import {AppState} from '../Auth/Dashboard';

export default class UserController extends Controller {
    constructor(user_id) {
        super();
        if (user_id) {
            this.id = user_id;
            this.update()
        } else this.id = null;
    }

    getFN = ()=>{
        if (this.state){
            return this.state.first_name
        }
        return "";
    };
    getLN = ()=>{
        if (this.state){
            return this.state.last_name
        }
        return "";
    };
    getEditData=()=>{
        var s=this.state;
        if (s){
            return {
                first_name:s.first_name,
                last_name:s.last_name,
                pat_name:s.pat_name,
                mobile:s.mobile,
                icq:s.icq,
                skype:s.skype,
                birthday:s.birthday,
                position:s.position
            }
        }
        return {
            first_name:null,
            last_name:null,
            pat_name:null,
            mobile:null,
            icq:null,
            skype:null,
            birthday:null,
            position:null
        }
    };

    editUserDetails=(newData)=>{
        Api.userEditRequest(newData).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                this.update();
            }
        })
    };

    onLogout =()=> {
        this.id = null;
        // закрываем сокет
        Events.closeWebSocket();
    }

    isAuth =()=> {
        return (this.id) ? true : false;
    }

    update=()=> {
        Api.userStateRequest(this.id).then(res=>{
            if (res.err) {
                var error={
                    type:"error",
                    error:res.msg
                };
                Events.run(Events.EV_SHOW_NOTIFY, error)
            } else {
                this.state = res;

                // контакты пока лежат в userstate, обновляем их при обновлении данных юзера
                // AppState.myContacts.updateData();
                // AppState.myContacts.on("update_myContacts",this.update); // перенесено в Contacts.js

                this.run("update_userState", res);      
            }
        });
    }
}