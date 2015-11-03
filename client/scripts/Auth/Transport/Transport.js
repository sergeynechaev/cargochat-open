var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';

import {ModalWindow} from '../../Controls/ModalWindow';
import {NavTabs, Tab} from '../../Controls/NavTabs';

import TransportController from './TransportController';
import {TransportEditForm} from './TransportEditForm';

class Transport extends React.Component {

    constructor( props ) {
        super( props );
        this.query = [];
        this.path = 'created';
    }
    
    state = {
        isModalOpen: false,
        selectedMenuItem: null,
        countVehicles: 0,
    }

    componentWillMount = ()=> {
        AppState.Transport = new TransportController();
        AppState.Transport.on("Transport_vehicleslist_complete",this.countVehicles);
    }

    componentWillUnmount = ()=> {
        AppState.Transport.rem("Transport_vehicleslist_complete",this.countVehicles);
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    countVehicles =()=> {
        this.setState({countVehicles: AppState.Transport.countVehicles()});
    }

    render = ()=> {

        // let menuConfig = [];
        // menuConfig.push(
        //         {
        //             name: "Все ТС компании", 
        //             href: baseHref,
        //             hash: "list", 
        //             wrapClass: "table-pr sm-header-bord",
        //             count: this.state.countVehicles
        //         });

        // var buttonCreateNew = <div className="Transport__Button_CreateNew"><TransparentButton onClick={this.openModal} caption="Добавить ТС"/></div>;

        // var upMenu = (activeItem)=> {
        //     return menuConfig.map((item, key)=> {
        //         var cl = "sm-header-a font600 text-under";
        //         if (item.hash === activeItem) {
        //             cl = cl + " active-item";
        //         }
        //         var countBadge=(item.count) ? <div className="box-row-nw just-center align-center accent-block">
        //                                         <span className="font14 font600 accent-pad">{item.count}</span>
        //                                       </div> : null;
        //         return <div key={key} className={item.wrapClass}>
        //                     <a href={item.href} data-hash={item.hash} className={cl} onClick={this.clickToSelect}>
        //                         <div className="box-row-nw">
        //                             <span className="font600 font-sec marg-tags" data-hash={item.hash}>{item.name}</span>
        //                             {countBadge}
        //                         </div>
        //                     </a>
        //                 </div>
        //         })
        // };

        let modalWindowProps = {
                title: "Добавление ТС",
                width: 400,
                height: 200
            };

        let tabs = [{ name: "Все ТС компании" },
                    { name: "Добавить ТС", onClick: this.openModal }];

        return (
            <div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/company/transport" data={tabs} nHash={4} className="nav-tabs nav-tabs--lower"/>
                    
                    <ModalWindow isOpen={this.state.isModalOpen} 
                             onClose={this.closeModal} 
                             width={modalWindowProps.width}
                             height={modalWindowProps.height} 
                             title={modalWindowProps.title}>
                        <TransportEditForm onClose={this.closeModal} currentState={this.state.isModalOpen}/>
                    </ModalWindow>
                </div>
                <RouteHandler/>
            </div>
        )

    } // render
}


export {Transport}