var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';

import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';

import Contacts__User from '../ContactCenter/Contacts__User.js';

export default class ChannelInfo extends React.Component {

    constructor() {
        super();

        // активный элемент - канал или чат
        this.activeContext = null;
    }

    state = {
        members: []
    }

    _setContext( context ) {
        this.activeContext = context;
        this.setState({ members: this.activeContext.getMembers()});
    }

    componentWillReceiveProps = (nextProps)=>{
        // this.activeContext.rem('Channel_members_update', this.updateMembers);
        
        this._setContext( nextProps.context );

        this.setState({ members: this.activeContext.getMembers()});
        this.activeContext.on('Channel_members_update', this.updateMembers);
    }

    componentWillMount = ()=>{

        this._setContext( this.props.context );

        this.activeContext.on('Channel_members_update', this.updateMembers);
        AppState.myWatch.on( "Watch_status_change", this.onWatchStatusChange );
        // Events.on(Events.EV_MSG_CHANNEL_USER_LEAVE, this.msgChannelUserLeave);
    }

    componentWillUnmount = ()=>{
        if(this.activeContext){
            this.activeContext.rem('Channel_members_update', this.updateMembers);
        }
        AppState.myWatch.rem( "Watch_status_change", this.onWatchStatusChange );
        // Events.rem(Events.EV_MSG_CHANNEL_USER_LEAVE, this.msgChannelUserLeave);
    }

    // msgChannelUserLeave = (event)=>{
    //     this.activeContext.msgChannelUserLeave(event);
    // }
    
    onWatchStatusChange =(data)=> {
        this.forceUpdate();
    }

    updateMembers = (members)=>{
        this.setState({ members: members });
    }

    render = ()=>{
        var Flags = this.activeContext.flags;
        var Actions = null;
        var Members = [];
        var MembersAdmin = [];
        var MembersAwait = [];

        if(this.state.members){
            
            this.state.members.forEach((member, i)=>{

                let userView =  <div key={i} className="contacts__contact">
                                    <Contacts__User user={member} />
                                </div>

                // приглашенных видит только админ канала
                if(Flags == 2 && member.flags == 1) MembersAwait.push(userView)
                    else if(member.flags == 2) MembersAdmin.push(userView)
                    else if(member.flags != 1 && member.flags != 2) Members.push(userView)

            });

        }

        return(
            <div className="channel-info">
                <div className="channel-info__content">
                    <ChannelInfoSection title="Участники" iconName="person-outline" iconFill="#e91e63">
                        <div className="channel-members">
                            <div className="channel-members__title">Администратор</div>
                            {MembersAdmin}
                            {Members.length ? <div className="channel-members__title">Участники</div> : null }
                            {Members}
                            {MembersAwait.length ? <div className="channel-members__title">Выслано приглашение</div> : null }
                            {MembersAwait}
                        </div>
                    </ChannelInfoSection>
                </div>    
            </div>
        )
    }

}


class ChannelInfoSection extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        iconName: React.PropTypes.string,
        iconFill: React.PropTypes.string,
    }

    static defaultProps = {
        iconName: 'star-icon',
    }

    state = { }

    render = ()=>{
        var content = null;
        return(
            <div className="channel-info-section">
                <div className="channel-info-section__header">
                    <Icon className="icon" iconName={this.props.iconName} size={20} fill={this.props.iconFill}/>
                    <h3>{this.props.title}</h3>
                </div>
                <div className="channel-info-section__content">
                    {this.props.children} 
                </div>
            </div>
        )
    }
}




        // switch(Flags){

        //     case 0:
        //         Actions = (
        //             <ul className="channel-actions">
        //                 <ChannelInfo__Actions_Leave/>    
        //             </ul>
        //         );
        //     break;

        //     case 2:
        //         Actions = (
        //             <ul className="channel-actions">
        //                 <ChannelInfo__Actions_Invite members={this.state.members}/>  
        //                 <ChannelInfo__Actions_Delete/>
        //             </ul>
        //         );
        //     break;
        // }

