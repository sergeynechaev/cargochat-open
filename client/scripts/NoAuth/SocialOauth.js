import {Api} from '../api';
import {Utils} from '../utils';

var React = require('react/addons');

var SocialOauth = React.createClass({

    getInitialState () {
        return {s: 'Вход ...'};
    },
    
    lg (t) {
      this.setState({s: this.state.s + '\n' + t});
    },
    
    // сюда юзера кинет после авторизации через oauth
    componentDidMount () {
        console.log('[SocialOauth] componentDidMount');
        
        // проверяем наличие ошибки
        var mError = Utils.extract_uri_param(window.location.href, 'error');
        console.log('error=' + mError);
        if (mError) {  // есть error, это плохо
          console.log(mError);
          this.lg(mError);
          return;
        }
        
        // проверяем наличие кода
        var mCode = Utils.extract_uri_param(window.location.href, 'code');
        console.log('code=' + mCode);
        if (!mCode) {  // нет code, это плохо
          this.lg('no code');
          return;
        }
        
        let cmd;
        
        let bind_provider = Utils.extract_uri_param(window.location.href, 'bind_provider');
        
        if (bind_provider) {
          console.log('bind_provider=' + bind_provider);
          
          switch (bind_provider) {
            case 'facebook': { cmd = 'social_facebook_bind'; break; }
            case 'linkedin': { cmd = 'social_linkedin_bind'; break; }
            default: { this.lg('Неверный провайдер привязки'); return; }
          }
          
          this.lg('привязка аккунта ' + bind_provider);
          
          // передаем code в api чтобы привязать аккаунт
          fetch(Api.API_URI + '?cm=' + Utils.o2j({cm: cmd, sid: Utils.cookieGet('sid'), code: mCode}))
            .then(r => r.json())
            // конвертим ответ в json
            .then(j => {
              // обрабатываем ответ
              console.log('cmd "' + cmd + '" answ:');
              console.debug(j);
              if (!j) return;  // вернулось что то не то
              if (j.err) {
                // api вернул ошибку
                console.log('err=' + j.err);
                this.lg('ошибка ' + j.err + '; ' + j.msg);
                return;
              }
              //window.opener.location.hash = 'dashboard/profile/accounts?'+Math.random();  // обновляем родительское окно
              window.opener.location.reload();  // перезагружаем родительское окно (туду: может быть можно как то изящее сделать)
              window.close();  // закрываем это окно
            })
            .catch(e => {
                console.log('request failed: ' + e)
                this.lg('request failed: ' + e);
            })
          
          return;
          
        }
        
        let provider = Utils.extract_uri_param(window.location.href, 'provider');
        console.log('provider=' + provider);
        
        switch (provider) {
            case 'facebook': cmd = 'social_facebook_login'; break;
            case 'linkedin': cmd = 'social_linkedin_login'; break;
            default: this.lg('Неверный провайдер'); return;
        }
        
        this.lg('провайдер ' + provider);
        
        // передаем code в api чтобы получить sid
        fetch(Api.API_URI + '?cm=' + Utils.o2j({cm: cmd, code: mCode}))
            .then(r => r.json())
            // конвертим ответ в json
            .then(j => {
                // обрабатываем ответ
                console.log('cmd "' + cmd + '" answ:');
                console.debug(j);
                if (!j) return;  // вернулось что то не то
                if (j.err) {
                  // api вернул ошибку
                  console.log('err=' + j.err);
                  this.lg('ошибка ' + j.err + '; ' + j.msg);
                  return;
                }
                if (!j.sid || !j.user_id) return;  // api не вернул нужных данных
                Api.sid = j.sid;  // это наш sid
                Api.user_id = j.user_id;  // это наш sid
                //console.debug(Utils.cookieGet('remember'))
                let ttl = Utils.cookieGet('remember') == 'true' ? 60 * 60 * 24 * 365 : 0;  // 0 - кука хранится пока браузер открыт
                Utils.cookieDel('remember')
                //console.log('remember=' + Utils.cookieGet('remember') + ' ' + typeof(Utils.cookieGet('remember')) + ' ttl=' + ttl)
                Utils.cookieSet('sid', j.sid, {expires: ttl});  // кладем sid в куки
                Utils.cookieSet('user_id', j.user_id, {expires: ttl});  // кладем user_id в куки
                window.opener.location.hash = 'dashboard';
                //window.opener.location.reload();  // релоадим основное окно, оно подцепит sid из кук
                window.close();  // закрываем это окно
            })
            .catch(e => {
                console.log('request failed: ' + e)
                this.lg('request failed: ' + e);
            })

    },

    render () {
        return (<pre>{this.state.s}</pre>);
    }

});

export {SocialOauth};