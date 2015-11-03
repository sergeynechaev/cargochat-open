var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

// import Hint from '../../SimpleComponents/Hint.js';

export default class Channels__OneChannel extends React.Component {

    static propTypes = {
        key: React.PropTypes.number,
        id: React.PropTypes.number,
        title: React.PropTypes.string,
        users: React.PropTypes.number,
        unreaded: React.PropTypes.number,
        flags: React.PropTypes.number,
    }

    static defaultProps = {};

    goto =()=> {
        AppState.myChannels.openChannel(this.props.id);
    }

    render =()=> {

        return(
            <div key={this.props.key} className="contact-center__elem" data-channel_id={this.props.id}>
                <div className="contact-center__elem-left">
                    <div className="contact-center__channel-title pointer" onClick={this.goto}>{this.props.title}</div>
                    <div className="contact-center__channel-users">участников: {this.props.users}</div>
                    {
                        (this.props.orders || 0) > 0 ?
                        <div className="contact-center__channel-users">заказов: {this.props.orders}</div>
                        : null
                    }
                </div>
                <div className="contact-center__elem-right">
                    { this.props.unreaded ? <div className="contact-center__channel-unreaded">+{this.props.unreaded}</div> : null }
                    { this.props.flags == 1 ? <div className="contact-center__channel-status" tooltip="Непринятое приглашение" data-state="invite"></div> : null }
                </div>
            </div>
        )
    }
}


// <a href={"/#/dashboard/channel/" + this.props.id}>{this.props.title}</a>

// return(
//             <div key={this.props.key} className="channels__channel" data-channel_id={this.props.id}>
//                 <div className="channels__channel-left">
//                     <div className="channels__channel-status">
//                         { this.props.flags == 1 
//                                             ? <div className="channels__channel-status-icon-invite"><Hint text="Непринятое приглашение">!</Hint></div> 
//                                             : <div className="channels__channel-status-no-icon"/> }
//                     </div>
//                     <div className="channels__channel-info">
//                         <a href={"/#/dashboard/channel/" + this.props.id}>{this.props.title}</a>
//                         <p>участников: {this.props.users}</p>
//                     </div>
//                 </div>
//                 <div className="channels__channel-right">
//                     { this.props.unreaded ? <div className="channels__channel-unreader">{this.props.unreaded}</div> : null }
//                 </div>
//             </div>
//         )