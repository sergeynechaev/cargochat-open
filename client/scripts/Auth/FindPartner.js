var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

import {Events, Actions, Store} from '../Dispatcher';
import {Utils} from '../utils';
import {Map2} from './Map2';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {InputText} from '../SimpleComponents/InputText';
import {RadioInput} from '../SimpleComponents/RadioInput';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {Loading} from '../SimpleComponents/Loading';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages
} from '../SimpleComponents/SimpleTable2';
import Card from '../SimpleComponents/Card';
import {Icon} from '../SimpleComponents/Icons';
import {Api} from '../api';


var TblName = React.createClass({

    getInitialState () {
        return {}
    },

    onClick(){
        console.log(this.props.obj);
        this.props.opt.context.onClick(this.props.obj)
    },
    test(){
        this.props.opt.context.test(this.props.obj);
        console.log("Выбранная компания");
        console.log(this.props.obj);
        var inn = this.props.obj.data.inn;
        var kpp = this.props.obj.data.kpp;
        var address = this.props.obj.data.address.value;
        
        // эту дичь нужно будет выличть
        window.location.hash = `dashboard/findpartner/details2?inn=${inn}&kpp=${kpp}&addr=${address}`
        
    },

    render () {
        let opt = this.props.opt;
        console.log("TBLCELL");
        console.log(this.props);

        var name = this.props.obj.value;
        var inn = this.props.obj.data.inn;
        var address = this.props.obj.data.address.value
        return (
            <div className="list-box">
                <div className="box-cln-nw panel-md">
                    <div className="box-row-nw just-btw">
                        <h3 className="list-h3">
                            {name}
                        </h3>

                        <p className="icon-header"><Icon iconName="star-icon"/></p>
                    </div>
                    <div className="card-sub">
                        <p className="divider card-disab">ИНН: {inn}</p>

                        <div className="box-row-nw">
                            <a className="icon-list" href=""><Icon iconName="pin-icon"/></a>

                            <p className="p-list">{address}</p>
                        </div>
                    </div>
                </div>
                <div className="box-row-nw just-end table-pr">
                    <TransparentButton className="button button-unborder" caption="Информация" onClick={this.onClick}/>
                    <TransparentButton className="button button-unborder" caption="Тест" onClick={this.test}/>
                </div>

            </div>
        )
    }
});

