var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {Validation} from '../../Validation';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';

import {logger} from '../../Classes/Logger';

export default class Channels__CreateChannel extends React.Component {

	constructor(props) {
	    super(props);
        this.formData = {};
	}

    static propTypes = {}

    state = {
        "isValidated": false,
    }

    componentDidMount =()=> {
        this.initForm();
    }

    /**
     * FORMS BLOCK - вынести в отдельный класс
     *
     * initFields()
     * initForm() - инициализация и наполнение, если передан this.props.obj
     * 
     */

    formFields = {
        fields: [
            {name: "title", isRequired: true},
            // {name: "num", isRequired: true, validatorName: "validateNum" },
        ]
    }
    
    initFields =()=> {
        this.formFields.fields.forEach( field => {
            field.isValidated = false;
            field.isChanged = false;
            // set custom validator
            if( field.validatorName ) field.validator = this[field.validatorName];
        });
    }

    initForm =()=> {

        // добавляем флаги
        this.initFields();

        // если передан внешний объект, вытаскиваем из него данные для формы
        // if( this.props.obj ) {
        //     Object.keys(this.props.obj).forEach( key => {
        //         if( this.isFieldInForm(key) ) {
        //             this.formData[key] = this.props.obj[key2];
        //         }
        //     });
        // }
    }

    isFieldInForm =(name)=> {
        return this.formFields.fields.some( field => field.name == name );
    }

    setFormData =(obj) => {
        Object.keys(obj).forEach( key => {
            this.formData[key] = obj[key];
            // set field is changed
            this.formFields.fields.forEach( field => {
                if( field.name == key ) field.isChanged = true;
            });
        });
    }

    validateForm =()=> {
        this.formFields.fields.forEach( field => {

            // not required field
            if( ! field.isRequired ) {
                field.isValidated = true;
                return;
            }
            
            // required field
            if( this.formData[field.name] ) {

                // custom validation
                if( field.validator ) {
                    field.isValidated = field.validator( this.formData[field.name] );
                // only 'isRequired' validation
                } else {
                    field.isValidated = true;
                }
            } else {
                field.isValidated = false;
                field.isChanged = false;
            }
        });
        this.setState( { isValidated: this.isValidated() } );
    }

    isValidated =()=> {
        return this.formFields.fields.every( field => field.isValidated === true );
    }

    /**
     * End of FORMS BLOCK
     */

    validateNum =(value)=> {
        let mask = (this.formData.type == 'trailer' || this.formData.type == 'semitrailer') 
                    ? /[А-Яа-я]{2}\d{6,7}/
                    : /[А-Яа-я]\d{3}[А-Яа-я]{2}\d{2,3}/;
        return mask.test( value );
    }
    
    onChangeHandler = (obj)=> {
        this.setFormData(obj);
        this.validateForm();
    }

    saveForm = ()=> {
        if( this.props.onSave ) this.props.onSave(this.formData.title);
        this.closeForm();
    }

    closeForm = ()=> {
        this.formData = {};
        if( this.props.onClose ) this.props.onClose();
    }

    render = ()=> {
        return (
            <div className="modal-container__body">
                <FormGroup name="Название" from="title">
                    <InputSimple value={this.formData.title} name="title" onChange={this.onChangeHandler}/>
                </FormGroup>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption="Создать"/>
                    <ButtonSimple onClick={this.closeForm} brand="warning" caption="Отменить"/>
                </div>
            </div>
        )
    }
}
