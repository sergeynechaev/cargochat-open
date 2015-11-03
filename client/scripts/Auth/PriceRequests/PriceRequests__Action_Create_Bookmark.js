import React from 'react/addons';

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';

export default class PriceRequests__Action_Create_Bookmark extends React.Component {
	
    state = {}

    createBookmark =()=> {
        AppState.PriceRequests.createBookmark( this.props.item.price_request_id );
    }

    render = ()=> {

    	if( AppState.PriceRequests.isBookmarkExists( this.props.item.price_request_id ) ) {
            return (
                <div style={{width:22}} data-tooltip="Уже в закладках" className="pagin-pls">
                    <Icon iconName="check-circle-icon" size={22}/>
                </div>
            )
        } else {
            return (
                <div style={{width:22}} data-tooltip="Добавить в закладки" className="pagin-pls" onClick={this.createBookmark}>
                    <Icon iconName="bookmark-icon" size={22}/>
                </div>
            )
        }
        
    }
}
