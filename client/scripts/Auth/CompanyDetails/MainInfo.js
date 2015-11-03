var React = require('react/addons');
import {AppState} from '../../Auth/Dashboard';
import {Icon} from '../../SimpleComponents/Icons';

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
                <p className="p-list">
                    Адрес: {this.props.value}
                </p>
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
        return (
            <div className="padd-top-card">
            </div>
        )
    }
}

class CompanyTags extends React.Component {
    render = ()=> {
        //console.log("COMP TAGS");
        //console.log(this.props.value);
        if (!this.props.value) return null;
        var compTags = AppState.myCompany.getTagNames(this.props.value);
        //console.log(compTags);
        var Tags = (compTags.length > 0) ? compTags.map((tag, key)=> {
            return (
                <p key={key} className="divider card-disab p-list pagin-pr label-active font600label-active font600">
                    {tag}
                </p>
            )
        }) : null;
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
            <div className="box-row-nw list-box main-info">
                <div className="box-cln-nw panel-md align-center logo-box">
                    <Icon iconName="company-icon" size={100} className="icon-logo-box"/>
                </div>
                <div className="box-cln-nw panel-md">
                    <div className="box-row-nw just-btw">
                        <h3 className="list-h3 divider">{this.props.company.name}</h3>
                    </div>
                    <div className="box-row-nw card-sub">
                        <CompanyTags value={this.props.company.tags || this.props.company.comp_tags}/>
                    </div>
                    <div className="card-sub">
                        <p className="divider card-disab p-list">ИНН: {this.props.company.inn}</p>
                    </div>
                    <div className="box-row-nw divider">
                        <AddressInfo value={this.props.company.addr}/>
                    </div>
                    <div className="box-row-nw divider">
                        <WorkHoursInfo value={this.props.company.work_hours}/>
                    </div>
                </div>
                <div>
                    <div className="box-cln-nw panel-md">
                        <div className="box-cln-nw">
                            <PhoneInfo value={this.props.company.phone}/>
                            <WebInfo value={this.props.company.web_site}/>
                            <MailInfo value={this.props.company.email}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export {MainInfo}

// <AtiCodeInfo value={this.props.company.ati_code}/>   // deprecated