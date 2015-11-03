// 
// 
// 
// совсем старые приваты
// переделано на контакт-центр и каналы
// 
// 
// 

var React = require('react/addons');
import {UpPanel} from './UpPanel';
import {Api} from '../api';
import {Store, Actions, Events, NewStore} from '../Dispatcher';
//import {AppState} from '../Auth/Dashboard';
import OneChat from './../Classes/OneChat';
import {InputSimple} from '../SimpleComponents/InputSimple';
import ChatWindow from './ChatWindow';
import {Utils} from '../utils';

class ChatMenuPrivateItem extends React.Component{
  
  onClick=()=>{
    //var o = this.props.onClick;
    //if (o) o(this.props.chat.user_id);
    Utils.run(this.props.onClick, this.props.chat.user_id);
    //console.log(this.props.chat.user_id)
  };
  
  render=()=>{
    //console.log('[ChatMenuPrivateItem] render');
    //console.debug(this.props.chat);
    
    var c = this.props.chat;
    
    var name = <p className="font600 label-active">{c.first_name + " "+  c.last_name}</p>;
    var comp = c.comp_name ? <p className="font600 label-active">({c.comp_name})</p> : null;
    var unreaded = (c.unreaded>0) ? <span data-user_id={c.user_id} className="bow-row-nw just-center col-large chat-header-unreaded">{c.unreaded}</span> : null;
    
    return (
      <div key={c.user_id} data-user_id={c.user_id} onClick={this.onClick} className="chat-header" >
        <span>{name}</span><span>{comp}</span><span>{unreaded}</span>
      </div>
    )
    
  }
  
}

class ChatMenuChannelItem extends React.Component{
  
  onClick=()=>{
    //console.log('[ChatMenuChannelItem] onClick');
    //console.debug(this.props.dat);
    Utils.run(this.props.onClick, this.props.dat);
  };
  
  render=()=>{
    //console.log('[ChatMenuChannelItem] render');
    //console.debug(this.props.chat);
    
    var d = this.props.dat;
    
    var title = <p className="font600 label-active">{d.title}</p>;
    var unreaded = (d.unreaded>0) ? <span data-user_id={d.user_id} className="bow-row-nw just-center col-large chat-header-unreaded">{d.unreaded}</span> : null;
    
    return(
      <div key={d.id} data-user_id={d.id} onClick={this.onClick} className="chat-header" >
        <span>{title} </span><span>{unreaded}</span>
      </div>
    )
  }
  
}


export default class MessagesCenter extends React.Component {
    
    state = {
      contactList: [],
      msgPrivates: [],
      msgChannels: [],
      msgCase:'contacts',
      openedPrivate: null,
      openedChannel: null
    };
    
    static propTypes = {};
    
    static defaultProps = {};
    // добавление в список нового чата
    //addNewChat = (chat)=> {
    //    var chatList = this.state.chatList;
    //    var newChat = {chat: chat.chat, isOpen: false};
    //    chatList.push(newChat);
    //    this.forceUpdate();
    //};
    
    selectContactsView = () => { this.setState({msgCase:'contacts'}); };
    selectMessagesView = () => { this.setState({msgCase:'privates'}); };
    selectChannelsView = () => { this.setState({msgCase:'channels'}); };
    selectGroupsView   = () => { this.setState({msgCase:'groups'});   };
    
    openPrivate  = (user_id) => { this.setPrivateOpen(user_id, true)  };
    closePrivate = (user_id) => { this.setPrivateOpen(user_id, false) };
    
    setPrivateOpen = (user_id, b) => {
        //let list = this.state.msgPrivates;
        //for (let i = 0, l = list.length; i < l; i++) list[i].isOpen = (list[i].user_id == user_id) ? b : false;
        this.state.openedPrivate = b ? user_id : null;
        this.state.openedChannel = null;
        this.forceUpdate();
    };
    
    openChannel = (ch) => {
      //console.log('[MessagesCenter] openChannelWindow');
      //console.debug(ch);
      
      
      
    };
    
    closeChannel = (ch) => {
      //console.log('[MessagesCenter] closeChannel');
      //console.debug(ch);
      
      
      
    };
    
    
    
    
    
    getUserState = ()=> {
      Api.userStateRequest().then(res=> {
        if (res.err) {
          console.log("Ошибка получения состояния");
          console.log(res.msg);
        } else {
          //console.log("GET USER_STATE получено");
          //console.log(res);
          this.setState({
            userState:   res,
            msgPrivates: res.msg_private,
            msgChannels: res.msg_channels,
            contactList: res.contacts
          });
        }
      })
    };
    //askToOpenWindow = (user_id)=> {
    //    console.log("OPEN WINDOW PLZ " + user_id);
    //    this.run("ask_to_open_window", user_id)
    //};
    
    //openNewChat = (user_id)=> {
    //    console.log("check");
    //    var isOpen = this.state.chatList.some(chat=> {
    //        return chat.user_id === user_id
    //    });
    //    if (isOpen) {
    //        this.askToOpenWindow(user_id)
    //    } else {
    //        this.newChat(user_id);
    //        this.on("add_new_chat", this.askToOpenWindow)        }
    //    console.log(this.state.chatList);
    //};
    
