var React = require('react/addons');

import {Api} from './../../api.js';
import {AppState} from '../Dashboard';
import {Events} from './../../Dispatcher.js';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../Controls/Icon.js';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup.js';
import {InputSimple} from '../../Controls/Forms/InputSimple.js';

export class CompRelationCreateDialog extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        oppComp: this.props.company,
        myComp: AppState.myCompany.state,
        relations: [],
        isValidated: false,
        currentRelation: null
    }

    validateFields = {
        fields: [
            {name: "email"},
            {name: "fio"},
            {name: "phone"}
        ]
    }

    componentWillReceiveProps = (nextProps)=>{
        this.state.oppComp = nextProps.company;
        this.getPossibleRelation();
    }

    validateForm =()=> {
        this.validateFields.fields.forEach( field => {
            if( this.state[field.name] && this.state[field.name].length ) {
                field.value = true;
            } else {
                field.value = false;
            }
        });
        this.setState( { isValidated: this.isValidated() } );
    }

    isValidated =()=> {
        return this.validateFields.fields.every( field => field.value === true );
    }

    onChangeHandler = (obj)=>{
        this.setState( obj );
        this.validateForm();
    }

    checkTag = (tags, tag)=>{
        return tags.some(_t=>{
            return _t == tag;
        })
    }

    getPossibleRelation = (myComp=this.state.myComp)=>{
        let Relations = [];

        myComp.tags.forEach(tag=>{
            if(tag == 'shipper'){
                if(this.props.company.rel_expeditor) return;
                Relations.push({text: "Это мой экспедитор (Я грузовладелец)", type: "expedition", comp_to: this.state.myComp.id, comp_from: this.state.oppComp.id});
            }
            if(tag == 'carrier' && this.checkTag(this.state.oppComp.tags, 'expeditor')){
                if(this.props.company.rel_expeditor) return;
                Relations.push({text: "Это мой экспедитор (Я перевозчик)", type: "transport", comp_to: this.state.oppComp.id, comp_from: this.state.myComp.id});
            }
            if(tag == 'expeditor'){
                if(this.props.company.rel_carrier) return;
                Relations.push({text: "Это мой перевозчик (Я экспедитор)", type: "transport", comp_to: this.state.myComp.id, comp_from: this.state.oppComp.id });
            }
        });

        this.setState({ relations: Relations, isValidated: false });
    }

    componentWillMount = ()=>{
        this.getPossibleRelation();
    }

    toggleRelation = (rel)=>{
        this.setState({ currentRelation: rel, isValidated: this.state.oppComp.state != 'new' ? true : false });
    }

    createRelation = ()=>{
        let params = {
                comp_from: this.state.currentRelation.comp_from,
                comp_to: this.state.currentRelation.comp_to,
                relation_type: this.state.currentRelation.type,
                owner_invite: {}
            };

        if(this.state.oppComp.state == 'new'){
            params.owner_invite = {
                fio: this.state.fio,
                email: this.state.email,
                phone: this.state.phone
            }
        }

        Api.linkCreateRequest(params).then(res=>{
            let message = {};

            if(res.err){
                logger.log(this, 'linkCreateRequest', res.msg, 'error');
                message = { message: res.msg,  type: 'error' };
            } else {
                if(res.invite_id){
                    if(currentRelation.type == "transport"){
                        message = { message: "Запрос на создение связи отправлен", type: 'info' };
                    } else {
                        message = { message: "Связь создана", type: 'info' };
                    }
                } else {
                    message = { message: "Связь создана", type: 'info' };
                }

                Events.run(Events.EV_COMP_STATE_UPDATE);
            }

            Events.run(Events.EV_SHOW_NOTIFY, message);
        });
        
        this.props.onClose();
    }

    render = ()=>{
        let RelationsList, InviteForm = null;

        if(this.state.relations.length){
            RelationsList = this.state.relations.map((rel, i)=>{
                                let relClassName = "relation-list__item";
                                if(rel == this.state.currentRelation) relClassName += " relation-list__item--current";

                                return(
                                    <div className={relClassName} onClick={this.toggleRelation.bind(this, rel)}>
                                        {rel == this.state.currentRelation ? <Icon name="check" className="relation-list__item-icon" size={22}/> : null}
                                        {rel.text}
                                    </div>
                                )
                            });
        } else {
            RelationsList =  <div className="modal-container__message">
                                Все возможные связи уже созданы
                            </div>
        }

        if(this.state.currentRelation && this.state.oppComp.state == 'new'){
            InviteForm =    <div className="relation-form">
                                <h3 className="relation-form__title">Отправьте приглашение сотруднику компании</h3>
                                <FormGroup name="ФИО" from="fio">
                                    <InputSimple onChange={this.onChangeHandler} name="fio" placeholder="Иванов Иван Иванович"/>
                                </FormGroup>
                                <FormGroup name="E-mail" from="email">
                                    <InputSimple onChange={this.onChangeHandler} name="email" placeholder="ivanov@gmail.com"/>
                                </FormGroup>
                                <FormGroup name="Телефон" from="phone">
                                    <InputSimple onChange={this.onChangeHandler} name="phone"/>
                                </FormGroup>
                            </div>;
        }

        return(
            <div className="modal-container__body">
                <div className="relation-modal">
                    <ul className="relation-list">
                        {RelationsList}
                    </ul>
                    <div className="relation-form">
                        {InviteForm}
                    </div>
                </div>
                <div className="modal-container__footer">
                    <ButtonSimple brand="success" disabled={!this.state.isValidated || !this.state.currentRelation} onClick={this.createRelation} caption="Создать"/>
                </div>
            </div>
        )
    }
}