var React = require('react/addons');

export class FormGroup extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        from: React.PropTypes.string
    }

    render = ()=> {
        return (
            <div className={this.props.className ? "form-group " + this.props.className : "form-group"}>
                <label htmlFor={this.props.from}>{this.props.name}</label>
                {this.props.children}
            </div> 
        )
    }


}
