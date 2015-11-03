var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

class PriceRequestsView__Card_Company extends React.Component {

	constructor( props ) {
        super( props );
        this.companyDetails = [];
    }

    componentWillMount =()=> {
    	this.getCompanyDetails( this.props.obj.comp_id );
    }

    //
    // TODO: собрать все в контроллеры компании
    // 

    getCompanyDetails =(id)=> {
        if( id ) {
            Api.companyStateRequestById( id ).then(res=> {
                if (res.err) {
                    Logger.error( this, 'Error while getting company details', res.msg );
                    return null;
                } else {
                    this.companyDetails = res;
                    this.forceUpdate();
                }
            })
        } else {
        	Logger.error( this, 'Error while getting company details - not enough params' );
            return null;
        }
    }

    render = ()=> {
    	let hrefCompDetails = '/#/dashboard/comp/' + this.companyDetails.id;
        let badgeCarriers = <div className="PriceRequestsView__Card_badge"><span data-tooltip="Количество перевозчиков" className="font400 accent-pad">{this.props.obj.cnt_carriers}</span></div>;
        let badgeCustomers = <div className="PriceRequestsView__Card_badge"><span data-tooltip="Количество заказчиков" className="font400 accent-pad">{this.props.obj.cnt_customers}</span></div>;
        let badgeVehicles = <div className="PriceRequestsView__Card_badge"><span data-tooltip="Количество автомобилей" className="font400 accent-pad">{this.props.obj.cnt_vehicles}</span></div>;

        return (
            <div>
            	<div><a target="_blank" href={hrefCompDetails}>{this.companyDetails.name}</a></div>
            	<FlexBox direction="row">
            		{badgeCarriers}&nbsp;{badgeCustomers}&nbsp;{badgeVehicles}
            	</FlexBox>
            </div>
        )
    } // render
}

export {PriceRequestsView__Card_Company}