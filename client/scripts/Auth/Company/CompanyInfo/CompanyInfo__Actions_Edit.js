var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Validation} from '../../../Validation';
import {Events} from '../../../Dispatcher';

import {ModalWindow} from '../../../Controls/ModalWindow';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';

import {logger} from '../../../Classes/Logger';

export default class CompanyInfo__Actions_Edit extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    state = {
        isModalOpen: false,
        name: this.props.data.name,
        email: this.props.data.email,
        web_site: this.props.data.web_site,
        // ati_code: this.props.data.ati_code,  // deprecated
        work_hours: this.props.data.work_hours,
        info: this.props.data.info
    }

    validateFields = {
        fields: [
            {name: "name", value: false}
        ]
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

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    onChangeHandler = (obj)=>{
        this.setState(obj);
        this.validateForm();
    }

    saveForm = ()=> {
        // deprecated ati
        // 
        // let params = {  name: this.state.name, email: this.state.email, web_site: this.state.web_site, ati_code: this.state.ati_code, 
        //                 work_hours: this.state.work_hours, info: this.state.info };

        let params = {  name: this.state.name, email: this.state.email, web_site: this.state.web_site, 
                        work_hours: this.state.work_hours, info: this.state.info };

        AppState.myCompany.updateCompanyRequest(params);
        this.closeModal();
    }

    render = ()=> {
        let comp = this.state.comp;

        return(
            <div className="box-row-nw">
                <ButtonSimple caption="Изменить данные" onClick={this.openModal} brand="primary"/>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Изменить данные компании">
                    <div className="modal-container__body">
                        <FormGroup name="E-mail" from="email">
                            <InputSimple value={this.state.email} name="email" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Сайт" from="web_site">
                            <InputSimple value={this.state.web_site} name="web_site" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Время работы" from="work_hours">
                            <InputSimple value={this.state.work_hours} name="work_hours" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Описание компании" from="info">
                            <InputSimple value={this.state.info} name="info" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption="Изменить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}

// deprecated
// 
// <FormGroup name="АТИ код" from="ati_code">
//                             <InputSimple value={this.state.ati_code} name="ati_code" onChange={this.onChangeHandler}/>
//                         </FormGroup>