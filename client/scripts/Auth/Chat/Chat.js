var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';
import {Icon} from '../../Controls/Icon';

import ChatController from './ChatController.js'

// используем общую форму для каналов и чатов, берем компоненты из каналов
import MessageHistory from '../../Controls/Message/MessageHistory';
import MessageForm from '../../Controls/Message/MessageForm';

export default class Chat extends React.Component {

    constructor( props ) {
        super( props );
        this.id = null;
    }

    state = {
        chat: null,
    }

    // проверяем id на валидность
    // chat id = id юзера-собеседника
    _setChatID =(id)=> {
        this.id = ( id && parseInt(id) ) ? parseInt(id) : null;
    }

    _getChat =()=> {
        // если чат не найден или передан кривой ID, myChat вернет undefined, сохраняем в стейт
        let chat = AppState.myChats.getChat(this.id);
        this.setState({ chat: chat });
        if( !chat ) return;
        if( AppState.myChats.activeChat() ) AppState.myChats.activeChat().on('Chat-update', this.updateChat);
    }

    componentWillMount =()=> {

        logger.log('will mount chat', this, this.props);

        this._setChatID( this.props.id );
        // this._setChatID( this.props.params.id );

        // если Chats_getlist_complete уже отработал и есть подгруженные чаты,
        // сразу идем на получение чата
        if( AppState.myChats.isReady ) {
            this._getChat();
        } else {
            AppState.myChats.on( "Chats_getlist_complete", this._getChat );
        }

        // убираем скролл у body
        document.body.style.overflowY = "hidden";
    }

    componentWillReceiveProps =(nextProps)=> {

        logger.log('receive props chat', this, nextProps);

        // this._setChatID( nextProps.params.id );
        this._setChatID( nextProps.id );
        this._getChat();
    }

    componentWillUnmount =()=> {

        // logger.log('unmount chat');

        // ставим метку, что чат уже не активен
        AppState.myChats.activeChatIndex = null;
        
        // восстанавливаем скролл у body
        document.body.style.overflowY = "auto";
    }

    updateChat = function(chat) {
        this.setState({ chat: chat });
    }

    onClose =()=> {
        AppState.myChats.closeChat(this.id);
    }

    // сохраняем сообщение в чате
    onSendMessage =(msg)=> {
        AppState.myChats.activeChat().sendMessage( msg );
    }


    render = ()=>{

        // logger.log('render chat = ' + this.state.chat, this);

        // подгоняем высоту под экран
        this.channelHeight = Utils.getClientHeight() - 80 + "px";
        this.channelContentHeight = Utils.getClientHeight() - 140 + "px";
        let channelStyle = {
            height: this.channelHeight,
            overflowY: "hidden"
        };
        let channelContentStyle = {
            height: this.channelContentHeight,
        };

        if( this.state.chat === null ) {
            return (
                <div className="channel__preview">
                        <div className="channel__preview-actions">
                            <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                        </div>
                        <div className="channel-preview__not-found">Загрузка...</div>
                </div>
            )

        } 

        if( !this.state.chat ) {
            return (
                <div className="channel__preview">
                        <div className="channel__preview-actions">
                            <div className="pointer" onClick={this.onClose}>[x]</div>
                        </div>
                        <div className="channel-preview__not-found">У вас нет доступа в чат #{this.props.id}.</div>
                </div>
            )
        }

        return (
            <div className="channel">
                <div className="channel__header">
                    <div className="channel__header-title">
                        Чат: {this.state.chat.interlocutor.first_name} {this.state.chat.interlocutor.last_name} <small>({this.state.chat.interlocutor.comp_name})</small>
                    </div>
                    <div className="channel__header-actions">
                        <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                    </div>
                </div>
                <MessageHistory context={this.state.chat} type="chat" context_id={this.id}/>
                <MessageForm onSend={this.onSendMessage}/>
            </div>
        )
    }
}


// <div className="channel" style={channelStyle}>
//                 <div className="channel__header">
//                     <div className="channel__header_title">Чат: {this.state.chat.interlocutor.first_name} {this.state.chat.interlocutor.last_name} <small>({this.state.chat.interlocutor.comp_name})</small></div>
//                 </div>
//                 <div className="channel__content" style={channelContentStyle}>
//                     <MessageHistory context={this.state.chat} type="chat" context_id={this.id}/>
//                     <MessageForm onSend={this.onSendMessage}/>
//                 </div>
//             </div>
