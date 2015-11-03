import React from 'react/addons';
import Router from 'react-router';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.DefaultRoute;

import {App} from './app';
import {Events} from './Dispatcher';
import {logger} from './Classes/Logger';


/* APP Routes handlers */

// NoAuth pages
import {Login} from './NoAuth/Login/Login';
import {LoginForm} from './NoAuth/Login/LoginForm';
import {LoginForgotPassword} from './NoAuth/Login/LoginForgotPassword';
import {Landing} from './NoAuth/Landing/Landing';
import {SentLetter} from './NoAuth/SentLetter';
import {Activation} from './NoAuth/Activation';
import {InviteActivation} from './NoAuth/InviteActivation';
import {UserInviteAccept} from './NoAuth/UserInviteAccept';
import {Key_a} from './NoAuth/Key_a';

// Links
import {RelationTable} from './Auth/Links/RelationTable';
import {Links} from './Auth/Links/Links';
import Carriers from './Auth/Links/Carriers';
import Expeditors from './Auth/Links/Expeditors';
import Shippers from './Auth/Links/Shippers';
import Bookmarks from './Auth/Links/Bookmarks';
import Blackmarks from './Auth/Links/Blackmarks';
import {MyContacts} from './Auth/MyContacts';

// Comp - other company view
import {Comp}   from './Auth/Comp/Comp';
import {CompNotFound}  from './Auth/Comp/CompNotFound';
import {CompAbout}     from './Auth/Comp/CompAbout';
import {CompInfo}      from './Auth/Comp/CompInfo';
import {CompContacts}  from './Auth/Comp/CompContacts';
import {CompRelations} from './Auth/Comp/CompRelations';
import {CompOrders}    from './Auth/Comp/CompOrders';
import {CompVehicles}  from './Auth/Comp/CompVehicles';

// Dashboard
import {Dashboard} from './Auth/Dashboard';

// Company: 
import {CompanyDetails} from './Auth/CompanyDetails';
import {CompanyTenders} from './Auth/CompanyDetails/CompanyTenders';
import {CompanyVacancies} from './Auth/CompanyDetails/CompanyVacancies';

// Price Requests
import {PriceRequests} from './Auth/PriceRequests/PriceRequests';
import {PriceRequestsCreated} from './Auth/PriceRequests/PriceRequestsCreated';
import {PriceRequestsReceived} from './Auth/PriceRequests/PriceRequestsReceived';
import {PriceRequestsSearch} from './Auth/PriceRequests/PriceRequestsSearch';
import {PriceRequestsBookmarks} from './Auth/PriceRequests/PriceRequestsBookmarks';
import {PriceRequestsView} from './Auth/PriceRequests/PriceRequestsView';
// import {PriceRequestsSearch2} from './Auth/PriceRequests/_PriceRequestsSearch2';   // test

// Transport
import {Transport} from './Auth/Transport/Transport';
import {TransportList} from './Auth/Transport/TransportList';

// Orders
import {Orders}       from './Auth/Orders/Orders';
import {OrderCreate}  from './Auth/Orders/OrderCreate';
import {OrderTemplates} from './Auth/Orders/OrderTemplates';
import {OrderNew}     from './Auth/Orders/OrderNew';
import {OrderOpen}    from './Auth/Orders/OrderOpen';
import {OrderClose}   from './Auth/Orders/OrderClose';
import {OrderShip}    from './Auth/Orders/OrderShip';
import {OrderDone}    from './Auth/Orders/OrderDone';
import {OrderArh}     from './Auth/Orders/OrderArh';
import {OrderCancel}  from './Auth/Orders/OrderCancel';

// Channel
import Channel from './Auth/Channel/Channel.js';

// Chat
import Chat from './Auth/Chat/Chat.js';

// Admin
import A_Admin from './Auth/A/A_Admin';
import A_Companies from './Auth/A/Companies/A_Companies';
import A_Companies__Create from './Auth/A/Companies/A_Companies__Create';
// -old admin
// import Admin from './Auth/Admin';
import A_Users from './Auth/A_Users';
import A_Tenders from './Auth/A_Tenders';
// import A_Companies from './Auth/A_Companies';
import A_Invites from './Auth/A_Invites';
import A_CreateCompany from './Auth/A_CreateCompany';
import A_Connections from './Auth/A_Connections';

// Misc
import {Test} from './Auth/Test';

// Other - TODO: разобрать по разделам
import {Contacts} from './Auth/Company/CompanyContacts/Contacts';
import {CompanySettings} from './Auth/CompanySettings';
import {Tenders} from './Auth/Tenders';
import {Settings} from './Auth/Settings';
import {Accounts} from './Auth/Accounts';
import {User} from './Auth/User/User';
import {SocialOauth} from './NoAuth/SocialOauth';
import {Sessions2} from './Auth/Sessions2';
import {Profile} from './Auth/Profile';
import {CreateTender} from './Auth/CreateTender';
import {FindTenders} from './Auth/FindTenders';
import {Search} from './Auth/Search';
import {CompanyAbout} from './Auth/CompanyDetails/CompanyAbout';
import {CompanyInfo} from './Auth/Company/CompanyInfo/CompanyInfo';
import {FindPartner} from './Auth/FindPartner';
import {Requests} from './Auth/UserRequests';
import {JoinCompany} from './Auth/JoinCompany';


/* APP Routes */

