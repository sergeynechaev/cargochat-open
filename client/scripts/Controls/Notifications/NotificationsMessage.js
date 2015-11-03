var React = require('react/addons');

import {logger} from '../../Classes/Logger';
import {Icon} from '../Icon';

export default class NotificationsMessage extends React.Component{

    closeEvent =()=> {
        let c = this.props.onClose;
        if (c) c(this.props.obj.id);
    }

    gotoEvent =()=> {
        let c = this.props.onGoto;
        if (c) c(this.props.obj);
    };

    render =()=> {

        let messagesList = this.props.obj.events;
        let userCredits = messagesList[0].event.first_name + " " + messagesList[0].event.last_name;
        let messages = messagesList.map( (e, key) => {
            return <div className="note-area__message-body" key={key}>{e.event.body.length > 100 ? e.event.body.substr(0,100) + "..." : e.event.body}</div>
        })

        // logger.log('render NotificationsMessage2', this, messagesList, messages);

        return(
            <div className="note-area__message">
                <div className="note-area__message-action-close" onClick={this.closeEvent}>
                    <Icon name="close" size={18} />
                </div>
                <div className="note-area__message-content">
                    <div className="note-area__message-title">{this.props.obj.total == 1 ? "новое сообщение" : "новые сообщения" }: {this.props.obj.total}</div>
                    <div className="note-area__message-user" onClick={this.gotoEvent}><span>{userCredits}</span></div>
                    <div className="note-area__message-user-company">{messagesList[0].event.comp_name}</div>
                    <div className="note-area__message-list" onClick={this.gotoEvent}>{messages}</div>
                    <div className="note-area__message-user"><span>{this.props.obj.rest ? "+ еще " + this.props.obj.rest : null}</span></div>
                </div>
            </div>
        )
    }
}