var FindPartner = React.createClass({

    getInitialState(){
        return {
            company_name   : '',
            searchResult   : null,
            viewDetail     : false,
            selectedCompany: null,
            viewDetail2    : false
        }
    },

    componentWillMount(){
        var hash = window.location.hash;
        console.log("hash");
        console.log(hash);
        var isSearch = hash.indexOf('details2');
        console.log(isSearch);
        if (isSearch === -1) {
            this.setState({viewDetail2: false})
        } else this.setState({viewDetail2: true})
    },
    searchResultsHandler (o) {
        if (this.isYampReady) {
            this.setState(o);
            this.updateObjectsOnMap();
        } else {
            this.resultsBuffer = o;
        }
    },

    ymapsReadyHandler () {
        //console.log("READY YMAPS");
        if (this.resultsBuffer) {
            this.setState(this.resultsBuffer);
            this.resultsBuffer = null;
            this.updateObjectsOnMap();
        } else {
            this.isYampReady = true;
        }
    },

    returnValue(value){
        this.setState(value)
    },

    searchClickHandler(){
        //console.log('[FindPartner] searchClickHandler')
        // запоминаем предыдущее значение capacity у таблицы результатов
        let t = this.refs.results_table;
        if (t) this.state.storedTableCapacity = t.props.opt.pagesConf.currentCapacity;
        if (this.state.company_name) {
            let params = {
                type: "suggest/party",
                data: {
                    query: this.state.company_name,
                    count: 50
                }
            };
            Api.getDadata(params).then(res=> {
                var resp;
                try {
                    resp = res.dadata.suggestions;
                    console.log("SUGGEST");
                    console.log(resp);
                    this.searchResultsHandler({searchResult: resp});
                }
                catch (e) {
                    console.log(e)
                }

            })

        } else console.log("ничего не введено");


        this.clearSearch();

    },

    pagesChangeHandler () {
        //console.log('[FindPartner] pagesChangeHandler')
        this.updateObjectsOnMap()
    },

    updateObjectsOnMap () {
        //console.log('[FindPartner] updateObjectsOnMap')

        let t = this.refs.results_table;   // указатель на таблицу
        let l = t.getVisibleObjectsList();  // список видымых элеметов в таблице
        let m = this.refs.yandexMap;        // указатель на карту
        m.clearGeoObjects();                // убираем с карты все предыдущие обхекты

        let b = [[Number.MAX_VALUE, Number.MAX_VALUE], [Number.MIN_VALUE, Number.MIN_VALUE]],
            f = false;

        // перебор видимых объектов
        l.forEach((o) => {
            if (!o.x || !o.y) return;      // координат нет - объект не интересен
            f = true;                      // флаг наличия объектов
            m.addBaloon(o.x, o.y, o.name);  // добавляем объект на карту
            // считаем bounds
            b[0][0] = Math.min(b[0][0], o.y);
            b[0][1] = Math.min(b[0][1], o.x);
            b[1][0] = Math.max(b[1][0], o.y);
            b[1][1] = Math.max(b[1][1], o.x)
        });

        // изменяем видимую область карты (чтобы видеть новые объекты)
        if (f) m.setBounds(b)

    },

    onClick(obj){
        console.log('[FindPartner] onClick')
        console.log(obj);
        this.setState({selectedCompany: obj, viewDetail: true})

    },
    test(obj){
        this.setState({viewDetail2: true})
    },

    clearSearch(){
        this.setState({
            viewDetail     : false,
            searchResult   : null,
            selectedCompany: null
        });
    },

    backToResult(){
        this.setState({
            viewDetail: false
        });
    },
    render: function () {
        //console.log('[FindPartner] render')
        //console.log(this.state);
        this.opt = {
            context     : this,
            className   : "simple-table",
            // хедер
            headData    : [
                {id: 'name', title: 'Имя', cellClass: TblName}
            ],
            // контент
            bodyClass   : TblBody,
            //bodyData: Store.sessions,
            bodyData    : this.state.searchResult,
            // вспомогательные
            pagesClass  : TblPages,
            pagesConf   : {
                availableCapacity: [2, 5],
                currentCapacity  : this.state.storedTableCapacity || 2,   // capacity может быть сохрарено в state (если нет, то делаем 5)
                currentPage      : 1,
                onChanged        : this.pagesChangeHandler
            },
            //title: 'Результаты поиска',  // заголовок контейнера
            //isSelectable: (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey: 'sKey',  // ключ в объекте который будет использован в качестве флага выделения
            selectable  : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect : false  // можно выбирать несколько рядов
        };

        //console.log("Search");
        //console.log(Store.selectedCompany);
        //console.log(this.state);
        if (this.state.viewDetail) {
            return (
                <div>
                    <TransparentButton onClick={this.backToResult} caption="Вернуться к результатам"/>
                    <OtherCompanyDetails company={this.props.company} viewCompany={this.state.selectedCompany}
                                         source="search"/>
                </div>

            )

        }
        if (this.state.viewDetail2) {
            return (
                <RouteHandler/>
            )

        }

        return (
            <div className="box-row-nw max-size">
                <div className="box-col-nw inmap">
                    <SmallPanel headerName="Поиск партнеров">
                        <Loading dataRecived={!this.state.viewDetail} dontShow={true}>
                            <div className="box-row-nw align-stretch panel-md default-width">
                                <InputSimple
                                    type="search"
                                    name="company_name"
                                    active={true}
                                    autoFocus={true}
                                    placeholder="Укажите название, ИНН или Ф.И.О. руководителя"
                                    value={this.state.company_name}
                                    onChange={this.returnValue}
                                    />
                            </div>
                            <div className="box-row-nw just-end table-footer table-pr">
                                <TransparentButton onClick={this.searchClickHandler} caption="Найти"/>
                                <TransparentButton hidden={(!this.state.searchResult)} onClick={this.clearSearch}
                                                   caption="Очистить"/>
                            </div>
                        </Loading>
                        <Loading dataRecived={this.state.viewDetail} dontShow={true}>
                            <div className="box-row-nw just-end table-footer table-pr">
                                <div className="box-row-nw just-center align-center ">
                                    <Icon iconName="arrow-left-icon"/>
                                </div>
                                <TransparentButton onClick={this.backToResult} caption="Вернуться к результатам"/>
                            </div>
                        </Loading>
                        <Loading dataRecived={this.state.searchResult && !this.state.viewDetail} dontShow={true}>
                            <SimpleTable2 ref='results_table' opt={this.opt}/>
                        </Loading>

                    </SmallPanel>
                </div>
                <Map2
                    style={{flex: "1 0 300px"}}
                    ref='yandexMap'
                    onReady={this.ymapsReadyHandler}
                    />
            </div>
        )
    }
});

export {FindPartner}