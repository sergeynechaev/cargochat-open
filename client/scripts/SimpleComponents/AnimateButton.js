var React = require('react/addons');
import {ThemeController} from '../../styles/ThemeController';

//class AnimateButton extends React.Component {
//    state = {};
//
//    static propTypes = {
//        onClick : React.PropTypes.func.isRequired,
//        buttonId: React.PropTypes.any,
//        caption : React.PropTypes.string,
//        hidden  : React.PropTypes.bool
//    };
//    static defaultProps = {
//        styleVariables: ThemeController.AnimateButton.AnimateButton,
//        caption       : "Button",
//        hidden        : false
//    };
//    onClick = (e)=> {
//        this.refs.span.getDOMNode().classList.remove("animate-button-animate");
//        var nat = e.nativeEvent;
//        var elWidth = this.refs.button.getDOMNode().offsetWidth;
//        var elHeight = this.refs.button.getDOMNode().offsetHeight;
//        var size = Math.max(elHeight, elWidth);
//        //console.log(elWidth + " " + elHeight);
//        var X = nat.offsetX - elWidth / 2;
//        var Y = nat.offsetY - size / 2;
//        this.refs.span.getDOMNode().classList.add("animate-button-animate");
//        this.setState({
//            style: {
//                height  : size,
//                width   : size,
//                position: "absolute",
//                left    : X + 'px',
//                top     : Y + 'px'
//            }
//        });
//        (this.props.onClick) ? this.props.onClick() : null;
//    };
//
//    render() {
//        var styles = {
//            animateButton     : {
//                boxShadow       : this.props.styleVariables.boxShadow,
//                borderRadius    : "1px",
//                fontSize        : "14px",
//                height          : "36px",
//                lineHeight      : "36px",
//                width           : "256px",
//                backgroundColor : this.props.styleVariables.backgroundColor,
//                color           : this.props.styleVariables.color,
//                cursor          : "pointer",
//                border          : "none",
//                marginTop       : "8px",
//                marginBottom    : "8px",
//                textTransform   : "uppercase",
//                paddingLeft     : "16px",
//                paddingRight    : "16px",
//                fontWeight      : "bold",
//                float           : "left",
//                position        : "relative",
//                overflow        : "hidden",
//                WebkitTransition: "all 0.2s ease",
//                MozTransition   : "all 0.2s ease",
//                OTransition     : "all 0.2s ease",
//                transition      : "all 0.2s ease"
//            },
//            animateButtonHover: {
//                backgroundColor: this.props.styleVariables.hover.backgroundColor,
//                boxShadow      : "rgba(0, 0, 0, 0.3) 0 4px 4px 0"
//            },
//            animateButtonFocus: {
//                mozAppearance: "none",
//                border       : "none"
//            },
//
//            animateButtonInk    : {
//                display        : "block",
//                position       : "absolute",
//                background     : "rgba(255, 255, 255, 0.2)",
//                borderRadius   : "100%",
//                WebkitTransform: "scale(0)",
//                MozTransform   : "scale(0)",
//                OTransform     : "scale(0)",
//                transform      : "scale(0)"
//            },
//            animateButtonAnimate: {
//                webkitAnimation: "ripple 0.65s linear",
//                mozAnimation   : "ripple 0.65s linear",
//                oAnimation     : "ripple 0.65s linear",
//                animation      : "ripple 0.65s linear"
//            }
//        };
//
//        if (!this.props.hidden) {
//
//            return (
//                <div>
//                    <button ref="button" style={styles.animateButton} onClick={this.onClick}>
//                        <span>{this.props.caption}</span>
//                        <span ref="span" className="animate-button-ink" style={styles.animateButtonInk}></span>
//                    </button>
//                </div>
//            )
//        }
//        return null
//    }
//}

//<span ref="span" className="animate-button-ink" style={(this.state.style)?this.state.style:null}></span>


var AnimateButton = React.createClass({
    getInitialState(){
      return{
          style: {}
      }
    },
    onClick(e){
        this.refs.span.getDOMNode().classList.remove("animate");
        var nat=e.nativeEvent;
        var elWidth = this.refs.button.getDOMNode().offsetWidth;
        var elHeight = this.refs.button.getDOMNode().offsetHeight;
        var size = Math.max(elHeight,elWidth);
        //console.log(elWidth + " " + elHeight);
        var X=nat.offsetX - elWidth/2;
        var Y=nat.offsetY - size/2;
        this.refs.span.getDOMNode().classList.add("animate");
        this.setState({
            style: {
                height: size,
                width: size,
                position: "absolute",
                left: X + 'px',
                top: Y + 'px'
            }
        });
        (this.props.onClick)?this.props.onClick():null;
    },
    render() {
        if (!this.props.hidden) {
            return (
                <button ref="button" className="button-span button button-submit" onClick={this.onClick}>
                    <span>{this.props.caption}</span>
                    <span ref="span" className="ink" style={(this.state.style)?this.state.style:null}></span>
                </button>
            )
        } else return null
    }
});
export{AnimateButton}