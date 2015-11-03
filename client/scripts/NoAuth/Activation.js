var React = require('react/addons');
var Router = require('react-router');
import {Api} from '../api';


var Activation = React.createClass({

    componentWillMount (){
        var key = this.props.query.key;
        console.log(key);
        Api.userActivationRequest(key).then(res=> {
            if (res.err === -1) {
                return
            } else {
                window.location.hash = '#'
            }
        })
    },


    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-sm-offset-3 col-xs-12 col-md-offset-4 panel panel-default">

                        <h3>Ключ недействителен</h3>

                    </div>
                </div>
            </div>
        )
    }
});

export {Activation}