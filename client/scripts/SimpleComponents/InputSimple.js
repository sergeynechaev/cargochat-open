var React = require('react/addons');
import {ThemeController, Style} from '../../styles/ThemeController';

class InputSimple extends React.Component {
    state = {
        defaultValue: this.props.value
    }

    static propTypes = {
        onChange   : React.PropTypes.func.isRequired,
        onKeyUp    : React.PropTypes.func,
        keypress    : React.PropTypes.func,
        name       : React.PropTypes.string,
        placeholder: React.PropTypes.string,
        autoFocus  : React.PropTypes.bool,
        active     : React.PropTypes.bool,
        type       : React.PropTypes.string,
        className       : React.PropTypes.string,
        value      : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    }

    static defaultProps = {
        styleVariables: ThemeController.InputSimple.InputSimple,
        active        : true
    }

    onKeyUp=(e)=>{
        var k = this.props.onKeyUp;
        if (k) k(e);
    }

    keypress =(e)=> {  
        //console.log('[InputText] keypress')

        // max length check
        if (this.props.maxLength && e.target.value.length + 1 > this.props.maxLength) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
        }

        if (!this.props.validation || !this.props.validation.typing) return
        this.props.validation.typing(e);
    }

    change = (e)=> {
        var v = e.target.value;
        var obj;
        if (this.props.name) {
            obj = {};
            obj[this.props.name] = v;
        } else {
            obj = v;
        }
        if (this.props.onChange) {
            this.props.onChange(obj);
        }

    }
    
    componentWillReceiveProps = (newProps)=> {
        //console.log("new props");
        this.setState({defaultValue: newProps.value})
    }

    render = ()=> {
        //console.log("RENDER INPUT");
        //console.log(this.props);
        return (
            <input className={this.props.className ? "input-simple " + this.props.className : "input-simple"}
                   type={this.props.type}
                   autoFocus={this.props.autoFocus}
                   disabled={!this.props.active}
                   placeholder={this.props.placeholder}
                   onChange={this.change}
                   onKeyUp={this.onKeyUp}
                   onKeyPress={this.keypress}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}
                   ref='inp'
                />
        );
    }


}

export {InputSimple}