var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {OrdersList} from './OrdersList';

export class OrderOpen extends React.Component {
    render=()=>{
        return (<OrdersList type='opened' />);
    }
}