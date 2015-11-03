// 
// 
// 
// совсем старые приваты
// переделано на контакт-центр и каналы
// 
// 
// 

var React = require('react/addons');
import {Api} from '../api';
import {Utils} from '../utils';
import {Store, Actions, Events, NewStore} from '../Dispatcher';
import {AppState} from '../Auth/Dashboard';
import OneChat from './../Classes/OneChat';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {Icon} from '../SimpleComponents/Icons'


class OneMessage extends React.Component {

    render=()=>{
        return(
            <div key={msg.id} id={msg.id} className="">
                <div className="box-row-nw just-center divider chat-border">
                        <span className="font600 label-active font-sec marg-r">
                            {date + "."+ month+"."+ year+"г." + " "+ "в "+ hours+":"+ minutes + ":"+ seconds}
                        </span>
                    <p className="font600 label-active font-sec marg-icon">
                        {people[msg.user_id].first_name}&nbsp;{people[msg.user_id].last_name}
                    </p>
                    <p>
                    </p>
                </div>
                <div className="marg-lr marg-b font14 chat-bg">
                    <p>{msg.body}</p>
                </div>
            </div>
        )
    }

}

export default class ChatWindow extends React.Component {

    static propTypes = {
        id: React.PropTypes.number,
        close: React.PropTypes.func
    };

    static defaultProps = {};
    state = {
        history: [],
        isOpen : true,
        body   : ''
    };

    componentDidMount = ()=> { this.scrollToEnd() };
    componentDidUpdate = ()=> { this.scrollToEnd() };
    componentWillReceiveProps = ()=> { this.forceUpdate() };
    updateHistory = (chat_history)=> { this.setState({history: chat_history}); };

    componentWillMount = ()=> {
        if (this.props.chat.chatObject){
            this.updateHistory(this.props.chat.chatObject.chat_history)
        } else {
            this.props.chat.chatObject = new OneChat(this.props.chat.user_id);
            this.props.chat.chatObject.get_chat_history(this.updateHistory); // получаем историю чата
        }
        console.log("user Id:" + this.props.chat.user_id);
        //console.log(this.props.chat);
        //console.log();
    };
    componentWillUnmount = ()=> {

        //AppState.myEvents.rem("chat_update-"+this.props.id, this.updateHistory);
    };
    closeWindow = ()=> {
        console.log("ll");
        var cl = this.props.close;
        if (cl) cl(this.props.chat.user_id)
    };

    updateInput = (newState)=> {
        //console.log(newState);
        var text=this.refs.msg.getDOMNode().value;
        console.log(text);
        this.setState({body:text})
    };

    sendMessage = ()=> {
        console.log("Отправка сообщения");
        console.log(this.state.body);
        this.props.chat.chatObject.sendMessage(this.state.body);
        this.clearInput(); // очистка поля ввода
    };
    clearInput = ()=> {
        this.setState({body: ""})
    };

    onKeyUp=(e)=>{
        console.log(e);
        switch (e.key){
            case "Enter":
            if (!e.ctrlKey){
                this.sendMessage();
                break;
            }
                this.setState({body:this.state.body+"\r\n"});
            break;
        }
    };
    //onKeyDown=(e)=>{
    //    switch (e.key){
    //        case 13: return false;
    //        case 17: this.state.ctrl = true;
    //    }
    //};

    updateMS=()=>{
        var u=this.props.updateMS;
        if (u) u()
    };

    historyScroll = (e)=> {
        var tar = e.nativeEvent.target;
        var pos = Math.ceil(tar.scrollTop);  // при скалировании экрана тут будет дробное число
        var scrHeight = tar.scrollHeight - tar.clientHeight;
        var leftToEnd = scrHeight - pos;
        //console.log(leftToEnd);
        if (leftToEnd <= 0) {
            console.log("Последнее сообщение!");
            this.props.chat.chatObject.markLastMsgReaded();
            //this.props.chat.unreaded=0;
            this.updateMS();
        }
    };

    scrollToEnd = ()=> {
        var target = document.getElementById("chat-" + this.state.user_id);
        //console.log(target);
        target.scrollTop = target.scrollHeight - target.clientHeight;
    };

    render = ()=> {
        //console.log("Chat Window");
        //console.log(this.state.history);

        var h = this.state.history;
        var contact = this.props.chat;
        var state = this.props.userState;
        var me = {
            user_id   : state.id,
            first_name: state.first_name,
            last_name : state.last_name,
            comp_id   : state.comp_id,
            comp_name : (state.comp || {}).name 
        };
        var people = {};
        people[contact.user_id] = contact;
        people[me.user_id]=me;

        var history = (h) ? h.map(msg=> {
            var ts = new Date(msg.ts * 1000);
            function zf02 (v) { return v > 9 ? String(v) : '0' + v; }
            return (
                <div key={msg.id} id={msg.id} className="">
                    <div className="box-row-nw just-center divider chat-border">
                        <span className="font600 label-active font-sec marg-r">
                            {zf02(ts.getDate()) + "." + zf02((ts.getMonth() + 1)) + "." + ts.getFullYear() + "г." + " в " + String(ts).substr(16, 8)}
                        </span>
                        <p className="font600 label-active font-sec marg-icon">
                            {people[msg.user_id].first_name}&nbsp;{people[msg.user_id].last_name}
                        </p>
                        <p></p>
                    </div>
                    <div className="marg-lr marg-b font14 chat-bg">
                        <p dangerouslySetInnerHTML={{__html:msg.body.replace(/</g, '&lt;').replace(/\n/g, '<br/>')}}></p>
                    </div>
                </div>
            )
        }) : null;
        var chatBody = (this.state.isOpen) ?
            <div>
                <div id={"chat-"+this.state.user_id} className="chat-history" onScroll={this.historyScroll}>
                    {history}
                </div>
                <div className="box-row-nw align-center chat-input-wrap">
                    <textarea className="chat-window-text-area-input" ref="msg" autoFocus onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} value={this.state.body} name="body" onChange={this.updateInput}></textarea>
                </div>
            </div> : null;

        return (
            <div className="chat">
                <div className="chat-window-header">
                    <div className="chat-window-header-name">
                        <span className="marg-tags font600 font14">{this.props.chat.first_name}</span>
                        <span className="marg-tags font600 font14">{this.props.chat.last_name}</span>
                        <span className="marg-tags font600 font14">{this.props.chat.comp_name}</span>
                    </div>
                    <div className="box-row-nw just-center align-center marg-tags" onClick={this.closeWindow}>
                        <Icon  size={18} iconName="close-icon"/>
                    </div>
                </div>
                {chatBody}
            </div>
        )
    }
}