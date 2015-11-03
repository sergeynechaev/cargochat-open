var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '../../SimpleComponents/Icons';

import NotificationsError from './NotificationsError';
import NotificationsInfo from './NotificationsInfo';


class Notifications extends React.Component{

    constructor() {
        super();
        this.noteTimeout = null;
        this.noteTimer = 4000;
    }

    componentDidMount =()=> {
        this.noteTimeout = setTimeout(this.closeHr, this.noteTimer);
    }

    closeHr =()=> {
        if (this.noteTimeout) {
            clearTimeout(this.noteTimeout);
            this.noteTimeout = null;
        }
        this.props.close(this.props.obj.id)
    }

    selector =(msg)=> {
        switch (msg.type){
            case "error":
                return <NotificationsError error={msg} close={this.closeHr}/>
            case "info":
                return <NotificationsInfo info={msg} close={this.closeHr}/>
        }
    }

    render =()=> {
        return (
            <div className="notify animated fadeInUp">
                {this.selector( this.props.obj.msg )}
            </div>
        )
    }
}

export {Notifications}