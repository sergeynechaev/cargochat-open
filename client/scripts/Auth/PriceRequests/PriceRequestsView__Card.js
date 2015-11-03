var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';

import {TblDateUTCCls} from '../../SimpleComponents/TableCells';
import {PriceRequests__Card_Actions_Created} from './PriceRequests__Card_Actions_Created';


class PriceRequestsView__Card extends React.Component {

    constructor( props ) {
        super( props );
    }

    render = ()=> {

        // формируем активные кнопки в зависимости от типа запросов: созданные, входящие, закладки
        let actions = null;
        let countBadge = null;
        let createBet = null;

        // countBadge=(this.props.data.bets) ?  <div className="PriceRequests__Card_bets">
        //                                             <Hint text="Количество предложений"><span className="font14 font600 accent-pad">{this.props.data.bets}</span></Hint>
        //                                             </div> 
        //                                          :  <div className="PriceRequests__Card_bets_zero">
        //                                             <Hint text="Количество предложений"><span className="font14 accent-pad">0</span></Hint>
        //                                             </div>;

        //  формируем короткий адрес откуда и куда
        //  для грузовладельца формируем линк для перехода на подробную карточку 
        let fromAddrShort = this.props.data.from_addr.substr( this.props.data.from_addr.lastIndexOf(',')+1 );
        let toAddrShort = this.props.data.to_addr.substr( this.props.data.to_addr.lastIndexOf(',')+1 );

        return (
            <div className="panel panel-default PriceRequestsView__Card">
                <FlexBox direction="row" justify="between" alignItems="center">
                    <div className="PriceRequests__Card_header">{countBadge}<span className="PriceRequests__Card_title">{fromAddrShort}&nbsp;&rarr;&nbsp;{toAddrShort}</span></div>
                    {actions}
                </FlexBox>
                <FlexBox direction="row" justify="between" alignItems="start">
                    <div className="PriceRequests__Card_address-created">{this.props.data.from_addr}&nbsp;&rarr;&nbsp;{this.props.data.to_addr}</div>
                    <div className="PriceRequests__Card_footer-created">{this.props.data.unit}&nbsp;<Icon iconName="pay-icon" size={18} className="icon-color marg-icon"/></div>
                </FlexBox>
                <FlexBox direction="row" justify="between" alignItems="start">
                    <FlexBox direction="row" alignItems="start">
                        <div className="PriceRequests__Card_footer-created"><Icon iconName="clock-icon" size={18} className="icon-color marg-icon"/>{this.props.data.shipment_time}</div>
                        <div className="PriceRequests__Card_footer-created"><Icon iconName="cargo-icon" size={18} className="icon-color marg-icon"/>
                            <span className="PriceRequests__Card_cargo">{this.props.data.cargo_name}</span>:&nbsp;
                            <span className="PriceRequests__Card_cargo">{this.props.data.volume}&nbsp;</span>м<sup>3</sup>,&nbsp;
                            <span className="PriceRequests__Card_cargo">{this.props.data.mass}</span>&nbsp;т.
                        </div>
                        {(this.props.data.note) ? <div className="PriceRequests__Card_footer-created"><Icon iconName="comment-icon" size={18} className="icon-color marg-icon"/>{this.props.data.note}</div> : null}
                    </FlexBox>
                    <FlexBox direction="row" alignItems="start">
                        <div className="PriceRequests__Card_ctime"><TblDateUTCCls value={this.props.data.ctime}/></div>
                    </FlexBox>
                </FlexBox>
            </div>
        )
    }
}

export {PriceRequestsView__Card}