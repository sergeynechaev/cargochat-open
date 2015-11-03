var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblPages
} from '../../SimpleComponents/SimpleTable2';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';

import {PriceRequestsView__Card} from './PriceRequestsView__Card';
import {PriceRequestsView__Card_Bet} from './PriceRequestsView__Card_Bet';
import {PriceRequestsView__Card_Company} from './PriceRequestsView__Card_Company';
import {PriceRequestsView__Card_Contact} from './PriceRequestsView__Card_Contact';
import {PriceRequestsView__Card_Tags} from './PriceRequestsView__Card_Tags';
import {PriceRequestsView__Card_Actions} from './PriceRequestsView__Card_Actions';

import {PriceRequestsView__BetsList} from './PriceRequestsView__BetsList';


class PriceRequestsView extends React.Component {

	constructor( props ) {
        super( props );
        this.query = [];
        this.requestID = 0;
        this.requestDetails = null;
    }
	
    state = {
        betsList: [],
        isBetsListNotReceived: true,
        requestDetails: []
    }

    componentWillReceiveProps = (props)=> {
        this.requestID = parseInt(props.params.id) || 0;
        this.setState( {betsList: [], isBetsListNotReceived: true} );
        this.update();
    };

    componentWillMount = ()=> {
        // AppState.PriceRequests.on("PriceRequests_betslist_complete",this.showBetsList);
        this.requestID = parseInt(this.props.params.id) || 0;
        // this.update();
    }

    componentDidMount = ()=> {
        AppState.PriceRequests.on("PriceRequests_betslist_complete",this.showBetsList);
        this.update();
    }

    componentWillUnmount = ()=> {
       AppState.PriceRequests.rem("PriceRequests_betslist_complete",this.showBetsList)
    }

    shouldComponentUpdate =(nextProps, nextState)=> {
        return ( nextState.requestDetails.length !== this.state.requestDetails.length 
                || nextState.betsList.length !== this.state.betsList.length
                || nextState.isBetsListNotReceived !== this.state.isBetsListNotReceived );
    }

    getBetsList = ()=> {
        // build params for searching
        let params = {
            "filters" : [
                        {"col": "price_request_id",
                        "op": "eq",
                        "val":this.requestID
                        }],
            "fields": [ "price_request_bet_id",
                        "price_request_id", 
                        "comp_id", 
                        "tags", 
                        "cnt_customers", 
                        "cnt_carriers", 
                        "cnt_vehicles", 
                        "ctime", 
                        "bet", 
                        "flags",
                        "contact" ]
        };
        AppState.PriceRequests.getPriceRequestBetsList( params );
    }

    showBetsList = (result)=> {
        this.setState( {betsList: result, isBetsListNotReceived: false} );
    }

    getPriceRequestDetails =(id)=> {
        this.requestDetails = AppState.PriceRequests.getPriceRequestDetails( id );
        this.setState({ requestDetails: this.requestDetails });
    }

    update = ()=> {
        this.getPriceRequestDetails( this.requestID );
        this.getBetsList();
    }

    render = ()=> {

        var details = this.requestDetails;
        let unit = (details || []).length ? details[0].unit : '';

        var headData = [
                    {id: 'ctime', title: 'Дата предложения', cellClass: TblDateUTCCls},
                    {id: 'bet', title: 'Ставка, '+unit, cellClass: PriceRequestsView__Card_Bet},
                    {id: 'comp_id', title: 'Компания', cellClass: PriceRequestsView__Card_Company},
                    {id: 'tags', title: 'Тип компании', cellClass: PriceRequestsView__Card_Tags},
                    {id: 'contact', title: 'Контакт', cellClass: PriceRequestsView__Card_Contact},
                    {id: 'actions', title: 'Действия', cellClass: PriceRequestsView__Card_Actions}
                ];

        this.opt = {
            headerClass: TblHead,
            className: "panel panel-default max-size",
            //headData: [{id: 'context', title: 'Таблица предложений', cellClass: PriceRequestsView__BetsList}],
            headData: headData,
            bodyClass: TblBody,
            bodyData: this.state.betsList,
            // paginator
            pagesClass: TblPages,
            pagesConf: {
                availableCapacity: [1, 5, 10],
                currentCapacity: 10,
                currentPage: 1
            },
            // custom parameters
            selectionKey: 'sKey',
            selectable: false,
            multiselect: true,
            type: "betslist"
        }

         // таблица предложений
        var betsList = (state)=> {
            if( state.isBetsListNotReceived ) {
                return (
                    <div>Загрузка предложений...</div>
                )
            }
            else if( state.betsList.length ) {
                return (
                    <div className='price-requests__bets-list'>
                        <SimpleTable2 opt={this.opt}/>
                    </div>
                )
            } else {
                return (
                    <div>Предложений не поступало.</div>
                )
            }
        };

        // logger.log('render PR', this, details);

        if( (details || []).length ) {
            return (
              <div className="max-size">
                {this.requestDetails.map( (item, id) => {
                    return  <PriceRequestsView__Card key={id} data={item}/>
                })}
                {betsList(this.state)}
              </div>
            )
        } else {
            return (
              <div>Загрузка ...</div>
            )
        }

    } // render

}

export {PriceRequestsView}
