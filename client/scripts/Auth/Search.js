var React = require('react/addons'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

import {Api, xreq} from '../api';
import {logger} from '../Classes/Logger';
import {AppState} from '../Auth/Dashboard';

import {InputSimple} from '../Controls/Forms/InputSimple';
import {ButtonSimple} from '../Controls/Forms/ButtonSimple';

class Search extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        req: this.props.query.search,
        data: [],
        search: false
    }

    onChangeHandler = (obj)=>{
        this.setState({ req: obj.req });
    }

    onKeyUp = (e)=> {
        if (e.key === "Enter") {
            this.submitSearchRequest();
        }
        if (e.key === "Escape") {
            this.clearSearch();
        }
    }

    componentDidMount = ()=>{
        this.submitSearchRequest();
    }

    submitSearchRequest = (req=this.state.req)=>{
        if(!req) return;

        window.location.hash = `/dashboard/links?search=${encodeURI(req)}`;

        Api.compSuggest({ query: req, count: 12 }).then(res=> {
            if(res.err){
                logger.log(this, 'links search [onSendRequest]', res.err, 'error');        
                return;
            }
        
            this.setState({ data: res.suggestions, search: true });
        });
    }

    clearSearch = ()=>{
        window.location.hash = '/dashboard/links';
        this.setState({ req: '' , data: [] });
    }

    render = ()=>{
        let results;

        if(this.state.data.length){
            results =   this.state.data.map((comp, i)=>{
                            return <div className="col-xs-4"><CompanyCard data={comp} key={i}/></div>
                        });
        } else {
            results =   <div className="col-xs-12">По вашему запросу ничего не найдено.</div>
        }

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="links-search">
                            <InputSimple name="req" value={this.state.req} className="links-search__input" placeholder="Укажите название, ИНН или ФИО руководителя и нажмите Enter" onChange={this.onChangeHandler} onKeyUp={this.onKeyUp} autoFocus={true}/>
                        </div>
                    </div>
                </div>
                {this.state.search ?
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Результаты поиска</h2>
                            </div>
                        </div>
                        <div className="row">
                            {results}
                        </div>
                    </div>
                : null}
            </div>
        )
    }
    
} 

class CompanyCard extends React.Component {

    constructor(props){
        super(props);
    }
    
    static propTypes = {
        data: React.PropTypes.object.isRequired
    }

    onClick = ()=>{
        let comp = this.props.data;

        if(comp.id){
            window.open(`#/dashboard/comp/${this.props.data.id}`, '_blank');
            return;
        }

        let data = {inn: comp.dadata.data.inn, addr: comp.dadata.data.address.value}
        if(comp.dadata.data.kpp) data['kpp'] = comp.dadata.data.kpp;

        new xreq('comp_check', data, (comp)=>{
            window.open(`#/dashboard/comp/${comp.res.id}`, '_blank');
        });
    }

    render = ()=>{
        let comp = this.props.data, card = null;

        if(comp.id){
            let tags = AppState.myCompany.getTagNames(comp.tags);

            card =  <div className="company-card" onClick={this.onClick}>
                        <div className="company-card__name">{comp.name}</div>
                        <div className="company-card__addr">{comp.addr}</div>
                        <div className="company-card__tags">
                            {tags.length ? tags.map((tag, i)=>{
                                return <span className="label label-primary" key={i}>{tag}</span>
                            }) : null}
                        </div>
                        <div className="company-card__inn">ИНН: {comp.inn}</div>
                    </div>;
        } else {
            card =  <div className="company-card" onClick={this.onClick}>
                        <div className="company-card__name">{comp.dadata.value}</div>
                        <div className="company-card__addr">{comp.dadata.data.address.value}</div>
                        <div className="company-card__tags"></div>
                        <div className="company-card__inn">ИНН: {comp.dadata.data.inn}</div>
                    </div>;
        }

        return card;
    }
}

export {Search}