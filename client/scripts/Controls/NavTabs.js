var React = require('react/addons');

class NavTabs extends React.Component {

	constructor(props) {
        super(props);
    }

	static propTypes = {
		baseHref: 	React.PropTypes.string.isRequired,
		data: 		React.PropTypes.array.isRequired,
		nHash: 		React.PropTypes.number,
		className: 	React.PropTypes.string
	}    

	static defaultProps = {
		className: 	"nav-tabs",
		nHash: 		3
	}	

	render = ()=>{
		let hash = location.hash.split('/')[this.props.nHash],
			tabs = 	this.props.data.map((tab, i)=>{
						let state = !tab.onClick ? tab.state == 'active' && !hash || hash == tab.hash ? 'active' : null : null,
							count = tab.count ? <span className={tab.countType ? 'badge badge-'+tab.countType : 'badge badge-primary'}>{tab.count}</span> : null,
							href =	tab.href ? this.props.baseHref + tab.href : this.props.baseHref;

						return(
							<li className="nav-tabs__item" data-state={state} key={i}>
								<a href={href} onClick={tab.onClick}>{tab.name} {count}</a>
							</li>
						)
					});
		return(
			<ul className={this.props.className}>
				{tabs}
			</ul>
		)
	}
}

export {NavTabs}