// 
// 
// DEPRECATED
// 
// настройки провайдера задаются через компонент, в данный момент это лишний файл
// 
// 

import {Api, xreq} from '../../api';
import {logger} from '../../Classes/Logger';

import DataTableProvider from '../../Controls/DataTable/DataTableProvider';

import {PriceRequests__Card_Actions_Search} from './PriceRequests__Card_Actions_Search';


export default class PriceRequestsSearchProvider extends DataTableProvider {

	constructor() {
        super();

        this.init();
    }

    init =()=> {
    	logger.log('init PriceRequestsSearchProvider');

    	// api request params
    	this.setCm('price_requests_list');
    	this.setParam('type', 'regular');
    	this.setFields(["price_request_id",
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

    	// this.setLimit(5);
    	// this.setOffset(0);
    	
    	// fields will be shown in filter section
    	// availiable types: text | date | fromDate | tillDate | address |
        // condition: 'eq' by default
        // type: 'text' by default
    	this.setFilterable([ {name: 'ctime', title: 'Дата погрузки', type: 'date', condition: 'gt'},
                             {name: 'ctime', title: 'Дата разгрузки', type: 'date', condition: 'lt'},
    						 {name: 'mass', title: 'Масса', type: 'text'},
    						 {name: 'volume', title: 'Объем', type: 'text'},
    						 {name: 'from_addr', title: 'Откуда', type: 'address'},
                             {name: 'to_addr', title: 'Куда', type: 'address'},
    					   ]);

    	// columns data in order of appearance
    	this.setColumns([ {name: "addr", title: "Откуда", sortable: true},
    					  {name: "to_addr", title: "Куда"},
    					  {name: "mass", title: "Масса"},
    					  {name: "volume", title: "Объем"},
    					  {name: "actions", title: "Действия", renderer: PriceRequests__Card_Actions_Search}, 
    					]);
		
    }

}