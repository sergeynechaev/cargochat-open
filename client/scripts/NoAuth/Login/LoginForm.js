var React = require('react/addons');

import {Api, xreq} from '../../api';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';
import {Events} from '../../Dispatcher';
import {Validation} from '../../Validation';

import {FormGroup} from '../../Controls/Forms/FormGroup';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputCheckbox} from '../../Controls/Forms/InputCheckbox';

import {LoginNotifySms, LoginNotify} from './LoginNotify';

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        isValidated: false,
        sms: false,
        sms_msg: null,
        err_msg: null
    }

    validateFields = {
        fields: [
            {name: "email", value: true},
            {name: "pass", value: true}
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

    onChangeHandler = (obj)=>{
        this.setState( obj );
        this.validateForm();
    }

    onClick = ()=>{
        let params = { email: this.state.email, passw: this.state.pass };
        if(this.state.smscode) params['smscode'] = this.state.smscode;

        this.xr = new xreq('user_login', params, (xr)=>{

            if (xr.res.err){
                logger.log(this, 'loginRequest', xr.res.msg, 'error');

                if(xr.res.msg == "invalid email or password"){
                    Events.run(Events.EV_SHOW_NOTIFY, {type: 'error', message: 'Неверная электронная почта или пароль'});
                    this.setState({ pass: null, isValidated: false });
                } else {
                    Events.run(Events.EV_SHOW_NOTIFY, {type: 'error', message: 'Неверный код из SMS'});
                    this.setState({ smscode: null, isValidated: false });
                }

                return;
            }

            if (xr.res.phone && xr.res.cooldown || xr.res.cooldown) {
                this.setState({ isValidated: false, sms: true, cooldown: xr.res.cooldown });
                this.validateFields.fields.push({name: "smscode", value: true});
                return;
            }

            if (xr.res.user_id && xr.res.sid) {
                let expires = this.state.remember ? 60 * 60 * 24 * 365 : 0;
                
                Api.sid = xr.res.sid;
                Utils.cookieSet('sid', Api.sid, {expires: expires});

                Api.user_id = xr.res.user_id;
                Utils.cookieSet('user_id', Api.user_id, {expires: expires});

                window.location.hash = "dashboard/company";
                return;
            }
        });
    }

    onKeyUp =(e)=> {
        if( e.keyCode === 13 ) this.onClick();
    }

    authDialog=(uri)=>{
        let w = 500, h = 350,
            t = window.screen.height / 2 - h / 2 - 100,
            l = window.screen.width / 2 - w / 2;
            
        window.open(uri, 'SignIn', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t);
    }

    authFacebook=()=>{
        Utils.cookieSet('remember', true, {expires: 0});
        let uri = 'https://www.facebook.com/dialog/oauth';
        let params = [
            'client_id=1593971670882893',
            'redirect_uri=http://localhost:8081/?provider=facebook' + '%23' + '/_=_',
            'response_type=code',
            'display=popup',
            'scope=email'
        ];
        this.authDialog(uri + '?' + params.join('&'));
    }
    
    authLinkedin=()=>{
        Utils.cookieSet('remember', true, {expires: 0});
        let uri = 'https://www.linkedin.com/uas/oauth2/authorization';
        let params = [
            'response_type=code',
            'client_id=7535z2f08cvusf',
            'redirect_uri=http://localhost:8081?provider=linkedin',  // не дает использовать #
            'state=' + Math.random(),
            'scope=r_basicprofile%20r_emailaddress'
        ];
        this.authDialog(uri + '?' + params.join('&'));
    }

    render = ()=>{
        let notify, 
            sms_group = this.state.sms ? <FormGroup name="Код из SMS" from="smscode"><InputSimple name="smscode" value={this.state.smscode} placeholder="Введите код" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/></FormGroup>: null;

        if(this.state.cooldown){
            notify = <LoginNotifySms cooldown={this.state.cooldown}/>
        }

        return(
            <div className="login-box animated fadeInUp">
                <div className="login-box__header">
                    <h1>Авторизация</h1>
                </div>
                {notify}
                <div className="login-box__form">
                    <FormGroup name="E-mail" from="email">
                        <InputSimple value={this.state.email} name="email" placeholder="Введите ваш email" onKeyUp={this.onKeyUp} onChange={this.onChangeHandler} disabled={this.state.sms} autoFocus={true}/>
                    </FormGroup>
                    <FormGroup name="Пароль" from="pass">
                        <InputSimple value={this.state.pass} className="login-box__pass" name="pass" type="password" placeholder="Введите ваш пароль" onKeyUp={this.onKeyUp} onChange={this.onChangeHandler} disabled={this.state.sms}/>
                        <a href="#/login/forgot" className="login-box__forgot-pass">Напомнить?</a>
                    </FormGroup>
                    {sms_group}
                    <ButtonSimple onClick={this.onClick} caption="Войти" brand="success" disabled={!this.state.isValidated}/>
                </div>
                <div className="login-box__social btn-group">
                    <ButtonSimple caption="Facebook" className="btn-social-facebook" onClick={this.authFacebook}/>
                    <ButtonSimple caption="Linkedin" className="btn-social-linkedin" onClick={this.authLinkedin}/>
                </div>
            </div>
        )
    }
}