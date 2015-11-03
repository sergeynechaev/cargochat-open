var React = require('react/addons');
var BigPanel = React.createClass({
    render(){
        if (this.props.disabled) {
            return null
        } else {
            return (
                <div className="marg-lr panel panel-default">
                    <div className="panel-heading panel-md">
                        <h3 className="font-title">{this.props.headerName}</h3>
                    </div>
                    {this.props.children}
                </div>
            )
        }
    }
});
export {BigPanel}

//col-big