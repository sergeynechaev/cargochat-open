var React = require('react/addons');

import {Events, Dictionary} from '../../../Dispatcher';
import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';
import {logger} from '../../../Classes/Logger';
import {Icon} from '../../../Controls/Icon';

import {ModalWindow} from '../../../Controls/ModalWindow';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';


import {SettingsBlock} from '../../../Controls/SettingsBlock';

export default class ContactsDataTable__Perms extends React.Component {

	constructor( props ) {
        super( props );
        this.start = this.props.data.cflg;
    }

    state = {
    	perms: this.props.data.cflg
    }

    cancelChanges = ()=> {
        this.setState({ perms: this.start });
    }

 	onChangeHandler = (perm)=>{
		this.setState({ perms: perm });
    }

    componentWillReceiveProps = (nextProps)=>{
        this.start = nextProps.data.cflg;
    }

    saveModal = ()=>{
        console.log(this.props.data.uid);
    	AppState.myCompany.userPermsChange(this.state.perms, this.props.data.uid);
    	this.props.onClose();
    }

    render = ()=> {
		return(
            <div className="modal-container__body">
               <SettingsBlock   name="show-my-profile" type="checkbox" 
                                flags={this.state.perms} change={this.onChangeHandler} 
                                choice={AppState.myCompany.perms_list}/>

                <div className="modal-container__footer">
                    <ButtonSimple caption="Изменить" brand="success" onClick={this.saveModal} disabled={this.start === this.state.perms || this.state.perms === 0}/>
                    <ButtonSimple brand="danger" onClick={this.cancelChanges} disabled={this.start === this.state.perms} caption="Отменить"/>
                </div>
            </div>
        )
    }
}