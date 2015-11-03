var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblPages
} from '../../SimpleComponents/SimpleTable2';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';

import {TransportList__Cell_Type} from './TransportList__Cell_Type';
import {TransportList__Cell_Actions} from './TransportList__Cell_Actions';
import {TransportList__Cell_ImageHint} from './TransportList__Cell_ImageHint';

export class TransportList extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    paginator = {}

    state = {
        results: [],
    }

    paginator = {}

    componentWillMount = ()=> {
       this.setPaginator(5,1);
       AppState.Transport.on("Transport_vehicleslist_complete", this.showResults);
    }
    componentDidMount =()=> {
        AppState.Transport.getVehiclesList();
    }

    componentWillUnmount = ()=> {
       AppState.Transport.rem("Transport_vehicleslist_complete", this.showResults);
    }

    showResults =(result)=> {
        logger.log('Show results', result);
        this.setState({results: AppState.Transport.vehiclesList});
    }

    onPaginatorChange =(paginator)=> {
        this.setPaginator(paginator.props.opt.pagesConf.currentCapacity, paginator.props.opt.pagesConf.currentPage);
    }

    setPaginator(currentCapacity, currentPage) {
        this.paginator.currentCapacity = currentCapacity;
        this.paginator.currentPage = currentPage;
    }


    render = ()=> {
        
        let headData = [
            {id: 'model',   title: 'Модель'},
            {id: 'num',     title: 'Номер'},
            {id: 'type',    title: 'Тип ТС',   cellClass: TransportList__Cell_Type},
            {id: 'sts',     title: 'СТС',      cellClass: TransportList__Cell_ImageHint, cellOpt: {type:'sts'} },
            {id: 'pts',     title: 'ПТС',      cellClass: TransportList__Cell_ImageHint, cellOpt: {type:'pts'} },
            {id: 'actions', title: 'Действия', cellClass: TransportList__Cell_Actions}
        ];
        
        this.opt = {
            // title
            headerClass: TblHead,
            className: "panel panel-default max-size",
            headData: headData,
            // body + data
            bodyClass: TblBody,
            bodyData: this.state.results,
            // paginator
            pagesClass: TblPages,
            pagesConf: {
                availableCapacity: [2, 5, 10],
                currentCapacity: this.paginator.currentCapacity,
                currentPage: this.paginator.currentPage,
                onChanged: this.onPaginatorChange
            },
            selectionKey: 'sKey',
            selectable: false,
            multiselect: true,
            // custom parameters
            type: "list",
        }
        
        return (
            <div className="col-xs-12">
                <SimpleTable2 opt={this.opt}/>
            </div>
        )
        
    }

}