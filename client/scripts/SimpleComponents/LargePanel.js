var React = require('react/addons');
var LargePanel = React.createClass({

    render(){

        var Header = (<div className={this.props.headerClassName ||"panel-heading panel-md"}>
            <h3 className="font-title">{this.props.headerName}</h3>
        </div>);

        if (this.props.disabled) {
            return null
        }
        return (
            <div className={this.props.className ||"panel panel-default col-lg"}>
                {(this.props.headerName) ? Header : null}
                {this.props.children}
            </div>
        )
    }
});
export {LargePanel}