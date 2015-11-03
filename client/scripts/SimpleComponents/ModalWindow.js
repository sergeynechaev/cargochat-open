var React = require('react/addons');

import {logger} from '../Classes/Logger';
import {Utils} from '../utils';

class ModalWindow extends React.Component {

    static defaultProps = {
        isOpen: false,
        title: "Окно",
        isShowCancel: true,
        width: 400,
        height: 200
    }

    static propTypes = {
        isOpen: React.PropTypes.bool.isRequired,
        isShowCancel: React.PropTypes.bool,
        title: React.PropTypes.string,
        onClose: React.PropTypes.func,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    }

    state = {
        isOpen: this.props.isOpen,
        title: this.props.isOpen,
        isShowCancel: this.props.isOpen
    }

    componentWillReceiveProps = (props)=> {
        this.setState( props );
    }

    // componentWillMount = ()=>{
    //     Utils.addWindowEvent( 'resize', this.onResizeWindow );
    // }

    // componentWillUnmount = ()=>{
    //     Utils.remWindowEvent( 'resize', this.onResizeWindow );
    // }

    // onResizeWindow =()=> {
    //     this.forceUpdate();
    // }

    close = (e)=> {
        if (e.target.dataset.id === "modal") {
            this.setState({isOpen: false});
            let c = this.props.onClose;
            if (c) c();
        }
    }

    // getPositionLeft = (w)=> {
    //     //let clientWidth = document.documentElement.clientWidth;
    //     return (Utils.getClientWidth() - w) / 2;
    // }

    // getPositionTop = (h)=> {
    //     // показываем чуть повыше середины
    //     return (Utils.getClientHeight() - h - 100) / 2;
    // }



    render = ()=> {

        let styles = null;

        if( this.props.width ) {
            styles = {
                window: {
                    width: this.props.width + "px",
                }
            }
        }

        // var styles = {
        //     back  : {
        //         // position: "fixed",
        //         // bottom: "0",
        //         // left: "0",
        //         // top: "0",
        //         // right: "0",
        //         // background: "rgba(0,0,0,0.5)",
        //         // filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#7F000000,endColorstr=#7F000000)",
        //         // zoom: "1",
        //         // zIndex: "1000",
        //         // height: "100%",
        //         //minHeight: window.screen.height + "px"
        //     },
        //     window: {
        //         // position: "absolute",
        //         // backgroundColor: "white",
        //         // left : this.getPositionLeft( this.props.width ) + "px",
        //         // top: this.getPositionTop( this.props.height ) + "px",
        //         width: this.props.width + "px",
        //         // borderRadius: "3px",
        //         // WebkitBoxShadow: "0 3px 20px rgba(0,0,0,0.9)",
        //         // boxShadow: "0 3px 20px rgba(0,0,0,0.9)",
        //         // zIndex: "1100",
        //         // padding: "10px",
        //     }
        // };

        if( !this.state.isOpen ) {
            return null;
        } else {
            return (
                <div className="ModalWindow__Overlay" onClick={this.close} data-id="modal">
                    <div className="ModalWindow__Window test2-animate" style={styles.window}>
                        <div className="panel-md">
                            <h3 className="list-h3 divider">{this.props.title}</h3>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        }
    } // render
} // ModalWindow

export {ModalWindow}