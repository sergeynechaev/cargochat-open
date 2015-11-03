var React = require('react/addons');
import {SmallPanelTest} from '../SimpleComponents/SmallPanelTest';
import {InputText} from '../SimpleComponents/InputText';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {Loading} from '../SimpleComponents/Loading';
import {DateSimple} from '../SimpleComponents/DateSimple';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages
} from '../SimpleComponents/SimpleTable2';
import {TblDateCls, TblDateTimeCls, TblOwnerCls, TblActionsCls, TblLinkCls} from '../SimpleComponents/TableCells';
import {Api} from '../api';
import {DateTime} from '../utils';


var ResultsTable = React.createClass({

    render(){
        this.opt = {
            // хедер
            headerClass : TblHead,
            headData    : [
                {id: 'name', title: 'Название'},
                {id: 'owner', title: 'Заказчик', cellClass: TblOwnerCls},
                {id: 'ctime', title: 'Опубликовано', cellClass: TblDateTimeCls},
                {id: 'stime', title: 'Начало', cellClass: TblDateCls},
                {id: 'etime', title: 'Окончание', cellClass: TblDateCls},
                {id: 'organizer', title: 'Детали', cellClass: TblLinkCls},
                {id: 'id', title: 'Действия', cellClass: TblActionsCls}
            ],
            // контент
            bodyClass   : TblBody,
            //bodyData: Store.sessions,
            bodyData    : this.props.data,
            // вспомогательные
            pagesClass  : TblPages,
            pagesConf   : {
                availableCapacity: [2, 5],
                currentCapacity  : 5,   // capacity может быть сохрарено в state (если нет, то делаем 5)
                currentPage      : 1

            },
            title       : 'Тендеры',  // заголовок контейнера
            selectionKey: 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable  : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect : true  // можно выбирать несколько рядов
        };
        return (
            <div className='box-row-wr align-s-start test-animate'>
                <SimpleTable2 opt={this.opt}/>
            </div>
        )
    }

});


var FindTenders = React.createClass({


    updateStateWrapper(newState) {
        this.setState(newState)
    },

    getInitialState(){
        return {
            from_date: null,
            to_date  : null,
            results  : null
        }
    },

    searchHandler(){
        console.log("Search!");
        Api.req('graph', {
            query: {
                tenders: {
                    sub: {
                        owner: {
                            src     : "comps",
                            relation: "comp_owner_of_tender",
                            fields  : ["name"]
                        }
                    }
                }
            }
        }, false).then(res=> {
            console.log(res);
            this.setState({results: res.tenders.data})
        })
    },

    render(){
        console.log(this.state);
        var Results = (this.state.results) ? <ResultsTable
            data={this.state.results}
            /> : null;
        return (
            <div className="box-col-nw max-size test-animate">
                <div className="box-col-nw">
                    <SmallPanelTest headerName="Поиск тендеров">
                        <div className="box-cln-nw align-stretch panel-md">
                            <DateSimple value={this.state.from_date} name="from_date" caption="Дата начала"
                                        onChange={this.updateStateWrapper}/>
                            <DateSimple value={this.state.to_date} name="to_date" caption="Дата окончания" onChange={this.updateStateWrapper}/>

                        </div>
                        <div className="box-row-nw just-end table-footer table-pr">
                            <TransparentButton onClick={this.searchHandler} caption="Найти"/>
                        </div>
                    </SmallPanelTest>
                </div>
                {Results}
            </div>
        )
    }
});

export {FindTenders}