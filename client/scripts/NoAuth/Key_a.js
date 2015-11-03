var React = require('react/addons');
var Router = require('react-router');
import {Api} from '../api';


var Key_a = React.createClass({

    getInitialState(){
        return {
            message: ''
        }
    },

    send(){
        var key = this.props.query.key;
        console.log(key);
        var email = this.refs.email.getDOMNode().value;
        var emailRepeat = this.refs.emailRepeat.getDOMNode().value;
        if (email === emailRepeat) {
            Api.newEmailRequest(key, email).then(res=> {
                console.log(res);
                if (res.err) {
                    this.setState({message: res.msg})
                } else {
                    window.location.hash = 'sentletter'
                }
            })

        } else {
            this.setState({message: "пароли не совпадают"})
        }

    },

    render(){
        return (

            <div className="box-row-nw  just-center main-text heading">
                <div >
                    <div className="panel panel-default">
                        <h3 className="main-text">введите новый емейл</h3>
                        <input ref="email"/>
                        <input ref="emailRepeat"/>
                        <button onClick={this.send}>Сменить</button>
                    </div>
                </div>
            </div>

        )
    }
});

export {Key_a}