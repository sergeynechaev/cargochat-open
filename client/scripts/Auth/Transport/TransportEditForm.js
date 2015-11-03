var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Validation} from '../../Validation';
import {Icon} from '../../SimpleComponents/Icons';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import InputUploadFile from '../../Controls/Forms/InputUploadFile';
// import {InputSelect} from '../../Controls/Forms/InputSelect';        // не работает
import {InputSelect2} from '../../SimpleComponents/InputSelect2';

export class TransportEditForm extends React.Component {

	constructor(props) {
	    super(props);
        this.formData = {};
	}

    static propTypes = {}

    state = {
        "isValidated": false,
        "typesList": [],
    }

    componentDidMount =()=> {
        this.initList(this.props);
        this.initForm();
    }

    componentWillReceiveProps =(nextProps)=> {
        if( this.props.currentState != nextProps.currentState ) {
            // logger.log('receive new props for TransportEditForm - init form -');
            
            this.initList(nextProps);
            this.initForm();
        }
    }

    initList =(props)=> {
        var typesList = AppState.Transport.typesList.map( (item, key) => {
            if( props.obj && item.tag == props.obj.type ) {
                return {id: item.tag, value: item.value, __selected__:true }
            } else {
                return {id: item.tag, value: item.value }
            }
        });
        this.setState({typesList: typesList});
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
            {name: "model", isRequired: true},
            {name: "num", isRequired: true, validatorName: "validateNum" },
            {name: "type", isRequired: true},
            {name: "sts", isRequired: true},
            {name: "pts", isRequired: true},
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

        this.resetForm();
        this.initFields();

        // если передан внешний объект, вытаскиваем из него данные для формы
        if( this.props.obj ) {
            Object.keys(this.props.obj).forEach( key => {
                if( this.isFieldInForm(key) ) {
                    // изменяем значение некоторых полей
                    let key2 = (key == "sts" || key == "pts") ? key+"_token": key;
                    this.formData[key] = this.props.obj[key2];
                }
            });
        }
    }

    resetForm =()=> {
        this.formData = {};
        this.setState({ isValidated: false });
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
                    logger.log('validate num', field);
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
        if( this.props.obj && this.props.obj.id ) {
            // get only modified fields
            let params ={};
            params.vehicle_id = this.props.obj.id;
            this.formFields.fields.forEach( field => {
                if( field.isChanged ) {
                    params[field.name] = this.formData[field.name];
                }
            })
            logger.log('update vehicle', params);

            AppState.Transport.updateVehicle( params );
        } else {
            logger.log('create new vehicle', this.formData);

            AppState.Transport.createVehicle( this.formData );
        }
        this.closeForm();
    }

    closeForm = ()=> {
        let c = this.props.onClose;
        if (c) c();
    }

    onChangeInputSelect =(caller)=> {
        let newType = caller.getSelectedList()[0].id;

        // logger.log('cnange frm_type= ' + this.formData.type + " new type= " + newType);

        // reset the num if type has changed
        if( (!this.formData.type || this.formData.type == 'truck' || this.formData.type == 'lorry') 
             && (newType != 'truck' && newType != 'lorry' ) ) {
                this.setFormData({num: ''});
        }
        if( (this.formData.type == 'trailer' || this.formData.type == 'semitrailer') 
             && (newType != 'trailer' && newType != 'semitrailer' ) ) {
                this.setFormData({num: ''});
        }

        this.setFormData({type: newType});
        this.validateForm();
        this.setState({type: newType});
    }

    onUploadFile =(filename, temp_file_token)=> {
        // logger.log('on upload file fn='+filename + ' token='+ temp_file_token);

        this.setFormData( {[filename]: temp_file_token} );
        this.validateForm();
    }

    render = ()=> {
        return (
            <div className="modal-container__body">
                <FormGroup name="Тип" from="type">
                    <InputSelect2 ref='type' name='type' active={true} noIcon={true} list={this.state.typesList} onChanged={this.onChangeInputSelect}/>
                </FormGroup>
                <FormGroup name="Марка" from="model">
                    <InputSimple value={this.formData.model} name="model" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Гос. номер" from="num">
                    {(this.state.type == "trailer" || this.state.type == "semitrailer") ? <InputSimple name="num" value={this.formData.num} placeholder="хx0000000[0]" onChange={this.onChangeHandler} validation={{typing: Validation.typingTrailerNum}}/> : <InputSimple name="num" value={this.formData.num} placeholder="х000хх00[0]" onChange={this.onChangeHandler} validation={{typing: Validation.typingCarNum}}/>}
                </FormGroup>
                <FormGroup name="СТС" from="sts">
                    <InputUploadFile value={this.formData.sts} filename="sts" onUpload={this.onUploadFile} />
                </FormGroup>
                <FormGroup name="ПТС" from="pts">
                    <InputUploadFile value={this.formData.pts} filename="pts" onUpload={this.onUploadFile} />
                </FormGroup>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption={this.props.isEdit ? "Обновить" : "Добавить"}/>
                </div>
            </div>
        )
    }
}


