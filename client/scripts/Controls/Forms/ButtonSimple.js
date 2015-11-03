var React = require('react/addons');

import {Icon} from '../Icon';

export class ButtonSimple extends React.Component {

	static propTypes = {
		brand:  	React.PropTypes.oneOf(['success', 'warning', 'danger', 'primary']),
		type:  		React.PropTypes.oneOf(['button', 'submit']),
		caption: 	React.PropTypes.string.isRequired,
		onClick: 	React.PropTypes.func.isRequired,
		disabled: 	React.PropTypes.oneOfType(React.PropTypes.bool, React.PropTypes.func),
		hidden: 	React.PropTypes.bool,
		id: 		React.PropTypes.any,
		size: 		React.PropTypes.string,
		icon: 		React.PropTypes.string,
		className:  React.PropTypes.string,
		iconName: 	React.PropTypes.string,
		viewBox: 	React.PropTypes.string,
		iconSize: 	React.PropTypes.number
	}

	static defaultProps = {
		hidden: 	false,
		disabled: 	false,
		type:       'button'
	}

	onClick = ()=>{
		if (this.props.onClick) this.props.onClick(this.props.id);
	}

	render = ()=>{
		if (this.props.hidden) return null;
		let className = 'btn';
			
		if(this.props.brand) className += ` btn-${this.props.brand}`;
		if(this.props.size) className += ` btn-${this.props.size}`;
		if(this.props.className) className += ` ${this.props.className}`;
		if(this.props.iconName) className += ` btn-icon`;

		let icon = this.props.iconName ? <Icon name={this.props.iconName} size={this.props.iconSize} viewBox={this.props.iconViewBox} fill={this.props.iconFill}/> : null;

		return(
			<button type={this.props.button} 
					className={className}
					onClick={this.onClick}
					disabled={this.props.disabled ? true : false}
					id={this.props.id}>
				{icon}{this.props.caption}
			</button>
		)
	}
}
