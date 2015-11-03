var React = require('react/addons');

import {Events, Error} from '../Dispatcher';
import {AppState} from '../Auth/Dashboard';
import {logger} from '../Classes/Logger.js'

import {TblCellPerms} from '../SimpleComponents/TableCells';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox
} from '../SimpleComponents/SimpleTable2';

import {Icon} from '../SimpleComponents/Icons';
import {ModalWindow} from '../SimpleComponents/ModalWindow';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import Hint from '../SimpleComponents/Hint.js';


class TblCellActions extends React.Component {

    state = {
        modalRemoveContact: {
            isOpen: false,
            first_name: null,
            last_name: null,
            id: null
        },
    };

    // componentWillReceiveProps = ()=> {
    //     this.forceUpdate();
    // };

    sendMessage=()=>{
        logger.log('Not realized yet.')
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

    render = ()=> {
        return (
            <div className="box-row-nw">
                <div className="pagin-pls" onClick={this.sendMessage}>
                    <Icon iconName="mail-icon" size={20}/>
                </div>
                <div className="pagin-pls" onClick={this.openModalRemoveContact.bind(this, this.props.obj.first_name, this.props.obj.last_name, this.props.obj.user_id)}>
                    <Icon iconName="close-circle-icon" size={20}/>
                </div>
                <ModalWindow isOpen={this.state.modalRemoveContact.isOpen} onClose={this.state.closeModalRemoveContact} title="Удаление контакта" width={350}>
                    <div>Вы действительно хотите удалить <b>"{this.state.modalRemoveContact.first_name} {this.state.modalRemoveContact.last_name}"</b> из ваших контактов?</div>
                    <div className="box-row-nw just-end marg-t">
                        <TransparentButton onClick={this.removeContact} caption="Удалить"/>
                        <TransparentButton onClick={this.closeModalRemoveContact} caption="Отменить"/>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}



class MyContacts extends React.Component {
    state={
        contactList:[]
    };
    updateList=(list)=>{
        this.setState({contactList:list})
    };

    getList=()=>{
        // this.state.contactList=AppState.myContactList.getList();
        if( AppState.myContacts.isReady ) {
            this.state.contactList = AppState.myContacts.getData();
        }
    };
    componentWillMount=()=>{
        AppState.myContacts.on( "Contacts_getlist_complete", this.updateList );
        this.getList();
        // AppState.myContactList.on("get_list", this.updateList)
    };
    componentWillUnmount=()=>{
        AppState.myContacts.rem( "Contacts_getlist_complete", this.updateList );
        // AppState.myContactList.rem("get_list", this.updateList)
    };

    render = ()=> {
        this.opt = {
            // хедер
            headerClass: TblHead,
            headData: [
                {id: 'first_name', title: 'Имя'},
                {id: 'last_name',  title: 'Фамилия'},
                {id: 'comp_name',        title: 'Компания'},
                {id: 'user_id', title: 'Действия', cellClass: TblCellActions}
            ],
            // контент
            bodyClass: TblBody,

            bodyData: this.state.contactList
        };

        return (
            <div className='col-large'>
                <SimpleTable2 opt={this.opt} />
            </div>
        )
    }
}

export {MyContacts}


