import {AppState} from '../Auth/Dashboard';
import {Events, Error} from '../Dispatcher';
import Controller from './Controller';
import {logger} from './Logger';

/**
 * Подписки на статусы юзера онлайн-офлайн
 */

export default class WatchController extends Controller {
    constructor(props) {
        super(props);
        this.usersList = [];
        this.onlineUsers = [];
    }

    regUsers =(users)=> {
        let oldLen = this.usersList.length;
        let newData = this.usersList.concat( users );

        // logger.log('usersList l old= ' + len, this, users, newData);

        // храним только уникальные user id
        this.usersList = newData.reduce( (list, curUser) => {
            if( list.indexOf(curUser) < 0 ) list.push(curUser);
            return list;
        }, []);

        if( oldLen != this.usersList.length ) this.watchUsers();

        // logger.log('usersList l new= ' + this.usersList.length, this, this.usersList);
    }

    watchUsers =()=> {
        // logger.log(this, 'startusersList - is socket ready? = ' + Events.isReady(), this, this.usersList);
        if (!Events.isReady() || this.usersList.length < 1) return;
        Events.wsSend('watch', {users: this.usersList});
    }

    // после подписки на статусы сервер присылает список юзеров онлайн, сохраняем его
    setUsersOnline =(data)=> {
        if( !(data.online || []).length ) return;
        
        // logger.log('setUsersOnline', this, data);

        this.onlineUsers = data.online.map( userId => {
            return userId;
        })
        this.run('Watch_status_change', this.onlineUsers);

        // logger.log(this, 'setUsersOnline, online Users', this.onlineUsers);
    }

    isUserOnline =(userId)=> {
        // logger.log(this, 'isUserOnline u= ' + userId, this.onlineUsers);

        return this.onlineUsers.indexOf(userId) < 0 ? false : true;
    }

    userStatus =(userId)=> {
        return this.isUserOnline(userId) ? 'online' : 'offline';
    }

    setOneUserOnline =(data)=> {
        if( this.isUserOnline( data.user_id ) ) return;
        this.onlineUsers.push( data.user_id );
        this.run('Watch_status_change', this.onlineUsers);

        // logger.log(this, 'setUser On line', this.onlineUsers);
    }

    setOneUserOffline =(data)=> {
        if( !this.isUserOnline( data.user_id ) ) return;
        this.onlineUsers = this.onlineUsers.filter( userId => {
            return userId != data.user_id;
        });
        this.run('Watch_status_change', this.onlineUsers);

        // logger.log(this, 'setUser Off line', this.onlineUsers);
    }

}
