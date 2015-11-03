var React = require('react/addons');

class PanelMessage extends React.Component {

	static propTypes = {
		type:  		React.PropTypes.oneOf(["success", "warning", "danger", "primary"]),
		className:  React.PropTypes.string
	}

	static defaultProps = {
		hidden: 	false
	}

	render = ()=>{
		if(this.props.hidden) return null;
		
		let className = this.props.className ? "panel-message " + this.props.className : this.props.type ? "panel-message panel-message-" + this.props.type : "panel-message";
		return(
			<div className={className}>
				{this.props.children}
			</div>
		)
	}
}

export {PanelMessage}