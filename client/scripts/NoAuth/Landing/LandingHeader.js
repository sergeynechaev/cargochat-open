var React = require('react/addons');

import {Icon} from '../../Controls/Icon';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

export class LandingHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        scrollTop: null
    }

    componentWillReceiveProps = (nextProps)=>{
        this.setState(nextProps);
    }

    onOpenLoginPage = ()=>{
        window.location = "#/login"
    }

    render = ()=>{
        let headerClassName = this.state.scrollTop > 100 ? 'header header--small' : 'header';

        return(
            <header className={headerClassName}>
                <div className="header__container">
                    <a href="#/landing" className="header__logo"></a> 
                    <div className="header__controls">
                        <ButtonSimple className="header__btn" brand="success" caption="Войти" onClick={this.onOpenLoginPage}/>
                        <ButtonSimple className="header__btn header__btn--icon" brand="primary" iconName="mail" iconFill="#fff" iconViewBox="2 2 22 25" iconSize={21} onClick={this.props.openModal}/>
                    </div>
                </div>
            </header>
        )
    }
}