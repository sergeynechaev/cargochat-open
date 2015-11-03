// 
// 
// Deprecated
// 
// переделано на myContacts <- ContactCenter/ContactsController.js
// 
// 


import {Api} from './../api';
import Controller from './Controller';
import {AppState} from '../Auth/Dashboard';

export default class MyContactList extends Controller{
    
    constructor(){
        super();
        this.list = []
    }
    
    setList(list){
        this.list=list;
        this.run("get_list", list)
    }
    
    updateContactList=()=>{
        AppState.user.update();
    }
    
    addContactRequest(user_id){
        Api.userContactAdd({user_id:user_id}).then(res=>{
            if (res.err){
                console.log("Ошибка добавления контакта");
                console.log(res.msg);
            } else {
                console.log("Контакт добавлен");
                console.log(res);
                this.updateContactList();
            }
        })
    }
    
    addContact(user_id){
        if (this.isUserInMyList(user_id)){
            console.log("такой контакт уже существует");
            return null
        } else {
            this.addContactRequest(user_id);
        }
    }
    
    removeContact(user_id){
        Api.userContactRemove({user_id:user_id}).then(res=>{
            if (res.err){
                console.log("Ошибка удаления контакта");
                console.log(res.msg);
            } else {
                console.log("Контакт удален");
                console.log(res);
                this.updateContactList();
            }
        })
    }
    
    isUserInMyList=(id)=>{
        //console.log('[MyContactList] isUserInMyList ' + id);
        //console.debug(this.list);
        return this.list.some(cont=>{
            //console.log(' ? ' + cont.uid + ' ' + id);
            return cont.uid===id
        })
    }
    
    getList=()=>{
        return this.list
    }
    
    get(id){
        return this.list.filter(contact=>{
            return contact.id===id
        })
    }
    
}