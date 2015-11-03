var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import Logger from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../Controls/ModalWindow';
import {NavTabs} from '../../Controls/NavTabs';

import PriceRequestsController from './PriceRequestsController';
import {PriceRequestsNewForm} from './PriceRequestsNewForm';

class PriceRequests extends React.Component {

    constructor( props ) {
        super( props );
        this.query = [];
        this.path = 'created';
    }
    
    state = {
        isModalOpen: false,
        selectedMenuItem: null,
        countPriceRequestsCreated: 0,
        countPriceRequestsReceived: 0,
        countPriceRequestBookmarks: 0,
    }

    componentWillMount = ()=> {
        // AppState.PriceRequests.on("PriceRequests_updated", AppState.myCompany.update);
        AppState.PriceRequests = new PriceRequestsController();
        AppState.PriceRequests.updateData();
        AppState.PriceRequests.on("PriceRequests_updated", this.countPriceRequests);
    }

    componentWillUnmount = ()=> {
        // AppState.PriceRequests.rem("PriceRequests_updated", AppState.myCompany.update);
    }

    componentDidMount = ()=> {
        Logger.debug( this, 'Mount PriceRequests' );
        this.getParams();
        this.select(this.path);
    }

    getParams() {
        let path = Router.HashLocation.getCurrentPath();
        // trim the leading and trailing /
        path = path.replace(/^\/+/, '');
        path = path.replace(/\/+$/, '');
        let pathArr = path.split('/');
        if( pathArr.length == 3 ) this.path = pathArr[pathArr.length - 1];
    }

    countPriceRequests =()=> {
        this.setState({ 
            countPriceRequestsCreated: AppState.PriceRequests.countPriceRequestsCreated(),
            countPriceRequestsReceived: AppState.PriceRequests.countPriceRequestsReceived(),
            countPriceRequestBookmarks: AppState.PriceRequests.countPriceRequestBookmarks()
        });
    }

    clickToSelect =(e)=> {
        var hash = e.target.dataset.hash;
        this.select(hash)
    }

    select =(activeItem)=> {
        this.setState({selectedMenuItem: activeItem});
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    closeModal = ()=> {
        Logger.debug( this, 'closeModal' );
        this.setState( {isModalOpen: false} );
    }

    render = ()=> {

        let tabs = [],
            newPriceRequestProps = {
                title: "Новый запрос ставки",
                width: 400,
                height: 200
            };

        // доступные пункты меню в зависимости от тэга компании:
        // экспедитор = expeditor = видит все
        // перевозчик = carrier =поиск + входящие + закладки
        // грузовладелец = shipper = мои + создать запрос


        if( true || AppState.myCompany.isExpeditor() || AppState.myCompany.isShipper() ) {
            tabs.push(
                {
                    name: "Мои запросы", 
                    count: this.state.countPriceRequestsCreated
                }
            );
        }
        if( true || AppState.myCompany.isExpeditor() || AppState.myCompany.isCarrier() ) {
            tabs.push(
                {
                    name: "Поиск запросов", 
                    href: "/search",
                    hash: "search", 
                },
                {
                    name: "Входящие запросы",
                    href: "/received",
                    hash: "received",
                    count: this.state.countPriceRequestsReceived
                },
                {
                    name: "Закладки", 
                    href: "/bookmarks", 
                    hash: "bookmarks", 
                    count: this.state.countPriceRequestBookmarks,
                    countType: "danger"
                });
        }

        if( true || AppState.myCompany.isExpeditor() || AppState.myCompany.isShipper() ) {
            tabs.push(
                {
                    name: "Создать запрос",
                    onClick: this.openModal
                }
            );
        }

        return(
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Запросы ставок</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/price-requests" data={tabs}/>

                    <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title={newPriceRequestProps.title}>
                        <PriceRequestsNewForm onClose={this.closeModal}/>
                    </ModalWindow>
                </div>
                <div className="panel__body">
                    <RouteHandler/>
                </div>
            </div>
        )
    } // render
}


export {PriceRequests}