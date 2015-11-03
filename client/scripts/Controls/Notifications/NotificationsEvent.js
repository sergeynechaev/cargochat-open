var React = require('react/addons');

import {logger} from '../../Classes/Logger';
import {Icon} from '../Icon';

export default class NotificationsEvent extends React.Component{

    closeEvent =()=> {
        let c = this.props.onClose;
        if (c) c(this.props.obj.id);
    }

    gotoEvent =()=> {
        let c = this.props.onGoto;
        if (c) c(this.props.obj.event);
    };

    render =()=> {

        let event = this.props.obj.event;

        return(
            <div className="note-area__message">
                <div className="note-area__message-actionClose" onClick={this.closeEvent}>
                    <Icon name="close" size={18} />
                </div>
                <div className="note-area__message-content">
                    <div className="note-area__message-title-event">{this.props.title}</div>
                    <div className="note-area__message-descr" onClick={this.gotoEvent}><span>{this.props.descr}</span></div>
                </div>
            </div>
        )
    }
}
