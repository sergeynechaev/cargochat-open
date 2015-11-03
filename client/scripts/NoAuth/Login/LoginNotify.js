var React = require('react/addons');

class LoginNotify extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        type: 'info'
    }

    render = ()=>{
        let className = `login-box__${this.props.type}-msg`;

        return(
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}

class LoginNotifySms extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        cooldown: this.props.cooldown
    }

    tick = ()=>{
        this.setState({ cooldown: this.state.cooldown - 1 });
        if( this.state.cooldown <= 0 ) clearInterval(this.interval);
    }

    componentDidMount = ()=>{
        // this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount = ()=>{
        // clearInterval(this.interval);
    }

    render = ()=>{
        // if(!this.props.cooldown) return null;

        let phone = this.props.phone ? <p>На номер {this.props.phone}, было выслано SMS с кодом.</p> : <p>На Ваш телефонный номер, указанный при регистрации, было выслано SMS с кодом.</p>,
            cooldown = this.props.cooldown && this.state.cooldown > 0 ?  <p>Перезапросить можно через {this.state.cooldown} сек.</p> : null,
            ttl = this.props.ttl ? <p>Код, полученный в SMS, действителен в течение {this.props.ttl/60} мин.</p> : null;
        
        return <div className="login-box__info-msg">{phone}{ttl}</div>
    }
}

export {LoginNotifySms, LoginNotify}