// <InputSelect values={this.state.typesList} name="type" onChange={this.onChangeInputSelect}/>

// <FormGroup name="СТС" from="sts">
//                     <InputUpload name="sts" onUpload={this.onUploadFile} />
//                 </FormGroup>
//                 <FormGroup name="ПТС" from="pts">
//                     <InputUpload name="pts" onUpload={this.onUploadFile} />
//                 </FormGroup>




    // <div>
    //     <FlexBox direction="row" alignItems="center">
    //         <label className="label Transport__EditForm_Label">Тип</label>
    //         <InputSelect2 noIcon={true} list={this.state.typesList} onChanged={this.onChangeInputSelect}/>
    //     </FlexBox>
    //     <FlexBox direction="row" alignItems="center">
    //         <label className="label Transport__EditForm_Label">Марка</label>
    //         <InputSimple placeholder='' value={this.formData.model} name="model" onChange={this.onChangeHandler}/>
    //     </FlexBox>
    //     <FlexBox direction="row" alignItems="center">
    //         <label className="label Transport__EditForm_Label">Гос. номер</label>
    //         {(this.state.type == "trailer" || this.state.type == "semitrailer") ? <InputSimple name="num" value={this.formData.num} placeholder="хx0000000[0]" onChange={this.onChangeHandler} validation={{typing: Validation.typingTrailerNum}}/>
    //             : <InputSimple name="num" value={this.formData.num} placeholder="х000хх00[0]" onChange={this.onChangeHandler} validation={{typing: Validation.typingCarNum}}/>}
    //     </FlexBox>
    //     <FlexBox direction="row" alignItems="center">
    //         <label className="label Transport__EditForm_Label">СТС</label>
    //         <InputUploadFile caption="загрузить файл" value={this.formData.sts} filename="sts" onUpload={this.onUploadFile} />
    //     </FlexBox>
    //     <FlexBox direction="row" alignItems="center">
    //         <label className="label Transport__EditForm_Label">ПТС</label>
    //         <InputUploadFile caption="загрузить файл" value={this.formData.pts} filename="pts" onUpload={this.onUploadFile} />
    //     </FlexBox>
    //     <div className="box-row-nw just-end marg-t">
    //         <TransparentButton onClick={this.saveForm} disabled={!this.state.isValidated} caption={this.props.isEdit ? "Обновить" : "Добавить"}/>
    //         <TransparentButton onClick={this.closeForm} caption="Отменить"/>
    //     </div>
    // </div>
    
    // <FlexBox direction="row" alignItems="center">
    //     <label className="label Transport__EditForm_Label">Тип</label>
    //     <InputSelect2 noIcon={true} list={this.state.typesList} onChanged={this.onChangeInputSelect}/>
    // </FlexBox>



// onChangeFileSelect = (e) => {
//     logger.log('onChangeFileSelect', e.target.isValidated, e.target.name);
//     let file = {};
//     let fileInput = document.getElementById(e.target.name);
//     file[e.target.name] = fileInput.files[0];
//     this.setFormData(file);
//     this.validateForm();
//     // var inp = document.getElementById(e.target.name);
//     // logger.log('file', inp.files[0]);
// }

// save form with multiple files
// let stsFile = document.getElementById('sts');
// let ptsFile = document.getElementById('pts');
// console.debug(document.forms.namedItem('updateTransportForm'));
// var frmData = new FormData(document.forms.namedItem('updateTransportForm'));
// var frmData = new FormData();
// frmData.append('model', this.formData.model);
// frmData.append('num', this.formData.num);
// frmData.append('type', this.formData.type);
// frmData.append('sts', stsFile.files[0]);
// frmData.append('pts', ptsFile.files[0]);
//logger.log('save: frmData stringify', JSON.stringify(this.formData));