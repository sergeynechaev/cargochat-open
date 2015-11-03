var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';

import {Map2} from '../../Map2';
import {CompanyLogo} from '../CompanyLogo/CompanyLogo';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';

import CompanyInfo__Actions_Edit from './CompanyInfo__Actions_Edit';

class CompanyInfo extends React.Component {

    constructor( props ) {
        super( props );
    }

    state = {
        perm: Utils.checkFlags(AppState.user.state.comp_flags, 32)
    }

    render=()=>{
        let comp = this.props.company;

        return (
            <div className="company-info">
                <div className="company-info__map">
                    <Map2 ref='yandexMap' className="border" style={{width: "100%", height:'250px'}} baloon={{address:comp.addr, name:comp.name}} zoom={16}/>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="company-mini-card">
                            <CompanyLogo/>
                            <div className="company-mini-card__info">
                                <h2>{comp.name}</h2>
                                <p>{comp.addr}</p>
                                <p>ИНН: {comp.inn}</p>
                            </div>
                        </div>
                        <div className="company-info__contact">
                            <div className="company-info-contacts">
                                <CompanyInfo__Phone value={comp.phone}/>
                                <CompanyInfo__Web value={comp.web_site}/>
                                <CompanyInfo__Mail value={comp.email}/>
                                <CompanyInfo__Hours value={comp.work_hours}/>
                                

                                {this.state.perm ? <CompanyInfo__Actions_Edit data={this.props.company}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-8">
                        <div className="company-info__about">
                            <h3>О компании</h3>
                            <div className="company-info-about">
                                {comp.info}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )     
    }
}

// <CompanyInfo__AtiCode value={comp.ati_code}/>    // deprecated

class CompanyInfo__Phone extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return <div className="company-info-contacts__item">Телефон: {this.props.value}</div>
    }
}

class CompanyInfo__Web extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return <div className="company-info-contacts__item">Сайт компании: <a href={`http://${this.props.value}`} target="_blank">{`www.${this.props.value}`}</a></div>
    }
}

class CompanyInfo__Hours extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return <div className="company-info-contacts__item">Время работы: {this.props.value}</div>
    }
}

// deprecated
// 
// class CompanyInfo__AtiCode extends React.Component {
//     render = ()=> {
//         if (!this.props.value) return null;
//         return <div className="company-info-contacts__item">АТИ: {this.props.value}</div>
//     }
// }

class CompanyInfo__Mail extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return <div className="company-info-contacts__item">E-mail: <a href={`mailto:${this.props.value}`}>{this.props.value}</a></div>
    }
}

export {CompanyInfo}