var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'

import {Loading} from '../../SimpleComponents/Loading';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {TransparentButton} from '../../SimpleComponents/TransparentButton.js';
import {InputSimple} from '../../SimpleComponents/InputSimple';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import Hint from '../../SimpleComponents/Hint.js';

import Channels__OneChannel from './Channels__OneChannel.js';

/**
 * Группа - это канал с типом group, для работы с группой используется
 * тот же ChannelsController, что и для каналов. 
 * Отличие - при формировании списка групп в контакт-центре используем getAllGroups
 */

export default class Groups extends React.Component {
		
	constructor( props ) {
        super( props );
    }

	state = {
        channels: [],
        isLoading: true,
	}

    _subs( action ) {
        AppState.myChannels[action]( "Channels_getlist_complete", this.updateChannelsList );
        AppState.myChannels[action]( "Channels_update", this.updateChannelsList );
    }

    _getData() {
        if(AppState.myChannels.isReady) {
            this.setState({ channels: AppState.myChannels.getAllGroups(), isLoading: false });
        }
    }
	
	componentWillMount =()=> {}

    componentDidMount =()=> {
        this._subs( 'on' );
        this._getData();

        // AppState.myChannels.on('Channels_getlist_complete', this.updateChannels);
        // AppState.myChannels.getGroupsList();
        // Events.on(Events.EV_MSG_CHANNEL_INVITE, this.gotInviteChannel);
    }

	componentWillUnmount =()=> {
        this._subs( 'rem' );

		// AppState.myChannels.rem('Channels_getlist_complete', this.updateChannels);
		// Events.rem(Events.EV_MSG_CHANNEL_INVITE, this.gotInviteChannel);
	}

    componentWillReceiveProps =(nextProps)=> {
        this._subs( 'rem' );
        this._subs( 'on' );
        this._getData();
    }

	updateChannelsList =(channels)=> {
		this.setState({ channels: AppState.myChannels.getAllGroups(), isLoading: false });
	}

    render =()=> {

        if( this.state.isLoading ) {
            return (
                <div>
                    <div className="not_found">Загрузка...</div>
                </div>
            )
        }

        if( !(this.state.channels || []).length ) {
            return (
                <div>
                    <div className="not_found">Список групп пуст</div>
                </div>
            )
        }

        // поиск по группам
        let groupsList = this.state.channels;
        let searchString = this.props.searchString.trim().toLowerCase();
        if( searchString.length ){
            groupsList = groupsList.filter( group => {
                return group.title.toLowerCase().match( searchString );
            });
        }

        let style = { height: this.props.height+"px" };
        let groups = [];

        groupsList.forEach( (channel, i) => {
                            if( this.props.filter == "my" && channel.flags != 2 ) return;
                            groups.push(
                                <Channels__OneChannel key={i}
                                                      id={channel.id} 
                                                      title={channel.title} 
                                                      users={channel.users} 
                                                      unreaded={channel.unreaded}
                                                      flags={channel.flags} />
                            )
                        });

        if( !groups.length ) {
            groups.push(
                    <div className="not_found" key={1}>Не найдено.</div>
                );
        }

        return (
            <div>
                {groups}
            </div>
        )
    }
    
}




// return (
//             <div className="channels" style={style}>
//                 {groups}
//             </div>
//         )



// export class GroupsAll extends React.Component {

//     constructor( props ) {
//         super( props );
//     };

//     static propTypes = {
//         channels: React.PropTypes.array.isRequired,
//     };

//     static defaultProps = {
//         channels: []
//     };

//     render = ()=> {

//         if(!this.props.channels.length){
//             return (
//                 <div className="channels">
//                     <div className="not_found">Список каналов пуст</div>
//                 </div>
//             )
//         } 

//         var ChannelsAll =   this.props.channels.map((channel, i) => {
//                                 return (
//                                     <div key={i} className="channels__channel" data-channel_id={channel.id}>
//                                         <div className="channels__channel-info">
//                                             <a href={"/#/dashboard/channel/" + channel.id}>{channel.title}</a>
//                                             <p>Участников: {channel.users}</p>
//                                         </div>
//                                         <div className="channels__channel-unreader">
//                                             {channel.unreaded == 0 ? null : channel.unreaded}  
//                                         </div>       
//                                     </div>  
//                                 )
//                             });

//         return (
//             <div className="channels">
//                 {ChannelsAll}
//             </div>
//         )
//     };
    
// }

// export {GroupsAll}



// export class GroupsMy extends React.Component {

//     constructor( props ) {
//         super( props );
//     }

//     static propTypes = {
//         channels: React.PropTypes.array.isRequired,
//     }

//     static defaultProps = {
//         channels: []
//     }

//     state = {
//         isOpenModalChannelCreate: false
//     }

//     openModalChannelCreate = ()=>{
//         this.setState({ isOpenModalChannelCreate: true });
//     }
//     closeModalChannelCreate = ()=>{
//         this.setState({ isOpenModalChannelCreate: false });
//     }

//     onChangeHandler = (obj)=>{
//         this.setState(obj);
//     };

//     createChannel = ()=>{
//         AppState.myChannels.createChannel(this.state.channelName);
//         this.closeModalChannelCreate();
//     };

//     render = ()=> {
//         let ChannelsMy =    this.props.channels.map((channel, i)=>{
//                                 if(channel.flags != 2) return;

//                                 return (
//                                      <div key={i} className="channels__channel" data-channel_id={channel.id}>
//                                         <div className="channels__channel-info">
//                                             <a href={"/#/dashboard/channel/" + channel.id}>{channel.title}</a>
//                                             <p>Участников: {channel.users}</p>
//                                         </div>
//                                         <div className="channels__channel-unreader">
//                                             {channel.unreaded == 0 ? null : channel.unreaded}  
//                                         </div>       
//                                     </div>  
//                                 )
//                             });

//         return (
//             <div className="channels">
                
//                 {ChannelsMy}
//                 <TransparentButton onClick={this.openModalChannelCreate} onClose={this.closeModalChannelCreate} caption="Создать канал"/>

//                 <ModalWindow title="Новый канал" isOpen={this.state.isOpenModalChannelCreate} onClose={this.closeModalChannelCreate}>
//                     <FlexBox direction="row" alignItems="center">
//                         <label className="label label-width-md">Название канала</label>
//                         <InputSimple name="channelName" placeholder="" onChange={this.onChangeHandler} />
//                     </FlexBox>
//                     <div className="box-row-nw just-end marg-t">
//                         <TransparentButton onClick={this.createChannel} caption="Создать"/>
//                         <TransparentButton onClick={this.closeModalChannelCreate} caption="Отменить"/>
//                     </div>
//                 </ModalWindow>     
//             </div>
//         )
//     };
    
// }

// export {GroupsMy}