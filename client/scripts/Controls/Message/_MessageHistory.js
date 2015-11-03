// 
// бэкап
// 
// 
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

import Message from './Message';


/**
 * Общий компонент для каналов и чатов
 *
 * принимает в this.props.context хэндлер для работы с отдельным каналом или чатом
 * context=AppState.myChannels.activeChannel()
 * context=AppState.myChats.activeChat()
 *
 */

export default class MessageHistory extends React.Component {

    constructor( props ) {
        super( props );

        this.appendFromMessageId = null;
        this.isAppending = false;

        // активный элемент - канал или чат
        this.activeContext = null;
        this.contextType = null;
        this.id = null;

        // таймаут для запуска отметки о прочитанном сообщении
        this.markReadedTimeout = null;
        this.markReadedId = 0;
    }

    state = {
        history: [],
        showNewMessageAlert: false,
    }

    _getHistory() {
        let history = this.activeContext.getHistory();
        this.setState({ history: history });
    }

    _setContext( props ) {
    	this.activeContext = props.context;
        this.contextType = props.type;
        this.id = props.context_id;

        // TODO: надо ли теперь? проверить
        // ставим число непрочитанных
        this._setUnreaded( props );

        // чистим таймаут для запуска отметки о прочитанном сообщении
        this._clearMarkReadedTimeout();
    }

    _setUnreaded( props ) {
        if( this.contextType == 'chat' ) {
            this.activeContext.unreaded = AppState.myChats.getUnreadedCount(props.context_id);
        }
        // logger.log('_set unreaded -chat', this, this.activeContext.unreaded );
    }

    // подписки в зависимости от типа канал/чат
    _subs( action, onEvents=false ) {
        switch( this.contextType ) {
            case 'channel':
                this.activeContext[action]('Channel_history_update', this.updateHistory);
                this.activeContext[action]('Channel_message_send', this.scrollToEnd);
                if( onEvents ) {
                    Events[action](Events.EV_MSG_CHANNEL_NEW, this.onMsgNew);
                    Events[action](Events.EV_MSG_CHANNEL_CORRECT, this.onMsgCorrect);
                    Events[action](Events.EV_MSG_CHANNEL_ERASE, this.onMsgErase);
                    Events[action](Events.EV_MSG_CHANNEL_UNREADED, this.onMsgUnreaded);
                }
            break;

            case 'chat':
                this.activeContext[action]('Chat_history_update', this.updateHistory);
                this.activeContext[action]('Chat_message_send', this.scrollToEnd);
                if( onEvents ) {
                    Events[action](Events.EV_MSG_PRIVATE_NEW, this.onMsgNew);
                    Events[action](Events.EV_MSG_PRIVATE_UNREADED, this.onMsgUnreaded);
                }
            break;

        }
    }

    componentWillReceiveProps =(nextProps)=> {

    	this._setContext( nextProps );
        // новый id, поэтому activeChannel уже другой, нужна подписка
        this._subs( 'on' );
        this._getHistory();
    }

    componentWillMount =()=> {

        this._setContext( this.props );
        this._subs( 'on', true );
        this._getHistory();
    }

    // это сработает только один раз, когда юзер с другой страницы
    // ткнет на какой-либо канал. Нужно тоже восстановить скролл
    componentDidMount =()=> {
        this.initScroll();
    }

    componentWillUnmount = ()=>{
        this._subs( 'rem', true );
    }

    componentDidUpdate = ()=>{
        this.initScroll();
    }

    updateHistory = (history)=>{
        this.setState({ history: history });
        this.isAppending = false;
    }

    onMsgNew = (event)=>{

        // проверяем, пришло сообщение в активный контекст или нет
        // для не активного в даный момент чата ничего не делаем
        // по этому событию отработает только контакт-центр
        if( !this.activeContext.isForActiveContext( event ) ) return;

        this.activeContext.onMsgNew(event);

        // если сообщение свое, сразу крутим вниз
        if( event.user_id == AppState.user.id ) {
            this.scrollToEnd();

        // если сообщение чужое, проверяем где скролл, 
        // и если не внизу, показываем алерт о новом сообщении
        } else {
            let elem = document.getElementById('channel-history--'+this.props.context_id);

            // если скролл не больше 150, считаем, что он был внизу, и автоматом крутим
            // в конец беседы. Если скролл больше, юзер там что-то отмотал и читает,
            // показываем уведомление о новых сообщениях
            if( elem.scrollHeight - elem.clientHeight - elem.scrollTop > 150) {

                // logger.log('showNewMessageAlert set true');

                this.setState( {showNewMessageAlert: true} );
            } else {

                // logger.log('showNewMessageAlert not set, scroll to end');

                this.scrollToEnd();
            }

            // logger.log('onMsgNew', this, elem.scrollHeight - elem.clientHeight - elem.scrollTop);
        }

    }

