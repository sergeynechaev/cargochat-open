var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger'
import {Utils} from '../../utils';

import Channels from './Channels';
import Groups from './Groups';
import Contacts from './Contacts';

import Hint from '../../SimpleComponents/Hint';
import {ModalWindow} from '../../Controls/ModalWindow';
import {Icon} from '../../SimpleComponents/Icons';
// import {TransparentButton} from '../../SimpleComponents/TransparentButton';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
// import {FlexBox} from '../../SimpleComponents/FlexBox';

// import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
// import {InputSimple} from '../../Controls/Forms/InputSimple';
// import {FormGroup} from '../../Controls/Forms/FormGroup';

import ChannelsController from './ChannelsController';
import ChatsController from './ChatsController';
import ContactsController from './ContactsController';
import ContactCenter__Block from './ContactCenter__Block';
import Channels__CreateChannel from './Channels__CreateChannel';
import WatchController from '../../Classes/WatchController';

import Channel from '../Channel/Channel';
import Chat from '../Chat/Chat';


/**
 * ContactCenter <- Channels, Groups <- ChannelsController    = список каналов и групп в контакт-центре
 *               <- Chats            <- ChatsController       = список приватов в контакт-центе
 *               <- Contacts         <- ContactsController    = список контактов
 */

export default class ContactCenter extends React.Component {

    constructor( props ) {
        super( props );

        this.hideBlock = [];
        this.blockStdClassName = "contact-center__box-header";
        this.blockClassNames = { channels: this.blockStdClassName,
                                 contacts: this.blockStdClassName,
                                 groups: this.blockStdClassName,
                               };
    }

    state = {
        // isOpenModalChannelCreate: false,
        isOpenModal: false,
        modalType: '',

        ccHeight: 900,

        // channels
        channelsHeight: 200,
        channelsFilter: "all",
        channelsSearchString: '',
        channelsShowSearch: false,
        
        // groups
        groupsHeight: 200,
        groupsFilter: "all",
        groupsSearchString: '',
        groupsShowSearch: false,

        // contacts
        contactsHeight: 200,
        contactsFilter: "all",
        contactsSearchString: '',
        contactsShowSearch: false,

        // context to show chat or channel into floating div
        isShowContext: false,
        contextType: '',
        contextId: null,
    }

    componentWillMount = ()=>{
        // контакты, каналы, группы, чаты будут доступны на каждой странице
        AppState.myContacts = new ContactsController();
        AppState.myChannels = new ChannelsController();
        AppState.myChats = new ChatsController();
        AppState.myWatch = new WatchController();

        // WATCH TESTS 
        // AppState.myWatch.regUsers([11,12,13]);
        // AppState.myWatch.regUsers([12,13,14]);
        // AppState.myWatch.regUsers([15,66]);
        // AppState.myWatch.setUsersOnline( {online: [15,66]} );
        // logger.log('is user online = ' + AppState.myWatch.isUserOnline(11));
        // logger.log('is user online = ' + AppState.myWatch.isUserOnline(15));
        // logger.log('is user online = ' + AppState.myWatch.isUserOnline(100));
        // AppState.myWatch.setOneUserOnline( {user_id: 11} );
        // AppState.myWatch.setOneUserOffline( {user_id: 66} );
        // logger.log('is user online = ' + AppState.myWatch.isUserOnline(11));
    }

    componentDidMount =()=> {
        // контакт-центр висит на каждой странице, делаем тут основные
        // подписки на события по каналам и приватам
        // 
        // события будут транслированы в контроллеры каналов или чатов,
        // вся логика обновления контакт-центра и истории сообщений там
        // 
        // каналы
        Events.on(Events.EV_MSG_CHANNEL_NEW, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_CORRECT, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_ERASE, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_UNREADED, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_INVITE, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_USER_UPSERT, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_USER_LEAVE, this.onChannelEvent);
        Events.on(Events.EV_MSG_CHANNEL_ORDERS, this.onChannelEvent);
        AppState.myChannels.on('Channels_open', this.onOpenChannel);
        AppState.myChannels.on('Channels_close', this.onCloseContext);
        // переделать
        Events.on(Events.EV_MSG_CHANNEL_DELETED, this.onChannelDeleted);

        // чаты-приваты
        Events.on(Events.EV_MSG_PRIVATE_NEW, this.onChatEvent);
        Events.on(Events.EV_MSG_PRIVATE_UNREADED, this.onChatEvent);
        Events.on(Events.EV_MSG_PRIVATE_INTERLOCUTOR_LRM, this.onChatEvent);
        AppState.myChats.on('Chats_open', this.onOpenChat);
        AppState.myChats.on('Chats_close', this.onCloseContext);

        // статусы онлайн-офлайн
        Events.on(Events.EV_WEBSOCKET_REG, AppState.myWatch.watchUsers);
        Events.on(Events.EV_WATCH_USERS_INIT, AppState.myWatch.setUsersOnline);
        Events.on(Events.EV_USER_ONLINE, AppState.myWatch.setOneUserOnline);
        Events.on(Events.EV_USER_OFFLINE, AppState.myWatch.setOneUserOffline);
        
        Utils.addWindowEvent( 'resize', this.onResizeWindow );

        this.recalcHeights();
    }

