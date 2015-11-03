var React = require('react/addons');
import {Store, Events, Actions} from '../Dispatcher';
import {Api} from '../api';
import {Utils} from '../utils';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {Loading} from '../SimpleComponents/Loading';
import {InputText} from '../SimpleComponents/InputText';
import {InputAddress} from '../SimpleComponents/InputAddress';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {InputSelect} from '../SimpleComponents/InputSelect.js';
import {RadioInput} from '../SimpleComponents/RadioInput.js';
import {DateSimple} from '../SimpleComponents/DateSimple';

var CreateTender = React.createClass({

    // переделать на ES6 и добавить типы свойств


    getInitialState(){
        return {
            comp_id  : this.props.company.id,
            name     : (this.props.tenderObject) ? this.props.tenderObject.name : null,
            stime    : (this.props.tenderObject) ? this.props.tenderObject.stime : null,
            etime    : (this.props.tenderObject) ? this.props.tenderObject.etime : null,
            organizer: (this.props.tenderObject) ? this.props.tenderObject.organizer : null
        }
    },

    componentWillMount(){
        console.log("CREATE Tender");
        console.log(this.props.params)
    },
    mergeState (obj) {
        console.log('[CreateTender] mergeState')
        console.debug(obj)
        this.setState(obj)
    },

    cancelCreate(){
        if (this.props.tenderObject) {
            this.props.backToTenders()
        } else {
            window.location.hash = "#/dashboard/company/tenders";
        }

    },

    createTender () {
        //console.log('[CreateTender] createTender');
        //console.debug(this.state);

        if (!Utils.is_valid_yyyymmdd(this.state.stime)) {
            alert('Неверная дата начала');
            return
        }

        if (!Utils.is_valid_yyyymmdd(this.state.etime)) {
            alert('Неверная дата окончания');
            return
        }

        Api.createTender(params).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                console.log(res);
                window.location.hash = 'dashboard/company/tenders'
            }
        })
    },

    saveTender(){
        var newEdition = this.state;
        delete newEdition.comp_id;
        newEdition.tender_id = this.props.tenderObject.id;


        //Actions.updateTender(newEdition, this.props.backToTenders)

        Api.updateTender(newEdition).then(res=> {
            if (res.err) {
                alert(res.msg);
                console.log(res.msg);
            } else {
                console.log(res);
                //this.updateCompanyInfo();
                this.props.backToTenders();
            }
        })

    },

    render(){
        console.log("CREATETE");
        console.log(this.props.tenderObject);
        var Save = (!this.props.tenderObject) ? <TransparentButton onClick={this.createTender} caption="Создать"/> :
            <TransparentButton onClick={this.saveTender} caption="Сохранить"/>;
        return (
            <div className="box-row-wr align-start test-animate">
                <SmallPanel headerName={
                    (this.props.tenderObject)?"Редактирование тендера":"Создание тендера"}>
                    <div className="box-cln-nw align-stretch panel-md ">
                        <div className="">
                            <InputText
                                type="text"
                                active={true}
                                inputName="name"
                                caption="Название тендера"
                                value={this.state.name}
                                returnValue={this.mergeState}
                                labelWidth={150}
                                placeholder="Введите название"
                                />
                        </div>
                        <div className="wrap-tb">
                            <DateSimple
                                name="stime"
                                caption="Дата начала приема заявок"
                                onChange={this.mergeState}
                                labelWidth={150}
                                value={this.state.stime}
                                />
                        </div>
                        <div className="wrap-tb">
                            <DateSimple
                                name="etime"
                                caption="Дата окончания приема заявок"
                                onChange={this.mergeState}
                                labelWidth={150}
                                value={this.state.etime}
                                _test_value={'2250-Май-Среда'}
                                />
                        </div>
                        <div className="">
                            <InputText
                                type="text"
                                active={true}
                                inputName="organizer"
                                caption="Электронная площадка торгов"
                                value={this.state.organizer}
                                returnValue={this.mergeState}
                                labelWidth={150}
                                placeholder="Ссылка на сайт оператора"
                                />
                        </div>
                    </div>
                    <div className="box-row-nw just-end table-footer table-pr">
                        {Save}
                        <TransparentButton onClick={this.cancelCreate} caption="Отменить"/>
                    </div>
                </SmallPanel>
            </div>
        )
    }
});


export {CreateTender}