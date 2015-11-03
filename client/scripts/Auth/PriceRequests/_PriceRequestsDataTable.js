var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages
} from '../../SimpleComponents/SimpleTable2';
import {Loading} from '../../SimpleComponents/Loading';

import {PriceRequests__Card} from './PriceRequests__Card';


class PriceRequestsDataTable extends React.Component {

    render() {

    	this.opt = {
    		// title
            headerClass: TblHead,
            className: "panel panel-default max-size",
            headData: [{id: 'context', title: 'Запросы ставок', cellClass: PriceRequests__Card}],
            // body + data
            bodyClass: TblBody,
            bodyData: this.props.priceRequests,
            // paginator
            pagesClass: TblPages,
            pagesConf: {
                availableCapacity: [2, 5, 10],
                currentCapacity: 10,
                currentPage: 1
            },
            //title: 'Запрос ставок',
            selectionKey: 'sKey',
            selectable: false,
            multiselect: true,
            // custom parameters
            type: this.props.type
        }

        // return (
        //     <Loading dontShow={true} dataRecived={this.props.priceRequests.length}>
        //         <div className='box-row-wr align-s-start'>
        //                 <SimpleTable2 opt={this.opt}/>
        //             </div>
        //     </Loading>
        // )

        logger.log(this.props.priceRequests);

        if( AppState.PriceRequests.isUpdating ) {
            return (
                <div>
                    Загрузка...
                </div>
            )

        } else {
            if( this.props.priceRequests.length ) {
                return (
                    <div className="row">
                        <div className="col-xs-12">
                            <SimpleTable2 opt={this.opt}/>
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    Запросов ставок не найдено.
                </div>
            )
        }

    } // render
}

export {PriceRequestsDataTable}