var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons.js';

export default class Contacts__User extends React.Component {

	static propTypes = {
        user: React.PropTypes.object,
    }

    state = {
        isShowActions: false,
    }

    onMouseLeave =(e)=> {
        this.setState({isShowActions: false});
    }

    onMouseEnter =(e)=> {
        this.setState({isShowActions: true});
    }

    onModalOpen =(e)=> {
        if( this.props.onModalOpen ) this.props.onModalOpen(this.props.user.first_name, this.props.user.last_name, this.props.user.user_id);
    }

    goto =()=> {
        AppState.myChats.openChat(this.props.user.user_id);
    }

    render = ()=>{

        let userCredits = this.props.user.user_id == AppState.user.state.id ? "Вы" : this.props.user.first_name+' '+this.props.user.last_name;

        // logger.log('render Contacts__User', this, this.props);

        return(
            <div key={this.props.key} className="contact-center__elem" 
                                      data-channel_id={this.props.user.user_id} 
                                      onMouseEnter={this.onMouseEnter} 
                                      onMouseLeave={this.onMouseLeave}>
                <div className="contact-center__elem-left">
                    <div className="contact-center__user-credits pointer" onClick={this.goto}>{userCredits}</div>
                    <div className="contact-center__user-company">{this.props.user.comp_name}</div>
                </div>
                <div className="contact-center__elem-right">
                    { this.props.showActions && this.state.isShowActions ?
                            <div className="contact-center__user-action pointer" onClick={this.onModalOpen}>
                                <Icon iconName="close-circle-icon" size={18} fill="#f96868" />
                            </div>
                    : <div className="contact-center__user-status" data-state={AppState.myWatch.userStatus(this.props.user.user_id)}></div> }
                    
                </div>
            </div>
        )
    }
}

// <div className="contact-center__user-credits">{userCredits}</div>


// 
// // return(
//             <div className="contacts__contact-layout">
//                 <div className="contacts__status">
//                     <div data-state={AppState.myWatch.userStatus(this.props.user.user_id)} />
//                 </div>
//                 <div className="contacts__contact-user">
//                     <div className="contacts__user-credits">
//                         {userCredits}
//                     </div>
//                     <div className="contacts__contact-user-company">{this.props.user.comp_name}</div>
//                 </div>
//             </div>
//         )