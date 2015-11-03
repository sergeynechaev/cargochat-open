import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class NotificationsController extends Controller {

    constructor() {
        super();

		this.events = [];
        this.serial = 2000;
    }

    getEvents =()=> {
        // нужно вернуть новый массив, а не ссылку на this.events
        // для корректной работы shouldComponentUpdate
        let ev = this.events.concat();
        return ev;
    }

    addEvent =(event)=> {
        // let ev = this.events.concat();
        // ev.push( {id: this.serial++, event: event} );
        // this.events = ev;
        
        this.events.unshift( {id: this.serial++, event: event} );

        // logger.log('NCC - addEvent', this, this.events);
    }

    removeById =(id)=> {
        let ev = this.events.concat();
        ev = ev.filter( e => e.id != id );
        this.events = ev;
        // this.events.some( (e, i) => {
        //     if( e.id == id ) {
        //         delete this.events[i];
        //         return true;
        //     }
        // });
    }

    // удаляем все ивенты по указанному фильтру
    // фильтр = поле объекта в this.event
    removeByFilter =(filter, condition = 'eq', value)=> {
        let ev = this.events.concat();
        switch( condition ) {
            case 'eq':
                ev = ev.filter( e => e.event[filter] && e.event[filter] != value );
            break;
            case 'lt':
                ev = ev.filter( e => e.event[filter] && e.event[filter] > value );
            break;
            case 'gt':
                ev = ev.filter( e => e.event[filter] && e.event[filter] < value );
            break;
        }
        this.events = ev;
    }

    clearAll =()=> {
        this.events = [];
    }

    countEvents =()=> {
        return (this.events || []).length;
    }

    // непрочитанные по юзеру
    getMessagesByUser =(id, count = 3)=> {
        let messages = this.events.filter( e => e.event.user_id == id ) || [];
        return {
            total: messages.length,
            rest: messages.length-count > 0 ? messages.length-count : 0,
            events: messages.slice( 0, count ),
        };
    }

    // все юзеры, от которых есть непрочитанные
    getMessageUsers =()=> {
        let users = this.events.map( e => e.event.user_id );
        return users.filter( (el, i, arr) => i == arr.lastIndexOf(el) );    // только уникальные id
    }


    //  
    //  TODO: сохранять и восстанавливать состояние в другом окне браузера
    //  
    _serialize =()=> {

    }

    _restore =()=> {

    }

    _save =()=> {

    }

    _load =()=> {

    }

}