var React = require('react/addons');

import {Api, xreq} from '../../api';
import {logger} from '../../Classes/Logger';

import {InputSimple} from './InputSimple';

class InputCompanys extends React.Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        expanded: false
    }

    onCheckCompany = (comp)=>{
        if(!comp.id){
            let data = {inn: comp.dadata.data.inn, addr: comp.dadata.data.address.value}
            if(comp.dadata.data.kpp) data['kpp'] = comp.dadata.data.kpp;

            new xreq('comp_check', data, (comp)=>{
                this.onSelectCompany(comp.res);
            });

            return;
        }

        this.onSelectCompany(comp);
    }

    onSelectCompany = (comp)=>{
        if(this.props.onChange){
            let obj = {};
            this.props.name ? obj[this.props.name] = comp.id : obj = comp.id;
            this.props.onChange(obj);
        }

        this.setState({ query: `${comp.name}, ИНН: ${comp.inn}`, expanded: false });
    }

    onChangeHandler = (obj)=>{
        this.setState({ query: obj.query, select: null });

        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if(obj.query.length < 4) return;

        this.timeout =  setTimeout(()=>{
            this.onSearchCompanys(obj.query);
        }, 1000);
    }

    onFocusHandler = ()=>{
        this.setState({ expanded: true });
    }

    onSearchCompanys = (query)=>{
        if(!query) return;

        Api.compSuggest({ query: query, count: 5 }).then(res=> {
            if(res.err){
                logger.log(this, '[onSearchCompanys]', res.err, 'error');        
                return;
            }
        
            this.setState({ data: res.suggestions, expanded: true });
        });
    }

    render = ()=>{

        let list;

        if(this.state.expanded && this.state.data && this.state.data.length > 0){
            list =  (
                <div className="address-form-control-list">
                    {
                        this.state.data.map((comp, i)=>{
                            if(comp.id){
                                return(
                                    <div className="address-form-control-list__item" key={i} onClick={this.onCheckCompany.bind(this, comp)}>
                                        <div className="company-control__comp-name">{comp.name}</div>
                                        <span className="company-control__comp-addr">{comp.addr}</span>
                                    </div>
                                )
                            } else {
                                return (
                                     <div className="address-form-control-list__item" key={i} onClick={this.onCheckCompany.bind(this, comp)}>
                                        <div className="company-control__comp-name">{comp.dadata.value}</div>
                                        <span className="company-control__comp-addr">{comp.dadata.data.address.value}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        }
        
        return(
            <div className="address-form-control">
                <InputSimple name="query" value={this.state.query} onChange={this.onChangeHandler} onFocus={this.onFocusHandler} 
                             onBlur={this.onBlurHandler} placeholder="Укажите название, ИНН или ФИО руководителя" />
                {list}
            </div>   
        )
    }

}

export {InputCompanys}