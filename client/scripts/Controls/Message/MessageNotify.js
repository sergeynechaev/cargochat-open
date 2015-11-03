var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Emoji} from '../Emoji';
import {Icon} from '../../SimpleComponents/Icons';

export default class MessageNotify extends React.Component {

    constructor() {
        super();

        // активный элемент - канал или чат
        this.activeContext = null;
    }

    static propTypes = {
        data: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        data: {}
    }

    _setContext( context ) {
        this.activeContext = context;
    }

    componentWillMount =()=> {
        this._setContext( this.props.context );
    }

    componentWillReceiveProps =(nextProps)=> {
    }

    state={
    }

    render = ()=>{

        return (
            <div className="channel-history__message">
                <div className="">
                    <div className="channel-message__info">
                        {this.props.data.body}
                    </div>
                </div>
            </div>
        )
    }
};

