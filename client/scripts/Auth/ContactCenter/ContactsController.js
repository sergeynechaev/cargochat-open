import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class ContactsController extends Controller {
    constructor(props) {
        super(props);
        this.data = [];
        this.watchUsers = [];
        this.onlineUsers = [];
        this.isReady = false;

        // контакты нам нужны сразу
        this.getContactsList();
    };


    getData =()=> {
        return this.data;
    };

    // получение списка контактов юзера
    getContactsList =()=> {

        let params = {
            fields: ['uid', 'ts', 'ln', 'fn', 'position', 'cid', 'cname']
        };

        Api.user_contacts_list(params).then(res=>{

            if(res){
                if(res.err){
                    logger.log( this, 'Ошибка при получении списка контактов', res.msg, 'error' );
                    return;
                }
                this.data = [];

                // logger.log(this, 'getContactsList', this, res);

                // для обеспечения совместимости и читаемости меняем названия полей
                if( (res.data || []).length ) {
                    res.data.forEach( contact => {
                        this.data.push( { user_id: contact.uid,
                                          ts: contact.ts,
                                          position: contact.position,
                                          first_name: contact.fn,
                                          last_name: contact.ln,
                                          comp_name: contact.cname,
                                          comp_id: contact.cid,
                                    });
                    });
                }
                
                // this.setWatchUsers();
                // this.startWatchUsers();

                this.isReady = true;
                AppState.myWatch.regUsers( this.data.map( user => user.user_id) );

                this.run('Contacts_getlist_complete', this.data);
            }
        });
    }

    // TODO: осталось от старого апи и поведения
    // проверить и переделать
  //   updateData =()=> {
		// // this.data = AppState.user.state.contacts;
  //       // if( !this.data ) this.data = [];   // data cannot be null
  //       this.setWatchUsers();
  //   }

    isContactExists =(user_id)=> {
        return this.data.some( contact =>{
            return contact.user_id == user_id;
        });
    };

    removeContact =(user_id)=> {
        Api.user_contact_rem({user_id: user_id}).then(res=>{
            if (res.err){
                logger.log( this, 'Error while removing contact', res.msg, 'error' );
                return;
            } 
            Events.runInfo( 'Контакт успешно удален' );

            // this.run('update_myContacts', this);
            // this.run('Contacts_update', this.data);

            // запускаем обновление контактов
            this.getContactsList();
            
        })
    };
      
    addContact =(user_id)=> {

        // проверяем, есть ли уже в контактах
        if( this.isContactExists(user_id) ) {
            Events.runInfo( 'Пользователь уже есть в списке контактов' );
            return;
        }

        Api.user_contact_add( {user_id: user_id} ).then(res=>{
            if (res.err){
                // обрабатываем ошибки
                if( res.msg.match("already exists") ) {
                    Events.runError("Пользователь уже есть в контактах.");
                } else {
                    Events.runError(res.msg);
                    logger.log( this, 'Ошибка при добавлении в контакты', res, 'error' );
                }
                return;
            }
            Events.runInfo( 'Контакт успешно добавлен' );

            // запускаем обновление контактов
            this.getContactsList();
        })
    }


    /**
     * Подписки на статусы онлайн-офлайн - уехало в WatchController
     */

    // подписываемся на обновление статусов юзеров в контактах
    // startWatchUsers =()=> {
    //     logger.log(this, 'startWatchUsers - contacts list', this.watchUsers);
    //     logger.log(this, 'startWatchUsers - is socket ready?', Events.isReady());
    //     if (!Events.isReady() || this.watchUsers.length < 1) return;
    //     Events.wsSend('watch', {users: this.watchUsers});
    // }

    // watchUsersInit =(data)=> {
    //     if( data.online ) {
    //         this.onlineUsers = data.online.map( userId => {
    //             return userId;
    //         })
    //     }
    //     this.run('Contacts_users_status_change', this.onlineUsers);

    //     logger.log(this, 'watchUsersInit, online Users', this.onlineUsers);
    // }

    // isUserOnline =(userId)=> {
    //     logger.log(this, 'isUserOnline u= ' + userId, this.onlineUsers);
    //     return this.onlineUsers.some( user => user == userId ); 
    // }

    // setUserOnline =(data)=> {
    //     logger.log(this, 'setUserOnline', data);
    //     if( this.isUserOnline( data.user_id ) ) return;
    //     this.onlineUsers.push( data.user_id );
    //     this.run('Contacts_users_status_change', this.onlineUsers);
    // }

    // setUserOffline =(data)=> {
    //     logger.log(this, 'setUserOffline', data);
    //     if( !this.isUserOnline( data.user_id ) ) return;
    //     this.onlineUsers = this.onlineUsers.filter( user => {
    //         return user != data.user_id;
    //     });
    //     this.run('Contacts_users_status_change', this.onlineUsers);
    // }

    // // получение списка ID юзеров в контактах
    // // нужно для подписки на обновление статуса
    // setWatchUsers =()=> {
    //     logger.log(this, 'setWatchUsers - contacts list');
    //     this.watchUsers = this.data.map( user => {
    //         return user.user_id;
    //     });
    // }
    // 
}
