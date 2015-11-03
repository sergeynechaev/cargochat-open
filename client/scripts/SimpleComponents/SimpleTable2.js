var React = require('react/addons');
import {InputCheckBox2} from '../SimpleComponents/InputCheckBox2';
import {LargePanel} from '../SimpleComponents/LargePanel';
import {Loading} from '../SimpleComponents/Loading';
import {Store} from '../Dispatcher';
import {logger} from '../Classes/Logger';
import {Api} from '../api';
import {InputSelect} from '../SimpleComponents/InputSelect';
import {Icon} from '../Controls/Icon';

import {ButtonSimple} from '../Controls/Forms/ButtonSimple';

var TblHead = React.createClass({

    componentWillMount () {
        this.props.opt.headerIns = this
    },
    getInitialState () {
        return {}
    },

    render () {

        let result = [],
            src = this.props.opt.headData, it = -1, end = src.length - 1;

        function cls() {
            if (it == 0)   return 'table-head table-pl text-left table-prb';
            if (it == end) return 'table-head table-pr text-left';
            return 'table-head text-left table-prb'
        }

        while (it++ < end) {
            result.push(<th key={it} className={cls()}>{src[it].title}</th>)
        }

        return (<thead>
        <tr>{result}</tr>
        </thead>)

    }

});

var TblBody = React.createClass({

    componentWillMount () {
        this.props.opt.bodyIns = this
    },
    getInitialState () {
        return {}
    },

    isSelectable (obj) {
        let f = this.props.opt.isSelectable;
        return f ? f(obj) : true
    },

    onClick (obj) {
        if (this.isSelectable(obj)) this.props.opt.tableIns.itemChanged(obj)
    },

    update () {
        //console.log('[TblBody] update');
        this.setState({})
    },

    render () {
        //console.log('[TblBody] render');

        let rows = [],
            opt = this.props.opt,
            head = opt.headData, hIt = -1, hEnd = head.length - 1,
            src = opt.bodyData, sIt = -1, sEnd = src.length - 1;

        let p = this.props.opt.pagesConf;
        if (p) {
            sIt = p.rowFirst - 2;
            sEnd = Math.min(sIt + p.currentCapacity, sEnd)
        }

        function cls() {
            if(hIt == 0 && hIt == hEnd) {   // один столбец
                return 'table-pl table-pr';
            } else if (hIt == 0) {
                return 'table-pl table-prb';
            } else if (hIt == hEnd) {
                return 'table-pr'
            } else return 'table-prb'
        }

        function val(h) {
            return h ? src[sIt][h.id] : null
        }

        function st() {
            return opt.selectable && (src[sIt][opt.selectionKey]) ? {background: '#ff8'} : {}
        }

        while (sIt++ < sEnd) {
            let cells = []
            hIt = -1
            while (hIt++ < hEnd) {
                let h = head[hIt]
                if (h.cellClass) {
                    // кастомный вариант ячейки
                    cells.push(<td className={cls()} key={hIt}>{React.createElement(h.cellClass, {
                        opt  : opt,
                        obj  : src[sIt],
                        head : h,
                        value: val(h),
                        cellOpt: h.cellOpt
                    })}</td>)
                } else {
                    // стандартная ячека
                    cells.push(<td className={cls()} key={hIt}>{val(h)}</td>)
                }
            }
            rows.push(<tr key={sIt} className='text-mid' style={st()}
                          onClick={opt.selectable ? this.onClick.bind(null, src[sIt]) : null}>{cells}</tr>)
        }

        return (<tbody>{rows}</tbody>)

    }

});


class TblCellUsers extends React.Component {

    render() {
        return (
            <div className="">
                {this.props.value.data.length}
            </div>
        )
    }
}


class TblCellTenders extends React.Component {

    render() {
        return (
            <div>
                {this.props.value.data.length}
            </div>
        )
    }
}


class TblCellOwner extends React.Component {

    render() {
        return (
            <div>
                {this.props.value.data[0].name}
            </div>
        )
    }
}


var TblCellSid = React.createClass({

    getInitialState () {
        return {showFullSid: false}
    },

    toggle () {
        this.setState({showFullSid: !this.state.showFullSid})
    },

    render () {
        var v = this.props.value;
        var b = this.state.showFullSid;
        return (<p>{b ? v : 'xxxx' + (v || '').substr(-4)} <p className="text-card" onClick={this.toggle}>{b ? 'скрыть' : 'показать'}</p></p>)
    }

});

