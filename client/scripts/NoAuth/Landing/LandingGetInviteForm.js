var React = require('react/addons');

import {Api} from '../../api';
import {Validation} from '../../Validation';
import {logger} from '../../Classes/Logger';
import {Events} from './../../Dispatcher';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {SettingsBlock} from '../../Controls/SettingsBlock';
import {InputCompanys} from '../../Controls/Forms/InputCompanys';

export class LandingGetInviteForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
    	isValidated: false,
        flags: 0
    }

    onChangeHandler = (obj)=>{
		this.setState(obj);
        this.validateForm();
    }

    onChangeHandlerFlags = (flags)=>{
        this.setState({ flags: flags });
        this.validateForm();
    }

    validateFields = {
        fields: [
            {name: "email", value: true},
            {name: "comp_id", value: true},
            {name: "name", value: true},
            {name: "phone", value: true},
            {name: "flags", value: true}
        ]
    }

    validateForm =()=> {
        this.validateFields.fields.forEach( field => {
            if( this.state[field.name] && this.state[field.name].length || this.state[field.name] && this.state[field.name] != 0) {
                field.value = true;
            } else {
                field.value = false;
            }
        });

        this.setState( { isValidated: this.isValidated() } );
    }

    isValidated = ()=> {
        return this.validateFields.fields.every( field => field.value === true );
    }
    
    clearForm = ()=>{
    	this.validateFields.fields.forEach( field => {
			if(this.state[field.name]){
				this.state[field.name] = null;
			}
    	});

    	this.state.isValidated = false;
    }

    saveForm = ()=>{
		let params= {
            email: 	    this.state.email,
            name: 	    this.state.name,
            phone: 	    this.state.phone,
            comp_id:    this.state.comp_id,
            flags:      this.state.flags
        }, message = {};

        Api.lead_reg(params).then(res=>{
        	if(res){
    			if (res.err) {
            		logger.log(this, 'lead_reg', res.msg, 'error');
            		message = { message: res.msg,  type: "error" };
				} else {
					message = { message: `Запрос на получение приглашения принят`, type: "info" };
					this.clearForm();
					this.props.onClose();
				}
        	}

			Events.run(Events.EV_SHOW_NOTIFY, message);
        });
    }

    render = ()=>{
    	return(
			<div className="modal-container__body">
                <FormGroup name="E-mail" from="email">
                    <InputSimple value={this.state.email} name="email" onChange={this.onChangeHandler} validation={{typing:Validation.typingEmail}}/>
                </FormGroup>
                <FormGroup name="Ф.И.О." from="name">
                    <InputSimple value={this.state.name} name="name" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Номер телефона" from="phone">
                    <InputSimple value={this.state.phone} name="phone" onChange={this.onChangeHandler} validation={{typing:Validation.typingPhone}}/>
                </FormGroup>
                <FormGroup name="Поиск компании" from="company">
                    <InputCompanys name="comp_id" onChange={this.onChangeHandler} active={true}/>
                </FormGroup>
                <FormGroup name="Тип компании" from="type">
                    <SettingsBlock  name="company-type" type="checkbox" flags={this.state.flags} 
                                    change={this.onChangeHandlerFlags}
                                    choice={[
                                        {id: 0x01, value: 'Экспедитор'},
                                        {id: 0x02, value: 'Грузовладелец'},
                                        {id: 0x04, value: 'Перевозчик'}
                                    ]}
                    />
                </FormGroup>

                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption="Отправить"/>
                </div>
            </div>
    	)
    }
}