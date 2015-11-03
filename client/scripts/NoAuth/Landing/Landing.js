var React = require('react/addons');
var Router = require('react-router');

import {Api} from '../../api';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {Icon} from '../../Controls/Icon';
import {ModalWindow} from '../../Controls/ModalWindow';

import {LandingHeader} from './LandingHeader.js';
import {LandingHero} from './LandingHero';
import {LandingForWhom} from './LandingForWhom';
import {LandingAbout} from './LandingAbout';
import {LandingHowItWorks} from './LandingHowItWorks';

import {LandingGetInviteForm} from './LandingGetInviteForm';

export class Landing extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        isModalOpen: false,
        isMenuOpen: false,
        scrollTop: null
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    componentDidMount = ()=>{
        window.addEventListener('scroll', this.scroll);
    }

    componentWillUnmount = ()=>{
        window.removeEventListener('scroll', this.scroll);
    }

    scroll = (event)=>{
        this.setState({ scrollTop: window.pageYOffset || document.documentElement.scrollTop });
    }
    
    render = ()=>{
        return(
            <div className="landing-page">
                <ModalWindow isOpen={this.state.isModalOpen} width={500} onClose={this.closeModal} title="Получить приглашение">
                    <LandingGetInviteForm onClose={this.closeModal}/>
                </ModalWindow>
                <LandingHeader scrollTop={this.state.scrollTop} openModal={this.openModal}/>
                <LandingHero scrollTop={this.state.scrollTop} openModal={this.openModal}/>
                <LandingForWhom/>
                <LandingAbout/>
                <LandingHowItWorks/>
                <div className="page-block info">
                    <h2 className="page-block__title info__title">Наш сервис помогает расширить<br/> партнерскую сеть и увеличить потенциал Вашей компании</h2>
                    <div className="page-block__controls">
                        <ButtonSimple caption="Получить приглашение" brand="primary" onClick={this.openModal}/>
                    </div>
                </div> 
                <footer className="footer">
                    <div className="container">
                        <div className="row row-between middle-xs">
                            <div className="col-xs-12">
                                © «Cargo.chat» 2015 
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}