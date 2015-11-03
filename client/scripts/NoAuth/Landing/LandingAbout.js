var React = require('react/addons');

import {Icon} from '../../Controls/Icon';

export class LandingAbout extends React.Component {

    constructor(props) {
        super(props);
    }

    render = ()=>{
        return(
            <div className="about">
                <div className="container">
                    <div className="row row-center">
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="about__item">
                                <Icon className="about__icon" name="shield" size={46}/>
                                <p className="about__description">
                                    Работа с проверенными партнерами
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="about__item">
                                <Icon className="about__icon" name="clock" size={46}/>
                                <p className="about__description">
                                    Экономия времени на поиск транспорта и оформление сделок
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="about__item">
                                <Icon className="about__icon" name="network" size={46}/>
                                <p className="about__description">
                                    Автоматизация процесса организации перевозки
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="about__item">
                                <Icon className="about__icon" name="message" size={46}/>
                                <p className="about__description">
                                    Профессиональная среда общения
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div className="about__item">
                                <Icon className="about__icon" name="my-location" size={46}/>
                                <p className="about__description">
                                    Контроль за автотранспортом
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}