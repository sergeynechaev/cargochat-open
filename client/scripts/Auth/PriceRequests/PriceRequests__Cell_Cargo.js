var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

export class PriceRequests__Cell_Cargo extends React.Component {
	
    state = {
    }

    render = ()=> {
        return (
            <div>
                <div><span className="table__inner-caption">Груз:</span>{this.props.context.cargo_name}</div>
                <div><span className="table__inner-caption">Объем:</span>{this.props.context.volume}&nbsp;м<sup>3</sup></div>
                <div><span className="table__inner-caption">Масса:</span>{this.props.context.mass}&nbsp;т.</div>
            </div>
        )
    } 
}
