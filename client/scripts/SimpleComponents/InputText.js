var React = require('react/addons');

import {Api} from '../api';
import {Utils} from '../utils';

var InputText = React.createClass({
    propTypes: {
        labelWidth: React.PropTypes.number,
        value     : React.PropTypes.string
    },

    getDefaultProps(){
        return {
            labelWidth: 114
        }
    },

    componentWillUnmount() {
    },
    getInitialState(){
        return ({
            value     : this.props.value,
            labelClass: ""
        })
    },
    focus(){
        this.setState({labelClass: "label-active"})
    },
    blur(){
        this.setState({labelClass: ""})
    },

    keypress (e) {  // перехват иобработка события ввода символа
        //console.log('[InputText] keypress')

        // проверка ограничения максимальной длины
        if (this.props.maxLength && e.target.value.length + 1 > this.props.maxLength) {
            e.returnValue = false
            if (e.preventDefault) e.preventDefault()
        }

        if (!this.props.validation || !this.props.validation.typing) return
        this.props.validation.typing(e)
    },

    change (e) {  // событие изменения введенного значения
        //console.log('[InputText] change')

        var v = e.target.value;
        var obj = {};
        obj[this.props.inputName] = v;
        var r = this.props.returnValue;
        if (r) r(obj);

        if (!this.props.validation || !this.props.validation.changing) return
        this.props.validation.changing(e, this, this.changeCallback)
    },

    changeCallback (o) {
        //console.log('[InputText] changeCallback')
        console.debug(o)
        this.uniqueState = o
        this.setState({})
    },

    getError () {
        let s = this.uniqueState
        if (!s) return null
        switch (s.state) {
            case 'idle':
                return null
            case 'pending':
                return (<div className="box-row-nw align-center" style={{background: '#ff8'}}><p
                    className="error error-text">Проверка</p></div>)
            case 'error':
                return (<div className="box-row-nw align-center" style={{background: '#f88'}}><p
                    className="error error-text">{s.msg || Utils.o2j(s)}</p></div>)
            case 'unique':
                return (<div className="box-row-nw align-center" style={{background: '#8f8'}}><p
                    className="error error-text">Свободно</p></div>)
            case 'used':
                return (<div className="box-row-nw align-center" style={{background: '#f88'}}><p
                    className="error error-text">Занят</p></div>)
        }
        return null
    },

    render(){
        var labelClass = "label table-prb " + this.state.labelClass;
        var labelStyle = {
            flex: "0 0 " + this.props.labelWidth + "px"
        };
        return (
            <div className="">
                <div className="box-row-nw align-center">
                    <label style={labelStyle} className={labelClass}>
                        {this.props.caption}
                    </label>
                    <input
                        defaultValue={this.props.value}
                        type={this.props.type}
                        disabled={!this.props.active}
                        className="input-underline text-form marg-md font14"
                        onChange={this.change} value={this.props.value}
                        onFocus={this.focus}
                        onBlur={this.blur}
                        onKeyPress={this.keypress}
                        placeholder={this.props.placeholder}
                        />
                </div>
                {this.getError()}
            </div>
        )
    }
});

export {InputText}