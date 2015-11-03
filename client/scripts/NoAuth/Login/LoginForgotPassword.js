var React = require('react/addons');

import {xreq} from '../../api';
import {logger} from '../../Classes/Logger';
import {Events} from '../../Dispatcher';
import {Validation} from '../../Validation';

import {Loading} from '../../Controls/Loading';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {LoginNotifySms, LoginNotify} from './LoginNotify';

export class LoginForgotPassword extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        notify: null,
        isValidated: false
    }

    validateFields = {
        fields: [
            {name: "email", value: true}
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

    componentDidMount = ()=>{
        if(this.props.query.token){
            this.userPasswRecovery({token: this.props.query.token});
        }
    }

    userPasswRecovery = (params)=>{
        if(!params){
            Events.run(Events.EV_SHOW_NOTIFY, {type:"error", message: "Неверные данные"});
            return;
        }
    
        new xreq('user_passw_recovery', params, (xr)=>{
            if(xr.res.err){
                let message;
                
                switch(xr.res.msg){
                    case "invalid token":
                        message = {type: 'error', message: 'Недействительный токен'};
                    break;
                    case "invalid email":
                        message = {type: 'error', message: 'Недействительный E-mail'};
                        this.setState({email: null, isValidated: false});
                    break;
                    case "invalid smscode":
                        message = {type: 'error', message: 'Неверный код из SMS'};
                        this.setState({smscode: null, smscode_repeat: null, isValidated: false});
                    break;
                    default:
                        this.setState({notify: xr.res.msg});
                    break;
                }

                if(message) Events.run(Events.EV_SHOW_NOTIFY, message);
                return;
            }

            if(xr.res.token_ttl){
                this.setState({ notify: "token", token_ttl: xr.res.token_ttl, isValidated: false });
                return;
            }

            if(xr.res.cooldown && xr.res.phone){
                this.validateFields.fields = [{name: "smscode", value: true}, {name: "passw", value: true}, {name: "passw_repeat", value: true}];

                this.setState({ 
                    notify: "sms", 
                    cooldown: xr.res.cooldown,
                    phone: xr.res.phone,
                    smscode_ttl: xr.res.smscode_ttl,
                    isValidated: false 
                });
                return;
            }

            if(xr.res.cooldown){
                this.validateFields.fields = [
                    {name: "smscode", value: true},
                    {name: "passw", value: true},
                    {name: "passw_repeat", value: true}
                ];

                this.setState({ notify: "sms", cooldown: xr.res.cooldown });
                return;
            }
                
            this.setState({ notify: "ok" });
        });
    }

    onClick = ()=>{
        this.userPasswRecovery({email: this.state.email});
    }

    onChangePassword = ()=>{
        if(this.state.passw != this.state.passw_repeat){
            Events.run(Events.EV_SHOW_NOTIFY, {type: 'error', message: 'Пароли не совпадают'});
            this.setState({ passw_repeat: null });
            return;
        }
        this.userPasswRecovery({smscode: this.state.smscode, token: this.props.query.token, passw: this.state.passw });    
    }

    render = ()=>{
        let notify, content;

        if(this.state.notify == "token"){
            notify =    <LoginNotify type="info">
                            <p>На E-mail, указанный при регистрации, было отправлено сообщение с дальнейшей инструкцией.</p>
                            <span>Инструкция будет доступна в течение {this.state.token_ttl/60} мин.</span>
                        </LoginNotify>
        }

        if(this.state.notify == "sms"){
            notify =    <LoginNotifySms phone={this.state.phone} cooldown={this.state.cooldown} ttl={this.state.smscode_ttl}/>
            content =   <div className="login-box__form">
                            <FormGroup name="Код из SMS" from="smscode">
                                <InputSimple value={this.state.smscode} name="smscode" placeholder="Введите код" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                            </FormGroup>
                            <FormGroup name="Новый пароль" from="passw">
                                <InputSimple value={this.state.passw} name="passw" type="password" placeholder="Введите новый пароль" onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <FormGroup name="Повторите пароль" from="passw_repeat">
                                <InputSimple value={this.state.passw_repeat} name="passw_repeat" type="password" placeholder="Повторите пароль" onChange={this.onChangeHandler}/>
                            </FormGroup>
                            <ButtonSimple onClick={this.onChangePassword} caption="Изменить" brand="success" disabled={!this.state.isValidated}/>
                        </div>;
        } 

        if(this.state.notify == "ok"){
            notify =    <LoginNotify type="info">
                            <p>Пароль успешно изменен.</p>
                        </LoginNotify>;
            content =   <div className="login-box__form"></div>;            
        }


        return(
            <div className="page-login">
                <div className="login-box animated fadeInUp">
                    <div className="login-box__header">
                        <h1>Восстановление пароля</h1>
                    </div>
                    {notify}
                    {content ? content : 
                        <div className="login-box__form">
                            <FormGroup name="E-mail" from="email">
                                <InputSimple value={this.state.email} name="email" placeholder="Введите email, указанный при создании аккаунта." onChange={this.onChangeHandler} disabled={this.state.token_ttl}/>
                            </FormGroup>
                            <ButtonSimple onClick={this.onClick} caption="Отправить" brand="success" disabled={!this.state.isValidated}/>
                        </div>
                    }
                    <div className="login-box__footer">
                        <a href="#/login">Вернуться</a>
                    </div>
                </div>
            </div>
        )
    }
}