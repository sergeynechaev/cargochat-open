var React = require('react/addons');
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {ModalWindow} from '../SimpleComponents/ModalWindow';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {InputCheckBox2} from '../SimpleComponents/InputCheckBox2';
import {InputSelect2} from '../SimpleComponents/InputSelect2';
import {RadioInput} from '../SimpleComponents/RadioInput'
import {Api} from '../api';
import {AppState} from '../Auth/Dashboard';
import {Store, Events, Actions, Dictionary} from '../Dispatcher';
import Logger from '../Classes/Logger';

import {ButtonSimple} from '../Controls/Forms/ButtonSimple';


var PrivateSettings = React.createClass({

    getInitialState(){
        var comp = this.props.company;
        var taxationList = Dictionary.taxationList.map( (item, key) => {
            if( item.tag == comp.taxation ) {
                return {id: item.tag, value: item.value, __selected__:true }
            } else {
                return {id: item.tag, value: item.value }
            }
        });
        return {
            isModalOpen        : false,
            isEditMode         : false,
            rel_transport_from : comp.rel_transport_from,
            rel_transport_to   : comp.rel_transport_to,
            taxationList: taxationList,
            taxation: comp.taxation
        }
    },

    componentWillReceiveProps(){
        this.forceUpdate()
    },

    closeModal(){
        this.setState({isModalOpen: false});
    },

    saveChanges(){
        console.log("save");
        var s=this.state;
        var params={
            rel_transport_from : s.rel_transport_from,
            rel_transport_to   : s.rel_transport_to,
            taxation           : s.taxation
        };
        var message = {};
        Api.updateCompanyRequest(this.state).then(res=> {
            if (res.err) {
                Logger.error( this, 'Error while creating the price request', res.msg );
                message = { message: res.msg, type: "error" };
            } else {
                message = { message: "Настройки компании сохранены", type: "info" };
                AppState.myCompany.update();
                Events.run(Events.EV_COMP_DETAILS);
            }
            Events.run(Events.EV_SHOW_NOTIFY, message);
        })
    },

    updateFromInputs(v){
        this.setState({isEditMode: true});
    },

    onChangeInputSelect(selector) {
        console.log(selector.props.list, selector.getSelectedList()[0].id);
        this.setState({taxationList: selector.props.list});
        this.setState({taxation: selector.getSelectedList()[0].id});
        this.setState({isEditMode: true});
    },


    render(){

        return (
            <div className="box-cln-nw">
                <div className="box-cln-nw col-large">
                        <div className="box-cln-nw panel-md">
                            <div className="divider font600">
                                Кто может указать мою компанию в качестве Перевозчика:
                            </div>
                            <div className="message message-nl">
                                <RadioInput
                                    labelWidth={0}
                                    choice={[
                                        {text:"Любая компания", value:"any"},
                                        {text:"Никто", value:"none"},
                                        {text:"Только по запросу", value:"request"}
                                    ]}
                                    selected={this.state.rel_transport_to}
                                    inputName="rel_transport_to"
                                    returnValue={this.updateFromInputs}
                                    />
                            </div>
                        </div>
                        <div className="box-cln-nw panel-md">
                            <div className="divider font600">
                                Кто может указать мою компанию в качестве Заказчика перевозки (Грузовладельца):
                            </div>
                            <div className="message message-nl">
                                <RadioInput
                                    labelWidth={0}
                                    choice={[
                                        {text:"Любая компания", value:"any"},
                                        {text:"Никто", value:"none"},
                                        {text:"Только по запросу", value:"request"}
                                    ]}
                                    selected={this.state.rel_transport_from}
                                    inputName="rel_transport_from"
                                    returnValue={this.updateFromInputs}
                                    />
                            </div>
                        </div>
                </div>
                <div className="box-cln-nw col-large">
                    <div className="box-cln-nw panel-md">
                        <div className="divider font600">
                            Система налогообложения
                        </div>
                        <div className="message message-nl">
                            <p>Укажите систему налогообложения компании.</p>
                        </div>
                        <div className="message message-nl">
                           <InputSelect2 noIcon={true} list={this.state.taxationList} onChanged={this.onChangeInputSelect}/>
                        </div>
                    </div>
                    <div className="box-row-nw just-end table-footer table-pr">
                        <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal}>

                        </ModalWindow>
                        <ButtonSimple brand="success" disabled={!this.state.isEditMode} onClick={this.saveChanges} caption="Сохранить"/>
                    </div>
                </div>
            </div>
        )
    }
});


var CompanySettings = React.createClass({
    render(){
        return (
            <div className="col-xs-12">
                <PrivateSettings company={this.props.company}/>

            </div>
        )
    }
});


export {CompanySettings}