var TblCellCheckbox = React.createClass({

    getInitialState () {
        return {}
    },

    isSelectable (obj) {
        let f = this.props.opt.isSelectable;
        return f ? f(obj) : true
    },

    render () {
        //console.log('[TblCellCheckbox] render ' + JSON.stringify(this.props.obj))
        let opt = this.props.opt;
        return (
            <InputCheckBox2
                onChanged={opt.tableIns.itemChanged.bind(null, this.props.obj)}
                hidden={!this.isSelectable(this.props.obj)}
                checked={this.props.obj[opt.selectionKey]}
                />
        )
    }

});

var TblFooter1 = React.createClass({

    componentWillMount () {
        this.props.opt.footerIns = this
    },
    getInitialState () {
        return {something_selected: false}
    },

    click () {
        let f = this.props.opt.onCloseSelected;
        if (f) f()
    },

    render () {
        return (
            <div className="box-row-wr table-footer align-center just-end table-pr">
                <Loading dontShow={true} dataRecived={this.state.something_selected}>
                    <button className="button button-unborder button-mini" onClick={this.click}>close</button>
                </Loading>
            </div>
        )
    }

});

var TblPages = React.createClass({

    //getInitialState () { return {} },

    componentWillMount () {
        //console.log('[TblPages] componentWillMount');
        this.props.opt.pagesIns = this;
    },

    componentDidMount () {
        //console.log('[TblPages] componentDidMount');
        //this.refs['pageCpascitySelector'].getDOMNode().value = this.getPagesCfg().currentCapacity;
    },

    //  в случае обновления страницы в пагинатор будут переданы новые свойства,
    //  применяем их
    componentWillReceiveProps(props){
        //console.log('[TblPages] componentWillReceiveProps');
        this.update();
        //this.props.opt.pagesIns = this;
    },

    getPagesCfg () {
        return this.props.opt.pagesConf || {}
    },

    pageCapacitySelected (e) {
        //console.log('[TblPages] pageCapacitySelected ' + e.target.value)
        let c = this.getPagesCfg();
        c.currentCapacity = parseInt(e.list);
        this.props.opt.tableIns.recalcMaxPage(c);
        this.update()
    },

    gotoPrev (e) {
        //console.log('[TblPages] gotoPrev')
        let c = this.getPagesCfg();
        if (c.currentPage <= 1) return;
        c.currentPage--
        this.update()
    },

    gotoNext (e) {
        //console.log('[TblPages] gotoNext')
        let c = this.getPagesCfg();
        if (c.currentPage >= c.maxPage) return;
        c.currentPage++;
        this.update()
    },

    update () {
        //console.log('[TblPages] update')
        this.props.opt.tableIns.recalcMaxPage(this.getPagesCfg());
        this.props.opt.tableIns.recalcRowBound(this.getPagesCfg());
        this.setState({});
        this.pagesChanged();

        // bodyIns может не успеть прописаться в opt
        let b = this.props.opt.bodyIns;
        if (b) b.update()

    },

    pagesChanged () {
        //console.log('[TblPages] pagesChanged')
        let f = this.props.opt.pagesConf.onChanged;
        if (f) f(this)
    },

    render () {

        let c = this.getPagesCfg();

        // console.log('[TblPages] render')
        // console.debug(c);

        if( c && c.maxPage <= 1) return null;

        let capsVaiants = c.availableCapacity || [];
        let capsElements = capsVaiants.map((o, i) => {
            return <option key={i}>{o}</option>
        })
        return (
            <div className="table-box__footer table-box-footer row row-no-padding">
                <div className="col-xs-6 table-box-footer__display">
                    <div className="pagin-pls footer-style">Отображать по:&nbsp;&nbsp;</div>
                    <InputSelect
                        name="list"
                        selectedItem={this.getPagesCfg().currentCapacity}
                        listItems={c.availableCapacity}
                        getValue={this.pageCapacitySelected}
                        />
                </div>
                <div className="col-xs-6 text-right table-box-footer_number">
                    <div className="pagin-plb"><p className="footer-style">{c.rowFirst}-{c.rowLast} из {c.rowsTotal}</p>
                    </div>
                    {c.rowFirst <= 1 ? null : <Icon onClick={this.gotoPrev} name="arrow-left"/>}
                    {c.rowLast >= c.rowsTotal ? null : <Icon onClick={this.gotoNext}name="arrow-right"/>}
                </div>
            </div>
        )
    }

});

