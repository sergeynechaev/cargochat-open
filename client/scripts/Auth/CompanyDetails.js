
// это своя компания

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {NavTabs} from '../Controls/NavTabs';

var CompanyDetails = React.createClass({
    
    propTypes: {
        company: React.PropTypes.object.isRequired
    },
    
    componentWillReceiveProps(){
        this.forceUpdate()
    },
    
    getInitialState(){
        return {
            company         : this.props.company,
            dataRecieved    : false,
            selectedMenuItem: ''
        }
    },
    
    render(){
        let tabs = [{ name: "О компании" },
                    { name: "Выписка", href: "/register-info", hash: "register-info" },
                    { name: "Сотрудники", href: "/staff", hash: "staff" },
                    { name: "Транспортные средства", href: "/transport", hash: "transport" },
                    { name: "Настройки", href: "/settings", hash: "settings" }];

        return (
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Компания</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/company" data={tabs}/>
                </div>
                <div className="panel__body">
                    <RouteHandler user={this.props.user} company={this.props.company} users={this.state.users}/>
                </div>
            </div>
        )
    }
});

export {CompanyDetails}
