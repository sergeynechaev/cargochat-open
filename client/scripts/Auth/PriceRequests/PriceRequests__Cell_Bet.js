var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../Controls/ModalWindow';
import {logger} from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {PriceRequestsNewBet} from './PriceRequestsNewBet';

export class PriceRequests__Cell_Bet extends React.Component {

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

        // logger.log('create BET cell', this, this.props.obj);

        // don't show 'set bet' button if the company is a shipper only
        if( AppState.myCompany.isShipper() && !AppState.myCompany.isExpeditor() && !AppState.myCompany.isCarrier() ) return null;

        // don't show 'set bet' button for myself
        if( AppState.myCompany.id == this.props.item.comp_id ) return null;

        let vat = (this.props.item.bet_flags) ? "с НДС" : "без НДС";

        if( this.props.item.bet ) {
            return( 
                <div className="PriceRequests__Card_bet">
                    {this.props.item.bet} <span>{vat}</span><br/>
                    {this.props.obj.unit}
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

