"use strict";
var React = require('react/addons');
import {Store, Events, Actions, Dictionary, Error} from '../Dispatcher';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Loading} from '../SimpleComponents/Loading';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {
    SimpleTable2,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls,
    TblCellUsers,
    TblCellTenders
} from '../SimpleComponents/SimpleTable2';
import {Api} from '../api';
import {ModalWindow} from '../SimpleComponents/ModalWindow';


class TblCellControls extends React.Component {

    deleteCompany = ()=> {
        this.props.opt.deleteCompany(this.props.value)
    };
    enterToCompany = ()=> {
        this.props.opt.enterToCompany(this.props.value)

    };
    createInvite = ()=> {
        this.props.opt.createInvite(this.props.value)

    };

    render() {
        return (
            <div>
                <FlexBox direction="column">
                    <TransparentButton caption="Удалить" onClick={this.deleteCompany}/>
                    <TransparentButton caption="Вступить" onClick={this.enterToCompany}/>
                    <TransparentButton caption="Создать приглашение" onClick={this.createInvite}/>
                </FlexBox>

            </div>
        )
    }
}


var TblHead = React.createClass({

    componentWillMount () {
        this.props.opt.headerIns = this
    },
    getInitialState () {
        return {}
    },

    //render(){
    //
    //    return(
    //
    //
    //
    //    )
    //
    //
    //}

    render () {

        let result = [],
            src = this.props.opt.headData, it = -1, end = src.length - 1;

        //function cls () {
        //    if (it == 0)   return 'table-head table-pl text-left table-prb';
        //    if (it == end) return 'table-head tr-width table-pr text-left';
        //    return 'table-head text-left table-pr'
        //}
        function cls() {
            if (it == 0)   return '';
            if (it == end) return '';
            return ''
        }

        while (it++ < end) {
            result.push(<th key={it} style={src[it].style} className={cls()}>{src[it].title}</th>)
        }

        return (<thead>
        <tr>{result}</tr>
        </thead>)

    }

});


class CompaniesTable extends React.Component {


    render = ()=> {

        this.opt = {
            // хедер
            headerClass    : TblHead,
            headData       : [
                {id: 'id', title: 'ID', style: {width: "50px"}},
                {id: 'name', title: 'Название', style: {width: "100px"}},
                {id: 'addr', title: 'Адрес', style: {width: "100px"}},
                {id: 'users', title: 'Пользователи', cellClass: TblCellUsers, style: {width: "100px"}},
                {id: 'tenders', title: 'Тендеры', cellClass: TblCellTenders, style: {width: "100px"}},
                {id: 'id', title: 'Действия', cellClass: TblCellControls, style: {width: "100px"}}

            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.props.companies,
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
            deleteCompany  : this.props.deleteCompany,
            enterToCompany : this.props.enterToCompany,
            createInvite   : this.props.createInvite,
            // вспомогательные
            title          : 'Companies',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true  // можно выбирать несколько рядов
        };
        if (this.props.companies) {
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


export default class A_Companies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies  : null,
            isModalOpen: false
        }
    };

    componentWillMount() {
        this.getCompanies()
    }

    deleteCompany = (id)=> {
        Api.deleteCompanyRequest(id).then(res=> {
            if (res.err) {
                Error.newError(res.err, res.msg)
            } else {
                this.getCompanies()
            }
        })
    };
    enterToCompany = (id)=> {
        console.log(this.props.user.id);
        var params = {
            user_id: this.props.user.id,
            comp_id: id
        };
        Api.compUserMove(params).then(res=> {
            if (res.err) {
                console.log("ERROR " + res.msg);
            } else {
                this.getCompanies()
            }
        })
    };

    createInvite = (v)=> {
        this.setState({isModalEditProfileOpen: true, selectedCompId: v});
        console.log("НОВЫЙ ИНВАЙТ" + v)
    };
    sendInvite = ()=> {
        var params = {};
        params.email = this.state.email;
        params.phone = this.state.phone;
        params.last_name = this.state.last_name;
        params.first_name = this.state.first_name;
        params.pat_name = this.state.pat_name;
        params.comp_id = this.state.selectedCompId;
        Api.compInviteCreate(params).then(res=> {
            if (res.err) {
                console.log("ERROR!");
                console.log(res.msg);
            } else {
                console.log(res)
                this.setState({selectedCompId: null, isModalEditProfileOpen: false})
            }
        });
        console.log("SEND")
    };
    updateInputs = (o)=> {
        this.setState(o);
    };

    createNewCompany = ()=> {
        window.location.hash = "dashboard/admin/a_create_company"
    };

    getCompanies() {
        console.log("GET COMPANIES!");
        Api.req('graph', {
            query: {
                comps: {
                    fields: ["id", "name", "addr"],
                    sub   : {
                        users  : {
                            fields: ["id"]
                        },
                        tenders: {
                            fields: ["id"]
                        }
                    }
                }
            }
        }, false).then(res=> {
            console.log(res.comps.data);
            this.setState({companies: res.comps.data})
        })
    };


    render = ()=> {
        console.log("INVITE");
        console.log(this.state);
        if (this.state.companies) {
            return (
                <div>
                    <ModalWindow isOpen={this.state.isModalEditProfileOpen}>
                        <table >
                            <tbody>
                            <tr>
                                <td style={{width:"100px"}}>
                                    <p>email</p>
                                </td>
                                <td>
                                    <InputSimple name="email" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Телефон</p>
                                </td>
                                <td>
                                    <InputSimple name="phone" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Фамилия</p>
                                </td>
                                <td>
                                    <InputSimple name="last_name" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Имя</p>
                                </td>
                                <td>
                                    <InputSimple name="first_name" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Отчество</p>
                                </td>
                                <td>
                                    <InputSimple name="pat_name" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <TransparentButton caption="Отправить приглашение" onClick={this.sendInvite}/>
                    </ModalWindow>
                    <CompaniesTable
                        companies={this.state.companies}
                        deleteCompany={this.deleteCompany}
                        enterToCompany={this.enterToCompany}
                        createInvite={this.createInvite}
                        />
                    <TransparentButton onClick={this.createNewCompany} caption="Create"/>
                </div>


            )
        }
        return null

    }


}