var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';

import {Icon} from '../../../Controls/Icon.js';
import {ModalWindow} from '../../../Controls/ModalWindow';

import ContactsDataTable__Perms from './ContactsDataTable__Perms.js';
import ContactsDataTable__Position from './ContactsDataTable__Position.js';

export default class ContactsDataTable__Cell_Actions extends React.Component {

	constructor( props ) {
        super( props );
    }

    state = {
        isOpenDropDown: false,
        isOpenModalPosition: false,
        isOpenModalPerms: false
    }

    toggleDropDown = ()=>{
        this.setState({ isOpenDropDown: !this.state.isOpenDropDown });
    }

    closeModalPosition = ()=> {
        this.setState( {isOpenModalPosition: false} );
    }

    openModalPosition = ()=> {
        this.setState( {isOpenModalPosition: true, isOpenDropDown: false} );
    }

    closeModalPerms = ()=> {
        this.setState( {isOpenModalPerms: false} );
    }

    openModalPerms = ()=> {
        this.setState( {isOpenModalPerms: true, isOpenDropDown: false} );
    }

    render = ()=>{

        console.log('COMP_FLAG', AppState.user.state.comp_flags, AppState.user.state.id);
        let dropdown;

        if(this.state.isOpenDropDown){
            dropdown =  <div className="dropdown dropdown--arrow dropdown--open">
                            <div className="menu">
                                {Utils.checkFlags(AppState.user.state.comp_flags) ? <a className="menu__item" onClick={this.openModalPosition}><Icon name="edit" size={18}/> Изменить должность</a> : null}
                                {Utils.checkFlags(AppState.user.state.comp_flags, 2) ? <a className="menu__item" onClick={this.openModalPerms}><Icon name="settings" size={18}/> Настроить права</a> : null}
                            </div>
                        </div>
        }

        return(
            <div className="cell-actions">
                <div className="cell-actions__trigger">
                    <div className="cell-actions__icon" onClick={this.toggleDropDown}><Icon name="move-vert"/></div>
                    {dropdown}
                </div>

                <ModalWindow isOpen={this.state.isOpenModalPerms} onClose={this.closeModalPerms} width={355} title="Изменение прав сотрудника">
                    <ContactsDataTable__Perms data={this.props.obj} onClose={this.closeModalPerms}/>
                </ModalWindow>

                <ModalWindow isOpen={this.state.isOpenModalPosition} onClose={this.closeModalPosition} width={350} title="Изменение должности сотрудника">
                    <ContactsDataTable__Position data={this.props.obj} onClose={this.closeModalPosition}/>
                </ModalWindow>
            </div>
        )
    }

}