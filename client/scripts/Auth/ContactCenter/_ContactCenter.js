// 
// 
// backup
// 
// 


var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'
import {Utils} from '../../utils';

import Channels from './Channels.js';
import Groups from './Groups.js';
import Contacts from './Contacts.js';

import Hint from '../../SimpleComponents/Hint.js';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {Icon} from '../../SimpleComponents/Icons';
import {TransparentButton} from '../../SimpleComponents/TransparentButton.js';
import {InputSimple} from '../../SimpleComponents/InputSimple';
import {FlexBox} from '../../SimpleComponents/FlexBox';

import ChannelsController from './ChannelsController';
import ChatsController from './ChatsController';
import ContactsController from './ContactsController.js';
import ContactCenter__Block from './ContactCenter__Block.js';


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
        isOpenModalGroupCreate: false,

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
        contactsFilter: "chats",
        contactsSearchString: '',
        contactsShowSearch: false,
    }

    componentWillMount = ()=>{
        // контакты, каналы, группы, чаты будут доступны на каждой странице
        AppState.myContacts = new ContactsController();
        AppState.myChannels = new ChannelsController();
        AppState.myChats = new ChatsController();
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
        // переделать
        Events.on(Events.EV_MSG_CHANNEL_DELETED, this.onChannelDeleted);

        // чаты-приваты
        Events.on(Events.EV_MSG_PRIVATE_NEW, this.onChatEvent);
        Events.on(Events.EV_MSG_PRIVATE_UNREADED, this.onChatEvent);
        Events.on(Events.EV_MSG_PRIVATE_INTERLOCUTOR_LRM, this.onChatEvent);
        
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
        
        Events.rem(Events.EV_MSG_CHANNEL_DELETED, this.onChannelDeleted);

        // чаты-приваты
        Events.rem(Events.EV_MSG_PRIVATE_NEW, this.onChatEvent);
        Events.rem(Events.EV_MSG_PRIVATE_UNREADED, this.onChatEvent);
        Events.rem(Events.EV_MSG_PRIVATE_INTERLOCUTOR_LRM, this.onChatEvent);

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

    toggleBlock =(e)=> {

        if ( !e.target.dataset ) return;

        // добавляем или убираем скрытые блоки
        if( this.hideBlock.some( block => block == e.target.dataset.name) ) {
            this.hideBlock = this.hideBlock.filter( block => block != e.target.dataset.name );
            this.blockClassNames[e.target.dataset.name] = this.blockStdClassName;
        } else {
            this.hideBlock.push( e.target.dataset.name );
            this.blockClassNames[e.target.dataset.name] = this.blockStdClassName + "-hidden";
        }
        this.recalcHeights();
    }

    isShowBlock =(name)=> {
        return !this.hideBlock.some( block => block == name);
    }


    //
    // Каналы создаются вручную
    //

    // openModalChannelCreate = ()=>{
    //     this.setState({ isOpenModalChannelCreate: true });
    // }
    // closeModalChannelCreate = ()=>{
    //     this.setState({ isOpenModalChannelCreate: false });
    // }

    // onChangeHandler = (obj)=>{
    //     this.setState(obj);
    // };

    // createChannel = ()=>{
    //     AppState.myChannels.createChannel(this.state.channelName);
    //     this.closeModalChannelCreate();
    // };


    openModalGroupCreate = ()=>{
        this.setState({ isOpenModalGroupCreate: true });
    }

    closeModalGroupCreate = ()=>{
        this.setState({ isOpenModalGroupCreate: false });
    }

    onChangeHandler = (obj)=>{
        this.setState(obj);
    }

    createGroup = ()=>{
        AppState.myChannels.createGroup(this.state.channelName);
        this.closeModalGroupCreate();
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
    
	render = () =>{

        // подгоняем высоту под экран
        let ccStyle = { height: this.state.ccHeight + "px" };

        let styleFilter = "contact-center__box-subheader-filter";
        let styleFilterChannelsAll = (this.state.channelsFilter == "all") ? styleFilter + "--active" : styleFilter;
        let styleFilterChannelsMy = (this.state.channelsFilter == "my") ? styleFilter + "--active" : styleFilter;
        let styleFilterGroupAll = (this.state.groupsFilter == "all") ? styleFilter + "--active" : styleFilter;
        let styleFilterGroupMy = (this.state.groupsFilter == "my") ? styleFilter + "--active" : styleFilter;
        let styleFilterContactsContacts = (this.state.contactsFilter == "contacts") ? styleFilter + "--active" : styleFilter;
        let styleFilterContactsChats = (this.state.contactsFilter == "chats") ? styleFilter + "--active" : styleFilter;

		return(
			<div className="contact-center" style={ccStyle}>

                <ContactCenter__Block blockClass={this.blockClassNames['channels']}
                                      name="channels"
                                      title="Каналы"
                                      isShow={this.isShowBlock('channels')}
                                      isShowSearch={this.state.channelsShowSearch && this.isShowBlock('channels')}
                                      onToggleBlock={this.toggleBlock}
                                      onToggleSearch={this.toggleSearch}
                                      onSearchChange={this.onSearch} >
                    <div className="contact-center__box-content">
                        <div>
                            <div className="contact-center__box-subheader">
                                <span onClick={this.toggleFilter} 
                                      data-name="channels" 
                                      data-value="all"
                                      className={styleFilterChannelsAll}>все</span>
                                <span onClick={this.toggleFilter} 
                                      data-name="channels" 
                                      data-value="my"
                                      className={styleFilterChannelsMy}>мои</span>
                            </div>
                            <div className="contact-center__box-content">
                                <Channels height={this.state.channelsHeight}
                                          filter={this.state.channelsFilter}
                                          searchString={this.state.channelsSearchString}/>
                            </div>
                        </div>
                        
                    </div>
                </ContactCenter__Block>

                <ContactCenter__Block blockClass={this.blockClassNames['contacts']}
                                      name="contacts"
                                      title="Чаты"
                                      isShow={this.isShowBlock('contacts')}
                                      isShowSearch={this.state.contactsShowSearch && this.isShowBlock('contacts')}
                                      onToggleBlock={this.toggleBlock}
                                      onToggleSearch={this.toggleSearch}
                                      onSearchChange={this.onSearch} >
                    <div className="contact-center__box-content">
                         <div>
                            <div className="contact-center__box-subheader">
                                <span onClick={this.toggleFilter} 
                                      data-name="contacts" 
                                      data-value="chats"
                                      className={styleFilterContactsChats}>сообщения</span>
                                 <span onClick={this.toggleFilter} 
                                      data-name="contacts" 
                                      data-value="contacts"
                                      className={styleFilterContactsContacts}>контакты</span>
                            </div>
                            <div className="contact-center__box-content">
                                <Contacts height={this.state.contactsHeight} 
                                          filter={this.state.contactsFilter}
                                          searchString={this.state.contactsSearchString} />
                            </div>
                        </div>
                    </div>
                </ContactCenter__Block>

                <ModalWindow title="Новая группа" isOpen={this.state.isOpenModalGroupCreate} onClose={this.closeModalGroupCreate}>
                    <FlexBox direction="row" alignItems="center">
                        <label className="label label-width-md">Название группы</label>
                        <InputSimple name="channelName" placeholder="" onChange={this.onChangeHandler} />
                    </FlexBox>
                    <div className="box-row-nw just-end marg-t">
                        <TransparentButton onClick={this.createGroup} caption="Создать"/>
                        <TransparentButton onClick={this.closeModalGroupCreate} caption="Отменить"/>
                    </div>
                </ModalWindow>

                <ContactCenter__Block blockClass={this.blockClassNames['groups']}
                                      name="groups"
                                      title="Группы"
                                      isShow={this.isShowBlock('groups')}
                                      isShowSearch={this.state.groupsShowSearch && this.isShowBlock('groups')}
                                      onToggleBlock={this.toggleBlock}
                                      onToggleSearch={this.toggleSearch}
                                      onSearchChange={this.onSearch} >
                    <div className="contact-center__box-content">
                        <div>
                            <div className="contact-center__box-subheader">
                                <span onClick={this.toggleFilter}
                                      data-name="groups" 
                                      data-value="all"
                                      className={styleFilterGroupAll}>все</span>
                                <span onClick={this.toggleFilter} 
                                      data-name="groups" 
                                      data-value="my"
                                      className={styleFilterGroupMy}>мои</span>
                                <div onClick={this.openModalGroupCreate} className="contact-center__box-subheader-action">
                                    создать группу
                                </div>
                            </div>
                            <div className="contact-center__box-content">
                                <Groups height={this.state.groupsHeight} 
                                        filter={this.state.groupsFilter}
                                        searchString={this.state.groupsSearchString} />
                            </div>
                        </div>
                    </div>
                </ContactCenter__Block>
               
            </div>
		)
	}
     
}




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