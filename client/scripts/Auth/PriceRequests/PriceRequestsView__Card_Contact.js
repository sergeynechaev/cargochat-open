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
import {logger} from '../../Classes/Logger';

class PriceRequestsView__Card_Contact extends React.Component {

	constructor( props ) {
        super( props );
    }
    render = ()=> {

    	//logger.log('contact', this.props.obj.contact.id)

        return (
            <div>
            	{this.props.obj.contact.first_name} {this.props.obj.contact.last_name}
            </div>
        )
    } // render
}

export {PriceRequestsView__Card_Contact}