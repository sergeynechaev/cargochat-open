var React = require('react/addons');

import {Api} from '../api';
import {Utils} from '../utils';
import {logger} from '../Classes/Logger';
import {AppState} from '../Auth/Dashboard';

import {Icon} from '../Controls/Icon';

import NotificationCenter from '../Controls/Notifications/NotificationCenter';
import HeaderProfileMini from './Header__Profile-mini';

export default class Header extends React.Component {

	constructor(props) {
        super(props);
    }

	static propTypes = {
		links: React.PropTypes.array.isRequired,
		user: React.PropTypes.object.isRequired
	}

	static defaultProps = {
		links: [],
		user: {}
	}

	componentWillReceiveProps = ()=>{
		this.forceUpdate();
	}

	logoutRequest = ()=>{
		Api.logoutRequest(Utils.cookieGet('sid')).then(res=>{
			if(res.err){
				logger.log('error', 'Error output [logoutRequest]', res.msg );
				return;
			}
			
			AppState.user.onLogout();
			window.location.hash = "/login";
		});
	}

	settingsLink = ()=>{
		window.location.hash = "/dashboard/profile/settings";
	}

	render = ()=>{
		let hash = location.hash.split('/')[2],
			links = this.props.links.map((link, i)=>{
				let active = hash == link.hash ? 'active' : null;

				return(
					<li className="header-menu__item" data-state={active} key={i}>
						<a href={link.href} name={link.name}>{link.name}</a>
					</li>
				)
			});

		// <ul className="profile-mini">
		// 	<li>
		// 		<div className="profile-mini__item profile-mini__item-photo">
		// 			<div className="profile-mini__photo">
						
		// 			</div>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<div className="profile-mini__item" onClick={this.logoutRequest}>
		// 			<Icon name="exit" className="profile-mini__icon"/>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<div className="profile-mini__item" onClick={this.settingsLink}>
		// 			<Icon name="settings" className="profile-mini__icon"/>
		// 		</div>
		// 	</li>
		// 	<li>
		// 		<div className="profile-mini__item">
		// 			<NotificationCenter/>
		// 		</div>
		// 	</li>
		// </ul>

		return(
			<div className="page-main__header header">
				<div className="header__logo">
					<a href="#/dashboard"><img src="http://cargo.chat/static/logotype.png" alt="logotype"/></a>
				</div>
				<div className="header__container">
					<div className="row row-between row-no-padding">
						<div className="col">
							<ul className="header-menu">
								{links}
							</ul>
						</div>
						<div className="col">
							<ul className="header-menu header-menu--mini-profile">
								<li className="header-menu__item-photo">
									<HeaderProfileMini user={this.props.user}/>
								</li>
								<li className="header-menu__item">
									<a><Icon name="exit" onClick={this.logoutRequest} size={24}/></a>
								</li>
								<li className="header-menu__item">
									<a href="#/dashboard/profile"><Icon name="settings" size={24}/></a>
								</li>
								<li className="header-menu__item">
									<NotificationCenter/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// <div className="profile-mini__dropdown profile-drop">
// 	<div className="profile-drop__name">
// 		{this.props.user.first_name+' '+this.props.user.last_name}
// 	</div>
// 	<div className="profile-drop__info">

// 	</div>
// </div>
// <div className="header-profile">
// 	<div className="header-profile__photo">
// 		<img src="" alt=""/>
// 	</div>
// 	<div className="header-profile__actions">
// 		<a href="#/dashboard/profile">Profile</a>
// 	</div>
// </div>