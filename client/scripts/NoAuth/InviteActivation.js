var React = require('react/addons');
var Router = require('react-router');
import {Api, xreq} from '../api';
import {Utils} from '../utils';
import {ButtonAnimate, AnimateButton} from '../SimpleComponents/AnimateButton';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {logger} from '../Classes/Logger';
import {Events} from '../Dispatcher';

// http://localhost:8081/#/inviteactivation?token=482cefe84bf33dfeeb2aac070ebbe28f

export class InviteActivation extends React.Component {
    
    token  = null;            // токен
    xr1    = null;            // api.xreq
    invite_data = null;       // данные инфвайта из cm:user_invite_get
    input  = {};
    
    state = {};
    
    xrStop=()=>{  // выключаем api
        if (this.xr1) { this.xr1.cancel(); this.xr1 = null; }
    }
    
    componentWillMount=()=>{
        //logger.log(this, 'mount');
        this.token = this.props.query.token;
        this.xr1 = new xreq('comp_invite_get', {token: this.token}, this.xrInviteGetHandler);  // загружаем данные инвайта
    }
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        this.xrStop();
    }
    
    render=()=>{
        
        if (!this.invite_data) {  // данные инвайта еще не загружены
            return (<div>загрузка ...</div>);
        }
        
        if (this.invite_data.err) {  // данные инвайта еще не загружены
            return (<div>Ошибка: {this.invite_data.err}</div>);
        }
        
        return (
            <div>
                <h1 className="box-row-nw  just-center main-text heading">CargoChat</h1>
                <div className="box-row-nw just-center">
                    <div className="panel panel-default panel-lg">
                        <h3 className="align-s-center heading main-text head-fs">Активация приглашения</h3>
                        <div className="wrap-tb">
                            Ваша компания <u>{this.invite_data.comp_name}</u>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple active={true} name="last_name" placeholder="Фамилия" defaultValue={this.input.last_name} onChange={this.inputHandler}/>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple active={true} name="first_name" placeholder="Имя" defaultValue={this.input.first_name} onChange={this.inputHandler}/>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple active={true} name="pat_name" placeholder="Отчество" defaultValue={this.input.pat_name} onChange={this.inputHandler}/>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple active={true} name="phone" placeholder="Телефон" defaultValue={this.input.phone} onChange={this.inputHandler}/>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple active={true} name="sms" placeholder="Код подтверждения из СМС" defaultValue={this.input.sms} onChange={this.inputHandler}/>
                            <AnimateButton onClick={this.getSMS} caption="Выслать" />
                        </div>
                        <div className="wrap-tb">
                            <InputSimple type="password" active={true} name="pass" placeholder="Введите ваш пароль" onChange={this.inputHandler}/>
                        </div>
                        <div className="wrap-tb">
                            <InputSimple type="password" active={true} name="pass2" placeholder="Повторите пароль" onChange={this.inputHandler}/>
                        </div>
                        <div className="box-cln-nw align-center">
                            <AnimateButton onClick={this.accept} caption="Активировать" />
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
    
    inputHandler=(o)=>{
        for (var k in o) this.input[k] = o[k];  // мержим ввод в this.input, отучаемся гадить в state
    }
    
    xrInviteGetHandler=(xr)=>{  // загрузка данных инвайта завершена
        logger.log(this, 'xrInviteGetHandler');
        this.xrStop();
        if (xr.res.err) {  // ошибка при загрузке
            this.invite_data = {err: xr.res.msg};
            this.forceUpdate();
            return;
        }
        this.invite_data = xr.res;
        let z = ['last_name','first_name','pat_name','phone'];
        for (let i in z) this.input[z[i]] = this.invite_data[z[i]];  // копируем нужные данные из invite_data в input (юзер будет их редактировать)
        this.forceUpdate();  // передергиваем компоенент
    }
    
    getSMS=()=>{
        logger.log(this, 'getSMS');
        if (this.xr1) return;  // загрузчик занят
        let phone = Utils.extract_phone_number(this.input['phone']);
        if (!phone) return Events.runError('введите телефон');
        this.xr1 = new xreq('comp_invite_sms', {token: this.token, phone: phone}, this.xrSmsHandler);  // загружаем данные инвайта
    }
    
    xrSmsHandler=(xr)=>{
        logger.log(this, 'xrSmsHandler');
        this.xrStop();
        if (xr.res.err) return;  // ошибка при загрузке
        if (xr.res['phone']) return Events.runInfo('Код выстан на номер ' + xr.res['phone'] + ' перезапросить можно через ' + xr.res['cooldown'] + ' сек');  // todo: сделать интферфейс обратного отсчета
        Events.runInfo('Перезапросить код можно через ' + xr.res['cooldown'] + ' сек');  // todo: сделать интферфейс обратного отсчета
    }
    
    accept=()=>{
        //logger.log(this, 'accept');
        if ((this.input['pass'] || '') == '') return Events.runError('введите пароль');
        if ((this.input['pass2'] || '') == '') return Events.runError('подтвердите пароль');
        if (this.input['pass'] !== this.input['pass2']) return Events.runError('пароли не совпадают');
        if (this.xr1) return;  // запрос выполняется (юзер слишком быстро кликает, или сервер/инет тормозит)
        let p = {
            token:      this.token,
            last_name:  this.input['last_name'],
            first_name: this.input['first_name'],
            pat_name:   this.input['pat_name'],
            sms_code:   this.input['sms'],
            passw:      this.input['pass']
        };
        this.xr1 = new xreq('comp_invite_accept', p, this.xrAcceptHandler);
    }
    
    xrAcceptHandler=(xr)=>{
        //logger.log(this, 'xrAcceptHandler');
        //console.debug(xr.res);
        this.xrStop();
        if (xr.res.err) return;
        
        if (!xr.res.user_id || !xr.res.sid)
            return Events.runError('вход не выполнен');
        
        Api.sid     = xr.res.sid;
        Api.user_id = xr.res.user_id;
        Utils.cookieSet('sid',     Api.sid,     {expires: 0});
        Utils.cookieSet('user_id', Api.user_id, {expires: 0});
        window.location.hash = "dashboard"
        
    }
    
}