import React from 'react/addons';
import Router, {RouteHandler} from 'react-router';

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {NavTabs} from '../../Controls/NavTabs';

export default class Admin extends React.Component {
	
    state = {}

    render = ()=> {

        let tabs = [];
        tabs.push ( { name: "Компании", href: "/companies", hash: "companies" },
                    { name: "Добавить компанию", href: "/companies-create", hash: "companies-create" } );

        return (
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Администрирование</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/admin" data={tabs}/>
                </div>
                <div className="panel__body">
                    <RouteHandler/>
                </div>
            </div>
        )
    } 
}
