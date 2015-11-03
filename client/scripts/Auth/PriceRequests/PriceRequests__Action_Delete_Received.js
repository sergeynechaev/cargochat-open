var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';

//  old
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {ModalWindow} from '../../Controls/ModalWindow';


export default class PriceRequests__Action_Delete_Received extends React.Component {
	
    state = {
        isModalOpen: false
    }

    deletePriceRequestReceived =()=> {
        AppState.PriceRequests.deletePriceRequestReceived( this.props.item.price_request_id );
        this.closeModal();
    }

    closeModal =()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal =()=> {
        this.setState( {isModalOpen: true} );
    }


    render =()=> {
        return (
            <div className="box-row-nw">
	                <div data-tooltip="Удалить входящий запрос" className="pagin-pls" onClick={this.openModal}>
		                <Icon iconName="delete-icon" size={20}/>
		            </div>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={300} title="Удаление">
                    <div className="modal-container__body">
                        <FormGroup name="" from="title">
                            <div>Вы действительно хотите удалить этот входящий запрос?</div>
                            <br/>
                            <div><i>{this.props.item.shipment_time}</i></div>
                            <div>{this.props.item.from_addr} ==>  {this.props.item.to_addr}</div>
                        </FormGroup>
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.deletePriceRequestReceived} brand="danger" caption="Удалить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    } // render
}
