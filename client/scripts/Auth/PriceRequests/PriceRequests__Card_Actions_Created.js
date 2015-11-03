var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../Controls/ModalWindow';
import Hint from '../../SimpleComponents/Hint';
import Logger from '../../Classes/Logger';

class PriceRequests__Card_Actions_Created extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    static defaultProps = {
        isModalOpen: false
    }

    state = {
        isModalOpen: false
    }

    deletePriceRequest =()=> {
        AppState.PriceRequests.deletePriceRequest( this.props.obj.price_request_id );
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

    	let modalWindowProps = {
            title: "Удаление",
            width: 300,
            height: 100
        };

        let viewHref = "/#/dashboard/price-requests/view/" + this.props.obj.price_request_id;

        // <Hint text="Удалить запрос">
        //     <div className="pagin-pls" onClick={this.openModal}>
        //         <Icon iconName="delete-icon" size={20}/>
        //     </div>
        // </Hint>

        return (
            <div className="PriceRequests__Card_actions">
                <div className="" data-tooltip="Посмотреть детали запроса">
                    <a target="_blank" href={viewHref}><Icon iconName="details-icon" size={20}/></a>
                </div>
                <div className="pagin-pls" data-tooltip="Удалить запрос" onClick={this.openModal}>
	                <Icon iconName="delete-icon" size={20}/>
	            </div>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={modalWindowProps.width} height={300} title="Удаление">
                        <div>Вы действительно хотите удалить этот запрос?</div>
                        <br/>
                        <div><i>{this.props.obj.shipment_time}</i></div>
                        <div>{this.props.obj.from_addr} ==>  {this.props.obj.to_addr}</div>
                        <div className="box-row-nw just-end marg-t">
		                	<TransparentButton onClick={this.deletePriceRequest} caption="Удалить"/>
		                	<TransparentButton onClick={this.closeModal} caption="Отменить"/>
		                </div>
                </ModalWindow>
            </div>
        )
    } // render
}

export {PriceRequests__Card_Actions_Created}