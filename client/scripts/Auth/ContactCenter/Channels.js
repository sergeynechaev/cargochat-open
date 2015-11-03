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

export default class Channels extends React.Component {
        
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
            this.setState({ channels: AppState.myChannels.getAllChannels(), isLoading: false });
        }
    }
    
    componentWillMount =()=> {}

    componentDidMount =()=> {
        this._subs( 'on' );
        this._getData();
    }

    componentWillUnmount =()=> {
        this._subs( 'rem' );
    }

    componentWillReceiveProps =(nextProps)=> {
        this._subs( 'rem' );
        this._subs( 'on' );
        this._getData();
    }

    updateChannelsList =(channels)=> {
        this.setState({ channels: AppState.myChannels.getAllChannels(), isLoading: false });
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
                    <div className="not_found">Список каналов пуст</div>
                </div>
            )
        }

        // поиск
        let channelsList = this.state.channels;
        let searchString = this.props.searchString.trim().toLowerCase();
        if( searchString.length ){
            channelsList = channelsList.filter( channel => {
                return channel.title.toLowerCase().match( searchString );
            });
        }

        let style = { height: this.props.height+"px" };
        let channels = [];

        channelsList.forEach( (channel, i) => {
                            //
                            // TODO: возможно, нужно будет еще делать фильтр по comp_id
                            //  
                            if( this.props.filter == "my" && channel.flags != 2 ) return;
                            channels.push(
                                <Channels__OneChannel key={i}
                                                      id={channel.id} 
                                                      title={channel.title} 
                                                      users={channel.users} 
                                                      unreaded={channel.unreaded}
                                                      comp_id={channel.comp_id}
                                                      comp_name={channel.comp_name}
                                                      orders={channel.orders}
                                                      flags={channel.flags} />
                            )
                        });

        if( !channels.length ) {
            channels.push(
                    <div className="not_found" key={1}>Не найдено.</div>
                );
        }

        return (
            <div>
                {channels}
            </div>
        )
    }
    
}


// return (
//             <div className="channels" style={style}>
//                 {channels}
//             </div>
//         )
