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
import Logger from '../../Classes/Logger';

class PriceRequests__Card_Actions_Search extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
    }

    state = {
    }

    createBookmark =()=> {
        AppState.PriceRequests.createBookmark( this.props.obj.price_request_id );
    }

    render = ()=> {
        return (
            <div className="box-row-nw">
                <div data-tooltip="Добавить в закладки"className="pagin-pls" onClick={this.createBookmark}>
                    <Icon iconName="bookmark-icon" size={20}/>
                </div>
            </div>
        )
    } // render
}

export {PriceRequests__Card_Actions_Search}