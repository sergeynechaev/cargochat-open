import React, {Component} from 'react/addons';
import moment from 'moment';
// import _ from 'lodash';

import {logger} from '../../Classes/Logger';

import {FormGroup} from '../../Controls/Forms/FormGroup';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {InputAddress} from '../../Controls/Forms/InputAddress';
import {InputDate} from '../../Controls/Forms/InputDate';

export default class DataTable__Filter extends Component {

	constructor() {
		super();

        moment.locale('ru');
    }

	state = {
		isOpen: false,
	}

	_tmpFilters = {};		// временное хранилище введенных значений

	componentWillMount =()=> {}

	componentDidMount =()=> {
		// this.provider = this.props.provider;
	}

	componentWillUnmount =()=> { }

	componentWillReceiveProps =()=> {
		// this.provider = this.props.provider;
	}

	componentDidUpdate =()=> {}

	renderFilters =()=> {
		let filters = this.props.provider.getFilterable();
		let filtersList = filters.map( (field,index) => this.renderField(field,index) );
		return this.layoutFilters(filtersList, 4);	// на 4 колонки
	}

	renderField =(field, fieldIndex)=> {
		let value = this.props.provider.getFilterValue(field.fieldName);
		let fieldInput = null;

		// logger.log('renderField name= ' + field.fieldName + " val= "+value);
		
		switch( field.type ) {
			case 'text':
				fieldInput = <InputSimple ref={field.fieldName} 
										  name={field.fieldName} 
										  onChange={this.onChangeInputText} 
										  defaultValue={value} />;
				break;

			case 'date':
				fieldInput = <InputDate ref={field.fieldName} 
										 name={field.fieldName} 
										 onChange={this.onChangeInputDate}  
										 defaultValue={ value ? moment(value * 1000) : null } 
										 placeholder="выберите дату" />;
				break;

			case 'address':
				fieldInput = <InputAddress ref={field.fieldName} 
										   name={field.fieldName} 
										   onSelect={this.onSelectInputAddress}  
										   defaultValue={value} 
										   caption={field.title} active={true} />;
                break;
		}

		if( !fieldInput ) return null;

		return (
			<FormGroup key={fieldIndex} name={field.title} from={field.fieldName}>{fieldInput}</FormGroup>
		)
	}

	// разбиваем поля фильтров на указанное число колонок (по умолчанию 2)
	layoutFilters =(filtersList, cols=2)=> {
		let layout = [];
		let i = 0;
		while( i <= filtersList.length ) {
			let filterSlice = null;
			try { filterSlice = filtersList.slice(i, i+cols) } catch(e) {}
			layout.push( <div key={i} className="row row-nw row-between row-space-children">{filterSlice}</div> );
			i += cols;
		}
		return layout;
	}

	printFilters =()=> {
		let activeFilters = this.props.provider.getFiltersForPrint() || [];

		if( !activeFilters.length ) return <div>не установлен</div>;

		return activeFilters.map( (filter,index) => {
			let value = filter.type == 'date' ? moment(filter.value * 1000).format("D MMMM YYYY") : filter.value;	// humanize date
			return <div key={index}>{filter.title}: {value}</div>
		})
	}

	onChangeInputText =(obj)=> {
		let field = Object.keys(obj).pop();
		this.saveFilter(field, obj[field]);
	}

	onSelectInputAddress =(addr, obj, x, y)=> {
		// logger.log('onSelectInputAddress', this, addr, obj, x, y);

		this.saveFilter(obj.params.fieldName, obj.params.address);

		// get X an Y points of address
		let fld = this.props.provider.getFilterByName(obj.params.fieldName);
		if( !fld ) return;
		this.saveFilter(fld.pointX, x);
		this.saveFilter(fld.pointY, y);
	}

	onChangeInputDate =(obj)=> {
		logger.log('onChangeInputDate', this, obj);

		let field = Object.keys(obj).pop();
		this.saveFilter(field, obj[field]);
	}

	// по вводу фильтров запоминаем введенные значения, но храним их пока у себя,
	// не передавая в провайдер (туда они попадут только по нажатию "найти")
	saveFilter =(filterName, value)=> {
		if( value ) this._tmpFilters[filterName] = value;
        	else delete this._tmpFilters[filterName];

        logger.log('saveFilter', this, this._tmpFilters);
	}
	
	applyFilters =()=> {
		logger.log('applyFilters', this, this._tmpFilters);

		this.props.provider.setFilter(this._tmpFilters);
	}

	resetFilters =()=> {
		this._tmpFilters = {};
	}

	toggleFilter =()=> {
		this.setState({isOpen: !this.state.isOpen});
	}

	find =()=> {
		this.applyFilters();				// запоминаем фильтры только по нажатию кнопки "найти"
		this.props.provider.clear();
		this.props.provider.load();
		this.setState({isOpen: false});
		if( this.props.onFilter ) this.props.onFilter();
	}

	clear =()=> {
		this.resetFilters();
		this.find();
	}

    render =()=> {

    	// logger.log('render Filter', this, this.props);

    	return (
    		<div className="data-table__filter">
    			<div className="data-table__filter-header">
					<div className="data-table__filter-print">
						<span className="data-table__filter-print--title">Фильтр</span>{ this.state.isOpen ? null : this.printFilters() }
					</div>
    				<div className="data-table__filter-toggle pointer" onClick={this.toggleFilter}>{this.state.isOpen ? "[Скрыть фильтр]" : "[Показать фильтр]"}</div>
    			</div>
    			{ this.state.isOpen 
    					? <div className="data-table__filter-fields">
			    			{this.renderFilters()}
			    			<div className="row row-space-children padd-top row-end">
				    			<ButtonSimple onClick={this.find} brand="success" size="small" caption="Найти"/>
				    			<ButtonSimple onClick={this.clear} brand="warning" size="small" caption="Сбросить фильтр"/>
			    			</div>
		    			  </div>
		    			: null }
    		</div>
    	)
    }

}