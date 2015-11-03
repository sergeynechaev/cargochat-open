var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

export default class Contacts__Chat extends React.Component {

    static propTypes = {
        key: React.PropTypes.number,
        user: React.PropTypes.object,
    }

    addContact =()=> {
        AppState.myContacts.addContact( this.props.user.user_id );
    }

    goto =()=> {
        AppState.myChats.openChat(this.props.user.user_id);
    }

    render = ()=>{

        // logger.log('render Contacts__Chat', this, this.props);

        let userCredits = this.props.user.user_id == AppState.user.state.id 
                                ? "Вы" 
                                : this.props.user.first_name+' '+this.props.user.last_name;

        return(
            <div key={this.props.key} className="contact-center__elem" data-channel_id={this.props.user.user_id}>
                <div className="contact-center__elem-left">
                    <div className="contact-center__user-credits pointer" onClick={this.goto}>{userCredits}</div>
                    <div className="contact-center__user-company">{this.props.user.comp_name}</div>
                    { false && this.props.user.in_contact === false 
                            ? <div className="contact-center__user-notInContact">
                                <div className="contact-center__user-notInContact-text">не в контактах</div>
                                <div className="contact-center__user-notInContact-action" onClick={this.addContact}>добавить</div>
                              </div> 
                            : null }
                </div>
                <div className="contact-center__elem-right">
                    { this.props.user.unreaded ? <div className="contact-center__user-unreaded">+{this.props.user.unreaded}</div> : null }
                    <div className="contact-center__user-status" data-state={AppState.myWatch.userStatus(this.props.user.user_id)}></div>
                </div>
            </div>
        )
    }
}

// <a href={"/#/dashboard/chat/"+this.props.user.user_id}>{userCredits}</a>


// <div key={this.props.key} className="chats__chat" data-channel_id={this.props.user.user_id}>
//                 <div className="chats__chat-left">
//                     <div className="contacts__status">
//                         <div data-state={AppState.myWatch.userStatus(this.props.user.user_id)} />
//                     </div>
//                     <div>
//                         <div className="contacts__user-credits">
//                             <a href={"/#/dashboard/chat/"+this.props.user.user_id}>{userCredits}</a>
//                         </div>
//                         <div className="chats__chat-user-company">{this.props.user.comp_name}</div>
//                         { this.props.user.in_contact === false 
//                             ? <div className="chats__chat-user-notInContact">
//                                 <div className="chats__chat-user-notInContact-text">не в контактах</div>
//                                 <div className="chats__chat-user-notInContact-action" onClick={this.addContact}>добавить</div>
//                               </div> 
//                             : null }
//                     </div>
//                 </div>
//                 <div className="chats__chat-right">
//                     { this.props.user.unreaded ? <div className="chats__chat-unreader">{this.props.user.unreaded}</div> : null }
//                 </div>
//             </div>