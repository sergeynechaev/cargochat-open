// 
// 
// DEPRECATED
// 
// 
// 


var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';


import {FormGroup} from '../../Controls/Forms/FormGroup';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {Validation} from '../../Validation';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {InputAddress} from '../../Controls/Forms/InputAddress';
import {InputCheckBox2} from '../../SimpleComponents/InputCheckBox2';
import {InputDate} from '../../Controls/Forms/InputDate';

import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblPages
} from '../../SimpleComponents/SimpleTable2';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';

import {PriceRequestsDataTable} from './PriceRequestsDataTable';
import {PriceRequests__Card} from './PriceRequests__Card';


export class PriceRequestsSearch2 extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
        
    }

    state = {
        searchResults: [],
        isSearchNotPerfomed: true,
        isNewSearch: false,
        isSearching: false,
    }

    paginator = {}

    componentWillMount = ()=> {
       this.setPaginator(5,1);
       AppState.PriceRequests.on("PriceRequests_search_complete",this.showResults);
    }

    componentWillUnmount = ()=> {
       AppState.PriceRequests.rem("PriceRequests_search_complete",this.showResults);
    }

    // shouldComponentUpdate =()=> {
    //     return this.state.isSearching;
    // }

    onChangeHandler = (obj)=> {
        this.setState( obj );
    }

    onSelectFromAddress = ( addr, obj, posX, posY )=> {
        logger.log( this, 'Select from address', addr + ", " + obj.name + ", " + posX + ", " + posY );
        this.setState({
            "from_addr": addr,
            "from_x": posX,
            "from_y": posY
        });
    }

    onSelectToAddress = ( addr, obj, posX, posY )=> {
        logger.log( this, 'Select to address', addr + ", " + obj.name + ", " + posX + ", " + posY );
        this.setState({
            "to_addr": addr,
            "to_x": posX,
            "to_y": posY
        });
    }

    showResults = (result)=> {
        logger.log(this,'showResults found = ',result.length);
        this.setState( {searchResults: result, isSearchNotPerfomed: false, isNewSearch: false, isSearching: false} );
    }

    searchPriceRequest = ()=> {

        // build params for searching
        let params = {
            "filters" : [],
            "fields": [ "price_request_id",
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
                        // "comp_name",
                        "bets",
                        "bet",
                        "bet_flags",
                        "comp_id",
                        "name",
                        "inn",
                        "addr",
                        "note",
                        "flags" ]
        };

        params.type = "regular";

        // 
        // search filters
        // 
        
        // volume
        if( this.state.volume && this.state.volume.length ) {
            params.filters.push( ["volume", "eq", this.state.volume] );
        }
        // mass
        if( this.state.mass && this.state.mass.length ) {
            params.filters.push( ["mass", "eq", this.state.mass] );
        }
        // from_addr
        if( this.state.from_addr && this.state.from_addr.length ) {
            params.filters.push( ["from_addr", "eq", this.state.from_addr],
                                 ["from_x", "eq", this.state.from_x],
                                 ["from_y", "eq", this.state.from_y]   );
        }
        // to_addr
        if( this.state.to_addr && this.state.to_addr.length ) {
            params.filters.push( ["to_addr", "eq", this.state.to_addr],
                                 ["to_x", "eq", this.state.to_x],
                                 ["to_y", "eq", this.state.to_y]   );
        }
        // from date
        if( this.state.from_date ) {
           if( Utils.is_valid_yyyymmdd(this.state.from_date) ) {
                let from_ctime = Date.parse( this.state.from_date ) / 1000;
                params.filters.push( ["ctime", "gt", from_ctime] );
            }
        }
        // to date
        if( this.state.to_date ) {
           if( Utils.is_valid_yyyymmdd(this.state.to_date) ) {
                let to_ctime = Date.parse( this.state.to_date ) / 1000;
                params.filters.push( ["ctime", "lt", to_ctime] );
            }
        }

        //logger.log(this,'Search params = ',params);

        // reset paginator to the 1st page
        this.setPaginator(this.paginator.currentCapacity, 1);

        this.setState({isSearching: true});
        AppState.PriceRequests.searchPriceRequests( params );
    }

    searchPriceRequestNew =()=> {
        this.setState({isNewSearch: true})
    }

    onPaginatorChange =(paginator)=> {
        this.setPaginator(paginator.props.opt.pagesConf.currentCapacity, paginator.props.opt.pagesConf.currentPage);
    }

    setPaginator(currentCapacity, currentPage) {
        logger.log('set paginator', currentCapacity, currentPage);
        this.paginator.currentCapacity = currentCapacity;
        this.paginator.currentPage = currentPage;
    }

    render = ()=> {

        let formProps = {
            labelWidth: 60
        };

        // let headData = [
        //     {id: 'id', title: '№'},
        //     {id: 'ctime', title: 'Дата публикации', cellClass: TblDateUTCCls},
        //     {id: 'shipment_time', title: 'Отгрузка'},
        //     {id: 'comp_name', title: 'Компания'},
        //     {id: 'from_addr', title: 'Откуда'},
        //     {id: 'to_addr', title: 'Куда'},
        //     {id: 'cargo_name', title: 'Груз'},
        //     {id: 'volume', title: 'm3'},
        //     {id: 'mass', title: 'тонн'},
        //     {id: 'unit', title: 'Ед изм'},
        //     {id: 'actions', title: 'Действия', cellClass: PriceRequests__Card_Actions_Search}
        // ];

        this.opt = {
            // title
            headerClass: TblHead,
            className: "panel panel-default max-size",
            //headData: headData,
            headData: [{id: 'context', title: 'Запросы ставок', cellClass: PriceRequests__Card}],
            // body + data
            bodyClass: TblBody,
            bodyData: this.state.searchResults,
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
            type: "search"
        }

        // таблица результатов поиска
        let searchResults = (state)=> {
            if( state.isSearchNotPerfomed || this.state.isNewSearch ) {
                return (
                    <div className="PriceRequests__SearchForm_NotFound">Задайте параметры фильтра и нажмите "Найти".</div>
                )
            }
            else if( state.isSearching ) {
                return (
                    <div className="PriceRequests__SearchForm_NotFound">Выполняется поиск...</div>
                )
            }
            else if( state.searchResults.length ) {
                return (
                    <div className='row'>
                        <div className="col-xs-12">
                            <SimpleTable2 opt={this.opt}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="PriceRequests__SearchForm_NotFound">По заданным параметрам ничего не найдено.</div>
                )
            }
        };

        let searchForm = (
                <div className="row">
                    <div className="col-xs-4">
                        <FormGroup name="Откуда" from="from_addr">
                            <InputAddress value={this.state.from_addr} name="from_addr" onSelect={this.onSelectFromAddress} onChange={this.onChangeHandler} caption="Откуда" active={true} labelWidth={formProps.labelWidth}/>
                        </FormGroup>
                    </div>
                    <div className="col-xs-4">
                        <FormGroup name="Куда" from="to_addr">
                            <InputAddress value={this.state.to_addr} name="to_addr" onSelect={this.onSelectToAddress} onChange={this.onChangeHandler} caption="Куда" active={true} labelWidth={formProps.labelWidth}/>
                        </FormGroup>
                    </div>
                    <div className="col-xs-4">
                        <FormGroup name="Объем, куб.м." from="to_addr">
                            <InputSimple value={this.state.volume} type="text" name="volume" placeholder="" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                        </FormGroup>
                    </div>
                    <div className="col-xs-4">
                        <FormGroup name="Масса, тонн" from="mass">
                            <InputSimple value={this.state.mass} type="text" name="mass" placeholder="" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                        </FormGroup>
                    </div>
                    <div className="col-xs-4">
                        <FormGroup name="Дата погрузки" from="from_date">
                        </FormGroup>
                        <InputDate labelClass="PriceRequests__SearchForm_InputDateLabel" labelWidth={70} value={this.state.from_date} caption=" "  name="from_date" onChange={this.onChangeHandler}/>
                    </div>
                    <div className="col-xs-4">
                        <FormGroup name="Дата разгрузки" from="to_date">
                        </FormGroup>
                        <InputDate labelClass="PriceRequests__SearchForm_InputDateLabel" labelWidth={70} value={this.state.to_date} caption=" " name="to_date" onChange={this.onChangeHandler}/>
                    </div>
                    <div className="col-xs-12">
                        <ButtonSimple onClick={this.searchPriceRequest} type="primary" caption="Найти"/>
                    </div>
                </div>
            );

        // после нажатия на "найти" сворачиваем форму поиска
        let searchFormResult = (
                <div>
                    <FlexBox direction="row" alignItems="end">
                        <div className="PriceRequests__SearchForm_Result_Label">Поиск:</div>
                        <span className="PriceRequests__SearchForm_Result_Value">{this.state.from_addr ? this.state.from_addr : "не задано"}&nbsp;&rarr;&nbsp;{this.state.to_addr ? this.state.to_addr : "не задано"}</span>.
                    </FlexBox>
                    <FlexBox direction="row" alignItems="baseline">
                        <div className="PriceRequests__SearchForm_Result_Label">Объем, куб.м.:</div>
                        <div className="PriceRequests__SearchForm_Result_Value">{this.state.volume ? this.state.volume : "любой"}</div>
                        <div className="PriceRequests__SearchForm_Result_Label">Масса, тонн:</div>
                        <div className="PriceRequests__SearchForm_Result_Value">{this.state.mass ? this.state.mass : "любая"}</div>
                        <div className="PriceRequests__SearchForm_Result_Label">Начало:</div>
                        <div className="PriceRequests__SearchForm_Result_Value">{this.state.from_date ? this.state.from_date : "не задано"}</div>
                        <div className="PriceRequests__SearchForm_Result_Label">Окончание:</div>
                        <div className="PriceRequests__SearchForm_Result_Value">{this.state.to_date ? this.state.to_date : "не задано"}</div>
                        <div className="marg-lr"></div>
                        <div className="marg-lr"></div>
                    </FlexBox>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-xs-12">
                            <ButtonSimple onClick={this.searchPriceRequestNew} type="primary" caption="Новый поиск"/>
                        </div>
                    </div>
                </div>
            );

        return (
            <div className="row">
                <div className="col-xs-12">
                    {this.state.isSearchNotPerfomed || this.state.isNewSearch ? searchForm : searchFormResult}
                </div>
                <div className="col-xs-12">
                	{searchResults(this.state)}
                </div>
            </div>
        )

    } // render

}

// <div className="box-cln-nw align-stretch panel-md">
                        
//                     </div>
//                     <FlexBox direction="row" alignItems="center">
                        
//                     </FlexBox>
//                     <div className="box-row-nw just-end marg-t">
                        
//                     </div>