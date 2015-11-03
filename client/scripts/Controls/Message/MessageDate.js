var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';

export default class MessageDate extends React.Component {

    constructor() {
        super();
    }

    componentWillMount =()=> {
    }

    componentWillReceiveProps =(nextProps)=> {
    }

    state={
    }

    render = ()=>{

        return (
            <div className="message__date">
                {this.props.date}
            </div>
        )
    }
};

// <div className="channel-history__message">
//                 <div className="">
//                     <div className="channel-message__date">
//                         {this.props.date}
//                     </div>
//                 </div>
//             </div>