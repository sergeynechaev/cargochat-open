var React = require('react/addons');

var InputCheckBox = React.createClass({
    getInitialState(){
        return {
            isChecked: false
        }
    },
    onChange(){
        this.setState({isChecked: !this.state.isChecked});
        var f = (this.state.isChecked) ? this.props.onUnChecked : this.props.onChecked;
        //var f = this.state.isChecked ? this.props.onUnChecked : this.props.onChecked;
        //var f = this.props.isChecked ? this.props.onUnChecked : this.props.onChecked;
        f(this.props.value); //передаем значение value
    },
    render(){
        //console.log("CheckBox Props:");
        //console.log(this.props.value);
        //console.log('InputCheckBox.render isChecked=' + this.state.isChecked);
        //console.log('InputCheckBox.render isChecked=' + this.props.isChecked);
        return (
            //<input type="checkbox" key={this.props.value} hidden={!this.props.selectable} checked={this.state.isChecked} className="check-box" onChange={this.onChange}/>
            <input
                type="checkbox"
                key={this.props.value}
                hidden={!this.props.selectable}
                checked={this.props.isChecked}
                className="check-box"
                onChange={this.onChange}
                />
        )
    }
});
export {InputCheckBox}