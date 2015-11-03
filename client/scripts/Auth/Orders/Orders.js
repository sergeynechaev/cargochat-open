var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {AppState} from '../Dashboard';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {logger} from '../../Classes/Logger';
import {NavTabs} from '../../Controls/NavTabs';

export class Orders extends React.Component {
    
    state = {};
    focus_hash = null;
    xr1 = null;
    
    // cfg = {
    //     create: {title: 'Создать',    first: true},
    //     new:    {title: 'Новые'},
    //     open:   {title: 'Открытые'},
    //     close:  {title: 'Закрытые'},
    //     done:   {title: 'Выполненные'},
    //     arh:    {title: 'Архив'},
    //     cancel: {title: 'Отмененные', last: true}
    // };
    
    componentWillMount=()=> {
        //logger.log(this, 'mount');
        //console.debug(window.location.hash);  // #/dashboard/orders/create
        // let m = window.location.hash.match(/^#\/dashboard\/orders\/([^\/]+)/i);
        // //console.debug(m);  // ["#/dashboard/orders/create", "create", index: 0, input: "#/dashboard/orders/create"]
        // let f = (m && m.length >= 2) ? m[1] : null;
        // if (f && this.cfg[f]) {
        //     this.focus_hash = f;
        // } else {
        //     window.location.hash = 'dashboard/orders/create';
        // }
    }
    
    componentWillUnmount=()=> {
        //logger.log(this, 'unmount');
        this.xrStop();
    }
    
    render = ()=> {

        let tabs = [];
        if( AppState.myCompany.isShipper() ) {
            tabs.push( { name: "Создать" },
                       { name: "Шаблоны", href: "/tpls", hash: "tpls" },
                       { name: "Новые", href: "/new", hash: "new" } );
        }

        tabs.push ( { name: "Открытые", href: "/open", hash: "open" },
                    { name: "Закрытые", href: "/close", hash: "close" },
                    { name: "Перевозка", href: "/ship", hash: "ship" },
                    { name: "Выполненные", href: "/done", hash: "done" },
                    { name: "Архив", href: "/arh", hash: "arh" },
                    { name: "Отмененные", href: "/cancel", hash: "cancel" } );

        // let tabs = [{ name: "Создать" },
        //             { name: "Новые", href: "/new", hash: "new" },
        //             { name: "Открытые", href: "/open", hash: "open" },
        //             { name: "Закрытые", href: "/close", hash: "close" },
        //             { name: "Перевозка", href: "/ship", hash: "ship" },
        //             { name: "Выполненные", href: "/done", hash: "done" },
        //             { name: "Архив", href: "/arh", hash: "arh" },
        //             { name: "Отмененные", href: "/cancel", hash: "cancel" }];
        
        return (
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Заказы</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/orders" data={tabs}/>
                </div>
                <div className="panel__body">
                    <RouteHandler/>
                </div>
            </div>
        )
        
    }
    
    xrStop=()=>{  // выключаем api
        if (this.xr1) { this.xr1.cancel(); this.xr1 = null; }
    }
    
    topMenuSelectHandler=(k, o)=>{
        //logger.log(this, 'topMenuSelectHandler');
        //console.debug(k, o);
        this.focus_hash = k;
        this.forceUpdate();
    }
    
}