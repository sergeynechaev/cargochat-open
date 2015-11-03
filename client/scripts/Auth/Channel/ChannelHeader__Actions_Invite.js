var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import {Icon} from '../../Controls/Icon';

export default class ChannelInfo__Actions_Invite extends React.Component {

    state = {
        isModalOpen: false
    }

    inviteChannel =(user_id)=> {
        AppState.myChannels.activeChannel().msgChannelInvite(user_id);
        this.closeModal();
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    static defaultProps = {
        members: []
    }


    render = ()=> {
        var Contacts = AppState.myContacts.getData().filter((contact, i) => {
            return this.props.members.reduce((prev, member)=>{
                return prev && contact.user_id !== member.user_id
            }, true);
        });

        return (
            <div className="channel__actions">
                <span onClick={this.openModal}><Icon name="user-add" size={24}/></span>
                
                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Приглашение">
                    <div className="modal-container__body">
                        {Contacts.map((contact, i)=>{
                            return (
                                <div className="contact-center__elem" key={i}>
                                    <div>
                                        <div className="contact-center__user-credits">{contact.first_name+' '+contact.last_name}</div>
                                        <div className="contact-center__user-company">{contact.comp_name}</div>
                                    </div>
                                    <ButtonSimple onClick={this.inviteChannel.bind(this, contact.user_id)} brand="success" caption="Пригласить"/>
                                </div>
                            )
                        })}
                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.closeModal} brand="warning" caption="Отменить"/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}

// <button onClick={this.inviteChannel.bind(this, contact.user_id)}>
//                                             Пригласить {contact.first_name}
//                                         </button>