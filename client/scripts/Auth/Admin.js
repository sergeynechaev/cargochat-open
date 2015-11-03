"use strict";
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Loading} from '../SimpleComponents/Loading';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls
} from '../SimpleComponents/SimpleTable2';
import {Api} from '../api';








export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "users"
        }
    }

;
    static propTypes = {};

    static defaultProps = {};

    selectActiveItem(itemName) {
        switch (itemName) {
            case "companies":
                window.location.hash = "dashboard/admin/companies";
                break;
            case "tenders":
                window.location.hash = "dashboard/admin/a_tenders";
                break;
            case "invites":
                window.location.hash = "dashboard/admin/a_invites";
                break;
            case "connections":
                window.location.hash = "dashboard/admin/a_connections";
                break;
            default:
                window.location.hash = "dashboard/admin/users";


        }
        this.setState({
            selectedItem: itemName
        })

    }

    render() {

        return (
            <FlexBox direction="column">
                <FlexBox>
                    <TransparentButton caption="Users" onClick={this.selectActiveItem.bind(this)} buttonId="users"/>
                    <TransparentButton caption="Companies" onClick={this.selectActiveItem.bind(this)}
                                       buttonId="companies"/>
                    <TransparentButton caption="Tenders" onClick={this.selectActiveItem.bind(this)} buttonId="tenders"/>
                    <TransparentButton caption="Invites" onClick={this.selectActiveItem.bind(this)} buttonId="invites"/>
                    <TransparentButton caption="Connections" onClick={this.selectActiveItem.bind(this)}
                                       buttonId="connections"/>
                </FlexBox>
                <RouteHandler company={this.props.company} user={this.props.user}/>
            </FlexBox>
        )
    }

;

}
