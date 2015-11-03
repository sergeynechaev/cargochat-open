// 
// 
// backup
// 
// 



var React = require('react/addons');

import {logger} from '../../Classes/Logger';
import {Icon} from '../../SimpleComponents/Icons';

export default class NotificationsMessage extends React.Component{

    // soundClick =()=> {
    //     var audio = new Audio('http://mptron.com/agava/sms/03122007/ICQ.mp3'); // Создаём новый элемент Audio
    //     // audio.src = newMsgSound; // Указываем путь к звуку "клика"
    //     audio.play(); // Автоматически запускаем
    // }

    // componentDidMount =()=> {
    //     console.log("звук та-дам!");
    //     if (this.props.msg.received > 0) {
    //         this.soundClick();
    //     }
    // }

    closeEvent =()=> {
        let c = this.props.onClose;
        if (c) c(this.props.obj.id);
    }

    gotoEvent =()=> {
        let c = this.props.onGoto;
        if (c) c(this.props.obj.event);
    };

    render =()=> {

        let msg = this.props.obj.event;

        return(
            <div className="NotificationArea__Message">
                <div className="NotificationArea__Message_actionClose" onClick={this.closeEvent}>
                    <Icon iconName="close-circle-icon" size={18} />
                </div>
                <div className="NotificationArea__Message_content">
                    <div className="NotificationArea__Message_title">новое сообщение</div>
                    <div className="NotificationArea__Message_user" onClick={this.gotoEvent}><span>{msg.first_name} {msg.last_name}</span></div>
                    <div className="NotificationArea__Message_user-company">{msg.comp_name}</div>
                    <div className="NotificationArea__Message_body" onClick={this.gotoEvent}><span>{msg.body}</span></div>
                </div>
            </div>
        )
    }
}
