var React = require('react/addons');
//import {Dispatcher} from './Dispatcher';
import {Api} from '../api';
import {Utils} from '../utils';
import {Validation} from '../Validation';
import {Loading} from '../SimpleComponents/Loading';
import {Events, Actions, Store} from '../Dispatcher';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {InputText} from '../SimpleComponents/InputText';
import {TransparentButton} from '../SimpleComponents/TransparentButton';

var JoinCompany = React.createClass({


    сomponentWillUnmount() {
        Events.rem(Events.EV_COMP_DETAILS, this.updateStateWrapper);
        Events.rem(Events.EV_PROFILE_UPDATE, this.updateStateWrapper);
    },
    updateStateWrapper(newState) {
        this.setState(newState)
    },

    getInitialState(){
        return {
            inn    : '',
            company: null,
            profile: Store.userState,
            message: '',
            sent   : false
        }
    },
    returnValue(value){
        this.setState(value)
    },

    findCompany(){
        var isThisYourCompany = Store.companies.some((company)=> {
            return company.inn === this.state.inn
        });
        if (isThisYourCompany) {
            console.log("Это уже ваша компания")
        } else {
            Actions.getCompanyByInn(this.state.inn);
        }

    },
    back(){
        window.location.hash = '/dashboard/select'
    },
    goDashboard(){
        window.location.hash = '/dashboard'
    },
    sendJoinRequest(){
        console.log("отправить запрос " + this.props.query.name);
        Actions.joinRequestCreate(this.props.query.id);
        //this.setState({sent:true})
        window.location.hash = '/dashboard/select'
    },
    render: function () {
        console.log(this.props.query);
        return (
            <div className="box-row-wr max-size align-start">
                <SmallPanel disabled={this.state.sent} headerName="Найдена компания">
                    <div className="box-cln-nw align-stretch panel-md">
                        <InputText type="search" active={false} validation={{typing:Validation.typingInt}}
                                   inputName="inn" caption="ИНН" value={this.props.query.inn}
                                   returnValue={this.returnValue}/>
                        <InputText type="search" active={false} inputName="name" caption="Название"
                                   value={this.props.query.name} returnValue={this.returnValue}/>
                        <InputText type="search" active={false} inputName="address" caption="Адрес"
                                   value={this.props.query.address} returnValue={this.returnValue}/>
                    </div>
                    <div className="box-row-nw just-end table-footer table-pr">
                        <TransparentButton caption="Отправить запрос" onClick={this.sendJoinRequest}/>
                        <TransparentButton caption="Назад" onClick={this.back}/>
                    </div>
                </SmallPanel>
                <SmallPanel disabled={!this.state.sent} headerName="Запрос отправлен">
                    <TransparentButton caption="Вернуться на рабочий стол" onClick={this.goDashboard}/>
                </SmallPanel>


            </div>
        )
    }

});

export {JoinCompany}
