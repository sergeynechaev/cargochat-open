var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
// import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../Controls/ModalWindow';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';

class PriceRequests__Card_Actions_DeleteReceivedRequest extends React.Component {

    state = {
        isModalOpen: false
    }

    deletePriceRequestReceived =()=> {
        AppState.PriceRequests.deletePriceRequestReceived( this.props.obj.price_request_id );
        this.closeModal();
    }

    closeModal = ()=> {
    	Logger.debug( this, 'closeModalConfirm' );
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
    	Logger.debug( this, 'openModalConfirm' );
        this.setState( {isModalOpen: true} );
    }


    render = ()=> {
        return (
            <div className="box-row-nw">
	                <div data-tooltip="Удалить входящий запрос" className="pagin-pls" onClick={this.openModal}>
		                <Icon iconName="delete-icon" size={20}/>
		            </div>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={300} title="Удаление">
                    <div className="modal-container__body">
                        <FormGroup name=" " from="title">
                            <div>Вы действительно хотите удалить этот входящий запрос?</div>
                            <br/>
                            <div><i>{this.props.obj.shipment_time}</i></div>
                            <div>{this.props.obj.from_addr} ==>  {this.props.obj.to_addr}</div>
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

export {PriceRequests__Card_Actions_DeleteReceivedRequest}


 // <div className="box-row-nw">
 //                    <div data-tooltip="Удалить входящий запрос" className="pagin-pls" onClick={this.openModal}>
 //                        <Icon iconName="delete-icon" size={20}/>
 //                    </div>
 //                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={300} title="Удаление">
 //                        <div>Вы действительно хотите удалить этот входящий запрос?</div>
 //                        <br/>
 //                        <div><i>{this.props.obj.shipment_time}</i></div>
 //                        <div>{this.props.obj.from_addr} ==>  {this.props.obj.to_addr}</div>
 //                        <div className="box-row-nw just-end marg-t">
 //                            <TransparentButton onClick={this.deletePriceRequestReceived} caption="Удалить"/>
 //                            <TransparentButton onClick={this.closeModal} caption="Отменить"/>
 //                        </div>
 //                </ModalWindow>
 //            </div>