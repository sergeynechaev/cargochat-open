var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

export class PriceRequests__Cell_Address extends React.Component {
	
    state = {
    }

    render = ()=> {

        //  формируем короткий адрес откуда и куда
        //  для грузовладельца формируем линк для перехода на подробную карточку 
        let fromAddrShort = this.props.obj.from_addr.substr( this.props.obj.from_addr.lastIndexOf(',')+1 );
        let toAddrShort = this.props.obj.to_addr.substr( this.props.obj.to_addr.lastIndexOf(',')+1 );
        let viewHref = "/#/dashboard/price-requests/view/" + this.props.obj.price_request_id;

        let title = (this.props.type == "created") 
                   ? <a target="_blank" href={viewHref}><span className="PriceRequests__Card_title">{fromAddrShort}&nbsp;&rarr;&nbsp;{toAddrShort}</span></a> 
                   : <span className="PriceRequests__Card_title">{fromAddrShort}&nbsp;&rarr;&nbsp;{toAddrShort}</span>;

        return (
            <div className="">
                <div>
                    {title}
                </div>
                <div className="padd-top-s">
                    <span className="table__inner-caption">Откуда:</span>{this.props.context.from_addr}<br/>
                    <span className="table__inner-caption">Куда:</span>{this.props.context.to_addr}
                </div>
            </div>
        )
    } 
}
