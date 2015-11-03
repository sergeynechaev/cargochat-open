var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Emoji} from '../Emoji';
import {Icon} from '../Icon';

import NotificationsController from './NotificationsController';
import NotificationsMessage from './NotificationsMessage';
import NotificationsEvent from './NotificationsEvent';

// import {newMsgSound} from '../../sounds/new_private_msg.mp3';
// import {newMsgSound} from 'http://www.suarezgolborne.se/wp-content/slang.mp3';
// http://mptron.com/agava/sms/03122007/ICQ.mp3
// http://www.freesound.org/data/previews/234/234524_4019029-lq.mp3


export default class NotificationCenter extends React.Component{

    constructor() {
        super();
    }

    state = {
        isShow: false,
        events: []
    }

    soundClick =()=> {
        var audio = new Audio('http://mptron.com/agava/sms/03122007/ICQ.mp3');
        audio.play(); // запускаем
    }

    componentWillMount =()=> { 
        AppState.myNotifies = new NotificationsController();
    }

    componentDidMount =()=> {
        Events.on(Events.EV_SHOW_EVENT, this.onNewEvent);

        // по этим событиям надо чистить нотифай-центр
        Events.on(Events.EV_MSG_CHANNEL_USER_UPSERT, this.onChannelUserUpsert);
        Events.on(Events.EV_MSG_PRIVATE_UNREADED, this.onMsgPrivateUnreaded);
    }

    componentWillUnmount =()=> { 
        Events.rem(Events.EV_SHOW_EVENT, this.onNewEvent);
        Events.rem(Events.EV_MSG_CHANNEL_USER_UPSERT, this.onChannelUserUpsert);
        Events.rem(Events.EV_MSG_PRIVATE_UNREADED, this.onMsgPrivateUnreaded);
    }

    shouldComponentUpdate =(nextProps, nextState)=> {
        // logger.log('shouldComponentUpdate', this, this.state, nextState);

        return ( nextState.events.length !== this.state.events.length 
                 || nextState.isShow !== this.state.isShow );
    }

    onNewEvent =(event)=> {
        // AppState.myNotifies.onNewEvent( event );

        AppState.myNotifies.addEvent( event );
        this.setState( {events: AppState.myNotifies.getEvents(), isShow: true} );
        
        // проигрываем звук, апи должно отдавать метку, чтобы проигрывать только 1 раз
        logger.log("звук та-дам!");
        if (event.received > 0) this.soundClick();
    }

    onChannelUserUpsert =(event)=> {
        // logger.log('NC - onChannelUserUpsert', this, event);

        AppState.myNotifies.removeByFilter( 'channel_id', 'eq', event.channel_id );
        this.setState( {events: AppState.myNotifies.getEvents(), isShow: AppState.myNotifies.countEvents() ? true : false} );
    }

    onMsgPrivateUnreaded =(event)=> {
        // logger.log('NC - onMsgPrivateUnreaded', this, event);

        AppState.myNotifies.removeByFilter( 'id', 'lt', event.lrm_id );
        this.setState( {events: AppState.myNotifies.getEvents(), isShow: AppState.myNotifies.countEvents() ? true : false} );
    }

    closeEvent =(id)=> {
        AppState.myNotifies.removeById( id );
        this.setState({events: AppState.myNotifies.getEvents(), isShow: AppState.myNotifies.countEvents() ? true : false} );
    }

    toggleNC =()=> {
        this.setState({isShow: !this.state.isShow});
    }

    closeNC =()=> {
        this.setState({isShow: false});
    }

    clearAll =()=> {
        AppState.myNotifies.clearAll();
        this.setState( {isShow: false, events: AppState.myNotifies.getEvents()} );
    }

    gotoChat =(obj)=> {
        let uid = (obj.events || []).length ? obj.events[0].event.user_id : 0;
        if( !uid ) {
            Events.runError('Не удалось распознать номер чата');
            return;
        }
        // чистим все сообщения от юзера
        AppState.myNotifies.removeByFilter( 'user_id', 'eq', uid );
        this.setState( {isShow: false, events: AppState.myNotifies.getEvents()} );
        AppState.myChats.openChat(uid);
        // window.location.hash = "dashboard/chat/"+uid;
    }

    gotoChannel =(e)=> {
        this.setState({ isShow: false });
        AppState.myChannels.openChannel(e.channel_id);
        // window.location.hash = "dashboard/channel/"+e.channel_id;
    }

    render =()=> {

        let user = null;
        let eventsList = [];

        eventsList = this.state.events.map( (e, key) => {

                switch( e.event.type ) {

                    case 'msg_private_new':
                        // для каждого юзера показываем сразу группу сообщений
                        if( e.event.user_id != user ) {
                            user = e.event.user_id;
                            let userMessages = AppState.myNotifies.getMessagesByUser( user );
                            logger.log('rende NC, msg priv new', this, userMessages);
                            return <NotificationsMessage key={key} 
                                             obj={userMessages} 
                                             onClose={this.closeEvent}
                                             onGoto={this.gotoChat}/>
                            
                        }
                    break;

                    case 'msg_channel_invite':
                        return <NotificationsEvent key={key} 
                                             obj={e} 
                                             title="приглашение"
                                             descr={'Вы получили приглашение в канал "' + e.event.title + '"'}
                                             onClose={this.closeEvent}
                                             onGoto={this.gotoChannel}/>
                    break;
                }

            }
        );

        if( !eventsList.length ) eventsList = <div className="note-center--no-events">Нет уведомлений</div>

        return (
            <div className="note-center">
                <a onClick={this.toggleNC}><Icon name={eventsList.length ? "notifications-active" : "notifications"} className="profile-mini__icon" size={24} /></a>
                { this.state.isShow ? 
                    <div className="note-area">
                        <div className="note-area__header">
                            <span className="note-area__header-clear-all" onClick={this.clearAll}>{eventsList.length ? "очистить все" : null }</span>
                            <span className="note-area__header-close" onClick={this.closeNC}>закрыть</span>
                        </div>
                        <div className="note-area__container">
                            {eventsList}
                        </div>
                    </div>
                : null }
            </div>
        )
    }
}
