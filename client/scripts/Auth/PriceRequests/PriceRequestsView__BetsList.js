var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import Logger from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';

import {TblDateUTCCls} from '../../SimpleComponents/TableCells';


class PriceRequestsView__BetsList extends React.Component {

    constructor( props ) {
        super( props );
    }

    render = ()=> {

        // формируем активные кнопки в зависимости от типа запросов: созданные, входящие, закладки
        var actions = null;

        return (
            <FlexBox direction="column">
                <TblDateUTCCls value={this.props.obj.ctime}/>
                <div>Ставка: {this.props.obj.bet} {(this.props.obj.flags == 1) ? "с НДС" : "без НДС"}</div>
                <div>Перевозчики/Грузовл/Кол-во авто {this.props.obj.cnt_carriers}/{this.props.obj.cnt_customers}/{this.props.obj.cnt_vehicles}</div>
                <div>Компания: {this.props.obj.comp_id}</div>
                <div>Контакт: {this.props.obj.contact.first_name}  {this.props.obj.contact.last_name}</div>
                {actions}
            </FlexBox>
        )
    }
}

export {PriceRequestsView__BetsList}