var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {Validation} from '../../Validation';

// import {InputText} from '../../SimpleComponents/InputText';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
// import {InputCheckBox2} from '../../SimpleComponents/InputCheckBox2';

import {FlexBox} from '../../SimpleComponents/FlexBox';
// import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';

import {InputSimple} from '../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {InputCheckbox} from '../../Controls/Forms/InputCheckbox';

import {logger} from '../../Classes/Logger';

class PriceRequestsNewBet extends React.Component {

	constructor(props) {
	    super(props);
	}

    static propTypes = {}

    state = {
    	"flags": 0,
    }

    componentWillMount = ()=> {
        this.setState( {
            "price_request_id": this.props.obj.price_request_id,
        });
    }

    onChangeHandler = (obj)=> {
        this.setState( obj );
    }

    onCheckHandler = (obj)=> {
        this.setState({ "flags": obj.flagVAT ? 1 : 0 });
    }

    saveForm = ()=> {
        logger.log(this,'Create Bet, params = ',this.state);
        AppState.PriceRequests.createPriceRequestBet( this.state, this.props.type );
        let c = this.props.onClose;
        if (c) c();
    }

    closeForm = ()=> {
        let c = this.props.onClose;
        if( c ) c();
    }

    render = ()=> {

    	let formProps = {
    		labelWidth: 88
    	};

        return (
            <div className="modal-container__body">
                <FormGroup name="Единица ставки" from="title">: {this.props.obj.unit}</FormGroup>
                <FormGroup name="Ставка" from="title">
                    <InputSimple name="bet" autoFocus={true} onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
                </FormGroup>
                <FormGroup name="Включая НДС" from="flagOnlymine">
                    <InputCheckbox name="flagVAT" onChange={this.onCheckHandler} caption="НДС"/>
                </FormGroup>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.saveForm} brand="success" caption="Опубликовать"/>
                </div>
            </div>
        )
    }	// render
}

export {PriceRequestsNewBet}

// <ButtonSimple onClick={this.closeForm} type="warning" caption="Отменить"/>

// <div>
    // <FlexBox direction="row" alignItems="center">
    //     <label className="label label-width-md">Единица ставки: {this.props.obj.unit}</label>
    // </FlexBox>
    // <FlexBox direction="row" alignItems="center">
    //     <label className="label label-width-md">Ставка</label>
    //     <InputSimple name="bet" placeholder="" onChange={this.onChangeHandler} validation={{typing:Validation.typingFloat}}/>
    // </FlexBox>
    // <FlexBox direction="row" alignItems="center">
        // <label className="label label-width-md">НДС</label>
        //     <label className="label-checkbox main-text">
        //         <InputCheckBox2
        //             inputName="flagVAT"
        //             checked={false}
        //             onChanged={this.onCheckHandler}
        //             returnValue={this.onCheckHandler}
        //             />
    //         </label>
    //         <label className="label padd-top">с НДС</label>
    // </FlexBox>
    // <div className="box-row-nw just-end marg-t">
    //     <TransparentButton onClick={this.saveForm} caption="Опубликовать"/>
    //     <TransparentButton onClick={this.closeForm} caption="Отменить"/>
    // </div>
// </div>