    newMessageUnreaded=(message)=>{
        var userId=message.user_id;
        //console.log("UR");
        //console.log(message);
        this.state.msgPrivates.forEach(chat=>{
            //console.log(userId + "  "+ chat.user_id);
            if (userId === chat.user_id){
                //console.log(message.unreaded);
                chat.unreaded=message.unreaded;
                this.forceUpdate();
            }
        })
    };
    
    isChatExist=(user_id)=>{
        return this.state.msgPrivates.some(chat=>{
            return chat.user_id===user_id && chat.chatObject
        })  
    };
    
    getIndexByUserId=(userId)=>{
        var index=-1;
        var ch = this.state.msgPrivates.forEach((chat, i)=>{
             if (chat.user_id===userId) {
                 index=i
            }
        });
        return index
    };
    
    updateMS=()=>{
        this.forceUpdate();
    };
    
    newMessageCome = (message)=> {
        var user_id = message.to_user_id;
        var isForMe=false;
        if (this.state.userState && this.state.userState.id === message.to_user_id) {
            user_id = message.user_id; // если это сообщение не от меня
            isForMe=true;
        }
        console.log(user_id);
        var ind =this.getIndexByUserId(user_id);
        var chat= this.state.msgPrivates[ind];
        if (this.isChatExist(user_id)){
            this.addToHistory(user_id, message)
        } else {
            console.log("not exist yet!");
            chat.chatObject = new OneChat(user_id); // создаем экз чата
            chat.chatObject.get_chat_history(); // получаем историю чата
        }
        if (isForMe) {
            chat.unreaded=chat.unreaded+1;
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
        this.forceUpdate();
    };
    
    addToHistory = (user_id, message)=> {
        this.state.msgPrivates.forEach(chat=> {
            console.log(chat);
            if (chat.user_id === user_id) chat.chatObject.chat_history.push(message)
        });
        this.forceUpdate();
    };
    
    componentWillMount = ()=> {
        Events.on(Events.EV_USER_STATE_UPDATE, this.getUserState);
        Events.on(Events.EV_MSG_PRIVATE_NEW, this.newMessageCome);
        Events.on(Events.EV_NEW_PRIVATE_UNREADED, this.newMessageUnreaded);
        Events.on(Events.EV_ASK_OPEN_CHAT_WINDOW, this.openPrivate);
        this.getUserState(); // Получить состояние юзера
    };
    
    componentWillUnmount = ()=> {
        Events.rem(Events.EV_USER_STATE_UPDATE, this.getUserState);
        Events.rem(Events.EV_MSG_PRIVATE_NEW, this.newMessageCome);
        Events.rem(Events.EV_NEW_PRIVATE_UNREADED, this.newMessageUnreaded);
        Events.rem(Events.EV_ASK_OPEN_CHAT_WINDOW, this.openPrivate);
    };
    
    componentWillReceiveProps = ()=> {
        this.forceUpdate();
    };
    
    render = ()=> {
        console.log("[MessagesCenter] render");
        //console.log(this.props);
        //console.log(this.state);
        
        var selectedList = null;
        var chatHeaders = [];
        
        switch (this.state.msgCase) {
          case 'contacts': { selectedList = this.state.contactList; break; }
          case 'privates': { selectedList = this.state.msgPrivates; break; }
          case 'channels': { selectedList = this.state.msgChannels; break; }
          case 'groups':   { selectedList = null; break; }
        }
        console.debug(selectedList);
        
        switch (this.state.msgCase) {
          case 'contacts':
          case 'privates': {
            for (var i = 0, l = (selectedList || []).length; i < l; i++)
              chatHeaders.push(<ChatMenuPrivateItem key={i} chat={selectedList[i]} onClick={this.openPrivate} />)
            break;
          }
          case 'channels': {
            for (var i = 0, l = (selectedList || []).length; i < l; i++)
              chatHeaders.push(<ChatMenuChannelItem key={i} dat={selectedList[i]} onClick={this.openChannel} />)
            break;
          }
          case 'groups': {
            
            break;
          }
        }
        
        var opened = null;
        
        if (this.state.openedPrivate != null) {
          for (var i = 0, l = (this.state.msgPrivates || []).length; i < l; i++) {
            let c = this.state.msgPrivates[i];
            if (c.user_id != this.state.openedPrivate) continue;
            opened = <ChatWindow updateMS={this.updateMS} key={i} chat={c} userState={this.state.userState} close={this.closePrivate}/>;
          }
        }
        
        if (this.state.openedChannel != null) {
          for (var i = 0, l = (this.state.msgChannels || []).length; i < l; i++) {
            let c = this.state.msgChannels[i];
            if (c.id != this.state.openedChannel) continue;
            opened = <PrivateWindow updateMS={this.updateMS} key={i} dat={c} userState={this.state.userState} close={this.closeChannel}/>;
          }
        }
        
        return (
            <div className="">
                <div className="events-controller chat-wrap">
                    {opened}
                </div>
                <div className="box-row-nw just-center chat-panel-name">
                    <button onClick={this.selectContactsView}>Конт.</button>
                    <button onClick={this.selectMessagesView}>Сообщ.</button>
                    <button onClick={this.selectChannelsView}>Каналы</button>
                    <button onClick={this.selectGroupsView}>Группы</button>
                </div>
                <div className="chat-headers-wrap">{chatHeaders}</div>
            </div>
        )
    }
}

export {ChatMenuPrivateItem}
export {ChatMenuChannelItem}