var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import {FlexBox} from '../SimpleComponents/FlexBox';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {NavTabs} from '../Controls/NavTabs';

var Profile = React.createClass({

    componentWillReceiveProps(){
        this.forceUpdate()
    },

    render () {
        let tabs = [{ name: "Настройки приватности"},
                    { name: "Аккаунты", href: "/accounts", hash: "accounts"  },
                    { name: "Открытые сессии", href: "/sessions", hash: "sessions" }];

        return (
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Профиль</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/profile" data={tabs}/>
                </div>
                <div className="panel__body">
                    <RouteHandler user={this.props.user} company={this.props.company}/>
                </div>
            </div>
        )
    }
});

export {Profile}