"use strict";
var React = require('react/addons');


import {Button} from '../SimpleComponents/ButtonActive';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Loading} from '../SimpleComponents/Loading';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls,
    TblCellOwner,
    TblCellUsers
} from '../SimpleComponents/SimpleTable2';
import {Api} from '../api';

class TendersTable extends React.Component {


    render() {

        this.opt = {
            // хедер
            headerClass    : TblHead,
            headData       : [
                {id: 'id', title: 'ID'},
                {id: 'name', title: 'Название'},
                {id: 'comps', title: 'Участники', cellClass: TblCellUsers},
                {id: 'owner', title: 'Организатор', cellClass: TblCellOwner}
            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.props.tenders,
            // пагенатор
            pagesClass     : TblPages,
            pagesConf      : {
                availableCapacity: [1, 2, 5, 10],
                currentCapacity  : 5,
                currentPage      : 1
            },
            // события
            onSelectChanged: this.onSelectChanged,  // вызывается при изменении выделения, параметр - измененный объект
            //onCloseSelected: this.onCloseSelected,  // вызывается из футера по клику на "Close"
            // вспомогательные
            title          : 'Tenders',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true  // можно выбирать несколько рядов
        };
        if (this.props.tenders) {
            return (
                <div  >
                    <SimpleTable2 opt={this.opt}/>
                </div>
            )
        }
        return (
            <div>
                no data
            </div>
        )


    }
}


export default class A_Tenders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenders: null
        }
    }

;

    componentWillMount() {
        this.getTenders();
    }

    getTenders() {
        console.log("GET TENDERS!");
        Api.req('graph', {
            query: {
                tenders: {
                    fields: ["id", "name"],
                    sub   : {
                        comps: {
                            fields: ["id"]
                        },
                        owner: {
                            src     : "comps",
                            relation: "comp_owner_of_tender"
                        }
                    }
                }
            }
        }, false).then(res=> {
            console.log(res.tenders.data);
            this.setState({tenders: res.tenders.data})
        })
    }

;

    render() {

        return (
            <Loading dontShow={true} dataRecived={(this.state.tenders)}>
                <TendersTable tenders={this.state.tenders}/>
            </Loading>
        )

    }

}