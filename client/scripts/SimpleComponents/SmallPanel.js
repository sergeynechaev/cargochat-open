var React = require('react/addons');
import {ThemeController} from '../../styles/ThemeController';
import {Utils} from '../utils';


class SmallPanel extends React.Component {


    static propTypes = {
        headerName: React.PropTypes.string,
        disabled  : React.PropTypes.bool,
        styles    : React.PropTypes.object
    };
    static defaultProps = {
        styleVariables: ThemeController.SmallPanel.SmallPanel,
        disabled      : false

    };
    render = ()=> {
        //console.log('[SmallPanel] render');
        var styles = {
            smallPanel          : {
                WebkitBorderRadius: this.props.styleVariables.borderRadius,
                borderRadius   :    this.props.styleVariables.borderRadius,
                WebkitBoxShadow:    this.props.styleVariables.boxShadow,
                boxShadow      :    this.props.styleVariables.boxShadow,
                marginBottom   :    "10px",
                backgroundColor:    this.props.styleVariables.backgroundColor,
                color          :    this.props.styleVariables.color
            },
            smallPanelHeader    : {
                backgroundColor:    this.props.styleVariables.header.backgroundColor,
                color          :    this.props.styleVariables.header.color,
                padding        :    "16px 24px 16px 24px",
                borderBottom   :    this.props.styleVariables.header.borderBottom
            },
            smallPanelHeaderText: {
                fontSize  :         "20px",
                fontWeight:         "400"
            }
        };

        if (this.props.styles) styles = Utils.merge(styles, this.props.styles);


        var Header = ()=> {
            if (this.props.headerClass) {
                return (<this.props.headerClass/>)
            } else if (this.props.headerName) {
                return (<div style={styles.smallPanelHeader}>
                    <h3 style={styles.smallPanelHeaderText}>{this.props.headerName}</h3>
                </div>);
            } else return null


        };
        if (this.props.disabled) {
            return null
        } else {
            return (
                <div style={styles.smallPanel}>
                    {Header()}
                    {this.props.children}
                </div>
            )
        }
    }
}

export {SmallPanel}