    componentWillUnmount = ()=>{
        // каналы
        Events.rem(Events.EV_MSG_CHANNEL_NEW, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_CORRECT, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_ERASE, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_UNREADED, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_INVITE, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_USER_LEAVE, this.onChannelEvent);
        Events.rem(Events.EV_MSG_CHANNEL_USER_UPSERT, this.onChannelEvent);
        AppState.myChannels.rem('Channels_open', this.onOpenChannel);
        AppState.myChannels.rem('Channels_close', this.onCloseContext);
        
        Events.rem(Events.EV_MSG_CHANNEL_DELETED, this.onChannelDeleted);

        // чаты-приваты
        Events.rem(Events.EV_MSG_PRIVATE_NEW, this.onChatEvent);
        Events.rem(Events.EV_MSG_PRIVATE_UNREADED, this.onChatEvent);
        Events.rem(Events.EV_MSG_PRIVATE_INTERLOCUTOR_LRM, this.onChatEvent);
        AppState.myChats.rem('Chats_open', this.onOpenChat);
        AppState.myChats.rem('Chats_close', this.onCloseContext);

        // статусы онлайн-офлайн
        Events.rem(Events.EV_WEBSOCKET_REG, AppState.myWatch.watchUsers);
        Events.rem(Events.EV_WATCH_USERS_INIT, AppState.myWatch.setUsersOnline); // список всех юзеров онлайн
        Events.rem(Events.EV_USER_ONLINE, AppState.myWatch.setOneUserOnline);
        Events.rem(Events.EV_USER_OFFLINE, AppState.myWatch.setOneUserOffline);

        Utils.remWindowEvent( 'resize', this.onResizeWindow );
    }

    onChatEvent =(event)=> {
        AppState.myChats.onChatEvent( event );
    }

    onChannelEvent =(event)=> {
        AppState.myChannels.onChannelEvent( event );
    }

    onChannelDeleted =(event)=> {
        AppState.myChannels.destroyСhannel(event.channel_id);
    }

    // toggleBlock =(e)=> {

    //     if ( !e.target.dataset ) return;

    //     // добавляем или убираем скрытые блоки
    //     if( this.hideBlock.some( block => block == e.target.dataset.name) ) {
    //         this.hideBlock = this.hideBlock.filter( block => block != e.target.dataset.name );
    //         this.blockClassNames[e.target.dataset.name] = this.blockStdClassName;
    //     } else {
    //         this.hideBlock.push( e.target.dataset.name );
    //         this.blockClassNames[e.target.dataset.name] = this.blockStdClassName + "-hidden";
    //     }
    //     this.recalcHeights();
    // }

    isShowBlock =(name)=> {
        return !this.hideBlock.some( block => block == name);
    }

    openModalGroupCreate =()=> {
        this.setState({ isOpenModal: true, modalType: "group" });
    }

    openModalChannelCreate =()=> {
        this.setState({ isOpenModal: true, modalType: "channel" });
    }

    closeModal =()=> {
        this.setState({ isOpenModal: false, modalType: '' });
    }

    onChangeHandler =(obj)=> {
        this.setState(obj);
    }

    createGroup =(title)=> {
        logger.log('create group t= ' + title, this);
        AppState.myChannels.createGroup(title);
        this.closeModal();
    }

    createChannel = (title)=>{
        logger.log('create channel t= ' + title, this);
        AppState.myChannels.createChannel(title);
        this.closeModal();
    }

    onResizeWindow =()=> {
        this.recalcHeights();
        this.setState({ ccHeight: this.ccHeight });
    }

    // пересчет высоты остальных блоков при их открытии/закрытии
    // TODO: в новом дизайне переделать на css и флексах 
    recalcHeights =()=> {

        this.ccHeight = Utils.getClientHeight() - 80;   // высота всего контакт-центра
        let blockHided = 1;     // высота блока в свернутом виде
        let blockOpen = 10;     // дефолтное значение, будет пересчитано в зависимости от видимости блоков
        let blockWrapper = 90;  // высота обертки блока (тайтл, переключатели)
        let cntHided = this.hideBlock.length || 0;  // сколько блоков скрыто
        let cntAll = Object.keys(this.blockClassNames).length || 0; // сколько открыто

        let areaHeight = this.ccHeight - (blockWrapper * cntAll);   // высота ареи под блоки (за минусом оберток блоков)

        if( cntHided != cntAll ) {
            blockOpen = Math.ceil( (areaHeight - (blockHided*cntHided) ) / (cntAll-cntHided) + cntHided*10 );
        }

        // размеры блоков
        this.setState({ ccHeight: this.ccHeight,
                        channelsHeight: this.isShowBlock('channels') ? blockOpen : blockHided,
                        contactsHeight: this.isShowBlock('contacts') ? blockOpen : blockHided,
                        groupsHeight: this.isShowBlock('groups') ? blockOpen : blockHided });

    }

