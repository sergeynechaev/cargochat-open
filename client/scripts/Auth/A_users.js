"use strict";
var React = require('react/addons');

import {Dictionary} from '../Dispatcher';
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
    TblFooterControls

} from '../SimpleComponents/SimpleTable2';
import {Api} from '../api';
import {TblCellPerms} from '../SimpleComponents/TableCells';


class TblCellGender extends React.Component {

    render() {
        var gender;
        if (this.props.value === "мужской") {
            gender = "M"
        } else if (this.props.value === "женский") {
            gender = "Ж"
        } else gender = "не указан";

        return (

            <div>
                {gender}
            </div>
        )
    }
}

class TblFullName extends React.Component {

    render() {
        var lastName = (this.props.obj.last_name) ? this.props.obj.last_name : "";
        var patName = (this.props.obj.pat_name) ? this.props.obj.pat_name : "";
        var firstName = (this.props.value) ? this.props.value : "";
        var fullName = lastName + " " + firstName + " " + patName;
        return (
            <div>
                {fullName}
            </div>
        )
    }
}

class TblUserComp extends React.Component {

    render() {
        var company = (this.props.value.data.length > 0) ? this.props.value.data[0].name : null;
        var inn = (this.props.value.data.length > 0) ? this.props.value.data[0].inn : null;

        return (
            <div>
                {company}({inn})
            </div>
        )
    }
}


class UsersTable extends React.Component {

    render() {

        this.opt = {
            // хедер
            headerClass    : TblHead,
            headData       : [
                {id: 'id', title: 'ID'},
                {id: 'first_name', title: 'ФИО', cellClass: TblFullName},
                {id: 'comps', title: 'Компания', cellClass: TblUserComp},
                {id: 'email', title: 'email'},
                {id: 'gender', title: 'Пол', cellClass: TblCellGender},
                {id: 'perms', title: 'Права', cellClass: TblCellPerms}
            ],
            // контент
            bodyClass      : TblBody,
            //bodyData: Store.sessions,
            bodyData       : this.props.users,
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
            title          : 'Users',  // заголовок контейнера
            isSelectable   : (obj) => obj.sid != Api.sid,  // ф-я проверки возможности выделения объекта
            selectionKey   : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable     : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect    : true  // можно выбирать несколько рядов
        };
        if (this.props.users) {
            return (
                <div className='box-row-wr align-s-start'>
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

export default class A_Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
    }

;

    componentWillMount() {
        this.getUsers()
    }

    getUsers() {
        console.log("GET USERS!");
        Api.req('graph', {
            query: {
                users: {
                    fields: ["id", "first_name", "last_name", "pat_name", "email", "gender"],
                    sub   : {
                        comps: {
                            fields: ["name", "inn"]
                        },
                        perms: {}
                    }
                }
            }
        }, false).then(res=> {
            console.log(res);
            this.setState({users: res.users.data})
        })
    }

    render() {
        return (
            <Loading dontShow={true} dataRecived={(this.state.users)}>
                <UsersTable users={this.state.users}/>
            </Loading>
        )
    }
}