// import _ from 'lodash';

import {Api, xreq} from '../../api';
import {logger} from '../../Classes/Logger';

export default class DataTableProvider {

    constructor() {
        this.clear();
    }

    // TODO: разделить логику работы с уже полученными данными (store) и запросы к апи 

    

    _subscribers = null;
    _req = null;
    _handler = null;    // handler on load data from api

    _filterable = [];   // list of filterable fields
    _columns = [];      // list of columns

    _cm = null;         // api command
    _permanentFilters = []; // permanent filters
    _filters = {};      // filters send to api as params
    _fields = [];       // fields send to api as params
    _params = {};       // rest api params

    // data table display params
    _displayParams = {
        showFilter: true,
        showHeader: true,
        baseColumnWidth: null,  // расчетное значение для ширины ячейки, в %
    };

    clear =()=> {
        this._store = [];
        this._total = 0;
        this._limit = 10;     // default limit
        this._offset = 0;    // default offset
    }


    /** Setters */

    setCm =(cm)=> {
    	this._cm = cm || null;
    }

    setParam =(name, value)=> {
    	this._params[name] = value;
    }

    setLimit =(limit)=> {
        this._limit = limit;
    }

    setOffset =(offset)=> {
        this.offset = offset;
    }

    setFields =(fields)=> {
        this._fields = fields;
    }

    // вход - объект с данными фильтра, например: Object {mass_eq: "10", volume_eq: "12"}
    // установленные фильтры хранятся в формате, привычном для апи: [["id","lt",30],["id","gt",10]]
    setFilter =(filters)=> {
        this._filters = {};

        Object.keys(filters).forEach( filterName => {
            let name = filterName.substr( 0, filterName.lastIndexOf('_') );
            let cond = filterName.substr( filterName.lastIndexOf('_') + 1 );
            this._filters[filterName] = [ name, cond, filters[filterName] ];
        })

        logger.log('setFilter end ', this, this._filters);
    }

    // фильтр, который будет применяться при каждом вызове апи
    setPermanentFilter =(filters)=> {
        if( !(filters || []).length ) return;
        this._permanentFilters = filters.map( filter => filter );

        logger.log('setConstFilter end ', this, this._permanentFilters);
    }

    // поля для фильтрации храним по ключу имя+условие, например: addr_eq, date_lt
    setFilterable =(fields)=> {
        fields.forEach( filterParams => {
            // set defaults
            if( !filterParams.condition ) filterParams.condition = 'eq';
            if( !filterParams.type ) filterParams.type = 'text';

            // для поля типа address проверяем, установлены ли доп поля pointX и pointY
            if( filterParams.type == 'address' ) {
                if( !filterParams.pointX ) filterParams.pointX = filterParams.name + '_x';
                if( !filterParams.pointY ) filterParams.pointY = filterParams.name + '_y';
            }

            let fieldName = filterParams.name.toLowerCase() + '_' + filterParams.condition.toLowerCase();
            filterParams.fieldName = fieldName;

            this._filterable.push( filterParams );
        });

        logger.log('filterable set= ', this, this._filterable);
    }

    setColumns =(columns)=> {
        columns.forEach( columnParams => {
            // set defaults
            if( !columnParams.width ) columnParams.width = 1;
            if( !columnParams.sortable ) columnParams.sortable = false;

            this._columns.push( columnParams );
        });

        this._setBaseColumnsWidth();

    	logger.log('columns set= ', this, this._columns);
    }

    // handler for loaded data
    setHandler =(hr)=> {
        // logger.log('setHandler = ' + typeof hr);
        if( typeof hr == 'function' ) this._handler = hr;
    }

    // calculate base column width in % based on 'width' index setted in parametes setColumns()
    // this base width will be used to calculate: columnActualWidth = baseColumnWidth * columnWidthIndex
    _setBaseColumnsWidth =()=> {
        let colUnits = parseInt( this._columns.reduce( (sum, curCol) => sum += curCol.width, 0 ) );
        if( !isNaN(colUnits) && colUnits > 0 ) this._displayParams.baseColumnWidth = Math.floor( 100 / colUnits );
        logger.log('_setBaseColumnsWidth = ' + colUnits, this, this._displayParams);
    }


