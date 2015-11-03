var React = require('react/addons');
import {ThemeController} from '../../styles/ThemeController';


class TransparentButton extends React.Component {

    static propTypes = {
        onClick : React.PropTypes.func,
        buttonId: React.PropTypes.any,
        caption : React.PropTypes.string,
        hidden  : React.PropTypes.bool
    };
    static defaultProps = {
        themeController: ThemeController,
        caption        : "Button",
        hidden         : false,
        className      : "",
        disabled       : false
    };

    onClick = ()=> {
        if (!this.props.onClick) return;
        this.props.onClick(this.props.buttonId)
    };

    render() {

        var styles = {
            transparentButton     : {
                WebkitBoxShadow   : "none",
                boxShadow         : "none",
                backgroundColor   : "transparent",
                WebkitBorderRadius: "1px",
                borderRadius      : "1px",
                fontSize          : "14px",
                height            : "36px",
                lineHeight        : "36px",
                width             : "auto",
                color             : (this.props.disabled) ? this.props.themeController.TransparentButton.TransparentButtonDisabled.color 
                                       : this.props.themeController.TransparentButton.TransparentButton.color ,
                cursor            : (this.props.disabled) ? "default" : "pointer",
                border            : "none",
                marginTop         : "8px",
                marginBottom      : "8px",
                textTransform     : "uppercase",
                paddingLeft       : "16px",
                paddingRight      : "16px",
                fontWeight        : "bold",
                outline           : "none"
            },
            transparentButtonHover: {
                WebkitBoxShadow: "none",
                boxShadow      : "none",
                backgroundColor: this.props.themeController.TransparentButton.TransparentButton.hover.backgroundColor
            },
            transparentButtonFocus: {
                mozAppearance: "none",
                border       : "none"
            }
        };
        if (this.props.hidden) {
            return null
        }
        return (
            <button
                disabled={this.props.disabled}
                style={styles.transparentButton}
                onClick={this.onClick}
                className={this.props.className}
                >
                {this.props.caption}
            </button>
        )
    }
}

export {TransparentButton}