import React from 'react/addons';

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';

export default class PriceRequests__Action_Delete_Bookmark extends React.Component {
	
    constructor( props ) {
        super( props );
    }
    
    state = {}

    deleteBookmark =()=> {
        AppState.PriceRequests.deleteBookmark( this.props.item.price_request_id );
    }

    render = ()=> {
        return (
                <div data-tooltip="Удалить из закладок" className="pagin-pls" onClick={this.deleteBookmark}>
                    <Icon iconName="delete-icon" size={20}/>
                </div>
        )
    }
}
