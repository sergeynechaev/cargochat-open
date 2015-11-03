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
import {TblCellPerms, TblCellActions, TblCellPartnerInn, TblCellPartnerAti, TblCellPartnerPhone, TblCellPartnerName} from '../../SimpleComponents/TableCells';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {AppState} from '../../Auth/Dashboard';

import {TblCellRelationCompName} from './RelationTblCells';
import Bookmarks__A_Actions from './Bookmarks__A_Actions';

class SocialTable extends React.Component {

    render=()=> {

        this.opt = {
            // хедер
            headerClass    : TblHead,
            //headerClassName: "panel-heading-grey panel-md border-btm",
            className: "panel panel-default max-size",
            headData       : [
                {id: 'name', title: 'Название', cellClass: TblCellRelationCompName},
                {id: 'inn', title: 'ИНН'},
                {id: 'phone', title: 'Телефон'},
                //{id: 'compFrom', title: 'Контактное лицо', cellClass: TblCellPartnerPhone},
                {id: 'actions', title: 'Действия', cellClass: TblCellActions},
                {id: 'a_actions', title: 'Адм. действия', cellClass: Bookmarks__A_Actions}
            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.props.social,
            linkType: "social",
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
            //title          : 'Закладки',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true  // можно выбирать несколько рядов
        };
        if (this.props.social) {
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

export default class Bookmarks extends React.Component {

    constructor(props) {
        super(props);

    };
    state = {
        bookmarks: []
    };
    static propTypes = {
        company: React.PropTypes.object
    };

    componentWillMount=()=> {
        AppState.myCompany.updateLinks("social");
        AppState.myCompany.on("social", this.updateLinks)
    };
    componentWillUnmount=()=>{
        AppState.myCompany.rem("social", this.updateLinks)
    };

    updateLinks=(social)=>{
        this.setState({social:social})
    };

    render() {
        //console.log("Bookmarks links");
        //console.log(this.state.bookmarks);
        var socialList = (this.state.social) ? this.state.social.data : [];
        return (
            <Loading dontShow={true} dataRecived={(this.state.social)}>
                <SocialTable social={socialList}/>
            </Loading>
        )
    }
}

//<CarriersTable users={this.state.carriers}/>