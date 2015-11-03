require('../../styles/box.scss');
var React = require('react/addons');


var FlexBox = React.createClass({

    propTypes: {
        className   : React.PropTypes.string,
        direction   : React.PropTypes.oneOf(['row', 'column']),
        wrap        : React.PropTypes.bool, // true/false
        justify     : React.PropTypes.oneOf(['start', 'end', 'center', 'between', 'around']),
        alignItems  : React.PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
        alignContent: React.PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'stretch'])
    },

    getDefaultProps(){
        return {
            className   : "",
            direction   : "row",
            wrap        : false,
            justify     : "start",
            alignItems  : "stretch",
            alignContent: "stretch"
        }
    },


    render(){

        var direction = function () {
            switch (this.props.direction) {
                case "row":
                    return "row-direction";
                    break;
                case "column":
                    return "column-direction";
                    break;
            }
        }.bind(this);

        var justify = function () {
            switch (this.props.justify) {
                case "end":
                    return "justify-end";
                    break;
                case "center":
                    return "justify-center";
                    break;
                case "between":
                    return "justify-between";
                    break;
                case "around":
                    return "justify-around";
                    break;
                default :
                    return "justify-start"
            }
        }.bind(this);

        var alignItems = function () {
            switch (this.props.alignItems) {
                case "end":
                    return "align-items-end";
                    break;
                case "center":
                    return "align-items-center";
                    break;
                case "baseline":
                    return "align-items-baseline";
                    break;
                case "start":
                    return "align-items-start";
                    break;
                default :
                    return "align-items-stretch"
            }
        }.bind(this);

        var alignContent = function () {
            switch (this.props.alignContent) {
                case "end":
                    return "align-content-end";
                    break;
                case "center":
                    return "align-content-center";
                    break;
                case "between":
                    return "align-content-between";
                    break;
                case "start":
                    return "align-content-start";
                    break;
                case "around":
                    return "align-content-around";
                    break;
                default :
                    return "align-content-stretch"
            }
        }.bind(this);

        var wrap = (this.props.wrap) ? "wrap" : "no-wrap";

        var classes = this.props.className + " " + "flex-box" + " " + direction() + " " + wrap + " " + justify() + " " + alignItems() + " " + alignContent();


        return (
            <div className={classes}>
                {this.props.children}
            </div>

        )
    }
});

export {FlexBox}