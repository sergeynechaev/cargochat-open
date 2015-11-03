var React = require('react/addons');

var InputCheckBox2 = React.createClass({

    getInitialState () {
        return {
            checked:this.props.checked
        }
    },

    changeHr () {
        this.setState({checked:!this.state.checked});
        let f = this.props.onChanged;
        var iName=this.props.inputName;
        var v={};
        if (iName) v[iName]=!this.state.checked;
        f ? f(v) : null
    },

    render () {
        //console.log('[InputCheckBox2] render ' + JSON.stringify(this.props))
        return (
            <input
                type="checkbox"
                hidden={this.props.hidden}
                checked={this.state.checked}
                className="check-box"
                onChange={this.changeHr}
                />
        )
    }

});
export {InputCheckBox2}