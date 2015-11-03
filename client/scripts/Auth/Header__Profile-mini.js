var React = require('react/addons');

import {Api} from '../api';
import {logger} from '../Classes/Logger';
import {AppState} from '../Auth/Dashboard';

import {UserEditDialog} from './User/UserEditDialog';

import {Icon} from '../Controls/Icon';
import {ButtonSimple} from '../Controls/Forms/ButtonSimple';

export default class HeaderProfileMini extends React.Component {
	
	constructor(props) {
        super(props);
    }

    static propTypes = {
		user: React.PropTypes.object.isRequired
	}

	state = {
		user: this.props.user,
		isOpen: false
	}

	componentWillReceiveProps = (nextProps)=>{
		this.setState({ user: nextProps.user });
	}

	onClick = ()=>{
		this.setState({ isOpen: !this.state.isOpen });
	}

    render = ()=>{
		if(!this.props.user) return null;

		// logger.log('profile mini', this, this.props.user)

		let user = 	this.state.user;
		let comp = 	this.state.user.comp;
		let drop = 	<div className="profile-mini__drop">
						<div className="profile-mini__drop-name">
							{`${user.first_name} ${user.last_name}`}
							{ comp && comp.name ? <p className="padd-top-s">{comp.name}</p> : null}
							{ user.position ? <p>{user.position}</p> : null}
						</div>
						<div className="profile-mini__drop-info">
							{ user.email ? <p>E-mail: {user.email}</p> : null}
							{ user.mobile ? <p>Телефон: {user.mobile}</p> : null}
							{ user.icq ? <p>ICQ: {user.icq}</p> : null}
							{ user.skype ? <p>Skype: {user.skype}</p> : null}
							{ user.birthday ? <p>Дата рождения: {user.birthday}</p> : null}
						</div>
					</div>;

    	return(
			<div className="profile-mini">
				<div className="profile-mini__photo" onClick={this.onClick}>
					
				</div>
				{this.state.isOpen ? drop : null}
			</div>
    	)
    }
}
