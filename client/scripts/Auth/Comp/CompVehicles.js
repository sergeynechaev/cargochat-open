var React = require('react/addons');

import {xreq} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {SimpleTable2, TblHead, TblBody, TblPages} from '../../SimpleComponents/SimpleTable2';
import {TblDateUTCCls} from '../../SimpleComponents/TableCells';
import TransportController from '../Transport/TransportController';
import {TransportList__Cell_Type} from '../Transport/TransportList__Cell_Type';
import {TransportList__Cell_ImageHint} from '../Transport/TransportList__Cell_ImageHint';
import {logger} from '../../Classes/Logger';

export class CompVehicles extends React.Component {
    
    loader = null;  // загрузчик
    data = null;    // данные
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        this.loaderStop();
    }
    
    render=()=> {
        
        if (AppState.Transport == null) AppState.Transport = new TransportController();  // это зачем то нужно рендерерам ячеек
        
        if (this.data == null) {  // не загружено
            if (this.loader == null) {  // загрузчика нет
                this.loader = new xreq(  // начинаем загрузку
                    'vehicles_list',
                    {comp_id: this.props.company.id, fields: ['id','model','num','type','sts','sts_name','sts_size','sts_token','pts','pts_name','pts_size','pts_token']},
                    this.loaderHr
                );
            }
            return (<div>Загрузка...</div>);  // ждем окончания загрузки
        }
        
        if ('err' in this.data) return (<div><p>Ошибка:</p><pre>{JSON.stringify(this.comp_data, null, ' ')}</pre></div>);  // загружено с ошибкой
        
        this.opt = {
            className: 'panel panel-default max-size',
            headerClass: TblHead, headData: [
                {id: 'model',   title: 'Модель'},
                {id: 'num',     title: 'Номер'},
                {id: 'type',    title: 'Тип ТС',   cellClass: TransportList__Cell_Type},
                {id: 'sts',     title: 'СТС',      cellClass: TransportList__Cell_ImageHint, cellOpt: {type:'sts'} },
                {id: 'pts',     title: 'ПТС',      cellClass: TransportList__Cell_ImageHint, cellOpt: {type:'pts'} }
            ],
            bodyClass: TblBody, bodyData: this.data.data,  // контент
            pagesClass: TblPages, pagesConf: {availableCapacity: [5, 10], currentCapacity: 5, currentPage: 1}  // пагенатор
        }
        
        return (
            <div className="row">
                <div className="col-xs-12">
                    <SimpleTable2 opt={this.opt}/>
                </div>
            </div>
        )
        
    }
    
    loaderStop=()=>{  // выключаем api
        if (this.loader) { this.loader.cancel(); this.loader = null; }
    }
    
    loaderHr=(xr)=>{
        this.loaderStop();
        this.data = xr.res;
        this.forceUpdate();
    }
    
}