var TblFooterControls = React.createClass({

    componentWillMount () {
        this.props.opt.footerIns = this
    },
    getInitialState () {
        return {something_selected: false}
    },

    click () {
        let f = this.props.opt.onCloseSelected;
        if (f) f()
    },

    render () {
        let btns = [];
        this.props.opt.controls.map((o, key) => {
            btns.push(<ButtonSimple key={key} onClick={o.handler} caption={o.label}/>)
        });
        return (
            <div className="box-row-wr table-footer align-center just-end table-pr">
                <Loading dontShow={true} dataRecived={this.state.something_selected}>
                    {btns}
                </Loading>
            </div>
        )
    }

});


var SimpleTable2 = React.createClass({

    // xxxClass - класс
    // xxxData - данные
    // xxxIns - экземпляр

    componentWillMount () {
        //console.log('SimpleTable2.componentWillMount')
        this.prepareOpt(this.props.opt)
    },
    componentWillUpdate (nextProps, nextState) {
        //console.log('SimpleTable2.componentWillUpdate')
        this.prepareOpt(nextProps.opt)
    },
    getInitialState () {
        return {}
    },

    prepareOpt (opt) {
        opt.tableIns = this;

        // пагинация
        let c = opt.pagesConf || {};
        if (!opt.pagesConf) opt.pagesConf = c;
        c.availableCapacity = c.availableCapacity && c.availableCapacity.length > 0 ? c.availableCapacity : [1000, 100, 10];
        c.currentCapacity = Math.max(1, c.currentCapacity && c.currentCapacity > 0 ? c.currentCapacity : c.availableCapacity[0] || 1000);
        this.recalcMaxPage(c);
        this.recalcRowBound(c);
        //console.log('prepared pagesConf:')
        //console.debug(c)

        // элементы
        opt.headerEl = opt.headerClass ? React.createElement(opt.headerClass, {opt: opt}) : null;
        opt.bodyEl = opt.bodyClass ? React.createElement(opt.bodyClass, {opt: opt}) : null;
        opt.pagesEl = opt.pagesClass ? React.createElement(opt.pagesClass, {opt: opt}) : null;
        opt.footerEl = opt.footerClass ? React.createElement(opt.footerClass, {opt: opt}) : null;
        if (!opt.selectionKey) opt.selectionKey = '__default_selection_key__'

    },

    recalcMaxPage (c) {
        c.maxPage = c.currentCapacity > 0 ? Math.max(1, Math.ceil((this.props.opt.bodyData || []).length / c.currentCapacity)) : 1;
        c.currentPage = Math.max(0, Math.min(c.maxPage, c.currentPage || 1))
    },

    recalcRowBound (c) {
        //console.log('[SimpleTable2] recalcRowBound')
        c.rowsTotal = (this.props.opt.bodyData || []).length;
        c.rowFirst = (c.currentPage - 1) * c.currentCapacity + 1;
        c.rowLast = Math.min(c.rowFirst + c.currentCapacity - 1, c.rowsTotal);
        //console.debug(c)
    },

    itemChanged (obj) {
        let opt = this.props.opt;
        if (!opt.multiselect && opt.bodyData) {
            // мультиселект запрeщен, отключаем предыдущее выделение
            opt.bodyData.forEach((o) => {
                if (o[opt.selectionKey]) o[opt.selectionKey] = null
            })
        }
        let k = opt.selectionKey;
        obj[k] = obj[k] ? null : 'V';
        let f = opt.onSelectChanged;
        if (f) f(obj);
        opt.bodyIns.setState({})
    },

    // вернет список объектов, которые показаны (ограничены пагенацией)
    getVisibleObjectsList () {
        let opt = this.props.opt;
        let c = opt.pagesConf;
        if (!c) return [];
        let l = [];
        for (let i = c.rowFirst; i <= c.rowLast; i++) l.push(opt.bodyData[i - 1])
        return l
    },

    // <LargePanel headerClassName={opt.headerClassName|| null} disabled={this.props.disabled} className={opt.className || null} headerName={opt.title || null}>
    //     <table className="table">
    //         {opt.headerEl}
    //         {opt.bodyEl}
    //     </table>
    //     {opt.pagesEl}
    //     {opt.footerEl}
    // </LargePanel>

    render () {
        let opt = this.props.opt;
        return (
            <div className="table-box">
                {opt.title ? <h3 className="table-box__title">{opt.title}</h3> : null}
                <table className="table">
                    {opt.headerEl}{opt.bodyEl}
                </table>
                {opt.pagesEl}
                {opt.footerEl}
            </div>
        )
    }

});

export {SimpleTable2};
export {TblHead};
export {TblBody};
export {TblCellSid, TblCellUsers, TblCellTenders, TblCellOwner};
export {TblCellCheckbox};
export {TblFooter1};
export {TblPages};
export {TblFooterControls};
