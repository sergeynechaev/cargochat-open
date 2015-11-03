var React = require('react/addons');
import {Dispatcher, Events, Actions, Store} from '../Dispatcher';
import {Api} from '../api';
var Router = require('react-router');
import {Utils} from '../utils';
import {Loading} from '../SimpleComponents/Loading';

//import {SimpleTable} from '../SimpleComponents/SimpleTable';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls
} from '../SimpleComponents/SimpleTable2';
import {TblDateUTCCls, TblDateTimeCls} from '../SimpleComponents/TableCells';


var Sessions2 = React.createClass({

    componentDidMount(){
        Actions.getSessions()
        Events.on(Events.EV_SESSIONS_UPDATE, this.updateStateWrapper);
    },
    componentWillUnmount() {
        Events.rem(Events.EV_SESSIONS_UPDATE, this.updateStateWrapper);
    },
    updateStateWrapper(o) {
        //console.log('[Sessions2] updateStateWrapper')
        //console.debug(o)
        this.setState(o)
    },

    getInitialState () {
        return {}
    },

    onCloseSelected () {
        //console.log('[Sessions2] onCloseSelected')
        let k = this.opt.selectionKey
        let s = this.opt.bodyData
        for (var i = 0; i < s.length; i++) {
            let o = s[i]
            if (!o[k]) continue
            let sid = o.sid
            Api.closeSessionRequest(sid).then(res=> {
            })
            s.splice(i, 1)
            i--
        }
        this.opt.bodyIns.setState({})
        this.opt.pagesIns.update()   // пагинатор обновляется при удаленни данных
        this.onSelectChanged()
    },

    onSelectChanged (obj) {
        this.opt.footerIns.setState({something_selected: this.isSomethingSelected()})
    },

    isSomethingSelected () {
        let k = this.opt.selectionKey
        let s = this.opt.bodyData
        for (let i = 0; i < s.length; i++) {
            if (s[i][k]) return true
        }
        return false
    },

    render () {
        //console.log('Sessions2.render')
        //console.debug(this.state.sessions)

        if (!this.state.sessions) return <div>Loading....</div>

        this.opt = {
            // хедер
            headerClass    : TblHead,
            //headerClassName: "panel-heading-grey panel-md border-btm",
            className: "panel panel-default max-size",
            headData       : [
                {id: 'sid', title: 'Сеанс', cellClass: TblCellSid},   // TblCellSid - умеет частично скрывать значение
                {id: 'ip', title: 'IP адрес'},
                {id: 'ctime', title: 'Открыт', cellClass: TblDateUTCCls},
                {id: 'checkbox', title: 'Действия', cellClass: TblCellCheckbox}  // TblCellCheckbox - чекбокс который делает выбор ряда
            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.state.sessions,
            // пагенатор
            pagesClass     : TblPages,
            pagesConf      : {
                availableCapacity: [2, 5, 10],
                currentCapacity  : 5,
                currentPage      : 1
            },
            // футер
            footerClass    : TblFooterControls,
            controls       : [
                {label: 'Закрыть сессию', handler: this.onCloseSelected}
            ],
            // события
            onSelectChanged: this.onSelectChanged,  // вызывается при изменении выделения, параметр - измененный объект
            //onCloseSelected: this.onCloseSelected,  // вызывается из футера по клику на "Close"
            // вспомогательные
            //title          : 'Сессии',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true,  // можно выбирать несколько рядов
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <SimpleTable2 opt={this.opt}/>
                </div>
            </div>
        )

    }

});

export {Sessions2};

