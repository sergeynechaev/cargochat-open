var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

//  old
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {ModalWindow} from '../../Controls/ModalWindow';


export default class PriceRequests__Action_Delete_Created extends React.Component {
	
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
        AppState.PriceRequests.deletePriceRequest( this.props.item.price_request_id );
        this.closeModal();
    }

    closeModal =()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal =()=> {
        this.setState( {isModalOpen: true} );
    }

    render =()=> {

    	let modalWindowProps = {
            title: "Удаление",
            width: 300,
            height: 100
        };

        let viewHref = "/#/dashboard/price-requests/view/" + this.props.item.price_request_id;

        return (
            <div>
                <div className="pagin-pls" data-tooltip="Удалить запрос" onClick={this.openModal}>
	                <Icon iconName="delete-icon" size={20}/>
	            </div>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={modalWindowProps.width} height={300} title="Удаление">
                        <div>Вы действительно хотите удалить этот запрос?</div>
                        <br/>
                        <div><i>{this.props.item.shipment_time}</i></div>
                        <div>{this.props.item.from_addr} ==>  {this.props.item.to_addr}</div>
                        <div className="box-row-nw just-end marg-t">
		                	<TransparentButton onClick={this.deletePriceRequest} caption="Удалить"/>
		                	<TransparentButton onClick={this.closeModal} caption="Отменить"/>
		                </div>
                </ModalWindow>
            </div>
        )
    } // render
}
