// 
// 
// backup
// 
// 

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


export default class Channels extends React.Component {
	
	constructor( props ) {
        super( props );
    };

	state = {
        channels: [],
        isLoading: true,
		// tabs: ['Мои каналы', 'Все каналы'],
		// channels: AppState.myChannels.getAllChannels(),
		// active: 0,
		// content: null,
	};

    //
    // 
    //   TODO: когда появятся каналы, нужно будет это тоже переделать
    // 
    // 
    // 
	
	componentWillMount =()=>{
        // AppState.myChannels.on('Channels_getlist_complete', this.updateChannels);

    }

    componentDidMount =()=>{
        // AppState.myChannels.on('Channels_getlist_complete', this.updateChannels);

        
        // AppState.myChannels.getChannelsList();
    }

    componentWillUnmount =()=>{
        // AppState.myChannels.rem('Channels_getlist_complete', this.updateChannels);
    }

    // componentWillReceiveProps =(props)=> {
    // }

	// gotInviteChannel = (event)=>{        
	// 	AppState.myChannels.msgChannelInvite(event);
	// };

	updateChannels = (channels)=>{
		this.setState({ channels: channels, isLoading: false });
		// this.toggleTab(this.state.active);
	}

    render = ()=> {

        let style = { height: this.props.height+"px" };

        // if( this.state.isLoading ) {
        //     return (
        //         <div className="channels">
        //             <div className="not_found">Загрузка...</div>
        //         </div>
        //     )
        // }
        
        // пока каналы не готовы, показываем пустой список
        if( true || !this.state.channels.length){
            return (
                <div className="channels" style={style}>
                    <div className="not_found">Список каналов пуст</div>
                </div>
            )
        }

        var channels =   this.state.channels.map((channel, i) => {
                                return (
                                    <div key={i} className="channels__channel" data-channel_id={channel.id}>
                                        <div className="channels__channel-info">
                                            <a href={"/#/dashboard/channel/" + channel.id}>{channel.title}</a>
                                            <p>Участников: {channel.users}</p>
                                        </div>
                                        <div className="channels__channel-unreader">
                                            {channel.unreaded == 0 ? null : channel.unreaded}  
                                        </div>       
                                    </div>  
                                )
                            });

        return (
            <div className="channels" style={style}>
                {channels}
            </div>
        )

    };
    
}




// export class ChannelsAll extends React.Component {

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

//         let style = { height: this.props.height+"px" };

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
//             <div className="channels" style={style}>
//                 {ChannelsAll}
//             </div>
//         )
//     };
    
// }

// export {ChannelsAll}



export class ChannelsMy extends React.Component {

    constructor( props ) {
        super( props );
    }

    static propTypes = {
        channels: React.PropTypes.array.isRequired,
    }

    static defaultProps = {
        channels: []
    }

    state = {
        isOpenModalChannelCreate: false
    }

    openModalChannelCreate = ()=>{
        this.setState({ isOpenModalChannelCreate: true });
    }
    closeModalChannelCreate = ()=>{
        this.setState({ isOpenModalChannelCreate: false });
    }

    onChangeHandler = (obj)=>{
        this.setState(obj);
    };

    createChannel = ()=>{
        AppState.myChannels.createChannel(this.state.channelName);
        this.closeModalChannelCreate();
    };

    render = ()=> {
        let ChannelsMy =    this.props.channels.map((channel, i)=>{
                                if(channel.flags != 2) return;

                                return (
                                     <div key={i} className="channels__channel" data-channel_id={channel.id}>
                                        <div className="channels__channel-info">
                                            <a href={"/#/dashboard/channel/" + channel.id}>{channel.title}</a>
                                            <p>Участников: {channel.users}</p>
                                        </div>
                                        <div className="channels__channel-unreader">
                                            {channel.unreaded == 0 ? null : channel.unreaded}  
                                        </div>       
                                    </div>  
                                )
                            });

        return (
            <div className="channels">
                
                {ChannelsMy}
                <TransparentButton onClick={this.openModalChannelCreate} onClose={this.closeModalChannelCreate} caption="Создать канал"/>

                <ModalWindow title="Новый канал" isOpen={this.state.isOpenModalChannelCreate} onClose={this.closeModalChannelCreate}>
                    <FlexBox direction="row" alignItems="center">
                        <label className="label label-width-md">Название канала</label>
                        <InputSimple name="channelName" placeholder="" onChange={this.onChangeHandler} />
                    </FlexBox>
                    <div className="box-row-nw just-end marg-t">
                        <TransparentButton onClick={this.createChannel} caption="Создать"/>
                        <TransparentButton onClick={this.closeModalChannelCreate} caption="Отменить"/>
                    </div>
                </ModalWindow>     
            </div>
        )
    };
    
}

export {ChannelsMy}




    // state = {
    //     tabs: ['Мои каналы', 'Все каналы'],
    //     channels: AppState.myChannels.getChannels(),
    //     active: 0,
    //     content: null
    // };

// let tabs =   this.state.tabs.map((tab, i) => {
                    //  return <button key={i} onClick={this.toggleTab.bind(this, i)} className={this.state.active === i ? 'active' : ''}>{tab}</button>
                 //     }.bind(this));
                    // // {this.state.content}


    // componentDidMount = ()=>{
    //  this.toggleTab();
    // };

    // toggleTab = (tab=0, ignore=false) =>{
    //  switch(tab){
    //      case 0:
    //          this.setState({ active: 0, content: <ChannelsMy channels={this.state.channels}/> });
    //      break;
    //      case 1:
    //          this.setState({ active: 1, content: <ChannelsAll channels={this.state.channels}/> });
    //      break;
    //  }
    // };