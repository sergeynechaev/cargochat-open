import React from 'react/addons';
// import reactMixin from 'react-mixin';

import {logger} from '../../Classes/Logger';


export class InputSimple extends React.Component {

    static propTypes = {
        onChange   : React.PropTypes.func,
        onKeyUp    : React.PropTypes.func,
        onFocus    : React.PropTypes.func,
        onBlur     : React.PropTypes.func,
        keypress   : React.PropTypes.func,
        name       : React.PropTypes.string,
        placeholder: React.PropTypes.string,
        autoFocus  : React.PropTypes.bool,
        disabled   : React.PropTypes.any,
        type       : React.PropTypes.string,
        className  : React.PropTypes.string,
        valueLink  : React.PropTypes.object,
        value      : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    }

    static defaultProps = {
        disabled:   false,
        type:       "text"
    }

    state = {
        defaultValue: this.props.value,
    }

    onKeyUp=(e)=>{
        if(this.props.onKeyUp) this.props.onKeyUp(e);
    }

    keypress =(e)=> {  
        // max length check
        if (this.props.maxLength && e.target.value.length + 1 > this.props.maxLength) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
        }

        if (!this.props.validation || !this.props.validation.typing) return
        this.props.validation.typing(e);
    }

    change = (e)=> {

        // т.к. реакт не умеет одновременно onChange и valueLink, дергаем 
        // LinkedState метод вручную
        if( this.props.valueLink) this.props.valueLink.requestChange(e.target.value);

        let v = e.target.value,
            obj;
        
        switch (this.props.castTo) {
            case 'number': v = Number(v); break;
        }
        
        if (this.props.name) {
            obj = {};
            obj[this.props.name] = v;
        } else {
            obj = v;
        }

        if (this.props.onChange) this.props.onChange(obj);
    }
    
    componentWillReceiveProps = (newProps)=> {
        this.setState({defaultValue: newProps.value})
    }

    render = ()=> {
        let InputSimpleClassName = "form-control";

        if(this.props.className) InputSimpleClassName += ` ${this.props.className}`;

        return (
            <input className={InputSimpleClassName}
                   type={this.props.type}
                   autoFocus={this.props.autoFocus}
                   disabled={this.props.disabled ? true : false}
                   placeholder={this.props.placeholder}
                   onChange={this.change}
                   onKeyUp={this.onKeyUp}
                   onKeyPress={this.keypress}
                   value={this.props.value}
                   defaultValue={this.props.defaultValue}
                   onFocus={this.props.onFocus} 
                   onBlur={this.props.onBlur} 
                   ref='inp'
                />
        );
    }
}

// reactMixin.onClass(InputSimple, React.addons.LinkedStateMixin);
// valueLink={this.linkState(this.props.valueLink)}