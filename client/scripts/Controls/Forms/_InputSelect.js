// 
// 
// 
// buggy version
// 
// 
// 





var React = require('react/addons');

class InputSelect extends React.Component {

    static propTypes = {
        onChange:   React.PropTypes.func.isRequired,
        values:    React.PropTypes.array.isRequired,
        name:       React.PropTypes.string,
        placeholder:React.PropTypes.string,
        autoFocus:  React.PropTypes.bool,
        className:  React.PropTypes.string
    }

    static defaultProps = {
        active: true
    }

    state = {
        defaultValue: this.props.value
    }

    change = (e)=> {
        let v = e.target.value,
            obj;

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
        let options = this.props.values.map((option, i)=>{
            return <option key={i} value={option.id} selected={option.__selected__ ? 'selected' : null}>{option.value}</option>
        });

        return (
            <select className={this.props.className ? "select-form-control " + this.props.className : "select-form-control"}
                    name={this.props.name} 
                    id={this.props.name} 
                    onChange={this.change}>
                {options}
            </select>
        )
    }


}

export {InputSelect}