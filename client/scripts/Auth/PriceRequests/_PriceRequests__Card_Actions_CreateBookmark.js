var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

class PriceRequests__Card_Actions_CreateBookmark extends React.Component {
	
    state = {
    }

    createBookmark =()=> {
        AppState.PriceRequests.createBookmark( this.props.obj.price_request_id );
    }

    render = ()=> {

        if( AppState.PriceRequests.isBookmarkExists( this.props.obj.price_request_id ) ) {
            return (
                <div data-tooltip="Уже в закладках" className="pagin-pls">
                    <Icon iconName="check-circle-icon" size={20}/>
                </div>
            )
        } else {
            return (
                <div data-tooltip="Добавить в закладки" className="pagin-pls" onClick={this.createBookmark}>
                    <Icon iconName="bookmark-icon" size={20}/>
                </div>
            )
        }
    } // render
}

export {PriceRequests__Card_Actions_CreateBookmark}