var React = require('react/addons');

import {logger} from '../../Classes/Logger';

export default class NotificationsInfo extends React.Component{

    closeWindow =()=> {
        if( this.props.close ) this.props.close();
    }

    render =()=> {
        return(
            <div className="notify-info" onClick={this.closeWindow}>
                <div className="notify__title">Успешно</div>
                <div className="notify__text">{this.props.info.message}</div>
            </div>
        )
    }
}
