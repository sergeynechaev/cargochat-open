var React = require('react/addons');

import {ThemeController} from '../../styles/ThemeController';

export default class Card extends React.Component {
    static propTypes = {
        title      : React.PropTypes.string,
        subTitle   : React.PropTypes.string,
        footer     : React.PropTypes.func,
        footerProps: React.PropTypes.any
    };
    static defaultProps = {
        styleVariables: ThemeController.Card.Card,
        title         : "",
        subTitle      : ""
    };
    state = {
        size: "400px",
        id  : 0
    };


    render = ()=> {
        var styles = {
            card        : {
                WebkitBoxFlex     : "1",
                WebkitFlex        : "1 0 auto",
                MozBoxFlex        : "1",
                flex              : "1 0 auto",
                height            : "auto",
                backgroundColor   : this.props.styleVariables.backgroundColor,
                WebkitBoxShadow   : this.props.styleVariables.boxShadow,
                boxShadow         : this.props.styleVariables.boxShadow,
                WebkitBorderRadius: "2px",
                borderRadius      : "2px",
                marginBottom      : "10px"
            },
            cardContent : {
                //display: "-webkit-box",
                //display: "-webkit-flex",
                //display: "-moz-box",
                //display: "-ms-flexbox",
                display       : "flex",
                WebkitFlexFlow: "column nowrap",
                msFlexFlow    : "column nowrap",
                flexFlow      : "column nowrap"
            },
            cardTitle   : {
                fontSize  : "24px",
                padding   : "24px 16px 0 16px",
                fontWeight: "400",
                color     : this.props.styleVariables.cardTitle.color
            },
            cardSubTitle: {
                fontSize  : "14px",
                wordWrap  : "break-word",
                height    : "auto",
                maxWidth  : "400px",
                padding   : "0 16px 16px 16px",
                fontWeight: "400",
                color     : this.props.styleVariables.subTitle.color
            }
        };

        var CardFooter = (this.props.footer)
            ? <this.props.footer footerProps={this.props.footerProps}/>
            : null;

        return (
            <div style={styles.card}>
                <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{this.props.title}</h3>

                    <div style={styles.cardSubTitle}>
                        <p>{this.props.subTitle}</p>
                    </div>
                    <div >
                        {this.props.children}
                    </div>
                </div>
                {CardFooter}
            </div>
        )
    };
}
