var React = require('react/addons');

import {Utils} from '../utils';

class Loading extends React.Component {

    static propTypes = {
        dataReceived:   React.PropTypes.any.isRequired,
        className:      React.PropTypes.string
    }
    
    render = ()=>{
        if(this.props.dataReceived){
            return <div className={this.props.className}>{this.props.children}</div>
        } else {
            return <div className="loading"></div>
        }
    }
}

export {Loading}