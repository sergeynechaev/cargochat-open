var React = require('react/addons');
import {ThemeController, Style} from '../../styles/ThemeController'


class ButtonActive extends React.Component {

    static propTypes = {
        onClick : React.PropTypes.func.isRequired,
        buttonId: React.PropTypes.any,
        caption : React.PropTypes.string,
        hidden  : React.PropTypes.bool
    };
    static defaultProps = {
        themeController: ThemeController,
        caption        : "Button",
        hidden         : false
    };
    onClick = ()=> {
        if (!this.props.onClick) return;
        this.props.onClick(this.props.buttonId)
    };

    render() {

        var styles = {
            buttonActive     : {
                WebkitBoxShadow   : "none",
                boxShadow         : "none",
                backgroundColor   : this.props.themeController.ButtonActive.ButtonActive.backgroundColor,
                WebkitBorderRadius: "1px",
                borderRadius      : "1px",
                fontSize          : "14px",
                height            : "36px",
                lineHeight        : "36px",
                width             : "auto",
                color             : this.props.themeController.ButtonActive.ButtonActive.color,
                cursor            : "pointer",
                border            : "none",
                marginTop         : "8px",
                marginBottom      : "8px",
                textTransform     : "uppercase",
                paddingLeft       : "16px",
                paddingRight      : "16px",
                fontWeight        : "bold",
                outline           : "none"
            },
            buttonActiveHover: {
                WebkitBoxShadow: "none",
                boxShadow      : "none",
                backgroundColor: this.props.themeController.ButtonActive.ButtonActive.hover.backgroundColor
            },
            buttonActiveFocus: {
                mozAppearance: "none",
                border       : "none"
            }
        };
        return (
            <button
                style={styles.buttonActive}
                onClick={this.onClick}
                >
                {this.props.caption}
            </button>
        )
    }
}

export {ButtonActive}