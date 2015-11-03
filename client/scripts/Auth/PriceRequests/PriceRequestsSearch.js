var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import DataTable from '../../Controls/DataTable/DataTable';
import DataTableProvider from '../../Controls/DataTable/DataTableProvider';

import {PriceRequests__Cell_Address} from './PriceRequests__Cell_Address';
import {PriceRequests__Cell_Cargo} from './PriceRequests__Cell_Cargo';
import {PriceRequests__Cell_Company} from './PriceRequests__Cell_Company';
import {PriceRequests__Cell_Bet} from './PriceRequests__Cell_Bet';
import {PriceRequests__Cell_Actions} from './PriceRequests__Cell_Actions';


export class PriceRequestsSearch extends React.Component {

	constructor(props) {
        super(props);

        // this.provider = new PriceRequestsSearchProvider;
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

    	// 
    	// Офсеты - лимиты. По умолчанию limit = 10, offset = 0.
    	// 
    	// this.provider.setLimit(5);
    	// this.provider.setOffset(0);
    	

    	// 
    	// setFilterable
    	// 
    	// Поля, которые будут показаны в разделе фильтр
    	// 
    	// name: 		(string)	Имя поля из выборки апи, должно совпадать с реальным полем, заданным в setFields
    	// title: 		(string)	Подпись (label) рядом с полем фильтра
        // type: 		(string)	Тип поля фильтра, доступные значения: text | date | address 	
        // 							По умолчанию: text
        // 								Тип поля address дополнительно принимает 2 названия полей pointX, pointY для записи координат X,Y
        // 								Если они не заданы, в фильтр будут переданы поля name+[x,y], например:
        // 								name = 'from_addr', поля координат X,Y => from_addr_x, from_addr_y
        // condition: 	(string)	Условие фильтра:    =    <    >    <=    >=    <>
        // 							Доступные значения: eq | lt | gt | lte | gte | neq	
        // 							По умолчанию: eq
        // 
    	this.provider.setFilterable([{name: 'mass', title: 'Масса, тонн: от', type: 'text', condition: 'gte'},
		                             {name: 'mass', title: 'Масса, тонн: до', type: 'text', condition: 'lte'},
		                             {name: 'volume', title: 'Объем, m3: от', type: 'text', condition: 'gte'},
		                             {name: 'volume', title: 'Объем, m3: до', type: 'text', condition: 'lte'},
		                             {name: 'from_addr', title: 'Откуда', type: 'address', pointX: 'from_x', pointY: 'from_y'},
		                             {name: 'to_addr', title: 'Куда', type: 'address', pointX: 'to_x', pointY: 'to_y'},
		    					    ]);

    	// 
    	// setColumns
    	// 
    	// Колонки таблицы (в порядке вывода)
    	// 
    	// name: 		(string) 	имя. Если не задан renderer, то будет выведено поле с таким id (если существует)
    	// 		 				 	например, name: "mass" покажет в ячейке поле mass из выборки апи. Параметр renderer имееет приоритет над name!
    	// title: 		(string) 	заголовок колонки в таблице
    	// sortable:  	(boolean)	включает сортировку по столбцу, по умолчанию false [пока не реализовано]
    	// renderer:  	(object)	React component, используемый для отрисовки ячейки. В компонент через props будет передан объект
    	// 							context, содержащий все поля текущего объекта выборки из апи
    	// width: 		(number)	"Жадность" ячейки для управления размером по ширине. По умолчанию у всех = 1. Задание width = 2 выведет 
    	// 							эту ячейку в 2 раза шире остальных.
    	// 							
    	this.provider.setColumns([{name: "address", title: "Адреса погрузки/разрузки", renderer: PriceRequests__Cell_Address, width: 2},
    							  {name: "company", title: "Компания", renderer: PriceRequests__Cell_Company, width: 2},
		    					  {name: "cargo", title: "Параметры груза", renderer: PriceRequests__Cell_Cargo},
		    					  {name: "bet", title: "Ваша ставка", renderer: PriceRequests__Cell_Bet},
		    					  {name: "actions", title: "Действия", renderer: PriceRequests__Cell_Actions}, 
		    					 ]);



    	// СТАРОЕ
    	// 
    	// непонятно, зачем тут даты для поиска, т.к. время задано текстом и примерное
    	// this.provider.setFilterable([{name: 'ctime', title: 'Дата погрузки', type: 'date', condition: 'gt'},
		   //                           {name: 'ctime', title: 'Дата разгрузки', type: 'date', condition: 'lt'},
		   //  						 {name: 'mass', title: 'Масса', type: 'text'},
		   //  						 {name: 'volume', title: 'Объем', type: 'text'},
		   //  						 {name: 'from_addr', title: 'Откуда', type: 'address'},
		   //                           {name: 'to_addr', title: 'Куда', type: 'address'},
		   //  					   ]);

    	// старое поведение (если включаем, нужен еще костыль в DataTable, useCustomRenderer() )
    	// this.provider.setColumns([ {name: "card", title: "Поиск запросов ставок", renderer: PriceRequests__Card}, 
		   //  					]);
	}

	render = ()=> {

		// logger.log('render Search2', this);

		return (
			<div>
				<DataTable provider={this.provider} />
			</div>
		)
	}

}