export var routes = (
    <Route handler={App} path="/">
        <Route path="/_=_" handler={SocialOauth}></Route>
        <Route name="social_oauth" path="social_oauth" handler={SocialOauth}></Route>
        <Route name="newemail" path="key_a" handler={Key_a}></Route>

        <Route name="login" path="login" handler={Login}>
            <DefaultRoute name="form" handler={LoginForm}/>
            <Route name="forgot" path="forgot" handler={LoginForgotPassword}></Route>
        </Route>

        <Route name="landing" path="landing" handler={Landing}></Route>
        <Route name="sentletter" path="sentletter" handler={SentLetter}></Route>
        <Route name="activation" path="activation" handler={Activation}></Route>
        <Route name="inviteactivation" path="inviteactivation" handler={InviteActivation}></Route>
        <Route name="user-invite-accept" path="user-invite-accept" handler={UserInviteAccept}></Route>

        <Route name="dashboard" path="dashboard" handler={Dashboard}>
            <DefaultRoute name="about" handler={CompanyInfo}/>

            <Route name="links" path="links" handler={Links}>
                <DefaultRoute name="search" handler={Search}/>
                <Route name="carriers" path="carriers" handler={Carriers}/>
                <Route name="shippers" path="shippers" handler={Shippers}/>
                <Route name="expeditors" path="expeditors" handler={Expeditors}/>
                <Route name="blackmarks" path="blackmarks" handler={Blackmarks}/>
                <Route name="bookmarks" path="bookmarks" handler={Bookmarks}/>
            </Route>
            
            <Route name="orders" path="orders" handler={Orders}>
                // <DefaultRoute name="create" handler={OrderCreate}/>
                <Route name="tpls"   path="tpls"   handler={OrderTemplates}/>
                <Route name="new"    path="new"    handler={OrderNew}/>
                <Route name="open"   path="open"   handler={OrderOpen}/>
                <Route name="close"  path="close"  handler={OrderClose}/>
                <Route name="ship"   path="ship"   handler={OrderShip}/>
                <Route name="done"   path="done"   handler={OrderDone}/>
                <Route name="arh"    path="arh"    handler={OrderArh}/>
                <Route name="cancel" path="cancel" handler={OrderCancel}/>
            </Route>
            
            <Route name="channel" path="channel/:id" handler={Channel}/>

            <Route name="chat" path="chat/:id" handler={Chat}/>

            <Route name="price-requests" path="price-requests" handler={PriceRequests}>
                <DefaultRoute name="price-requests-created" handler={PriceRequestsCreated}/>
                <Route name="price-requests-received" path="received" handler={PriceRequestsReceived}/>
                <Route name="price-requests-search" path="search" handler={PriceRequestsSearch}/>
                <Route name="price-requests-bookmarks" path="bookmarks" handler={PriceRequestsBookmarks}/>
                <Route name="price-requests-view" path="view/:id" handler={PriceRequestsView}/>
            </Route>

            <Route name="my-contacts" path="my-contacts" handler={MyContacts}/>

            <Route name="admin" path="admin" handler={A_Admin}>
                <Route name="a_users" path="users" handler={A_Users}></Route>
                <Route name="a_companies" path="companies" handler={A_Companies}></Route>
                <Route name="a_companies_create" path="companies-create" handler={A_Companies__Create}></Route>
                <Route name="a_create_company" path="a_create_company" handler={A_CreateCompany}></Route>
                <Route name="a_tenders" path="a_tenders" handler={A_Tenders}></Route>
                <Route name="a_invites" path="a_invites" handler={A_Invites}></Route>
                <Route name="a_connections" path="a_connections" handler={A_Connections}></Route>
            </Route>
            
            <Route path="comp/:id" handler={Comp}>
                <DefaultRoute name="compabout" handler={CompAbout}/>
                <Route path="notfound"   handler={CompNotFound} />
                <Route path="info"       handler={CompInfo} />
                <Route path="contacts"   handler={CompContacts} />
                <Route path="relations"  handler={CompRelations}>
                    <DefaultRoute name="relations-carriers" handler={RelationTable}/>
                    <Route path="shippers"  handler={RelationTable}/>
                    <Route path="expeditors"  handler={RelationTable}/>
                </Route>
                <Route path="orders"     handler={CompOrders} />
                <Route path="vehicles"   handler={CompVehicles} />
            </Route>
            
            <Route name="profile" handler={Profile}>
                <DefaultRoute name="settings" handler={Settings}/>
                <Route name="accounts" path="accounts" handler={Accounts}/>
                <Route name="sessions" path="sessions" handler={Sessions2}/>
            </Route>

            <Route name="join" path="join" handler={JoinCompany}></Route>

            <Route name="requests" path="requests" handler={Requests}></Route>

            <Route name="company" path="company" handler={CompanyDetails}>
                <DefaultRoute name="company-about" handler={CompanyInfo}/>
                <Route name="company-staff" path="staff" handler={Contacts}></Route>
                <Route name="company-register-info" path="register-info" handler={CompInfo}></Route>
                <Route name="company-settings"  path="settings"  handler={CompanySettings}></Route>
                <Route name="company-transport" path="transport" handler={Transport}>
                    <DefaultRoute name="transport-list" handler={TransportList}/>
                </Route>
            </Route>

            <Route name="findtenders" path="findtenders" handler={FindTenders}></Route>

            <Route name="test" path="test" handler={Test}></Route>
        </Route>
        <DefaultRoute handler={Dashboard}/>
    </Route>
);



// OLD routes
// <Route name="a_admin" path="admin" handler={A_Admin}>
    // <Route name="a_companies" path="companies" handler={A_Companies}/>
// </Route>
