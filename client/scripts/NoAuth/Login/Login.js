var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

export class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render = ()=>{
        return(
            <div className="page-login">
                <RouteHandler/>
            </div>
        )
    }
}
