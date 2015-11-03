var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
// import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../Controls/ModalWindow';
//import Hint from '../../SimpleComponents/Hint';
import {logger} from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {PriceRequestsNewBet} from './PriceRequestsNewBet';

class PriceRequests__Card_Actions_CreateBet extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
        isModalOpen: false
    }

    state = {
        isModalOpen: false
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }


    render = ()=> {

        // logger.log('create BET btn', this, AppState.myCompany, this.props.obj);

        // don't show 'set bet' button if the company is a shipper only
        if( AppState.myCompany.isShipper() && !AppState.myCompany.isExpeditor() && !AppState.myCompany.isCarrier() ) return null;

        // don't show 'set bet' button for myself
        if( AppState.myCompany.id == this.props.obj.comp_id ) return null;

        let vat = (this.props.obj.bet_flags) ? "с НДС" : "без НДС";

        if( this.props.obj.bet ) {
            return( 
                <div className="PriceRequests__Card_bet">
                    {this.props.obj.bet} <span>{vat}</span>
                </div>
            )
        } else {
            return(
                <div className="box-row-nw padd-right">
                    <ButtonSimple onClick={this.openModal} brand="success" size="small" caption="Указать ставку"/>
    	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={350} title="Указать ставку">
                            <PriceRequestsNewBet obj={this.props.obj} type={this.props.type} onClose={this.closeModal}/>
                    </ModalWindow>
                </div>
            )
        }
    } // render
}

export {PriceRequests__Card_Actions_CreateBet}

// <TransparentButton onClick={this.openModal} caption="Указать ставку" className="PriceRequests__Card_Button_CreateBet"/>