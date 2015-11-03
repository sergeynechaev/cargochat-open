var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Events} from '../../../Dispatcher';

import {Loading} from '../../../Controls/Loading';
import {SimpleTable2, TblHead, TblBody, TblCellSid, TblPages} from '../../../SimpleComponents/SimpleTable2';

import ContactsInvitedDataTable__Cell_Time from './ContactsInvitedDataTable__Cell_Time';
import ContactsInvitedDataTable__Cell_Actions from './ContactsInvitedDataTable__Cell_Actions';

export default class ContactsInvitedDataTable extends React.Component {

	constructor( props ) {
        super( props );
    }

    state = {
        users_invited: false
    }

    componentWillMount = ()=> {
        AppState.myCompany.on('MyCompany_UsersInvited-update', this.updateUsersInvited)
    }

    componentDidMount =()=> {
        AppState.myCompany.getUsersInvited();
    }

    componentWillUnmount = ()=>{
        AppState.myCompany.rem('MyCompany_UsersInvited-update', this.updateUsersInvited)
    }

    updateUsersInvited =(users)=>{
        this.setState({ users_invited: users });
    }

    render = ()=> {
        let opt = {
            headerClass : TblHead,
            headerClassName: "panel-heading-grey panel-md border-btm",
            className: "panel panel-default max-size",
            title       : "Приглашенные пользователи",
            headData    : [
                {id: 'last_name', title: 'Фамилия'},
                {id: 'first_name', title: 'Имя'},
                {id: 'pat_name', title: 'Отчество'},
                {id: 'email', title: 'Email'},
                {id: 'position', title: 'Должность' },
                {id: 'ctime', title: 'Создано', cellClass: ContactsInvitedDataTable__Cell_Time},
                {id: 'id', title: 'Действия', cellClass: ContactsInvitedDataTable__Cell_Actions}
            ],
            bodyClass   : TblBody,
            bodyData    : this.state.users_invited,
            pagesClass: TblPages,
            pagesConf: {
                availableCapacity: [2, 5, 10],
                currentCapacity: 10,
                currentPage: 1
            }
        }

        return(
            <Loading dataReceived={this.state.users_invited}>
                { this.state.users_invited.length ? <SimpleTable2 opt={opt}/> : null}
            </Loading>
        ) 
    }
}