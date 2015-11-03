var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

class PriceRequests__Card_Actions_DeleteBookmark extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
    }

    state = {
    }

    deleteBookmark =()=> {
        AppState.PriceRequests.deleteBookmark( this.props.obj.price_request_id );
    }

    render = ()=> {

    	let modalWindowProps = {
            title: "Удаление",
            width: 300,
            height: 100
        };

        return (
                <div data-tooltip="Удалить из закладок" className="pagin-pls" onClick={this.deleteBookmark}>
                    <Icon iconName="delete-icon" size={20}/>
                </div>
        )
    } // render
}

export {PriceRequests__Card_Actions_DeleteBookmark}