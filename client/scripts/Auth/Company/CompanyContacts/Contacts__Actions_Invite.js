var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Validation} from '../../../Validation';
import {Events} from '../../../Dispatcher';

import {ModalWindow} from '../../../Controls/ModalWindow';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';

import {logger} from '../../../Classes/Logger';

export default class Contacts__Actions_Invite extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    state = {
        isModalOpen: false
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    onChangeHandler = (obj)=>{
        this.setState(obj);
        this.validateForm();
    }

    saveForm = ()=> {
        let message = {};

        if(this.state){
            AppState.myCompany.userInviteSend(this.state);
        } else {
            message = { 
                message: "Ошибка при приглашение сотрудника в компанию: поля e-mail и должность обязательны для заполнения", 
                type: "error" 
            }
        }
        
        this.closeModal();
        Events.run(Events.EV_SHOW_NOTIFY, message);
    }

    validateFields = {
        fields: [
            {name: "email", value: false},
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
            <div className="box-row-nw">
                <ButtonSimple onClick={this.openModal} caption="Пригласить пользователя" brand="primary"/>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Пригласить нового пользователя">
                    <div className="modal-container__body">
                        <FormGroup name="E-mail" from="email">
                            <InputSimple name="email" onChange={this.onChangeHandler} validation={{typing:Validation.typingEmail}}/>
                        </FormGroup>
                        <FormGroup name="Фамилия" from="last_name">
                            <InputSimple name="last_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Имя" from="first_name">
                            <InputSimple name="first_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Отчество" from="pat_name">
                            <InputSimple name="pat_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Должность" from="position">
                            <InputSimple name="position" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Телефон" from="phone">
                            <InputSimple name="phone" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption="Пригласить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}