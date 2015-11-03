var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {Utils} from '../utils';
import {logger} from '../Classes/Logger';
import {Api} from '../api';
import {Store, Actions, Events, NewStore} from '../Dispatcher';

import {InputSimple} from '../SimpleComponents/InputSimple';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Icon} from '../SimpleComponents/Icons';
import {ButtonActive} from '../SimpleComponents/ButtonActive';

import {LeftMenu} from './LeftMenu';
import {UpPanel} from './UpPanel';
import Header from './Header'

import ContactCenter from './ContactCenter/ContactCenter.js';
import UserController from '../Classes/UserController';
import CompanyController from '../Classes/CompanyController';


// главный объект для хранения состояний и контроллеров,
// при загрузке приложения в него добавляются myContacts, myChannels, myChats,
// доступные на любой странице клиента
var AppState = {};


// class UpMenuItem extends React.Component{
//     render=()=>{
//         return(
//             <div className="up-menu-item">
//                 <a className="up-menu-item-link" href={this.props.href}>{this.props.caption}</a>
//             </div>
//         )
//     }
// }

var Dashboard = React.createClass({
    statics: {

        willTransitionTo: function (transition, params, query, callback) {
            //logger.log('[Dashboard] willTransitionTo hash=' + window.location.hash)

            // восстановление изначального пути после авторизации
            let ch = window.location.hash;
            if (ch == '#/dashboard') {
                //logger.log(' is dashboard');
                let th = Store.targetHash;
                if (th) {
                    //logger.log(' have targetHash: ' + th);
                    Store.targetHash = null;
                    //logger.log(' redirect to: ' + th.substr(1))
                    transition.redirect(th.substr(1), null, null)
                }
            } else {
                //logger.log(' set targetHash: ' + ch)
                Store.targetHash = ch
            }

            var provider = Utils.extract_uri_param(window.location.href, 'provider');
            logger.log('provider=' + provider);
            switch (provider) {
                case 'linkedin':
                case 'facebook':
                    transition.redirect('social_oauth', null, null);
                    callback();
                    return;
            }
            
            var bind_provider = Utils.extract_uri_param(window.location.href, 'bind_provider');
            logger.log('bind_provider=' + bind_provider);
            switch (bind_provider) {
                case 'linkedin':
                case 'facebook':
                    transition.redirect('social_oauth', null, null);
                    callback();
                    return;
            }

            Api.sid = Utils.cookieGet("sid");  // это нужно для обновления sid при логине через oauth
            Api.user_id = Utils.cookieGet("user_id");  // это нужно для обновления sid при логине через oauth

            //logger.log('sid=' + Api.sid + ' user_id=' + Api.user_id);

            if (Api.sid && Api.user_id) {
                // проверка sid

                Api.userSessionsRequest()
                    .then(res=> {
                        //logger.log('Dashboard: userSessionsRequest', res);
                        if( res ) {
                            if (res.err) {
                                // проверка провалена, идем на логин
                                transition.redirect('landing', null, null);
                                callback()
                            } else {
                                // проверка - ок
                                Store.sessions = res.sessions;
                                // запускаем веб-сокет
                                Events.openWebSocket();
                                callback()
                            }
                        } else {
                            logger.log('ERROR: API has returned undefined result.');
                            callback()
                        }
                    })

            } else {
                // sid-а нет, сразу на логин
                transition.redirect('landing', null, null);
                callback()
            }

        }

    },

    getInitialState(){
        return {
            profile   : null,
            checkComps: false
        }
    },
    updateUserState(state){
        this.createMyComp(state);
        this.setState({userState: state});
    },

    updateCompanyState(state){
        this.setState({companyState: state})
    },

    createMyComp(userState){
        var comp_id= userState.comp_id;
        if (comp_id){
            AppState.myCompany= new CompanyController(comp_id);  //при получении юзер стейт создаем экземпляр компании
            AppState.myCompany.on("update_companyState", this.updateCompanyState);
        }
    },
    
    componentWillMount(){
        var userId=Utils.cookieGet("user_id");
        AppState.user= new UserController(userId); //создаем экземпляр юзера
        AppState.user.on("update_userState", this.updateUserState);
        //AppState.myEvents = new EventsClass();        // deprecated, use Events from Dispatcher.js
    },

    componentWillUnmount(){
        //Events.rem(Events.EV_PROFILE_UPDATE, this.updateUser);
        AppState.user.rem("update_userState", this.updateUserState);
        //AppState.user.rem("update_userState", this.createMyComp);
    },

    render () {
        // let us = this.state.userState;
        // var userProfileItem = (this.state.userState !== undefined ) ? (
        //         <a className="user-profile-item" href="#/dashboard/profile">
        //             <div className="user-profile-item-photo">{(us.first_name || '').charAt(0)}{(us.last_name || '').charAt(0)}</div>
        //             <span className="user-profile-item-name" >{us.first_name || ''}</span>
        //             <span className="user-profile-item-last-name">{us.last_name || ''}</span>
        //         </a>) : null

        var links = [
                {
                    name: "Компания",
                    href: '#dashboard/company',
                    hash: "company"
                },
                {
                    name: "Партнеры",
                    href: '#dashboard/links',
                    hash: "links"
                },
                {
                    name: "Заказы",
                    href: '#/dashboard/orders/open',
                    hash: "orders"
                },
                {
                    name: "Запросы ставок",
                    href: '#/dashboard/price-requests',
                    hash: "price-requests"
                }
            ];

        var r = (this.state.userState && this.state.companyState) ?
            <RouteHandler user={this.state.userState} company={(this.state.companyState)?this.state.companyState:null}/> : null;


        return (
            <div className="page-main">
                <Header links={links} user={this.state.userState}/>
                <div className="page-main__sidebar contact-center">
                    <ContactCenter/>
                </div>
                <div className="page-main__content">
                    {r}
                </div>
            </div>
        );
    }
});

export {Dashboard, AppState};


// <div>
//     <UpPanel>
//         {userProfileItem}
//         <UpMenuItem key="company" caption="Компания" href="#dashboard/company"/>
//         <UpMenuItem key="links" caption="Партнеры" href="#dashboard/links"/>
//         <UpMenuItem key="orders" caption="Заявки" href="#dashboard/orders"/>
//         <UpMenuItem key="price-requests" caption="Запросы ставок" href="#dashboard/price-requests"/>
//         <FlexBox direction="row" alignItems="center">
//             <ButtonActive onClick={this.exit} caption="Выход"/>
//             <NotificationCenter/>
//         </FlexBox>
//     </UpPanel>
//     <div className="box-row-nw align-stretch">
//         <div id="left-menu-wrap" className="marg-r">
//             <ContactCenter/>
//         </div>
//         <div id="bg-main" className="light-gray-bg box-row-nw align-stretch">
//             {r}
//         </div>
//     </div>
// </div>