    onMsgErase = (event)=>{
        // для не активного в даный момент чата ничего не делаем
        // по этому событию отработает только контакт-центр
        if( !this.activeContext.isForActiveContext( event ) ) return;

        this.activeContext.onMsgErase(event);
    }

    onMsgCorrect = (event)=>{
        // для не активного в даный момент чата ничего не делаем
        // по этому событию отработает только контакт-центр
        if( !this.activeContext.isForActiveContext( event ) ) return;

        this.activeContext.onMsgCorrect(event);
    }

    onMsgUnreaded =(event)=> {
        // для не активного в даный момент чата ничего не делаем
        // по этому событию отработает только контакт-центр
        if( !this.activeContext.isForActiveContext( event ) ) return;

        this.activeContext.onMsgUnreaded(event);
    }


    //
    // Scroll handlers
    //

    initScroll =()=> {
        // если пришло новое сообщение и оно не наше, оставляем скролл на месте, показываем алерт
        if( this.state.showNewMessageAlert ) return;

        // если скролла нет, но есть непрочитанные, отмечаем их как только подгрузится история
        let elem = document.getElementById('channel-history--'+this.props.context_id);
        if( this.activeContext.getTotal() && this.activeContext.unreaded > 0 && elem && (elem.scrollHeight-elem.clientHeight) <= 10 ) {
            if( !this.markReadedTimeout ) this.markReadedTimeout = setTimeout(this.markReaded, 1500);
            return;
        }

        // если есть непрочитанные, и юзер еще не крутил скролл, то крутим к нему
        // last_readed = null --> все непрочитанные, крутим на старт
        // last_readed = id непрочитанного --> крутим на него
        if( this.activeContext.unreaded > 0 && this.activeContext.scrollPos === null ) {

            if( this.activeContext.history.first_unreaded !== -1 ) {
                logger.log('initScroll, scroll to lrm elem=' + this.activeContext.history.first_unreaded);
                this.scrollToMessage( parseInt(this.activeContext.history.first_unreaded), false );
            }
            
            // выходим из скролла
            // return;

        // если добавляли сообщения, крутим к предыдущему
        } else if( this.isAppending ) {

            // logger.log('init SCROLL isAppending - scrollToMessage');

            this.scrollToMessage( this.appendFromMessageId, false );

        // если есть сохраненное значение, крутим к нему
        } else if( this.activeContext.scrollPos > 1 ) {

            // logger.log('init SCROLL SAVED - scrollToPos', this.activeContext.scrollPos );

            this.scrollToPos( this.activeContext.scrollPos );

        // иначе крутим к последнему
        } else {

            // logger.log('init SCROLL else - scrollToEnd');

            this.scrollToEnd();
        }
    }

    onScrollHandler =(e)=> {

        // на случай, если юзер беспорядочно елозит скроллом туда-сюда,
        // по таймауту запускаем проверку на отметку прочитанных месседжей
        if( !this.markReadedTimeout && this.activeContext ) {
            this.markReadedTimeout = setTimeout(this.markReaded, 1500);
        }

        let elem = e.target;
        let elemPos = Math.ceil( elem.scrollTop );

        // logger.log('onScrollHandler scroll= ' + elem.scrollHeight + ", client= " + elem.clientHeight + ", top= " + elem.scrollTop);
        // logger.log('onScrollHandler res=', elem.scrollHeight - elem.clientHeight - elem.scrollTop);

        // запоминаем позицию скролла, чтобы вернуться к ней при открытии канала
        this.activeContext.saveScrollPosition( elemPos );

        // пытаемся подгрузить историю, только если еще не все загрузили
        if( elem.scrollTop < 10 
            && !this.isAppending
            && !this.activeContext.isGotAllMessages() ) {
                    this.isAppending = true;
                    // запоминаем текущее первое сообщение, чтобы после добавления отмотать к нему
                    this.appendFromMessageId = this.activeContext.getFirstHistoryMsgId();
                    this.activeContext.appendHistory();
        }
    }

    // прокрутка скролла к определенному сообщению
    scrollToMessage =( id, alignToTop = true )=> {

        logger.log('trigger scrollToMessage');

        if( !id ) return;
        let elem = document.getElementById('message--'+id);
        if( elem) elem.scrollIntoView( alignToTop );
    }

    // прокрутка в конец
    scrollToEnd =()=> {

        // logger.log('trigger scrollToEnd');

        this.scrollToMessage( this.activeContext.getLastHistoryMsgId(), false );
        // let elem = document.getElementById('channel-history--'+this.props.context_id);
        // elem.scrollTop = elem.scrollHeight - elem.clientHeight;
    }

    // прокрутка в конец
    scrollToStart =()=> {

        logger.log('trigger scrollToStart');

        let elem = document.getElementById('channel-history--'+this.props.context_id);
        elem.scrollTop = 0;
    }

