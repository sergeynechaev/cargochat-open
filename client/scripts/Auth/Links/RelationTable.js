var React = require('react/addons');
import {SimpleTable2, TblHead, TblBody, TblPages} from '../../SimpleComponents/SimpleTable2';
import {AppState} from '../../Auth/Dashboard';
import {xreq} from '../../api';
import {Events} from '../../Dispatcher';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';
import {TblCellRelationCompName, TblCellRelationActions} from './RelationTblCells';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

export class RelationTable extends React.Component {
    
    state = {};
    content = null;  // данные таблицы
    r_list = null;   // api.xreq
    r_act = null;    // api.xreq
    
    r_list_stop=()=>{  // выключаем api
        if (this.r_list) { this.r_list.cancel(); this.r_list = null; }
    }
    r_act_stop=()=>{  // выключаем api
        if (this.r_act) { this.r_act.cancel(); this.r_act = null; }
    }
    
    componentWillMount=()=>{
        // logger.log(this, 'mount');
        
        // слушаем действия над связями
        Events.on(Events.EV_RELATION_REQUEST_MESSAGE, this.onMessage);
        Events.on(Events.EV_RELATION_REQUEST_DELETE, this.onDelete);
        
        // слушаем сигнал о изменении связей
        Events.on(Events.EV_COMP_RELATIONS_CHANGED, this.onRelationChanged);
        
        // загружаем
        this.load(this.props.comp_id, this.props.relation);
    }
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');

        this.r_list_stop();
        this.r_act_stop();
        Events.rem(Events.EV_RELATION_REQUEST_MESSAGE, this.onMessage);
        Events.rem(Events.EV_RELATION_REQUEST_DELETE, this.onDelete);
        Events.rem(Events.EV_COMP_RELATIONS_CHANGED, this.onRelationChanged);
    }
    
    componentWillReceiveProps=(p)=>{
        // logger.log(this, 'props');

        this.r_list_stop();
        this.r_act_stop();
        this.content = null;
        this.forceUpdate();
        this.load(p.comp_id, p.relation);
    }
    
    // loading
    
    load=(cid, rel)=>{
        // загрузка существующих связей
        this.r_list_stop();
        var p = {
            comp_id: cid,
            relation: rel,
            fields: ['relation_id', 'name', 'inn', 'phone', 'ati_code', 'comp_id']
        };
        this.r_list = new xreq('comp_rel_list', p, this.loaded);
    }
    
    loaded=(req)=>{
        //logger.log(this, 'loaded');
        //console.debug(res);
        this.r_list_stop();
        if (req.res.err) return;
        this.content = req.res.data;  // это данные (хорошо бы их проверить на валидность)
        this.forceUpdate();       // передергиваем компонент
    }
    
    render =()=> {
        // logger.log(this, 'render');
        
        if (!this.content) return null;            // загрузка не завершена
        if (this.content.length < 1) return null;  // данных нет
        
        this.opt = {
            title: this.props.title,
            className: 'panel panel-default max-size',
            headerClass: TblHead,  // хедер
            headData: [
                {id: 'name',        title: 'Название', cellClass: TblCellRelationCompName},
                {id: 'inn',         title: 'ИНН'},
                {id: 'phone',       title: 'Телефон'},
                // {id: 'ati_code',    title: 'Код АТИ'}, // deprecated
                {id: 'relation_id', title: 'Действия', cellClass: TblCellRelationActions}
            ],
            delAvailable: this.props.comp_id == AppState.myCompany.id,
            bodyClass: TblBody, bodyData: this.content,  // контент
            pagesClass: TblPages, pagesConf: {availableCapacity: [5, 10], currentCapacity: 5, currentPage: 1},  // пагенатор
        };
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    <SimpleTable2 opt={this.opt}/>
                </div>
            </div>
        )
        
    }
    
    // handlers
    
    onDelete=(r)=>{  // отменяем предложение
        logger.log(this, 'onDelete');

        if (this.r_act) return;  // предыдущий запрос не завершен
        this.r_act = new xreq('comp_relation_delete', {relation_id: r.relation_id}, this.xreqDeleteHandler);
    }
    
    // onMessage=(r)=>{  // пишем мессагу приглашателю
    //     // todo ....
    // }
    
    onRelationChanged=()=>{
        logger.log(this, 'onRelationChanged');

        this.content = null;  // очищаем
        this.forceUpdate();   // передергиваем
        this.load(this.props.comp_id, this.props.relation);          // загружаем
    }
    
    xreqDeleteHandler=(req)=>{  // предложение удалено
        logger.log(this, 'xreqDeleteHandler');

        this.r_act_stop();
        if (req.res.err) return;
        if (this.delContentElemById(req.res.relation_id))  // удаляем из списка предложений
            this.forceUpdate();                      // если удалилось, то передергиваем компонент
    }
    
    // helpers
    
    delContentElemById=(id)=>{  // удалятель эелемента из списка по relation_id
        for (let i = 0, l = this.content.length; i < l; i++) {
            if (this.content[i].relation_id == id) {
                this.content.splice(i, 1);  // удаляем предложение из списка
                return true;
            }
        }
        return false;
    }
    
}