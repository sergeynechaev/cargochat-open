var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Loading} from '../../../Controls/Loading';
import {SimpleTable2, TblHead, TblBody, TblCellSid, TblPages} from '../../../SimpleComponents/SimpleTable2';
import ContactsDataTable__Cell_Perms from './ContactsDataTable__Cell_Perms';
import ContactsDataTable__Cell_Actions from './ContactsDataTable__Cell_Actions';

export default class ContactsDataTable extends React.Component {

	constructor( props ) {
        super( props );
    }

    state = {
        users: false
    }

    componentWillMount = ()=> {
        AppState.myCompany.on('MyCompany_Users-update', this.updateUsers)
    }

    componentDidMount =()=> {
        AppState.myCompany.getUsers();  
    }

    componentWillUnmount = ()=>{
        AppState.myCompany.rem('MyCompany_Users-update', this.updateUsers)
    }

    updateUsers =(users)=>{
        this.setState({ users: users });
    }

    render = ()=> {
        let opt = {
            headerClass : TblHead,
            headerClassName: "panel-heading-grey panel-md border-btm",
            className: "panel panel-default max-size",
            title: "Сотрудники организации",
            headData : [
                {id: 'ln',       title: 'Фамилия'},
                {id: 'fn',       title: 'Имя'},
                {id: 'pn',       title: 'Отчество'},
                {id: 'position', title: 'Должность'},
                {id: 'phone',    title: 'Моб.телефон'},
                {id: 'email',    title: 'Email'},
                {id: 'cflg',     title: 'Права',      cellClass: ContactsDataTable__Cell_Perms},
                {cellClass: ContactsDataTable__Cell_Actions}
            ],
            bodyClass: TblBody,
            bodyData : this.state.users,
            pagesClass: TblPages,
            pagesConf: {
                availableCapacity: [2, 5, 10],
                currentCapacity: 10,
                currentPage: 1
            }
        }

        let opt1 = {
            // bodyClass: TblBody,
            title: 'Сотрудники компании',
            bodyData: this.state.users
        }

        return(
            <Loading dataReceived={this.state.users}>
                <SimpleTable2 opt={opt}/>
            </Loading>
        ) 
    }
}