    /**
     * Getters
     * 
     * TODO: use immutable data structures 
     */

    getFilterable =()=> { 
    	return this._filterable;
        // return _.clone(this._filterable, true) 
    }

    getColumns =()=> { 
    	return this._columns;
        // return _.clone(this._columns, true) 
    }

    getBaseColumnWidth =()=> {
        return this._displayParams.baseColumnWidth;
    }

    getTotal =()=> {
        return this._total;
    }

    getFiltersForApi =()=> {
        let filters = [];
        Object.keys(this._filters).forEach( key => {
            filters.push(this._filters[key])
        });

        if( this._permanentFilters.length ) filters = this._permanentFilters.concat( filters );

        logger.log('getFiltersForApi', this, filters);

        return filters;
    }

    // show names for filters set as filterable
    // don't show subfield names such as pointX, pointY
    getFiltersForPrint =()=> {
        let filters = [];
        Object.keys(this._filters).forEach( key => {
            let [name,cond,value] = this._filters[key];
            let fieldName = name+'_'+cond;
            if( this.isFilterable(fieldName) ) {
                filters.push({ title: this.getFilterTitle(fieldName), 
                               value: value, 
                               condition: cond, 
                               type: this.getFilterType(fieldName) });
            }
        });
        return filters;
    }

    getFilterValue =(field)=> {
        if( !(field in this._filters) ) return null;
        let [name,cond,value] = this._filters[field];
        return value;
    }

    getFilterTitle =(fieldName)=> {
        return this.getFilterByName(fieldName) !== null && this.getFilterByName(fieldName).title ? this.getFilterByName(fieldName).title : '';
    }

    getFilterType =(fieldName)=> {
        return this.getFilterByName(fieldName) !== null && this.getFilterByName(fieldName).type ? this.getFilterByName(fieldName).type : null;
    }

    getFilterByName =(fieldName)=> {
        let fld = this._filterable.filter( flt => flt.fieldName == fieldName );
        return fld[0] ? fld[0] : null;
    } 

    getStoreSize =()=> {
        return this._store.length;
    }

    getLimit =()=> {
        return this._limit;
    }


    /* Checks */

    isFilterable =(fieldName)=> {
        return this._filterable.some( filter => filter.fieldName == fieldName );
    }


    /* Actions */

    cancel =()=> {
    	logger.log('cancel', this);

        if( this._req ) { 
        	this._req.cancel();
        	this._req = null; 
        }
    }

    load =()=> {
    	if( !this._cm ) return;

        this.cancel();

        let params = this.buildParams();
        logger.log('PARAMS', this, params);

        this._req = new xreq(this._cm, params, this._onDataLoaded);
    }

    buildParams =()=> {
        // first get request's specific params
        let params = this._params;

        // then get the obligatory ones
        params.fields = this._fields;
        params.filters = this.getFiltersForApi();
        params.limit = this._limit;
        params.offset = this._offset;

        return params;
    }

    subscribe =()=> {
        // ТОDO: сделать подписку на события провайдера любому желающему
    }

    showMore =()=> {
        if( this._offset + this._limit >= this._total ) return false;
        this._offset += this._limit;
        this.load();
        return true;
    }

    appendData =(data)=> {
        if( !data ) return;
        this._store = this._store.concat(data);

        // logger.log('appendData', this, this._store);
    }


    /* Handlers */

    _onDataLoaded =(req)=> {
    	logger.log('onDataLoaded', this, req);

        this.cancel();
        if( req.res.err ) return;
        this.appendData(req.res.data);
        this._total = req.res.total ? req.res.total : 0;

        this._onUpdate();
    }

    _onUpdate =()=> {
        // logger.log('onUpdate', this, this._handler, this._store);
        if( this._handler ) this._handler(this._store);
    }

    _onError =()=> {

    }

}