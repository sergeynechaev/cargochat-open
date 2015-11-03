var React = require('react/addons');

import {Dispatcher, Events, Actions, Store} from '../Dispatcher';
import {Api} from '../api';

import {Utils} from '../utils';
import {Loading} from '../SimpleComponents/Loading';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {Icon} from '../SimpleComponents/Icons';
import {ButtonSimple} from '../Controls/Forms/ButtonSimple';

var Accounts = React.createClass({
  
  componentDidMount(){
    this.refreshUserState();
  },
  
  componentWillUnmount() {
  },
  
  updateStateWrapper(o) {
  },
  
  getInitialState () {
    return {}
  },
  
  refreshUserState () {
    Api.justDoRequest('user_state').then(res=> {
      //console.log('[Accounts] user_state handler')
      //console.debug(res)
      if (res.err) { alert(res.err); return }
      this.setState({accounts: res.accounts});
    })
  },
  
  authDialog (uri) {
    let w = 500;
    let h = 350;
    let t = window.screen.height / 2 - h / 2 - 100;
    let l = window.screen.width / 2 - w / 2;
    window.open(uri, 'SignIn', 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t);
  },
  
  bindFacebook () {
    //console.log('[Accounts] bindFacebook')
    let params = [
      'client_id=1593971670882893',
      'redirect_uri=http://localhost:8081/?bind_provider=facebook' + '%23' + '/_=_',
      'response_type=code',
      'display=popup',
      'scope=email'
    ];
    this.authDialog('https://www.facebook.com/dialog/oauth?' + params.join('&'));
  },
  
  bindLinkedin () {
    //console.log('[Accounts] bindLinkedin')
    let params = [
      'response_type=code',
      'client_id=7535z2f08cvusf',
      'redirect_uri=http://localhost:8081?bind_provider=linkedin',  // не дает использовать #
      'state=' + Math.random(),
      'scope=r_basicprofile%20r_emailaddress'
    ];
    this.authDialog('https://www.linkedin.com/uas/oauth2/authorization?' + params.join('&'));
  },
  
  unbindFacebook () {
    //console.log('[Accounts] unbindFacebook')
    Api.justDoRequest('social_facebook_unbind').then(res=> {
      //console.log('[Accounts] user_state handler')
      //console.debug(res)
      if (res.err) { alert(res.err); return }
      this.refreshUserState();
    })
  },
  
  unbindLinkedin () {
    //console.log('[Accounts] unbindFacebook')
    Api.justDoRequest('social_linkedin_unbind').then(res=> {
      //console.log('[Accounts] user_state handler')
      //console.debug(res)
      if (res.err) { alert(res.err); return }
      this.refreshUserState();
    })
  },
  
  render () {
    //console.log('[Accounts] render')
    //console.debug(this.state.accounts)
    let a = this.state.accounts
    if (!a) { return <div>loading...</div> }
    
    function isAccExists (provider) {
      for (let i = 0, l = (a || []).length; i < l; i++) {
        if (a[i].provider == provider) return a[i].j_doc
      }
      return null
    }

    var isFacebook = isAccExists('facebook'), infoFacebook,
        isLinkedin = isAccExists('linkedin'), infoLinkedin;

    console.log(isFacebook);
    
    if(isFacebook){
        infoFacebook = <div className="box-cln-nw panel-md social-account__info">
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label marg-right">Имя </p>
                                <p className="p-list">{isFacebook.name}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label marg-right">E-mail </p>
                                <p className="p-list">{isFacebook.email}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label marg-right">Пол</p>
                                <p className="p-list">{isFacebook.gender}</p>
                            </div>
                        </div>;
    }

    if(isLinkedin){
        infoLinkedin = <div className="box-cln-nw panel-md social-account__info">
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label marg-right">Имя </p>
                                <p className="p-list">{isLinkedin.firstName} {isLinkedin.lastName}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label marg-right">E-mail </p>
                                <p className="p-list">{isLinkedin.emailAddress}</p>
                            </div>
                        </div>;
    }

    return(
      <div className="row">
          <div className="col-xs-12">
            <div className="box-row-wr">
                <div className="box-cln-nw col-large">
                    <SmallPanel className="social-account" styles={{smallPanel: { width: "335px", marginRight: "20px" }}}>
                        <div className="box-cln-nw align-center social-box social-account__facebook">
                            <Icon iconName="facebook-box" className="icon-social-box" size={60}/>
                        </div>
                        {infoFacebook}
                        <div className="box-row-nw just-end table-footer table-pr social-account__info">
                            {isFacebook ? <ButtonSimple onClick={this.unbindFacebook} caption="Отвязать"/> : <ButtonSimple brand="primary" onClick={this.bindFacebook} caption="Привязать"/>}
                        </div>
                    </SmallPanel>
                </div>
                <div className="box-cln-nw col-large">
                    <SmallPanel className="social-account" styles={{smallPanel: { width: "335px", marginRight: "20px" }}}>
                        <div className="box-cln-nw align-center social-box social-account__linkedin">
                            <Icon iconName="linkedin-icon" className="icon-social-box" size={60}/>
                        </div>
                        {infoLinkedin}
                        <div className="box-row-nw just-end table-footer table-pr social-account__info">
                            {isLinkedin ? <ButtonSimple onClick={this.unbindLinkedin} caption="Отвязать"/> : <ButtonSimple brand="primary" onClick={this.bindLinkedin} caption="Привязать"/>}
                        </div>
                    </SmallPanel>
                </div>
            </div>
          </div>
      </div>
    )
  
}});

export {Accounts};

