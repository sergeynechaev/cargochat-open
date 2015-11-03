var React = require('react/addons');

import {Events} from '../../../Dispatcher';
import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';

import {Icon} from '../../../SimpleComponents/Icons';

import {ModalWindow} from '../../../Controls/ModalWindow';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';

export default class ContactsInvitedDataTable__Cell_Actions extends React.Component {

	constructor( props ) {
        super( props );
    }

    state = {
        isModalDeleteOpen: false
    }

    closeModal = ()=> {
        this.setState( {isModalDeleteOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalDeleteOpen: true} );
    }

    deleteUserInvited = ()=>{
        AppState.myCompany.userInviteCanсel({invite_id: this.props.value});
        this.closeModal();
    }

    render = ()=> {
        let modalDeleteProps = {
            title: "Удаление приглашения",
            width: 300,
            height: 100
        }, Edit = null;

        if(Utils.checkFlags(AppState.user.state.comp_flags, 64)){
            Edit =  <div>
                        <div data-tooltip="Удалить приглашение">
                            <Icon iconName="close-circle-icon" onClick={this.openModal}/>
                        </div>
                        <ModalWindow   isOpen={this.state.isModalDeleteOpen} 
                                        onClose={this.closeModal} 
                                        width={modalDeleteProps.width}
                                        height={modalDeleteProps.height} 
                                        title={modalDeleteProps.title}>
                            <div className="modal-container__body">
                                Вы действительно хотите удалить приглашение?
                                <div className="modal-container__footer">
                                    <ButtonSimple onClick={this.deleteUserInvited} brand="success" caption="Удалить"/>
                                </div>
                            </div>
                        </ModalWindow>
                    </div>;
        }

        return Edit;
    }
}