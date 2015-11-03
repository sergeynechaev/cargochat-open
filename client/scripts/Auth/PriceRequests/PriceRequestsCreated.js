var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import DataTable from '../../Controls/DataTable/DataTable';
import DataTableProvider from '../../Controls/DataTable/DataTableProvider';

import {PriceRequests__Cell_Address} from './PriceRequests__Cell_Address';
import {PriceRequests__Cell_Cargo} from './PriceRequests__Cell_Cargo';
import {PriceRequests__Cell_Unit} from './PriceRequests__Cell_Unit';
import {PriceRequests__Cell_Actions} from './PriceRequests__Cell_Actions';


export class PriceRequestsCreated extends React.Component {

	constructor(props) {
        super(props);

        this.provider = new DataTableProvider();
        this.initProvider();
    }
    
	state = {}

	componentWillMount =()=> {}

	componentDidMount =()=> {}

	componentWillUnmount =()=> {}

	componentWillReceiveProps =()=> {}

	componentDidUpdate =()=> {}

	initProvider =()=> {
		// параметры апи - команда, список полей, доп параметры
    	this.provider.setCm('price_requests_list');
    	this.provider.setParam('type', 'regular');
    	this.provider.setFields(["price_request_id",
		                        "cargo_name", 
		                        "from_addr",
		                        "from_x",
		                        "from_y",
		                        "to_addr",
		                        "to_x",
		                        "to_y",
		                        "volume", 
		                        "mass", 
		                        "unit", 
		                        "ctime", 
		                        "shipment_time", 
		                        "bets",
		                        "bet",
		                        "bet_flags",
		                        "comp_id",
		                        "name",
		                        "inn",
		                        "addr",
		                        "note",
		                        "flags",
		                        ]);
    	//  фильтр, который будет применяться при каждом обращении к апи
    	this.provider.setPermanentFilter([ ["comp_id", "eq", AppState.myCompany.id] ]);

    	// поля кастомных фильтров
    	this.provider.setFilterable([{name: 'from_addr', title: 'Откуда', type: 'address', pointX: 'from_x', pointY: 'from_y'},
		                             {name: 'to_addr', title: 'Куда', type: 'address', pointX: 'to_x', pointY: 'to_y'},
		    					    ]);

    	// колонки
    	this.provider.setColumns([{name: "address", title: "Адреса погрузки/разрузки", renderer: PriceRequests__Cell_Address, rendererProps: {type: "created"}, width: 2},
		    					  {name: "cargo", title: "Параметры груза", renderer: PriceRequests__Cell_Cargo},
		    					  {name: "unit", title: "Ед. изм", renderer: PriceRequests__Cell_Unit},
		    					  {name: "actions", title: "Действия", renderer: PriceRequests__Cell_Actions, rendererProps: {type: "created"}}, 
		    					 ]);

	}

	render = ()=> {

		logger.log('render PR received ', this);

		return (
			<div>
				<DataTable provider={this.provider} />
			</div>
		)
	}

}