var React = require('react/addons');

import {Icon} from './Icon';

class ModalWindow extends React.Component {
    
    constructor(props){
        super(props);
    }

    static propTypes = {
        onClose:    React.PropTypes.func.isRequired,
        isOpen:     React.PropTypes.bool.isRequired,
        title:      React.PropTypes.string.isRequired,
        width:      React.PropTypes.number
    }

    static defaultProps = {
        isOpen:     false
    }

    onClose = ()=>{
        if(!this.props.onClose) return;
        this.props.onClose();
    }

    onClick = (event)=>{
        if(event.target.className == "modal-window" && this.props.onClose){
            this.props.onClose();
        }
    }

    componentWillReceiveProps = (nextProps)=> {
        this.setState(nextProps);
    }

    render = ()=>{
        let width = this.props.width ? {maxWidth: this.props.width} : null;
        return(
            <div className="modal-window" onClick={this.onClick} data-visible={this.props.isOpen}>
                <div className="modal-container" style={width}>
                    <div className="modal-container__header">
                        <h3>{this.props.title}</h3>
                        <Icon name="close" onClick={this.onClose}/>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export {ModalWindow}