var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {Icon} from '../../Controls/Icon';

export default class ChannelInfo__Actions_Delete extends React.Component {

    state = {
        isModalOpen: false
    }

    deleteChannel =()=> {
        AppState.myChannels.activeChannel().msgChannelDelete();
        this.closeModal();
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }


    render = ()=> {
        return (
            <div className="channel__actions">
                <span onClick={this.openModal}><Icon name="delete" className="marg-left-s" size={24}/></span>

                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Удаление">
                    <div className="modal-container__body">
                        Вы действительно хотите удалить этот канал?
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.deleteChannel} brand="warning" caption="Удалить"/>
                            <ButtonSimple onClick={this.closeModal} brand="success" caption="Отменить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}