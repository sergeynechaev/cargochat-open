import React from 'react/addons';

import {Api} from './api';
import {Events} from './Dispatcher';
import {logger} from './Classes/Logger';
import {FlexBox} from './SimpleComponents/FlexBox';


var App = React.createClass({

    getInitialState () {
        return {
            serial: 1000,
            notes : [],
            systemIsDown: false,
            shutdownCounter: 0
        }
    },

    componentDidMount () {
        Events.on(Events.EV_SHOW_NOTIFY, this.noteHr);
        Events.on(Events.EV_SYSTEM_DOWN, this.systemDown);
        this.counter = 0;
        this.startTimeoutId = null;
        this.systemIsDown = false;
        this.websocketIsDown = false;
        this.resetStartCounter();
    },

    componentWillUnmount () {
        Events.rem(Events.EV_SHOW_NOTIFY, this.noteHr);
        Events.rem(Events.EV_SYSTEM_DOWN, this.systemDown);
    },

    systemDown( e ) {
        if( ! this.systemIsDown ) {
            logger.log('SYSTEM IS DOWN');
            this.systemIsDown = true;
            this.setState({systemIsDown: this.systemIsDown, triesCounter: 0});
            this.startTimeoutId = setTimeout( this.startCounter, 1000 );
        }
    },

    startCounter() {
        this.setState({startCounter: --this.counterToPing});
        clearTimeout(this.startTimeoutId);
        if( this.counterToPing == 0 ) {
            this.pingSystem();
        } else {
            this.startTimeoutId = setTimeout( this.startCounter, 1000 );
        }
    },

    // сколько секунж ждем до новой попытки соединения с сервером
    resetStartCounter() {
        this.counterToPing = 10;
    },

    pingSystem() {
        this.counter++;
        Api.ping().then( res => {
            //if( this.counter > 5 ) {
            if( res !== undefined && res.pong !== undefined ) {
                this.systemIsDown = false;
                this.counter = 0;
                this.resetStartCounter();
                this.startTimeoutId = null;
                this.setState({systemIsDown: this.systemIsDown, triesCounter: this.counter, startCounter: this.counterToPing});
            } else {
                logger.log('ping again');
                this.setState({triesCounter: this.counter});
                this.resetStartCounter();
                this.startCounter();
            }
        })
    },

    noteHr (msg) {
        var n = this.state.notes.concat();
        n.push({id: this.state.serial++, msg: msg});
        this.setState({notes: n})
    },

    closeNotify(id){
        logger.log('closeNotify id=' + id);
        var n = this.state.notes.concat();
        n = n.filter(function (o) {
            return o.id != id
        });
        this.setState({notes: n})
    },

    onClick(e){
        if (e.target.dataset && e.target.dataset.select) {
            // ?
        } else {
            Events.run(Events.EV_CLICK_ANYWHERE, e)
        }
    },

    onMouseUp (e) {
        //console.log('[index] onMouseUp')
        Events.run(Events.EV_GLOBAL_MOUSE_UP, e)
    },

    render () {

        // всплывающие и автоматом исчезающие уведомления
        var notes = this.state.notes.map(
            (obj, key) => {
                return <Notifications key={key} obj={obj} close={this.closeNotify}/>
            }
        );

        if( this.state.systemIsDown || this.state.websocketIsDown ) {
            return (
                <FlexBox direction="column" justify="center" alignItems="center" className="systemIsDown__Container">
                <h1 className="box-row-nw just-center main-text heading">Cargo.chat</h1>
                    <div className="systemIsDown__Message">
                        { this.state.websocketIsDown ? <div className="marg-b">Потеряно соединение с веб-сокетом.</div>
                                                     : <div className="marg-b">Потеряно соединение с сервером.</div> }
                        <FlexBox direction="row" alignItems="center">
                        <div className="padd-right">{this.state.startCounter ? "Следующая попытка через" : "Попытка подключения..."}: </div>
                        <div className="box-row-nw just-center align-center accent-block">
                            <span className="font12 font600 accent-pad">{this.state.startCounter? this.state.startCounter : ''}</span>
                        </div>
                        </FlexBox>
                        <FlexBox direction="row" alignItems="center">
                        <div className="systemIsDown__Message_Tries">Неуспешных попыток: <span className="systemIsDown__Message_Tries_Counter">{this.state.triesCounter}</span></div>
                        </FlexBox>
                    </div>
                </FlexBox>
            )
        } else {
            return (
                <div className="page" onClick={this.onClick}>
                    <div className="note">
                        {notes}
                    </div>
                    <RouteHandler/>
                </div>
            )
        }
    }
});
