var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {Icon} from '../../Controls/Icon';
import {Utils} from '../../utils';

import ChannelHeader__Actions_Delete from './ChannelHeader__Actions_Delete';
import ChannelHeader__Actions_Invite from './ChannelHeader__Actions_Invite';
import ChannelHeader__Actions_Leave from './ChannelHeader__Actions_Leave';
import ChannelInfo from './ChannelInfo.js'

import MessageHistory from '../../Controls/Message/MessageHistory';
import MessageForm from '../../Controls/Message/MessageForm';


export default class Channel extends React.Component {

    constructor( props ) {
        super( props );

        this.id = null;
        this.type = 'channel';
    }

    state = {
        channel: null,
        members: [], // ??? мемберы нам тут пока не нужны

        // members: AppState.myChannels.activeChannel().getMembers() // мемберы нам тут пока не нужны
    }

    _setChannelID =(id)=> {
        this.id = ( id && parseInt(id) ) ? parseInt(id) : null;
    }

    _getChannel =()=> {
        // если канал не найден или передан кривой ID, myChannels вернет undefined, сохраняем в стейт
        let channel = AppState.myChannels.getChannel(this.id);
        this.setState({ channel: channel });
        if( !channel ) return;
        if( AppState.myChannels.activeChannel() ) AppState.myChannels.activeChannel().on('Channel-update', this.updateChannel); 
    }

    componentWillMount = ()=>{

        // this._setChannelID( this.props.params.id );
        this._setChannelID( this.props.id );

        // если Channels_getlist_complete уже отработал и есть подгруженные чаты,
        // сразу идем на получение чата
        if( AppState.myChannels.isReady ) {
            this._getChannel();
        } else {
            AppState.myChannels.on( "Channels_getlist_complete", this._getChannel );
        }

        Utils.addWindowEvent( 'resize', this.onResizeWindow );

        // убираем скролл у body
        document.body.style.overflowY = "hidden";
    }

    componentDidMount =()=> {
        Events.on(Events.EV_MSG_CHANNEL_DELETED, this.onChannelDeleted);
    }

    componentWillReceiveProps = (nextProps)=>{
        // this._setChannelID( nextProps.params.id );
        this._setChannelID( nextProps.id );
        this._getChannel();
    }

    onResizeWindow =()=> {
        // TODO: переделать на setState
        this.forceUpdate();
    }

    componentWillUnmount = ()=>{
        if(AppState.myChannels.activeChannel()){
            AppState.myChannels.activeChannel().rem('Channel-update', this.updateChannel);
        }

        // ставим метку, что чат уже не активен
        AppState.myChannels.activeChannelIndex = null;

        Utils.remWindowEvent( 'resize', this.onResizeWindow );
        
        // восстанавливаем скролл у body
        document.body.style.overflowY = "auto";
    }

    updateChannel =(channel)=> {
        this.setState({ channel: channel });
    }

    msgChannelJoin =()=> {
        AppState.myChannels.activeChannel().msgChannelJoin()
    }

    msgChannelLeave =()=> {
        AppState.myChannels.activeChannel().msgChannelLeave()
    }

    // сохраняем сообщение в канале
    onSendMessage =(msg)=> {
        // logger.log('onSendMessage act ch= '+AppState.myChannels.activeChannel(), this, AppState.myChannels.activeChannel());

        AppState.myChannels.activeChannel().sendMessage( msg );
    }

    onClose =()=> {
        AppState.myChannels.closeChannel(this.id);
    }

    // когда мы сидим в канале, а его берет и удаляет админ
    onChannelDeleted =(data)=> {
        // эмулируем флаг
        this.state.channel.flags = -3;
        this.forceUpdate();
    }

    render =()=> {

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

        if( this.state.channel === null ) {
            return (
                <div className="channel__preview">
                        <div className="channel__preview-actions">
                            <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                        </div>
                        <div className="channel-preview__not-found">Загрузка...</div>
                </div>
            )
        }

        // нет доступа в канал или канал не найден
        if( !this.state.channel ) {
            return (
                <div className="channel__preview">
                        <div className="channel__preview-actions">
                            <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                        </div>
                        <div className="channel-preview__not-found"> У вас нет доступа в канал #{this.props.id} или он был удален.</div>
                </div>
            )
        }

        // инфо-сообщения, если нет доступа в канал
        let Message;
        switch( this.state.channel.flags ) {
            case 1:
                Message =   <div className="channel__preview-flags">
                                    <h2>Вы получили приглашение в канал "{this.state.channel.title}"</h2>
                                    <ButtonSimple onClick={this.msgChannelJoin} brand="success" caption="Присоединиться"/>
                                    <ButtonSimple onClick={this.msgChannelLeave} brand="warning" caption="Отказать"/>
                            </div>;
            break;
            case -1:
                Message =   <div className="channel__preview-not-found">
                                Вы успешно удалили канал "{this.state.channel.title}".
                            </div>
            break;
            case -2:
                Message =   <div className="channel__preview-not-found">
                                Вы успешно покинули канал "{this.state.channel.title}".
                            </div>
            break;
            case -3:
                Message =   <div className="channel__preview-not-found">
                                Канал "{this.state.channel.title}" был удален администратором.
                            </div>
            break;
            // default: 
            //     Message =   <div className="channel-preview__not-found">
            //                     У вас нет доступа в этот канала или он был удален.
            //                 </div>;
            // break;
        }

        // действия для админа канала
        let channelActionsAdmin = ( this.state.channel.flags == 2) ? <div className="channel__header-actions--admin">
                                                                        <ChannelHeader__Actions_Invite members={this.state.members}/>  
                                                                        <ChannelHeader__Actions_Delete/>
                                                                     </div> : null;



        if(!this.state.channel || this.state.channel.flags == 1 || this.state.channel.flags < 0){
            return (
                <div className="channel__preview">
                        <div className="channel__preview-actions">
                            <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                        </div>
                        {Message}
                </div>
            ) 
        } else {
            return (

                <div className="channel">
                    <div className="channel__header">
                        <div className="channel__header-title">{this.state.channel.title}</div>
                        <div className="channel__header-actions">
                            {channelActionsAdmin}
                            <ChannelHeader__Actions_Leave/>
                            <div className="pointer" onClick={this.onClose}><Icon name="close" className="marg-left" size={24}/></div>
                        </div>
                    </div>
                    <MessageHistory context={this.state.channel} type="channel" context_id={this.id}/>
                    <MessageForm onSend={this.onSendMessage}/>
                </div>
                
            )
        }
    }
};

// TODO:
// пока убран, но надо будет восстановить и показывать при полном окне канала

// <div className="channel__sidebar" style={channelContentStyle}>
//                         <ChannelInfo context={this.state.channel}/>
//                     </div>
//                     
//                     
//                     
//                     


 // <div className="channel" style={channelStyle}>
                //     <div className="channel__header">
                //         <div className="channel__header_title">{this.state.channel.title}</div>
                //         <div className="channel__header_actions">
                //             {channelActionsAdmin}
                //             <ChannelHeader__Actions_Leave/>
                //         </div>
                //     </div>
                //     <div className="channel__content" style={channelContentStyle}>
                //         <MessageHistory context={this.state.channel} type="channel" context_id={this.id}/>
                //         <MessageForm onSend={this.onSendMessage}/>
                //     </div>

                // </div>