var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {Icon} from '../../Controls/Icon';

export default class ChannelInfo__Actions_Leave extends React.Component {

    state = {
        isModalOpen: false
    }

    leaveChannel =(user_id)=> {
        AppState.myChannels.activeChannel().msgChannelLeave()
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
                <span onClick={this.openModal}><Icon name="exit" className="marg-left-s" size={24}/></span>
                
                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Выйти">
                    <div className="modal-container__body">
                        Вы действительно хотите выйти из канала?
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.leaveChannel} brand="warning" caption="Выйти"/>
                            <ButtonSimple onClick={this.closeModal} brand="success" caption="Отменить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}
