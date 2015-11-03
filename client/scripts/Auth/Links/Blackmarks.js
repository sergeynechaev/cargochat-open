var React = require('react/addons');

import {Dictionary} from '../../Dispatcher';
import {Button} from '../../SimpleComponents/ButtonActive';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Loading} from '../../SimpleComponents/Loading';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls

} from '../../SimpleComponents/SimpleTable2';
import {Api} from '../../api';
import {TblCellPerms, TblCellPartnerName, TblCellPartnerInn, TblCellPartnerAti, TblCellPartnerPhone, TblCellActions} from '../../SimpleComponents/TableCells';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Icon} from '../../SimpleComponents/Icons';
import {AppState} from '../../Auth/Dashboard';

import {TblCellRelationCompName} from './RelationTblCells';

class BlackmarksTable extends React.Component {


    render() {

        this.opt = {
            // хедер
            headerClass    : TblHead,
            //headerClassName: "panel-heading-grey panel-md border-btm",
            className: "panel panel-default max-size",
            headData       : [
                {id: 'name', title: 'Название', cellClass: TblCellRelationCompName},
                {id: 'inn', title: 'ИНН'},
                {id: 'phone', title: 'Телефон'},
                // {id: 'ati_code', title: 'Код АТИ'}, // deprecated
                //{id: 'compFrom', title: 'Контактное лицо', cellClass: TblCellPartnerPhone},
                {id: 'relation_id', title: 'Действия', cellClass: TblCellActions}
            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.props.blacklist,
            linkType: "blacklist",
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
            //title          : 'Черный список',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true  // можно выбирать несколько рядов
        };
        if (this.props.blacklist) {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <SimpleTable2 opt={this.opt}/>
                    </div>
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

export default class Blackmarks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blacklist: null
        }
    };


    static propTypes = {
        company: React.PropTypes.object
    };

    componentWillMount() {
        AppState.myCompany.updateLinks("blacklist");
        AppState.myCompany.on("blacklist", this.updateLinks)
    };
    componentWillUnmount=()=>{
        AppState.myCompany.rem("blacklist", this.updateLinks)
    };




    updateLinks=(blacklist)=>{
        this.setState({blacklist:blacklist})
    };

    render() {
        //console.log("BlackList");

        var blackList = (this.state.blacklist) ? this.state.blacklist.data : [];
        return (
            <Loading dontShow={true} dataRecived={(this.state.blacklist)}>
                <BlackmarksTable blacklist={blackList}/>
            </Loading>
        )
    }
}

//<CarriersTable users={this.state.carriers}/>