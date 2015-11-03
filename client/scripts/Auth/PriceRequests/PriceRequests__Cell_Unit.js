var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

export class PriceRequests__Cell_Unit extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
    }

    state = {
    }

    render = ()=> {

        return( 
            <div className="PriceRequests__Card_bet">
                {this.props.obj.unit}
            </div>
        )
    }
}

