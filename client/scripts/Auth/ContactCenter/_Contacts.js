// 
// backup
// 
// старая версия с разделением чатов на сообщения и контакты
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'

import {Icon} from '../../SimpleComponents/Icons.js';
import {Loading} from '../../SimpleComponents/Loading';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import Hint from '../../SimpleComponents/Hint.js';

import Contacts__User from './Contacts__User.js';
import Contacts__Chat from './Contacts__Chat.js';

export default class Contacts extends React.Component {

	constructor( props ) {
        super( props );

        // что показываем - контакты или чаты
        this.type = null;
    }

    state = {
        chats: [],
        contacts: [],
        modalRemoveContact: {
            isOpen: false,
            first_name: null,
            last_name: null,
            id: null
        },
        isShowActions: false,
        actionUserId: null,
        onlineUsers: [],
        isLoading: true,
    };

    _setContext( props ) {
        this.type = props.filter;
    }

    // подписки в зависимости от типа контакты/чат
    _subs( action, onEvents=false ) {
        switch( this.type ) {
            case 'my':
                AppState.myContacts[action]( "Contacts_getlist_complete", this.updateContactsList );
                // AppState.myContacts[action]( "Contacts_update", this.updateContactsList );
            break;
            case 'all':
                AppState.myChats[action]( "Chats_getlist_complete", this.updateChatsList );
                AppState.myChats[action]( "Chats_update", this.updateChatsList );
            break;
        }

        // общие подписки - пока отключены

        if( onEvents ) {
            // подписываемся на обновление статусов юзеров в контактах
            Events[action]( Events.EV_WEBSOCKET_REG, AppState.myContacts.startWatchUsers );
            
            // после подписки получаем список всех юзеров онлайн
            Events[action]( Events.EV_WATCH_USERS_INIT, this.watchUsersInit );
            
            // далее по измению статуса на каждого юзера будет событие
            Events[action]( Events.EV_USER_ONLINE, this.setUserOnline );
            Events[action]( Events.EV_USER_OFFLINE, this.setUserOffline );
        }
    }

    _getData() {
        switch( this.type ) {
            case 'my':
                AppState.myContacts.getContactsList();
            break;
            case 'all':
                if(AppState.myChats.isReady) {
                    this.setState({ chats: AppState.myChats.getAllChats(), isLoading: false });
                }
            break;
        }
    }

    componentWillMount =()=> {
        // logger.log(this, 'will mount cc-chats');
        this._setContext( this.props );
    }

    componentDidMount = ()=>{
        // logger.log(this, 'did mount cc-chats');
        this._subs( 'on', true );
        this._getData();
    }

    componentWillUnmount = ()=>{
        // logger.log(this, 'unmount cc-chats'); 
        this._subs( 'rem', true );
    }

    componentWillReceiveProps =(nextProps)=> {
        // logger.log(this, 'receive props cc-chats');
        this._setContext( nextProps );
        this._subs( 'rem' );
        this._subs( 'on' );
        this._getData();
    }

    watchUsersInit =(data)=> {
        AppState.myContacts.watchUsersInit( data );
        this.setState({ onlineUsers: AppState.myContacts.onlineUsers });
        logger.log(this, 'watchUsersInit', data);
    }

    setUserOnline =(data)=> {
        AppState.myContacts.setUserOnline( data );
        this.setState({ onlineUsers: AppState.myContacts.onlineUsers });
        logger.log(this, 'setUserOnline', data);
    }

    setUserOffline =(data)=> {
        AppState.myContacts.setUserOffline( data );
        this.setState({ onlineUsers: AppState.myContacts.onlineUsers });
        logger.log(this, 'setUserOffline', data);
    }

    updateChatsList =(chats)=> {
        // logger.log(this, 'updateChatsList', this);
        this.setState({ chats: chats, isLoading: false });
    }

    updateContactsList =(contacts)=> {
        // logger.log(this, 'updateContactsList', this);
        this.setState({ contacts: contacts, isLoading: false });
    }

    removeContact = () =>{
        AppState.myContacts.removeContact(this.state.modalRemoveContact.id);
        this.closeModalRemoveContact();
    };

    closeModalRemoveContact = () =>{
        this.setState({
            modalRemoveContact: { isOpen: false, first_name: null, last_name: null, id: null }
        })
    };

