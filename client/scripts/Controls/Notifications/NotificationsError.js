var React = require('react/addons');

import {logger} from '../../Classes/Logger';

export default class NotificationsError extends React.Component{

    closeWindow =()=> {
        if( this.props.close ) this.props.close();
    }

    render =()=> {
        return(
            <div className="notify-error" onClick={this.closeWindow}>
                <div className="notify__title">Ошибка</div>
                <div className="notify__text">{this.props.error.message}</div>
            </div>
        )
    }
}
