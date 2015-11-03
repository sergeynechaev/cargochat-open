var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {Validation} from '../../Validation';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
import {InputCheckBox2} from '../../SimpleComponents/InputCheckBox2';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';

import Logger from '../../Classes/Logger';

import {InputAddress} from '../../Controls/Forms/InputAddress';


import {InputSimple} from '../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {InputCheckbox} from '../../Controls/Forms/InputCheckbox';

export class PriceRequestsNewForm extends React.Component {

	constructor(props) {
	    super(props);
	}

    static propTypes = {}

    state = {
    	"flags": 0,
        "isValidated": false
    }

    validateFields = {
        fields: [
            {name: "shipment_time", value: false},
            {name: "from_addr", value: false},
            {name: "to_addr", value: false},
            {name: "cargo_name", value: false},
            {name: "volume", value: false},
            {name: "mass", value: false},
            {name: "unit", value: false}
        ]
    }

    onChangeHandler = (obj)=> {
    	Logger.debug( this, 'Change', obj );
        this.setState( obj );
        this.validateForm();
    }

    onCheckHandler = (obj)=> {
        this.setState({ "flags": obj.flagOnlymine ? 1 : 0 });
    }

    saveForm = ()=> {
        AppState.PriceRequests.createPriceRequest( this.state );
        let c = this.props.onClose;
        if (c) c();
    }

    validateForm =()=> {
        Logger.debug(this,'validate',this.validateFields.fields);
        this.validateFields.fields.forEach( field => {
            if( this.state[field.name] && this.state[field.name].length ) {
                field.value = true;
            }
        });
        Logger.debug(this,'validate form? = ',this.isValidated());
        this.setState( { isValidated: this.isValidated() } );
    }

    isValidated =()=> {
        return this.validateFields.fields.every( field => field.value === true );
    }

    closeForm = ()=> {
    	Logger.debug( this, 'Close new price request form' );
        let c = this.props.onClose;
        if (c) c();
    }

    onSelectFromAddress = ( addr, obj, posX, posY )=> {
    	Logger.debug( this, 'Select from address', addr + ", " + obj.name + ", " + posX + ", " + posY );
    	this.setState({
    		"from_addr": addr,
    		"from_x": posX,
    		"from_y": posY
    	});
        this.validateForm();
    }

    onSelectToAddress = ( addr, obj, posX, posY )=> {
    	Logger.debug( this, 'Select to address', addr + ", " + obj.name + ", " + posX + ", " + posY );
    	this.setState({
    		"to_addr": addr,
    		"to_x": posX,
    		"to_y": posY
    	});
        this.validateForm();
    }

    render = ()=> {
        return (
            <div className="modal-container__body">
                <FormGroup name="Дата отгрузки" from="shipment_time">
                    <InputSimple placeholder='(В свободной форме)' name="shipment_time" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Название" from="cargo_name">
                    <InputSimple name="cargo_name" placeholder="Например: бумага" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Откуда" from="from_addr">
                    <InputAddress name="from_addr" onSelect={this.onSelectFromAddress} onChange={this.onChangeHandler} active={true}/>
                </FormGroup>
                <FormGroup name="Куда" from="to_addr">
                    <InputAddress name="to_addr" onSelect={this.onSelectToAddress} onChange={this.onChangeHandler} active={true}/>
                </FormGroup>
                <FormGroup name="Объем, куб.м." from="volume">
                    <InputSimple name="volume" placeholder="" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                </FormGroup>
                <FormGroup name="Масса, тонн" from="mass">
                    <InputSimple name="mass" placeholder="" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                </FormGroup>
                <FormGroup name="Единица ставки" from="unit">
                    <InputSimple name="unit" placeholder="Например: руб за тонну" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Примечание" from="note">
                    <InputSimple name="note" placeholder="" onChange={this.onChangeHandler}/>
                </FormGroup>
                <FormGroup name="Видимость" from="flagOnlymine">
                    <InputCheckbox name="flagOnlymine" onChange={this.onCheckHandler} caption="Только для перевозчиков моей компании"/>
                </FormGroup>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.saveForm} disabled={!this.state.isValidated} brand="success" caption="Опубликовать"/>
                </div>
            </div>
        )
    }	// render
}