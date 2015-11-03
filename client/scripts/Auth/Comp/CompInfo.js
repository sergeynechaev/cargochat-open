var React = require('react/addons');
import {TableForm} from '../../SimpleComponents/TableForm';
import {SmallPanel} from '../../SimpleComponents/SmallPanel';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';


export class CompInfo extends React.Component {
    
    render = ()=> {
        //logger.log(this, 'render');
        //console.debug(this.props);
        
        if (!this.props.company) return (<div>CompInfo: this.props.company is null</div>);
        
        // этот компонент используется для вывода данных и на странице /dashboard/comp/register,
        // и на /dashboard/company/register-info, поэтому показываем данные из разных источников
        var comp = (this.props.company.id == AppState.myCompany.state.id) ? AppState.myCompany.state : this.props.company;
        
        var compTags = (comp.tags)
            ? AppState.myCompany.getTagNames(comp.tags)
            : [];
        var Tags = (compTags.length > 0) ? compTags.map(tag=> {
            return (
                <p className="divider card-disab p-list pagin-pr label-active font600label-active font600">
                    {tag}
                </p>
            )
        }) : null;
        //console.log("TAGS");
        //console.log(compTags);
        var mainInfo = {};
        let dd = Utils.deep(comp, 'dadata.data', null) || {};
        let ddm = 
        mainInfo.type = dd.type;
        mainInfo.name = comp.name;
        mainInfo.addr = comp.addr;
        mainInfo.inn = comp.inn;
        mainInfo.kpp = comp.kpp;
        mainInfo.ogrn = comp.ogrn;
        mainInfo.post = (dd.type === "LEGAL" && dd.management) ? dd.management.post : null;
        mainInfo.headName = (dd.type === "LEGAL" && dd.management) ? dd.management.name : null;
        mainInfo.full = (dd.type === "LEGAL" && dd.name) ? dd.name.full_with_opf : null;
        if (dd.state) {
            var regDate = new Date(dd.state.registration_date);
            mainInfo.regDate = regDate.getDate() + "." + regDate.getMonth() + "." + regDate.getFullYear();
            var actDate = new Date(dd.state.actuality_date);
            mainInfo.actDate = actDate.getDate() + "." + actDate.getMonth() + "." + actDate.getFullYear();
            mainInfo.status = dd.state.status;
        }
        mainInfo.taxation = (comp.taxation) ? AppState.myCompany.getCompanyTaxation(comp.taxation) : 'не указана';
        
        var bodyForMain = [
            {fieldName: "Полное наименование",     value: mainInfo.full},
            {fieldName: "ИНН",                     value: mainInfo.inn},
            {fieldName: "КПП",                     value: mainInfo.kpp},
            {fieldName: "ОГРН",                    value: mainInfo.ogrn},
            {fieldName: mainInfo.post,             value: mainInfo.headName},
            {fieldName: "Дата регистрации",        value: mainInfo.regDate},
            {fieldName: "Статус",                  value: mainInfo.status},
            {fieldName: "Система налогообложения", value: mainInfo.taxation},
            {fieldName: "Сведения актуальны на",   value: mainInfo.actDate}
        ];
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    <TableForm body={bodyForMain} />
                </div>
            </div>
        )
        
    }

}