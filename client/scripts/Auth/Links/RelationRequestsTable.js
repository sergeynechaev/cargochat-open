var React = require('react/addons');
import {SimpleTable2, TblHead, TblBody, TblPages} from '../../SimpleComponents/SimpleTable2';
import {AppState} from '../../Auth/Dashboard';
import {xreq} from '../../api';
import {Events, Error} from '../../Dispatcher';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';
import {TblCellRelationCompName, TblCellRelationInRequestActions, TblCellRelationOutRequestActions} from './RelationTblCells';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

export class RelationRequestsTable extends React.Component {
    
    state = {}
    
    content = null;
    r_list = null;   // api.xreq
    r_act = null;    // api.xreq
    
    componentWillMount=()=>{
        //logger.log(this, 'mount');
        
        let req;
        if (this.props.in_out) {
            // входящие связи
            Events.on(Events.EV_RELATION_REQUEST_REFUSE, this.onRefuse);
            Events.on(Events.EV_RELATION_REQUEST_ACCEPT, this.onAccept);
            req = {type: this.props.type, fields: ['id', 'ctime', 'requester_name', 'requester_id']};
        } else {
            // исходящие связи
            Events.on(Events.EV_RELATION_REQUEST_CANCEL, this.onCancel);
            req = {type: this.props.type, fields: ['id', 'ctime', 'requested_name', 'requested_id']};
        }
        Events.on(Events.EV_RELATION_REQUEST_MESSAGE, this.onMessage);
        
        // загрузка запросов на создание связей
        this.r_list = new xreq('comp_rel_req_list', req, xr=>{
            if (xr.res.err) return;
            this.content = xr.res.data;  // это данные (хорошо бы их проверить на валидность)
            this.forceUpdate();  // передергиваем компонент
        });
        
    }
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        if (this.r_list) { this.r_list.cancel(); this.r_list = null; }
        if (this.r_act) { this.r_act.cancel(); this.r_act = null; }
        if (this.props.in_out) {
            Events.rem(Events.EV_RELATION_REQUEST_REFUSE, this.onRefuse);
            Events.rem(Events.EV_RELATION_REQUEST_ACCEPT, this.onAccept);
        } else {
            Events.rem(Events.EV_RELATION_REQUEST_CANCEL, this.onCancel);
        }
        Events.rem(Events.EV_RELATION_REQUEST_MESSAGE, this.onMessage);
    }
    
    render () {
        //logger.log(this, 'render');

        if (!this.content) return null;  // загрузка не завершена
        if (this.content.length < 1) return null;  // данных нет
        
        var hd = (this.props.in_out) ?
            [
                {id: 'requester_name', title: 'Компания', cellClass: TblCellRelationCompName},
                {id: 'ctime',          title: 'Дата',     cellClass: TblDateUTCCls},
                {id: 'id',             title: 'Действия', cellClass: TblCellRelationInRequestActions}
            ]
                :
            [
                {id: 'requested_name', title: 'Компания', cellClass: TblCellRelationCompName},
                {id: 'ctime',          title: 'Дата',     cellClass: TblDateUTCCls},
                {id: 'id',             title: 'Действия', cellClass: TblCellRelationOutRequestActions}
            ];
        
        this.opt = {
            title: this.props.title,
            className: "panel panel-default max-size",
            headerClass: TblHead,  // хедер
            headData: hd,
            bodyClass: TblBody, bodyData: this.content,  // контент
            incomingRel: this.props.in_out,
            pagesClass: TblPages, pagesConf: {availableCapacity: [5, 10], currentCapacity: 5, currentPage: 1},  // пагенатор
        };
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    <SimpleTable2 opt={this.opt} />
                </div>
            </div>
        )
        
    }
    
    requestTemplateCm=(cm, relreq, hr)=>{  // шаблон запроа к api
        if (this.r_act) return;
        this.r_act = new xreq(cm, {request_id: relreq.id}, xr=>{
            if (xr.res.err) return;
            this.r_act = null;
            Utils.run(hr, relreq);
        })
    }
    
    delContentElemById=(id)=>{  // удалятель эелемента из списка по request_id
        for (let i = 0, l = this.content.length; i < l; i++) {
            if (this.content[i].id == id) {
                this.content.splice(i, 1);  // удаляем предложение из списка
                return true;
            }
        }
        return false;
    }
    
    onRefuse=(r)=>{  // отклоняем предложение
        //logger.log(this, 'onRefuse');
        //console.debug(r);
        this.requestTemplateCm('comp_relation_request_refuse', r, this.removed);
    }
    onAccept=(r)=>{  // принимаем предложение
        //logger.log(this, 'onAccept');
        //console.debug(r);
        this.requestTemplateCm('comp_relation_request_accept', r, this.accepted);
    }
    onCancel=(r)=>{  // отменяем предложение
        //logger.log(this, 'onCancel');
        //console.debug(r);
        this.requestTemplateCm('comp_relation_request_delete', r, this.removed);
    }
    onMessage=(r)=>{  // пишем мессагу приглашателю
        //logger.log(this, 'onMessage');
        //console.debug(r);
        // todo ....
    }
    
    removed=(r)=>{  // предложение убрано
        logger.log(this, 'removed');
        if (this.delContentElemById(r.id))  // удаляем из списка предложений
            this.forceUpdate();  // если удалилось, то передергиваем компонент
    }
    accepted=(r)=>{  // предложение принято
        logger.log(this, 'accepted');
        if (this.delContentElemById(r.id)) {  // удаляем из списка предложений
            this.forceUpdate();  // если удалилось, то передергиваем компонент
            Events.run(Event.EV_COMP_RELATIONS_CHANGED);  // и сигналим о изменении связей
        }
    }
    
}