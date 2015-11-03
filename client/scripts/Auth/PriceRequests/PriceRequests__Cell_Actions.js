var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import PriceRequests__Action_Create_Bookmark from './PriceRequests__Action_Create_Bookmark';
import PriceRequests__Action_Delete_Bookmark from './PriceRequests__Action_Delete_Bookmark';
import PriceRequests__Action_Delete_Created from './PriceRequests__Action_Delete_Created';
import PriceRequests__Action_Delete_Received from './PriceRequests__Action_Delete_Received';

export class PriceRequests__Cell_Actions extends React.Component {
	
    state = {
    }

    render = ()=> {

        let actions = [];
        let countBadge = null;

        let viewHref = "/#/dashboard/price-requests/view/" + this.props.item.price_request_id;

        countBadge = (this.props.item.bets) 
            ? <div className="PriceRequests__Card_bets">{this.props.item.bets}</div> 
            : <div className="PriceRequests__Card_bets_zero">0</div>;

        switch( this.props.type ) {
            case 'created':
                actions.push( <PriceRequests__Action_Create_Bookmark key={1} item={this.props.item} />, 
                              <PriceRequests__Action_Delete_Created key={2} item={this.props.item} /> );
            break;

            case 'received':
                actions.push( <PriceRequests__Action_Create_Bookmark key={1} item={this.props.item} />, 
                              <PriceRequests__Action_Delete_Received key={2} item={this.props.item} /> );
            break;

            case 'bookmarks':
                actions.push( <PriceRequests__Action_Delete_Bookmark key={1} item={this.props.item} /> );
            break;
        }

        return (
            <div>
                <div className="row row-space-children">{actions}</div>
                <div>
                    {this.props.type == 'created' &&
                        <div><span className="table__inner-caption"><a href={viewHref} target="_blank">Кол-во предложений:</a></span>{countBadge}</div>
                        }
                </div>
            </div>
        )

    }
}
