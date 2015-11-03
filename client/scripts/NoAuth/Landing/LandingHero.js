var React = require('react/addons');

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

export class LandingHero extends React.Component {

    constructor(props) {
        super(props);
    }

    render = ()=>{
        return(
            <div className="page-full-screen">
                <div className="hero">
                    <div className="hero__container">
                        <h2 className="hero__title">Профессиональное <br/>решение для логистики</h2>
                        <div className="hero__description">
                            Мы объединяем грузовладельцев, их экспедиторов и перевозчиков в едином пространстве для общения и работы с заказами на перевозку грузов
                        </div>
                        <div className="hero__controls">
                            <ButtonSimple caption="Получить приглашение" brand="primary" onClick={this.props.openModal}/>
                        </div>
                        <div className="hero__images">
                            <img src="http://cargo.chat/static/landing/hero_img.png" className="hero__screen"/>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }

}
                            