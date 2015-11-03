var React = require('react/addons');

import {Events, Dictionary} from '../../../Dispatcher';
import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';
import {logger} from '../../../Classes/Logger';

import {Icon} from '../../../Controls/Icon';
import {ModalWindow} from '../../../Controls/ModalWindow';
import {FormGroup} from '../../../Controls/Forms/FormGroup';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';

export default class ContactsDataTable__Position extends React.Component {

	constructor( props ) {
        super( props );
    }

    state = {
    	isModalEditPositionOpen: false,
        position: this.props.data.position
    }

    closeModal = ()=> {
        this.setState( {isModalEditPositionOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalEditPositionOpen: true} );
    }

    editUserPosition = ()=>{
        AppState.myCompany.userPositionChange({user_id: this.props.data.uid, position: this.state.position});
		this.props.onClose();
    }

    onChangeHandler = (obj)=>{
		this.setState(obj);
        this.validateForm();
    }

    validateFields = {
        fields: [
            {name: "position", value: false}
        ]
    }

    validateForm =()=> {
        this.validateFields.fields.forEach( field => {
            if( this.state[field.name] && this.state[field.name].length ) {
                field.value = true;
            } else {
                field.value = false;
            }
        });
        this.setState( { isValidated: this.isValidated() } );
    }

    isValidated =()=> {
        return this.validateFields.fields.every( field => field.value === true );
    }

    render = ()=> {
    	return(
           <div className="modal-container__body">
                <FormGroup name="Должность" from="position">
                    <InputSimple name="position" onChange={this.onChangeHandler} value={this.state.position}/>
                </FormGroup>

                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.editUserPosition} disabled={!this.state.isValidated} brand="success" caption="Изменить"/>
                </div>
            </div>
        )
    }
}