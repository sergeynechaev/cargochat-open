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

class PriceRequestsView__Card_Bet extends React.Component {

	constructor( props ) {
        super( props );
    }
    render = ()=> {

    	let vat = (this.props.obj.bet_flags) ? "с НДС" : "без НДС";

        return( 
            <div>
                {this.props.obj.bet} <span>{vat}</span>
            </div>
        )
    } // render
}

export {PriceRequestsView__Card_Bet}