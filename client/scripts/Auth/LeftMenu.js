var React = require('react/addons');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
import {Icon} from '../SimpleComponents/Icons'
import {ThemeController} from '../../styles/ThemeController'
import {Utils} from '../utils';
// import MessagesCenter from './MessagesCentre';  // переделано на контакт-центр
import {Api} from '../api';
import {Store, Actions, Events, NewStore} from '../Dispatcher';
import {AppState} from '../Auth/Dashboard';


var MenuItem = React.createClass({
    getInitialState(){
        return {
            activeInsideItem: ""
        }
    },
    componentDidMount(){
        Events.on(Events.EV_ROUTE_CHANGED, this.routeChengedHr);
        this.routeChengedHr()
    },
    componentWillUnmount() {
        Events.rem(Events.EV_ROUTE_CHANGED, this.routeChengedHr);
    },
    changeActive(e){
        //console.log('changeActive ' + e)
        this.setState({activeInsideItem: e});
    },
    routeChengedHr () {
        //console.log('[MenuItem] routeChengedHr ' + window.location.hash)
        var h = window.location.hash;
        var deep = this.props.deep;
        //console.log("DEEP = "+deep + ' h=' +h)
        var m = h.match(/(?:\/)([^\/]+)/g);
        //console.debug(m)
        if (m && m.length == 3) {
            //console.debug(m[2].substr(1))
            this.changeActive(m[2].substr(1))
        } else {
            this.changeActive('')
        }
    },

    render(){
        //console.log("ACTIVE ITEM");
        //console.log(this.state.activeInsideItem);
        //console.log("КОМПОНЕНТ" + this.props.name);
        //console.debug(this.props);
        var classNm = 'box-row-nw align-center menu-item';
        var iconClassNm = 'menu-icon marg-r';
        if (this.props.active) {
            classNm += " active";
            iconClassNm += " active-icon"
        }
        var itemIcon = (this.props.iconName) ? <Icon className={iconClassNm} iconName={this.props.iconName} size={18}/> : null;
        if (this.props.subItems) {
            //console.log("ЕСТЬ САБ");
            var subItems = this.props.subItems.map(item=> {
                //console.log(' ? ' + this.state.activeInsideItem + ' ? ' + item.inn + ' ' + (this.state.activeInsideItem===item.inn));
                if (item.disabled) {
                    return null
                } else {
                    return (<MenuItem
                        key={item.name}
                        href={item.href}
                        name={item.name}
                        label={item.label}
                        iconName={item.iconName}
                        subItems={item.subItems}
                        active={(this.state.activeInsideItem === item.name)}
                        deep={this.props.deep + 1}
                        />)
                }
            });
            //console.log('    classNm=' + classNm)

            return (
                <div key={this.props.name}>
                    <a key={this.props.name} href={this.props.href} data-name={this.props.name} onClick={this.onClick}>
                        <div className={classNm}>
                            {itemIcon}
                            <h4 style={{pointerEvents: "none"}}>{this.props.label}</h4>
                        </div>
                    </a>
                    {subItems}
                </div>
            )
        } else {
            return (
                <a key={this.props.name} href={this.props.href} data-name={this.props.name} onClick={this.onClick}>
                    <div className={classNm}>
                        {itemIcon}
                        <h4 style={{pointerEvents: "none"}}>{this.props.label}</h4>
                    </div>
                </a>
            )
        }
    }
});


var LeftMenu = React.createClass({
    propTypes: {},

    getDefaultProps: function () {
        return {
            variables: ThemeController.LeftMenu.LeftMenu
        };
    },

    mixins: [State],
    getInitialState(){
        return {
            activeItem: "dashboard",
            hide      : false
        }
    },
    changeActive(e){
        this.setState({activeItem: e});
    },
    componentDidMount(){
        var r = this.getRoutes();
        var item = (!r || r.length === 2) ? "dashboard" : r[2].name;
        this.changeActive(item);
        Events.on(Events.EV_ROUTE_CHANGED, this.routeChengedHr);
        //Events.on(Events.EV_PROFILE_UPDATE, this.updateStateWrapper);
    },
    updateStateWrapper(newState) {
        this.setState(newState)
    },
    routeChengedHr () {
        //console.log('[LeftMenu] routeChengedHr ' + window.location.hash)
        var h = window.location.hash;
        if (h === '#/dashboard') {
            this.changeActive('dashboard');
        } else {
            var m = h.match(/\#\/dashboard\/([^\/]+)/);
            if (m && m.length == 2) {
                this.changeActive(m[1]);
            }
        }
    },
    componentWillUnmount() {
        Events.rem(Events.EV_ROUTE_CHANGED, this.routeChengedHr);
        //Events.rem(Events.EV_PROFILE_UPDATE, this.updateStateWrapper);
    },
    render () {
        var styles = {
            wrap    : {
                height  : "100%",
                width   : "220px",
                position: "fixed",
                top     : "60px",
                zIndex  : "100"
            },
            leftMenu: {
                WebkitBorderRadius: this.props.variables.borderRadius,
                borderRadius      : this.props.variables.borderRadius,
                WebkitBoxShadow   : this.props.variables.boxShadow,
                boxShadow         : this.props.variables.boxShadow,
                marginBottom      : "10px",
                backgroundColor   : this.props.variables.backgroundColor,
                padding           : 0
                //cursor            : "pointer"
            }
        };


        //console.log("REFRESH");
        // var Menu = this.props.items.map(item=> {
        //     if (item.disabled) {
        //         return null
        //     } else {
        //         return (
        //             <MenuItem
        //                 key={item.name}
        //                 href={item.href}
        //                 name={item.name}
        //                 label={item.label}
        //                 iconName={item.iconName}
        //                 active={(this.state.activeItem===item.name)}
        //                 subItems={item.subItems}
        //                 deep={1}
        //                 />
        //         )
        //     }
        // });

        return (
            <div style={styles.wrap}>
                <div style={styles.leftMenu}>
                    <ChatPanel/>
                </div>
            </div>
        );

        // return (
        //     <div style={styles.wrap}>
        //         <div style={styles.leftMenu}>
        //             {Menu}
        //             <ChatPanel/>
        //         </div>
        //     </div>
        // );
    }
});

export {LeftMenu};


// переделано на контакт-центр
// class ChatPanel extends React.Component {
//     render=()=>{
//         return(<div className="chat-panel">
//                 <MessagesCenter/>
//             </div>
//         )
//     }
// }