import React from 'react/addons';
import reactMixin from 'react-mixin';

import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';
import {AppState} from '../../../Auth/Dashboard';
import {logger} from '../../../Classes/Logger';

import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';

export default class A_Companies__Invite extends React.Component {
	
    state = {
        last_name: '',
        first_name: '',
        pat_name: '',
        email: '',
        phone: '',
    }

    componentWillReceiveProps =(nextProps)=> {
        if( this.props.context.inn != nextProps.context.inn ) {
            this.initForm();
        }
    }

    initForm =()=> {
        this.setState({
            last_name: '',
            first_name: '',
            pat_name: '',
            email: '',
            phone: '',
        });
    }

    sendInvite =()=> {

        let params = this.state;
        params.comp_id = this.props.context.comp_id;

        logger.log('sendInvite', this, params);
        
        Api.compInviteCreate(params).then(res=> {
            if (res.err) {
                Events.runError('Не удалось отправить приглашение: ' + res.msg);
                logger.log('Error sending invite', this, res.msg, 'error');
            } else {
                Events.runInfo('Приглашение отправлено на e-mail ' + params.email);
            }
        });

        if( this.props.onClose ) this.props.onClose();
    }

    isFilled =()=> {
        return Object.keys(this.state).every( key => this.state[key] !== '' );
    }

    render = ()=> {

        // logger.log('render A_Companies__Invite', this, this.props.context);

        return (
            <div className="modal-container__body">
                <div>Приглашение пользователя в качестве владельца компании:</div>
                <div className="padd-bottom"><span className="strong">{this.props.context.name}</span>, ИНН: {this.props.context.inn}</div>
                <FormGroup name="Фамилия" from="last_name">
                    <InputSimple valueLink={this.linkState('last_name')} name="last_name"/>
                </FormGroup>
                <FormGroup name="Имя" from="first_name">
                    <InputSimple valueLink={this.linkState('first_name')} name="first_name"/>
                </FormGroup>
                <FormGroup name="Отчество" from="pat_name">
                    <InputSimple valueLink={this.linkState('pat_name')} name="pat_name"/>
                </FormGroup>
                <FormGroup name="E-mail" from="email">
                    <InputSimple valueLink={this.linkState('email')} name="email"/>
                </FormGroup>
                <FormGroup name="Телефон" from="phone">
                    <InputSimple valueLink={this.linkState('phone')} name="phone"/>
                </FormGroup>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.sendInvite} disabled={!this.isFilled()} brand="success" caption="Отправить"/>
                </div>
            </div>
        )
    } 
}

reactMixin.onClass(A_Companies__Invite, React.addons.LinkedStateMixin);
