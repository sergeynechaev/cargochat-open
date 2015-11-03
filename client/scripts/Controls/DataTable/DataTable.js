import React, {Component} from 'react/addons';

import {Api} from '../../api';
import {logger} from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import DataTable__Header from './DataTable__Header';
import DataTable__Filter from './DataTable__Filter';
import DataTable__Footer from './DataTable__Footer';


/* 

DataTable умеет рисовать таблицу, используя выборку данных - то, что лежит у него в store

DataTable рисует колонки на основании конфига setColumns(), в качестве рендера ячейки может
быть использован внешний компонент

DataTable показывает фильтр по тем полям, которые заданы через setFilterable()

За выборку данных отвечает provider, именно он знает, какой командой и какие поля получить из api

*/

export default class DataTable extends Component {

    // constructor(props) {
    //     super(props);
    // }
    // 
    
    static propTypes = {
        // list    : React.PropTypes.array,
        // onSelect: React.PropTypes.func,
        // name    : React.PropTypes.func,
        // hidden  : React.PropTypes.bool
    }

    state = {
    	data: null,
    	isAppending: false,
    	isUpdating: false,
    }

	componentWillMount =()=> {}

	componentDidMount =()=> {
		this.initProvider(this.props);
	}

	componentWillUnmount =()=> {
		this.provider.cancel();
	}

	componentWillReceiveProps =()=> {}

	componentDidUpdate =()=> {}

	onDataLoaded =(data)=> {
		logger.log('onDataLoaded at DATA TABLE', this);
		this.setState({data: data, isAppending: false, isUpdating: false});
	}

	initProvider =(props)=> {
		this.provider = props.provider;
		this.provider.setHandler(this.onDataLoaded);
		this.provider.load();
	}

	renderData =()=> {
		return this.state.data.map( (item,index) => {
			// logger.log('renderData', this, item);
			return this.renderRow(item,index);
		})
	}

	renderRow =(item, itemIndex)=> {
		let cols = this.provider.getColumns();
		let values = cols.map( (col,index) => {
			if( col.renderer ) return this.useCustomRenderer(col, item, index);	// custom renderer
			if( col.name in item ) return this.useDefaultRenderer(item[col.name], index);	// default renderer
			return <td key={index}></td>;													// empty cell
    	})
    	return <tr key={itemIndex}>{values}</tr>
	}

	useDefaultRenderer =(value, valueIndex)=> {
		return <td key={valueIndex}>{value}</td>
	}

	useCustomRenderer =(col, item, valueIndex)=> {
		// logger.log('useCustomRenderer', this, renderer, item)
		
		// props for external renderer
		let props = {};
		if( col.rendererProps ) props = col.rendererProps;
		props.item = item;
		props.obj = item;	// TEMP for compabiity
		props.context = item;	// TEMP for compabiity
		
		return <td key={valueIndex}>{React.createElement( col.renderer, props )}</td>

		// пока костыль для совместимости
		// return <td key={valueIndex}>{React.createElement( renderer, {obj: item, opt: {type: 'search'} } )}</td>
	}

	showMore =()=> {
		if( this.provider.showMore() ) this.setState({isAppending: true});
	}

	onFilter =()=> {
		this.setState({isUpdating: true});
	}

    render =()=> {

    	// logger.log('render DataTable', this, this.props, this.state);

    	if( !this.state.data ) return <div>Загрузка...</div>

		let btnShowMore = null;

		if( this.provider.getTotal() != this.provider.getStoreSize() ) {
			btnShowMore = this.state.isAppending 
					? <div>Загрузка...</div>
					: <div><ButtonSimple onClick={this.showMore} brand="success" size="small" caption={"Показать еще "+this.provider.getLimit()}/></div>;
		}

    	return (
    		<div>
    			<DataTable__Filter provider={this.provider} onFilter={this.onFilter} />
    			<div className="data-table__data">
    				{ this.state.isUpdating
			    		? <div>Загрузка...</div>
			    		: <table className="table">
			    			<DataTable__Header provider={this.provider} columns={this.provider.getColumns()} />
			    			<tbody>{this.renderData()}</tbody>
			    		  </table> }
	    		</div>
	    		<div className="data-table__footer row row-space-children padd-top">
	    			<div>Всего: {this.provider.getTotal()}</div>
	    			<div>Показано: {this.provider.getStoreSize()}</div>
	    			{btnShowMore}
	    		</div>
	    	</div>
    	)
    }

}
