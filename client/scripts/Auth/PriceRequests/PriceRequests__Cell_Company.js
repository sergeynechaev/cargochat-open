var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

export class PriceRequests__Cell_Company extends React.Component {
	
    state = {
    }

    render = ()=> {
        return (
            <div>
                <a target="_blank" href={'#/dashboard/comp/' + this.props.context.comp_id}>{this.props.context.name}</a><br/>
                <strong>ИНН:</strong> {this.props.context.inn}<br/>
                <strong>Адрес:</strong> {this.props.context.addr}
            </div>
        )
    } 
}
