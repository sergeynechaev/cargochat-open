var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';

import {TblDateUTCCls} from '../../SimpleComponents/TableCells';
// import {PriceRequests__Card_Actions_Created} from './PriceRequests__Card_Actions_Created';
// import {PriceRequests__Card_Actions_CreateBet} from './PriceRequests__Card_Actions_CreateBet';
// import {PriceRequests__Card_Actions_DeleteReceivedRequest} from './PriceRequests__Card_Actions_DeleteReceivedRequest';
// import {PriceRequests__Card_Actions_CreateBookmark} from './PriceRequests__Card_Actions_CreateBookmark';
// import {PriceRequests__Card_Actions_DeleteBookmark} from './PriceRequests__Card_Actions_DeleteBookmark';
// import {PriceRequests__Card_Actions_Search} from './PriceRequests__Card_Actions_Search';


class PriceRequests__Card extends React.Component {

    constructor( props ) {
        super( props );
    }

    render = ()=> {

        //logger.debug(this,'opt=',this.props.opt);

        // // формируем поля таблицы в зависимости от типа вывода запросов: созданные, входящие, закладки
        // let headData = [];
        // switch( this.props.type ) {
        //     case "created":
        //         headData = [
        //             {id: 'context', title: 'Запросы ставок', cellClass: PriceRequests__Card},
        //         ];
        //     break;

        //     case "__created":
        //         headData = [
        //             {id: 'id', title: '№'},
        //             {id: 'ctime', title: 'Дата запроса', cellClass: TblDateUTCCls},
        //             {id: 'shipment_time', title: 'Отгрузка'},
        //             {id: 'from_addr', title: 'Откуда'},
        //             {id: 'to_addr', title: 'Куда'},
        //             {id: 'cargo_name', title: 'Груз'},
        //             {id: 'volume', title: 'm3'},
        //             {id: 'mass', title: 'тонн'},
        //             {id: 'bets', title: 'Предложений'},
        //             {id: 'note', title: 'Примечание'},
        //             {id: 'actions', title: 'Действия', cellClass: PriceRequests__Card_Actions_Created}
        //         ];
        //     break;

        //     case "received":
        //         headData = [
        //             {id: 'id', title: '№'},
        //             {id: 'ctime', title: 'Дата публикации', cellClass: TblDateUTCCls},
        //             {id: 'shipment_time', title: 'Отгрузка'},
        //             {id: 'comp_name', title: 'Компания'},
        //             {id: 'from_addr', title: 'Откуда'},
        //             {id: 'to_addr', title: 'Куда'},
        //             {id: 'cargo_name', title: 'Груз'},
        //             {id: 'volume', title: 'm3'},
        //             {id: 'mass', title: 'тонн'},
        //             {id: 'unit', title: 'Ед изм'},
        //             {id: 'bet', title: 'Моя ставка', cellClass: PriceRequests__Card_Actions_CreateBet},
        //             {id: 'actions', title: 'Действия', cellClass: PriceRequests__Card_Actions_Received}
        //         ];
        //     break;

        //     case "bookmarks":
        //         headData = [
        //             {id: 'id', title: '№'},
        //             {id: 'ctime', title: 'Дата публикации', cellClass: TblDateUTCCls},
        //             {id: 'shipment_time', title: 'Отгрузка'},
        //             {id: 'comp_name', title: 'Компания'},
        //             {id: 'from_addr', title: 'Откуда'},
        //             {id: 'to_addr', title: 'Куда'},
        //             {id: 'cargo_name', title: 'Груз'},
        //             {id: 'volume', title: 'm3'},
        //             {id: 'mass', title: 'тонн'},
        //             {id: 'unit', title: 'Ед изм'},
        //             {id: 'actions', title: 'Действия', cellClass: PriceRequests__Card_Actions_Bookmarks}
        //         ];
        //     break;
        // }

        // формируем активные кнопки в зависимости от типа запросов: созданные, входящие, закладки
        let actions = null;
        // количество предложений
        let countBadge = null;
        // let createBet = null;

        switch( this.props.opt.type ) {
            case "created":
                actions = <PriceRequests__Card_Actions_Created obj={this.props.obj}/>;
                countBadge = (this.props.obj.bets) ?  <div className="PriceRequests__Card_bets">
                                                    <span data-tooltip="Количество предложений" className="font14 font600 accent-pad">{this.props.obj.bets}</span>
                                                    </div> 
                                                    :  <div className="PriceRequests__Card_bets_zero">
                                                        <span data-tooltip="Количество предложений" className="font14 accent-pad">0</span>
                                                      </div>;
            break;

            case "received":
                actions = (
                    <FlexBox direction="row" alignItems="center">
                        <PriceRequests__Card_Actions_CreateBet obj={this.props.obj} type="received"/>
                        <PriceRequests__Card_Actions_CreateBookmark obj={this.props.obj}/>
                        <PriceRequests__Card_Actions_DeleteReceivedRequest obj={this.props.obj}/>
                    </FlexBox>
                );
                // createBet = (
                //     <div>
                //         <PriceRequests__Card_Actions_CreateBet obj={this.props.obj}/>
                //     </div>
                //     );
            break;

            case "bookmarks":
                actions = (
                    <FlexBox direction="row" alignItems="center">
                        <PriceRequests__Card_Actions_CreateBet obj={this.props.obj} type="bookmarks"/>
                        <PriceRequests__Card_Actions_DeleteBookmark obj={this.props.obj}/>
                    </FlexBox>
                );
            break;

            case "search":
                actions = (
                    <FlexBox direction="row" alignItems="center">
                        <PriceRequests__Card_Actions_CreateBet obj={this.props.obj} type="search"/>
                        <PriceRequests__Card_Actions_CreateBookmark obj={this.props.obj}/>
                    </FlexBox>
                );
            break;
        }

        //  формируем короткий адрес откуда и куда
        //  для грузовладельца формируем линк для перехода на подробную карточку 
        let fromAddrShort = this.props.obj.from_addr.substr( this.props.obj.from_addr.lastIndexOf(',')+1 );
        let toAddrShort = this.props.obj.to_addr.substr( this.props.obj.to_addr.lastIndexOf(',')+1 );
        let viewHref = "/#/dashboard/price-requests/view/" + this.props.obj.price_request_id;
        let title = (this.props.opt.type == "created") ? 
                                                        <a target="_blank" href={viewHref}><span className="PriceRequests__Card_title">{fromAddrShort}&nbsp;&rarr;&nbsp;{toAddrShort}</span></a> 
                                                       : <span className="PriceRequests__Card_title">{fromAddrShort}&nbsp;&rarr;&nbsp;{toAddrShort}</span>;
        let classPriceRequestAddress = (this.props.opt.type == "created") ? "PriceRequests__Card_address-created" : "PriceRequests__Card_address";
        let classPriceRequestFooter = (this.props.opt.type == "created") ? "PriceRequests__Card_footer-created" : "PriceRequests__Card_footer";

        return (
            <div className="PriceRequests__Card">
                <FlexBox direction="row" justify="between" alignItems="center">
                    <div className="PriceRequests__Card_header"><span>{countBadge}</span><span>{title}</span> </div>
                    {actions}
                </FlexBox>
                <FlexBox direction="row" justify="between" alignItems="start">
                    <div className={classPriceRequestAddress}>
                        {this.props.obj.from_addr}&nbsp;&rarr;&nbsp;{this.props.obj.to_addr}
                        <div className="padd-top">
                            <a target="_blank" href={'#/dashboard/comp/' + this.props.obj.comp_id}>{this.props.obj.name}</a><br/>
                            <strong>ИНН:</strong> {this.props.obj.inn}<br/>
                            <strong>Адрес:</strong> {this.props.obj.addr}
                        </div>
                    </div>
                    <div className={classPriceRequestFooter}>{this.props.obj.unit}&nbsp;<Icon iconName="pay-icon" size={18} className="icon-color marg-icon"/></div>
                </FlexBox>
                <FlexBox direction="row" justify="between" alignItems="start">
                    <FlexBox direction="row" alignItems="start">
                        <div className={classPriceRequestFooter}><Icon iconName="clock-icon" size={18} className="icon-color marg-icon"/>{this.props.obj.shipment_time}</div>
                        <div className={classPriceRequestFooter}><Icon iconName="cargo-icon" size={18} className="icon-color marg-icon"/>
                            <span className="PriceRequests__Card_cargo">{this.props.obj.cargo_name}</span>:&nbsp;
                            <span className="PriceRequests__Card_cargo">{this.props.obj.volume}&nbsp;</span>м<sup>3</sup>,&nbsp;
                            <span className="PriceRequests__Card_cargo">{this.props.obj.mass}</span>&nbsp;т.
                        </div>
                        {(this.props.obj.note) ? <div className={classPriceRequestFooter}><Icon iconName="comment-icon" size={18} className="icon-color marg-icon"/>{this.props.obj.note}</div> : null}
                    </FlexBox>
                    <FlexBox direction="row" alignItems="start">
                        <div className="PriceRequests__Card_ctime"><TblDateUTCCls value={this.props.obj.ctime}/></div>
                    </FlexBox>
                </FlexBox>
            </div>
        )
    }
}

export {PriceRequests__Card}

// {(this.props.opt.type == "created") ? (<div>Created</div>) : null}