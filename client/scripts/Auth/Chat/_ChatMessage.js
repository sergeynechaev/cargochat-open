// 
// 
// Deprecated
// use Message
// 
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Emoji} from '../../Controls/Emoji';
import {Icon} from '../../SimpleComponents/Icons';

export default class ChatMessage extends React.Component {

    static propTypes = {
        data: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        data: {}
    }

    componentWillMount =()=> {
        // получаем контроллер сообщения
        this.msg = AppState.myChats.activeChat().getMsg(this.props.data.id);

        // здесь храним оригинальный body для редактирования
        this.bodyOrig = this.props.data.body;
        // this.bodyParsed = this.parseBody( this.props.data.body );
        this.bodyParsed = this.props.data.body;
    }

    componentWillReceiveProps =(props)=> {
    }

    state={
        isShowActions: false,
        isEdit: false,
        isDelete: false,
    }

    render = ()=>{

        let messageClass = "channel-message ";
        if(AppState.user.id == this.props.data.author.id){
            messageClass += "channel-message--my";
        }

        return (
            <div className="channel-history__message" id={"message--"+this.props.data.id}>
                <div className={messageClass}>
                    <div className="channel-message__info">
                        <a>{this.props.data.author.first_name+' '+this.props.data.author.last_name}</a>
                        <span>{Utils.timeZf(this.props.data.ts)}</span>
                    </div>
                    <div className="channel-message__body" dangerouslySetInnerHTML={{__html: this.bodyParsed }}></div>
                </div>
            </div>
        ) 
    }
};



