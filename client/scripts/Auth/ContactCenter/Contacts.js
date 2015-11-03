var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import Contacts__User from './Contacts__User.js';
import Contacts__Chat from './Contacts__Chat.js';

export default class Contacts extends React.Component {

	constructor( props ) {
        super( props );

        // что показываем - контакты или чаты
        this.type = null;
    }

    state = {
        data: [],
        modalRemoveContact: {
            isOpen: false,
            first_name: null,
            last_name: null,
            id: null
        },
        isShowActions: false,
        actionUserId: null,
        isLoading: true,
    }

    _setContext( props ) {
        this.type = props.filter;
    }

    _subs( action ) {
        AppState.myChats[action]( "Chats_getlist_complete", this.updateData );
        AppState.myChats[action]( "Chats_update", this.updateData );
        AppState.myContacts[action]( "Contacts_getlist_complete", this.updateContactsList );
        AppState.myWatch[action]( "Watch_status_change", this.onWatchStatusChange );
    }

    _getData() {
        if(AppState.myChats.isReady) this.setState({ data: AppState.myChats.getAllChats(), isLoading: false });
    }

    componentWillMount =()=> {
        // logger.log(this, 'will mount cc-chats');
        this._setContext( this.props );
    }

    componentDidMount = ()=>{
        // logger.log(this, 'did mount cc-chats');
        this._subs( 'on' );
        this._getData();
    }

    componentWillUnmount = ()=>{
        // logger.log(this, 'unmount cc-chats'); 
        this._subs( 'rem' );
    }

    componentWillReceiveProps =(nextProps)=> {
        // logger.log(this, 'receive props cc-chats');
        this._setContext( nextProps );
        this._subs( 'rem' );
        this._subs( 'on' );
        this._getData();
    }

    onWatchStatusChange =(data)=> {
        this.forceUpdate();
        // this.setState({ onlineUsers: data });
        logger.log(this, 'onWatchStatusChange', this, data);
    }

    updateData =(data)=> {
        logger.log(this, 'updateChatsList', this);

        this.setState({ data: data, isLoading: false });
    }

    updateContactsList =(contacts)=> {
        // logger.log(this, 'updateContactsList', this);
        AppState.myChats.getChatsList();
    }

    removeContact = () =>{
        AppState.myContacts.removeContact(this.state.modalRemoveContact.id);
        this.closeModalRemoveContact();
    }

    closeModalRemoveContact = () =>{
        this.setState({
            modalRemoveContact: { isOpen: false, first_name: null, last_name: null, id: null }
        })
    }

    openModalRemoveContact = (first_name, last_name, id) => {
        if(!id) return;
        this.setState({
            modalRemoveContact: { isOpen: true, first_name: first_name, last_name: last_name, id: id }
        }); 
    }

    // contactOnMouseLeave =(e)=> {
    //     this.setState({isShowActions: false, actionUserId: null});
    // }

    // contactOnMouseEnter =(e)=> {
    //     this.setState({isShowActions: true, actionUserId: e.target.dataset.userId});
    // }

    render = ()=> {

        let style = { height: this.props.height+"px" };
        let data = (this.type == "all") ? this.state.data : this.state.data.filter( chat => chat.in_contact == true );

        if( this.state.isLoading ) return <div className="not_found">Загрузка...</div>
        if( !(data || []).length ) return <div className="not_found">Список пуст</div>

        // поиск
        let searchString = this.props.searchString.trim().toLowerCase();
        if( searchString.length ){
            data = data.filter( contact => {
                return ( contact.first_name.toLowerCase().match( searchString ) 
                         || contact.last_name.toLowerCase().match( searchString )
                         || contact.comp_name.toLowerCase().match( searchString )
                      )
            });
        }

        let dataList = [];

        // список контактов
        if( this.type == "my" ) {
            data.forEach((contact, i) => {
                dataList.push(<Contacts__User key={i} user={contact} onModalOpen={this.openModalRemoveContact} showActions={true} />)
            });

        // список всех чатов + контактов
        } else {
            data.forEach((contact, i) => { 
                dataList.push(<Contacts__Chat key={i} user={contact} />) 
            });
        }

        if( !dataList.length ) dataList.push(<div className="not_found" key={1}>Не найдено.</div>);
       
        return (
        	<div>
                {dataList}
                <ModalWindow isOpen={this.state.modalRemoveContact.isOpen} 
                             onClose={this.closeModalRemoveContact} 
                             title="Удаление контакта">
                         <div className="modal-container__body">
                            <div>Вы действительно хотите удалить <b>"{this.state.modalRemoveContact.first_name} {this.state.modalRemoveContact.last_name}"</b> из ваших контактов?</div>
                            <div className="modal-container__footer">
                                <ButtonSimple brand="danger" onClick={this.removeContact} caption="Удалить"/>
                            </div>
                         </div>
                </ModalWindow>
        	</div>
        )
    }
    
}


// <ModalWindow isOpen={this.state.modalRemoveContact.isOpen} onClose={this.closeModalRemoveContact} title="Удаление контакта" width={350}>
//                     <div>Вы действительно хотите удалить <b>"{this.state.modalRemoveContact.first_name} {this.state.modalRemoveContact.last_name}"</b> из ваших контактов?</div>
//                     <div className="box-row-nw just-end marg-t">
//                         <TransparentButton onClick={this.removeContact} caption="Удалить"/>
//                         <TransparentButton onClick={this.closeModalRemoveContact} caption="Отменить"/>
//                     </div>
//                 </ModalWindow>

