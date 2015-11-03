var React = require('react/addons');
import {Icon} from '../SimpleComponents/Icons';


var SmallPanelTest = React.createClass({
    getInitialState(){
        return {
            open: true
        }
    },
    trigger(){
        this.setState({
            open: (this.state.open) ? false : true
        })
    },
    render(){

        var icon = (this.state.open) ? "expand-less" : "expand-more";
        var cl = (this.props.className) ? this.props.className : "" + " box-row-nw";

        if (this.props.disabled) {
            return null
        } else {
            return (
                <div className={cl}>
                    <div className="panel panel-default col-default">
                        <div className="panel-heading panel-md box-row-nw just-btw">
                            <h3 className="font-title">{this.props.headerName}</h3>
                            <span onClick={this.trigger}><Icon iconName={icon}/></span>
                        </div>

                        {(this.state.open) ? this.props.children : null}
                    </div>
                </div>
            )
        }
    }
});
export {SmallPanelTest}