    openModalRemoveContact = (first_name, last_name, id) => {
        if(!id) return;
        this.setState({
            modalRemoveContact: { isOpen: true, first_name: first_name, last_name: last_name, id: id }
        }); 
    };

    contactOnMouseLeave =(e)=> {
        this.setState({isShowActions: false, actionUserId: null});
    }

    contactOnMouseEnter =(e)=> {
        this.setState({isShowActions: true, actionUserId: e.target.dataset.userId});
    }

    render = ()=> {

        let style = { height: this.props.height+"px" };
        let data = [];

        // TODO: потом надо заменить на получение списка
        // приватов, если выбран чат
        if( this.type == "my" ) {
            // data = AppState.myContacts.getData();
            data = this.state.contacts;
        } else if( this.type == "all" ) {
            // data = AppState.myChats.getAllChats();
            data = this.state.chats;
        }

        if( this.state.isLoading ) {
            return <div className="not_found">Загрузка...</div>
        }

        if( !(data || []).length ) {
            return <div className="not_found">Список пуст</div>
        }

        // поиск
        let searchString = this.props.searchString.trim().toLowerCase();
        if( searchString.length ){
            data = data.filter( contact => {
                return ( contact.first_name.toLowerCase().match( searchString ) 
                         || contact.first_name.toLowerCase().match( searchString )
                         || contact.comp_name.toLowerCase().match( searchString )
                      )
            });
        }

        let dataList = [];

        // список контактов
        if( this.type == "my" ) {
            data.forEach((contact, i) => {
                    let userStatusClass = (AppState.myContacts.isUserOnline(contact.user_id) ) ? "contacts__contact-status-icon-active" 
                                            : "contacts__contact-status-icon" ;
                    dataList.push(
                        <div key={i} className="contacts__contact" 
                                     data-user-id={contact.user_id} 
                                     onMouseEnter={this.contactOnMouseEnter} 
                                     onMouseLeave={this.contactOnMouseLeave}>
                            <Contacts__User status={userStatusClass} 
                                            firstName={contact.first_name} 
                                            lastName={contact.last_name} 
                                            compName={contact.comp_name} />
                            {this.state.isShowActions && this.state.actionUserId == contact.user_id ?
                                <div className="contacts__contact-actions">
                                    <div className="pagin-pls" onClick={this.openModalRemoveContact.bind(this, contact.first_name, contact.last_name, contact.user_id)}>
                                        <Icon iconName="close-circle-icon" size={18} />
                                    </div>
                                </div>
                            : null }
                        </div>
                    )
                });

        // список чатов
        } else if( this.type == "all" ) {
            data.forEach((contact, i) => {
                    let userStatusClass = (AppState.myContacts.isUserOnline(contact.user_id) ) ? "contacts__contact-status-icon-active" 
                                            : "contacts__contact-status-icon" ;
                    dataList.push(
                            <Contacts__Chat key={i}
                                            id={contact.id}
                                            status={userStatusClass} 
                                            firstName={contact.first_name} 
                                            lastName={contact.last_name} 
                                            compName={contact.comp_name}
                                            inContact={contact.in_contact}
                                            unreaded={contact.unreaded ? contact.unreaded : null} />
                    )
                });

        } else {
            dataList.push( <div className="not_found">Нет данных</div> );
        }

        if( !dataList.length ) {
            dataList.push(
                    <div className="not_found" key={1}>Не найдено.</div>
                );
        }
       
        return (
        	<div className="contacts" style={style}>
                {dataList}
                <ModalWindow isOpen={this.state.modalRemoveContact.isOpen} onClose={this.state.closeModalRemoveContact} title="Удаление контакта" width={350}>
                    <div>Вы действительно хотите удалить <b>"{this.state.modalRemoveContact.first_name} {this.state.modalRemoveContact.last_name}"</b> из ваших контактов?</div>
                    <div className="box-row-nw just-end marg-t">
                        <TransparentButton onClick={this.removeContact} caption="Удалить"/>
                        <TransparentButton onClick={this.closeModalRemoveContact} caption="Отменить"/>
                    </div>
                </ModalWindow>
        	</div>
        )
    };
    
}