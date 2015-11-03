var React = require('react/addons');

class InputCheckbox extends React.Component {

    static propTypes = {
        name        : React.PropTypes.string.isRequired,
        caption     : React.PropTypes.string.isRequired,
        onChange    : React.PropTypes.func,
        checked     : React.PropTypes.bool,
    }

    state = {
        checked: false
    }

    onChange = ()=>{
        if(this.props.name){
            let arr = [];
            arr[this.props.name] = this.state.checked;
            this.props.onChange(arr);
        }

        this.setState({checked: !this.state.checked});
    }

    render = ()=> {
        return (
            <div className="checkbox-form-control">
                <label>
                    <input type="checkbox" 
                           name={this.props.name} 
                           className={this.props.className ? "checkbox " + this.props.className : "checkbox"}
                           hidden={this.props.hidden}
                           onChange={this.onChange}
                           checked={this.props.checked}
                        />
                    {this.props.caption}
                </label>
            </div>
        )
    }


}

export {InputCheckbox}