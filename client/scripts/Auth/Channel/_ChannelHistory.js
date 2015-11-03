//
//
// заменено на общий MessageHostory
// пусть пока полежит
// 
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Loading from '../../SimpleComponents/Loading';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

import ChannelMessage from './ChannelMessage';


export default class ChannelHistory extends React.Component {

    constructor( props ) {
        super( props );

        this.appendFromMessageId = null;
        this.isAppending = false;
    }

    state = {
        history: [],
        showNewMessageAlert: false,
        // history: AppState.myChannels.activeChannel().getHistory(),
    }

    _getChannelHistory() {

        let history = AppState.myChannels.activeChannel().getHistory();
        this.setState({ history: history });
    }

    componentWillReceiveProps =(nextProps)=> {
        // новый id, поэтому activeChannel уже другой, нужна подписка
        // AppState.myChannels.activeChannel().rem('Channel_history_update', this.updateHistory);
        AppState.myChannels.activeChannel().on('Channel_history_update', this.updateHistory);
        this._getChannelHistory();
    }

    componentWillMount =()=> {

        logger.log('hist', this.props.type);

        AppState.myChannels.activeChannel().on('Channel_history_update', this.updateHistory);
        AppState.myChannels.activeChannel().on('Channel_message_send', this.scrollToEnd);
        Events.on(Events.EV_MSG_CHANNEL_NEW, this.onMsgChannelNew);
        Events.on(Events.EV_MSG_CHANNEL_CORRECT, this.onMsgChannelCorrect);
        Events.on(Events.EV_MSG_CHANNEL_ERASE, this.onMsgChannelErase);
        Events.on(Events.EV_MSG_CHANNEL_UNREADED, this.onMsgChannelUnreaded); // not yet
        this._getChannelHistory();
    }

    // это сработает только один раз, когда юзер с другой страницы
    // ткнет на какой-либо канал. Нужно тоже восстановить скролл
    componentDidMount =()=> {
        this.initScroll();
    }

    componentWillUnmount = ()=>{
        if(AppState.myChannels.activeChannel()){
            AppState.myChannels.activeChannel().rem('Channel_history_update', this.updateHistory);
            AppState.myChannels.activeChannel().rem('Channel_message_send', this.scrollToEnd);
        }
        Events.rem(Events.EV_MSG_CHANNEL_NEW, this.onMsgChannelNew);
        Events.rem(Events.EV_MSG_CHANNEL_CORRECT, this.onMsgChannelCorrect);
        Events.rem(Events.EV_MSG_CHANNEL_ERASE, this.onMsgChannelErase);
        Events.rem(Events.EV_MSG_CHANNEL_UNREADED, this.onMsgChannelUnreaded); // not yet
    }

    componentDidUpdate = ()=>{
        this.initScroll();
    }

    updateHistory = (history)=>{
        this.setState({ history: history });
        this.isAppending = false;
    }

    onMsgChannelNew = (event)=>{
        AppState.myChannels.activeChannel().onMsgChannelNew(event);

        // если сообщение чужое, проверяем где скролл, 
        // и если не внизу, показываем алерт о новом сообщении
        let elem = document.getElementById('channel-history--'+this.props.channel_id);
        if( event.user_id != AppState.user.id
            && elem.scrollHeight - elem.clientHeight - elem.scrollTop > 80 ) {
                this.setState( {showNewMessageAlert: true} );
        }
    }

    onMsgChannelErase = (event)=>{
        AppState.myChannels.activeChannel().onMsgChannelErase(event);
    }

    onMsgChannelCorrect = (event)=>{
        AppState.myChannels.activeChannel().onMsgChannelCorrect(event);
    }


    //
    // Scroll handlers
    //

    initScroll =()=> {
        // если пришло новое сообщение и оно не наше, оставляем скролл на месте, показываем алерт
        if( this.state.showNewMessageAlert ) return;

        // если добавляли сообщения, крутим к предыдущему
        if( this.isAppending ) {
            // logger.log('SCROLL isAppending - scrollToMessage');
            this.scrollToMessage( this.appendFromMessageId, false );

        // если есть сохраненное значение, крутим к нему
        } else if( AppState.myChannels.activeChannel().scrollPos > 1 ) {
            // logger.log('SCROLL SAVED - scrollToPos', AppState.myChannels.activeChannel().scrollPos );
            this.scrollToPos( AppState.myChannels.activeChannel().scrollPos );

        // иначе крутим к последнему
        } else {
            // logger.log('SCROLL else - scrollToEnd');
            this.scrollToEnd();
        }
    }

    onScrollHandler =(e)=> {

        let elem = e.target;
        let elemPos = Math.ceil( elem.scrollTop );

        // запоминаем позицию скролла, чтобы вернуться к ней при открытии канала
        AppState.myChannels.activeChannel().saveScrollPosition( elemPos );

        // пытаемся подгрузить историю, только если еще не все загрузили
        if( elem.scrollTop < 10 
            && !this.isAppending
            && !AppState.myChannels.activeChannel().isGotAllMessages() ) {
                    this.isAppending = true;
                    // запоминаем текущее первое сообщение, чтобы после добавления отмотать к нему
                    this.appendFromMessageId = AppState.myChannels.activeChannel().getFirstHistoryMsgId();
                    AppState.myChannels.activeChannel().appendHistory();
        }
    }

    // прокрутка скролла к определенному сообщению
    scrollToMessage =( id, alignToTop = true )=>{
        if( !id ) return;
        let elem = document.getElementById('message--'+id);
        elem.scrollIntoView( alignToTop );
    }

    // прокрутка в конец
    scrollToEnd =()=>{
        this.scrollToMessage( AppState.myChannels.activeChannel().getLastHistoryMsgId(), false );
        // let elem = document.getElementById('channel-history--'+this.props.channel_id);
        // elem.scrollTop = elem.scrollHeight - elem.clientHeight;
    }

    // прокрутка на определенную позицию
    scrollToPos =(pos)=>{
        if( !pos ) return;
        let elem = document.getElementById('channel-history--'+this.props.channel_id);
        elem.scrollTop = pos;
    }


    showNewMessages =()=> {
        this.scrollToEnd();
        // сохраняем новую позицию скролла
        let elem = document.getElementById('channel-history--'+this.props.channel_id);
        let elemPos = Math.ceil( elem.scrollTop );
        AppState.myChannels.activeChannel().saveScrollPosition( elemPos );
        this.setState( {showNewMessageAlert: false} );
    }

    render = ()=>{

        let alert = null;
        let activeChannel = AppState.myChannels.activeChannel();
        if( activeChannel && activeChannel.getTotal() === null ) {
            alert = <div className="channel-history__alert">Загрузка истории сообщений...</div>;
        } else if( this.state.showNewMessageAlert ) {
            alert = <div className="channel-history__alert">Есть новые сообщения. &nbsp; <span className="channel-history__alert-view" onClick={this.showNewMessages}>Посмотреть</span></div>;
        }

        let History = null;
        if( activeChannel && activeChannel.getTotal() === 0  ) {
            History = <div>Нет сообщений</div>
        } else {
            History = this.state.history.map( (msg, i) => {
                            return <ChannelMessage data={msg} key={i}/>
                    });
        }

        // подгоняем высоту под экран
        let historyStyle = {
            height: Utils.getClientHeight() - 225 + "px",
        };

        return (
            <div>
                <div className="channel-history" style={historyStyle} id={"channel-history--"+this.props.channel_id} onScroll={this.onScrollHandler}>
                    {History}
                </div>
                {alert}
            </div>
        )
    }
};