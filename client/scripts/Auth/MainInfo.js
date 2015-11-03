var React = require('react/addons');
import {Store, Events, Actions, Dictionary} from '../Dispatcher';
import {BigPanel} from '../SimpleComponents/BigPanel';
import {TableForm} from '../SimpleComponents/TableForm';
import {Map2} from './Map2';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Api} from '../api';
import {AppState} from '../Auth/Dashboard';
import {Icon} from '../SimpleComponents/Icons';
import {AboutTextForm} from './CompanyDetails/AboutTextForm';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {ModalWindow} from '../SimpleComponents/ModalWindow';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {InputSelect2, Tag} from '../SimpleComponents/InputSelect2.js';


class MailInfo extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return (
            <div className="box-row-nw  divider">
                <p className="padd-icon">
                    <Icon iconName="mail-icon" size={18} className="icon-color"/>
                </p>
                <p className="p-list">
                    {this.props.value}
                </p>
            </div>
        )
    }
}

class WebInfo extends React.Component {

    render = ()=> {
        if (!this.props.value) return null;
        return (
            <div className="box-row-nw  divider">
                <p className="padd-icon">
                    <Icon iconName="web-icon" size={18} className="icon-color"/>
                </p>
                <p className="p-list">
                    {this.props.value}
                </p>
            </div>
        )
    }
}

class PhoneInfo extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return (
            <div className="box-row-nw  divider">
                <p className="padd-icon">
                    <Icon iconName="phone-icon" size={18} className="icon-color"/>
                </p>
                <p className="p-list">
                    {this.props.value}
                </p>
            </div>
        )
    }
}

class WorkHoursInfo extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return (
            <div className="box-row-nw  divider">
                <p className="padd-icon">
                    <Icon iconName="clock-icon" size={18} className="icon-color"/>
                </p>
                <p className="p-list">
                    {this.props.value}
                </p>
            </div>
        )
    }
}


class AddressInfo extends React.Component {
    render = ()=> {
        if (!this.props.value) return null;
        return (
            <div className="box-row-nw  divider">
                <p className="p-list">Адрес: {this.props.value}</p>
            </div>
        )
    }
}

// deprecated
// 
// class AtiCodeInfo extends React.Component {
//     render = ()=> {
//         if (!this.props.value) return null;
//         return (
//             <div className="box-row-nw  divider">
//                 <p className="p-list">
//                     <p className="text-card">АТИ:&nbsp;</p>
//                     {this.props.value}
//                 </p>
//             </div>
//         )
//     }
// }

class Divider extends React.Component {
    render = ()=> {
        if (this.props.hidden) return null;
        return <div className="padd-top-card" />;
    }
}

class CompanyTags extends React.Component {
    render = ()=> {
        //console.log("COMP TAGS");
        //console.log(this.props.value);
        if (!this.props.value) return null;
        var compTags = AppState.myCompany.getTagNames(this.props.value);
        if (compTags.length < 1) return null;
        var Tags = compTags.map((tag, key)=> {
            return <p key={key} className="divider card-disab p-list pagin-pr label-active font600label-active font600">{tag}</p>;
        });
        return (
            <div>
                {Tags}
            </div>

        );
    }
}

class MainInfo extends React.Component {
    render = ()=> {
        if (!this.props.company) return null;
        //console.log("Main Info");
        //console.log(this.props.company);
        return (
            <div className="box-cln-nw panel-md">
                <div className="box-row-nw just-btw">
                    <h3 className="list-h3 divider">{this.props.company.name}</h3>
                </div>
                <div className="box-row-nw card-sub">
                    <CompanyTags value={this.props.company.tags}/>
                </div>
                <div className="card-sub">
                    <p className="divider card-disab p-list">ИНН: {this.props.company.inn}</p>
                </div>
                <div className="box-row-nw divider">
                    <AddressInfo value={this.props.company.addr}/>
                </div>
                <div>
                    <div className="box-cln-nw">
                        <Divider
                            hidden={(!this.props.company.work_hours || !this.props.company.phone || !this.props.company.web_site || !this.props.company.email)}/>
                        <WorkHoursInfo value={this.props.company.work_hours}/>
                        <PhoneInfo value={this.props.company.phone}/>
                        <WebInfo value={this.props.company.web_site}/>
                        <MailInfo value={this.props.company.email}/>
                    </div>
                </div>
            </div>
        )
    }
}
export {MainInfo}

// <AtiCodeInfo value={this.props.company.ati_code}/>       // deprecated
// 
// <Divider hidden={(!this.props.company.ati_code)}/>