    // прокрутка на определенную позицию
    scrollToPos =(pos)=> {

        // logger.log('trigger scrollToPos');

        if( !pos ) return;
        let elem = document.getElementById('channel-history--'+this.props.context_id);
        if( elem) elem.scrollTop = pos;
    }

    /*
     * End od Scroll
     */


    markReaded =()=> {

        let unreadedList = this.activeContext.getUnreadedIDs();

        // все прочитаны - ничего не делаем
        if( !(unreadedList || []).length ) {
            this._clearMarkReadedTimeout();
            return;
        }

        let container = document.getElementById('channel-history--'+this.props.context_id);
        let contHeight = container.clientHeight;
        let contScrollTop = container.scrollTop;
        let contClientTop = container.clientTop;

        // смотрим, что у нас из непрочитанного в области видимости
        // т.к. апи понимает только команду <id последнего прочитанного сообщения (null - прочитанных нет)>
        // начинаем искать с хвоста, определеляем последнее сообщение и его id

        // сортируем по убыванию, функция нужна, чтобы не наступить на грабли со сравнением строк
        // unreadedList.sort( (a, b) => {return b-a} );

        // let top = parseInt(elem.getBoundingClientRect().top);
        // let bottom = parseInt(elem.getBoundingClientRect().bottom);

        // logger.log('markReaded, cont=' + " contHeight=" + contHeight + " contScrollTop=" + contScrollTop + " contClientTop=" + contClientTop);
        // logger.log('markReaded, cont fold =' + (contHeight + contScrollTop) + " elemOffsetTop=" + elemOffsetTop);
        // logger.log('markReaded, cont top =' + contScrollTop + " h+offTop=" + (elemOffsetTop+elemHeight) + " top=" + top );

        for( let i = unreadedList.length-1; i >= 0; i-- ) {

            // ищем, виден ли наш элемент
            let elem = document.getElementById('message--'+unreadedList[i]);

            if( elem ) {
                let elemOffsetTop = elem.offsetTop;
                let elemHeight = elem.clientHeight;
                // let top = parseInt(elem.getBoundingClientRect().top);

                let isBelowViewport = (contHeight + contScrollTop <= elemOffsetTop + 80) ? true : false;
                let isAboveViewport = (elemHeight + elemOffsetTop <= contScrollTop + 20) ? true : false;

                // logger.log('mark readed compare msgID= ' + unreadedList[i] + " lrm_id= " + this.markReadedId);

                if( !isBelowViewport && !isAboveViewport && unreadedList[i] > this.markReadedId ) {

                    logger.log('in viewport! mark readed elem=' + unreadedList[i]);

                    // апи выдаст ошибку, если будем ставить метку на сообщение 
                    // с таким же id, поэтому запоминаем, чтобы следующий запрос отсылать на сообщение c 
                    // бОльшим id
                    this.markReadedId = unreadedList[i];

                    // нашли последнее сообщение - отсылаем метку о прочтении
                    this.activeContext.markReaded(unreadedList[i]);

                    // прерываемся
                    break;
                }
            }
        }

        logger.log('----');

        this._clearMarkReadedTimeout();
    }

    // чистим таймаут отметки о прочитанном сообщении
    _clearMarkReadedTimeout =()=> {
        if( this.markReadedTimeout ) clearTimeout( this.markReadedTimeout );
        this.markReadedTimeout = null;
    }


    showNewMessages =()=> {
        this.scrollToEnd();
        // сохраняем новую позицию скролла
        let elem = document.getElementById('channel-history--'+this.props.context_id);
        let elemPos = Math.ceil( elem.scrollTop );
        this.activeContext.saveScrollPosition( elemPos );
        this.setState( {showNewMessageAlert: false} );
    }

    render = ()=>{

        let alert = null;
        if( this.activeContext && this.activeContext.getTotal() === null ) {
            alert = <div className="channel-history__alert">Загрузка сообщений...</div>;
        } else if( this.state.showNewMessageAlert ) {
            alert = <div className="channel-history__alert">Есть новые сообщения. &nbsp; <span className="channel-history__alert-view" onClick={this.showNewMessages}>Посмотреть</span></div>;
        }

        let History = null;
        if( this.activeContext && this.activeContext.getTotal() === 0  ) {
            History = <div>Нет сообщений</div>
        } else {
            History = this.state.history.map( (msg, i) => {
                            return <Message context={this.activeContext} data={msg} key={i}/>
                    });
        }

        // подгоняем высоту под экран
        let historyStyle = {
            height: Utils.getClientHeight() - 225 + "px",
        };

        return (
            <div>
                <div className="channel-history" style={historyStyle} id={"channel-history--"+this.props.context_id} onScroll={this.onScrollHandler}>
                    {History}
                </div>
                {alert}
            </div>
        )
    }
};