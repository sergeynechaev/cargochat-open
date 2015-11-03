var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

import {Api} from '../../api';
import {logger} from '../../Classes/Logger';
import {AppState} from '../Dashboard';
import {Events} from '../../Dispatcher';

import {NavTabs} from '../../Controls/NavTabs';
import {Icon} from '../../Controls/Icon';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {ModalWindow} from '../../Controls/ModalWindow';

import {CompRelationCreateDialog} from '../CompanyDetails/CompRelationCreateDialog';

export class Comp extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        company: null,
        isRelDialog: false,
        isBlackListDialog: false,
        isSocialDialog: false
    }

    loadCompany = (id=this.props.params.id)=>{
        Api.companyStateRequestById(id).then(res=>{
            if (res.err) {
                logger.log(this, 'load company', res.msg, 'error');
                return;
            }

            this.setState({ company: res });
        });
    }

    componentWillMount = ()=>{
        this.loadCompany();
        Events.on(Events.EV_COMP_STATE_UPDATE, this.loadCompany);
    }

    componentWillUnmount = ()=>{
        Events.on(Events.EV_COMP_STATE_UPDATE, this.loadCompany);   
    }

    linkRequest=(type, from = AppState.myCompany.id, to = this.state.company.id)=>{
        if(!from || !to || !type) return;

        Api.linkCreateRequest({comp_from: from, comp_to: to, relation_type: type}).then(res=> {
            let message;

            if(res.err){
                logger.log(this, 'linq request', res.msg, 'error');
                message = { message: res.msg, type: 'error' }
            } else {
                if(type == "social"){
                    message = { message: `Компания ${this.state.company.name} добавлена в справочник`, type: 'info' }
                    this.state.company.rel_social = true;
                    this.socialDialogClose();
                } else {
                    message = { message: `Компания ${this.state.company.name} добавлена в черный список`,  type: 'info' };
                    this.state.company.rel_blacklist = true;
                    this.blackListDialogClose();
                }
            }

            Events.run(Events.EV_SHOW_NOTIFY, message);
        });
    }

    relDialogClose = ()=> { this.setState({isRelDialog: false}) }
    relDialogOpen = ()=> { this.setState({isRelDialog: true}) }

    blackListDialogClose = ()=>{ this.setState({isBlackListDialog: false}) }
    blackListDialogOpen = ()=>{ this.setState({isBlackListDialog: true}) }

    socialDialogClose = ()=>{ this.setState({isSocialDialog: false}) }
    socialDialogOpen = ()=>{ this.setState({isSocialDialog: true}) }
    
    render = ()=>{
        let tabs = [{ name: 'О компании'},
                    { name: 'Выписка', href: '/info', hash: 'info' },
                    { name: 'Контакты', href: '/contacts', hash: 'contacts' },
                    { name: 'Партнеры', href: '/relations', hash: 'relations' },
                    { name: 'Транспортные средства', href: '/vehicles', hash: 'vehicles' }];
        

        if(this.state.company){
            let tagsRu =    AppState.myCompany.getTagNames(this.state.company.tags),
                tags =      this.state.company.tags.map((tag, i)=>{
                                let tagRu = "", classNameLabel = "label marg-left-s";

                                if(tag == 'carrier' && this.state.company.rel_carrier || tag == 'expeditor' && this.state.company.rel_expeditor || tag == 'shipper' && this.state.company.rel_shipper){
                                    tagRu = "Ваш "; classNameLabel += " label-success";
                                } else { classNameLabel += " label-primary" }

                                tagRu += tagsRu[i];
                            
                                return <span className={classNameLabel} key={i}>{tagRu}</span>
                            });

            if(this.state.company.rel_blacklist) tags.push(<span className="label marg-left-s label-danger">В черном списке</span>)
            if(this.state.company.rel_social) tags.push(<span className="label marg-left-s label-warning">В справочнике</span>)

            return (
                <div className="panel">
                    <div className="panel__header row row-no-padding">
                        <h1 className="panel__title">{this.state.company.name}</h1>
                        <div className="panel__labels marg-left">{tags}</div>

                        <div className="panel__actions text-right">
                            <ButtonSimple className="marg-left-s" caption="Создать связь" brand="success" hidden={!AppState.myCompany.state.tags.length} onClick={this.relDialogOpen}/>
                            <ButtonSimple className="marg-left-s" caption="В черный список" brand="danger" hidden={this.state.company.rel_blacklist} onClick={this.blackListDialogOpen}/>
                            <ButtonSimple className="marg-left-s" caption="В справочник" brand="warning" hidden={this.state.company.rel_social} onClick={this.socialDialogOpen}/>
                        </div>

                        <ModalWindow isOpen={this.state.isRelDialog} onClose={this.relDialogClose} title="Выберите тип связи">
                            <CompRelationCreateDialog company={this.state.company} onClose={this.relDialogClose}/>
                        </ModalWindow>

                        <ModalWindow isOpen={this.state.isBlackListDialog} onClose={this.blackListDialogClose} title="Добавить в черный список">
                            <div className="modal-container__body">
                                Вы действительно хотите добавить компанию {this.state.company.name} в черный список?
                                <div className="modal-container__footer">
                                    <ButtonSimple brand="danger" onClick={this.linkRequest.bind(this, 'blacklist')} caption="Добавить"/>
                                </div>
                            </div>
                        </ModalWindow>

                        <ModalWindow isOpen={this.state.isSocialDialog} onClose={this.socialDialogClose} title="Добавить в справочник">
                            <div className="modal-container__body">
                                Вы действительно хотите добавить компанию {this.state.company.name} в справочник?
                                <div className="modal-container__footer">
                                    <ButtonSimple brand="success" onClick={this.linkRequest.bind(this, 'social')} caption="Добавить"/>
                                </div>
                            </div>
                        </ModalWindow>
                    </div>
                    <div className="panel__nav-tabs">
                        <NavTabs baseHref={`#/dashboard/comp/${this.props.params.id}`} data={tabs} nHash={4}/>
                    </div>
                    <div className="panel__body">
                        <RouteHandler company={this.state.company}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="loading"></div>
            )
        }
    }
}