    onSearch =(e)=> {
        if (!e.target.dataset.name ) return;
        this.setState({ [e.target.dataset.name + 'SearchString']: e.target.value });
    }

    toggleSearch =(name)=> {
        if (!name ) return;
        this.setState({ [name + 'ShowSearch']: !this.state[name + 'ShowSearch'], 
                        [name + 'SearchString']: '' });
    }

    toggleFilter =(e)=> {
        if (!e.target.dataset.name ) return;
        this.setState({ [e.target.dataset.name + 'Filter']: e.target.dataset.value });
    }

    onOpenChat =(id)=> {
        // logger.log('onOpenChat id= '+id, this);
        this.setState({ isShowContext: true, contextType: 'chat', contextId: id})
    }

    onOpenChannel =(id)=> {
        // logger.log('onOpenChannel id= '+id, this);
        this.setState({ isShowContext: true, contextType: 'channel', contextId: id})
    }

    onCloseContext =()=> {
        this.setState({ isShowContext: false, contextType: '', contextId: null})
    }
    
	render = () =>{

        // подгоняем высоту под экран
        let ccStyle = { height: this.state.ccHeight + "px" };

		return(
            <div>
    			<div className="contact-center" style={ccStyle}>

                    <ContactCenter__Block name="channels"
                                          title="Каналы"
                                          activeFilter={this.state.channelsFilter}
                                          onToggleFilter={this.toggleFilter}
                                          onToggleSearch={this.toggleSearch}
                                          onSearchChange={this.onSearch}
                                          onCreate={this.openModalChannelCreate} >
                            <Channels height={this.state.channelsHeight}
                                      filter={this.state.channelsFilter}
                                      searchString={this.state.channelsSearchString}/>
                    </ContactCenter__Block>

                    <ContactCenter__Block name="contacts"
                                          title="Сообщения"
                                          activeFilter={this.state.contactsFilter}
                                          onToggleFilter={this.toggleFilter}
                                          onToggleSearch={this.toggleSearch}
                                          onSearchChange={this.onSearch} >
                            <Contacts height={this.state.contactsHeight} 
                                      filter={this.state.contactsFilter}
                                      searchString={this.state.contactsSearchString} />
                    </ContactCenter__Block>

                    <ContactCenter__Block name="groups"
                                          title="Группы"
                                          activeFilter={this.state.groupsFilter}
                                          onToggleFilter={this.toggleFilter}
                                          onToggleSearch={this.toggleSearch}
                                          onSearchChange={this.onSearch}
                                          onCreate={this.openModalGroupCreate} >
                            <Groups height={this.state.groupsHeight} 
                                    filter={this.state.groupsFilter}
                                    searchString={this.state.groupsSearchString} />
                    </ContactCenter__Block>

                    <ModalWindow isOpen={this.state.isOpenModal} 
                                 onClose={this.closeModal} 
                                 title={this.state.modalType == 'group' ? "Новая группа" : "Новый канал"}>
                            <Channels__CreateChannel
                                    // type={this.state.modalType}
                                    onSave={this.state.modalType == 'group' ? this.createGroup : this.createChannel} 
                                    onClose={this.closeModal}/>
                    </ModalWindow>
                   
                </div>

                { this.state.isShowContext && this.state.contextId ?
                    <div className="channel-container">
                        { this.state.contextType == 'chat' ? <Chat id={this.state.contextId} /> : null }
                        { this.state.contextType == 'channel' ? <Channel id={this.state.contextId} /> : null }
                    </div>
                    : null }
            </div>
		)
	}
}


// <ModalWindow title="Новая группа" isOpen={this.state.isOpenModalGroupCreate} onClose={this.closeModalGroupCreate}>
//                         <FlexBox direction="row" alignItems="center">
//                             <label className="label label-width-md">Название группы</label>
//                             <InputSimple name="channelName" placeholder="" onChange={this.onChangeHandler} />
//                         </FlexBox>
//                         <div className="box-row-nw just-end marg-t">
//                             <TransparentButton onClick={this.createGroup} caption="Создать"/>
//                             <TransparentButton onClick={this.closeModalGroupCreate} caption="Отменить"/>
//                         </div>
//                     </ModalWindow>



// <div className="channel">
//                             { this.state.contextType == 'chat' ? <Chat id={this.state.contextId} /> : null }
//                             { this.state.contextType == 'channel' ? <Channel id={this.state.contextId} /> : null }
//                         </div>


    // toggleTab = (tab=0) =>{
    //     if(this.state.tabs.active == tab) return;

    //     switch(tab){
    //         case 0:
    //             this.setState({ active: 0, content: <Contacts/> });
    //         break;
    //         case 1:
    //             this.setState({ active: 1, content: <Privates/> });
    //         break;
    //     }

    // };

    // componentDidMount = () => {
    //     this.toggleTab();
    // };


// return(
//             <div className="contact-center">
//                 <Channels/>
                
//                 <div className="contact-center__box">
//                     <div className="contact-center__box-header">
//                         {tabs}
//                     </div>
//                     <div className="contact-center__box-content">
//                         {this.state.content}
//                     </div>
//                 </div>           

//                 <Groups/>
//             </div>
//         )