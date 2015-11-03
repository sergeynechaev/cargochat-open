var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../Controls/Icon';
import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {logger} from '../../Classes/Logger';

import {TransportEditForm} from './TransportEditForm';

class TransportList__Cell_Actions extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    state = {
        isModalDeleteOpen: false,
        isModalEditOpen: false
    }

    deleteVehicle =()=> {
        AppState.Transport.deleteVehicle( this.props.obj.id );
        this.closeModalDelete();
    }

    closeModalDelete = ()=> {
        this.setState( {isModalDeleteOpen: false} );
    }

    openModalDelete = ()=> {
        this.setState( {isModalDeleteOpen: true} );
    }

    closeModalEdit = ()=> {
        this.setState( {isModalEditOpen: false} );
    }

    openModalEdit = ()=> {
        this.setState( {isModalEditOpen: true} );
    }

    render = ()=> {

    	let modalWindowDeleteProps = {
            title: "Удаление",
            width: 300,
            height: 100
        };

        let modalWindowEditProps = {
            title: "Редактирование ТС",
            width: 400,
            height: 200
        };

        return (
            <div className="">
                <FlexBox direction="row">
    	                <div data-tooltip="Изменить данные" className="pagin-pls" onClick={this.openModalEdit}>
    	                    <Icon name="edit" size={23}/>
    	                </div>
    	                <div data-tooltip="Удалить ТС" className="pagin-pls" onClick={this.openModalDelete}>
    		                <Icon name="delete" size={23}/>
    		            </div>
                </FlexBox>
                <ModalWindow isOpen={this.state.isModalEditOpen} 
                             onClose={this.closeModalEdit} 
                             title={modalWindowEditProps.title}>
                        <TransportEditForm onClose={this.closeModalEdit} obj={this.props.obj} isEdit={true} currentState={this.state.isModalEditOpen}/>
                </ModalWindow>
	            <ModalWindow isOpen={this.state.isModalDeleteOpen} 
	            			 onClose={this.closeModalDelete} 
	            			 title={modalWindowDeleteProps.title}>
                         <div className="modal-container__body">
                             <div>Вы действительно хотите удалить это ТС?</div>
                            <em>{AppState.Transport.getVehicleType(this.props.obj.type)} <b>{this.props.obj.model}</b></em>
                            <div className="modal-container__footer">
                                <ButtonSimple brand="danger" onClick={this.deleteVehicle} caption="Удалить"/>
                            </div>
                         </div>
                </ModalWindow>
            </div>
        )
    } // render
}

export {TransportList__Cell_Actions}