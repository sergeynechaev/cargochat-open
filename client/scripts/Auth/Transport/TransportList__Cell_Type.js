var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {logger} from '../../Classes/Logger';

class TransportList__Cell_Type extends React.Component {

	constructor( props ) {
        super( props );
    }

    render = ()=> {

        return (
            <div>
            	{AppState.Transport.getVehicleType(this.props.obj.type)}
            </div>
        )
    }
}

export {TransportList__Cell_Type}