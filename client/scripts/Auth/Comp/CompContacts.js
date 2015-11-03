var React = require('react/addons');

import {SimpleTable2, TblHead, TblBody} from '../../SimpleComponents/SimpleTable2';
import {xreq} from '../../api';
import {Icon} from '../../SimpleComponents/Icons';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

class TblCellCompUserActions extends React.Component {
    
    componentWillReceiveProps=()=> {
        this.forceUpdate();
    }
    
    addUser =()=> {
        // logger.log(this, 'addUserHr', this.props.obj);
        AppState.myContacts.addContact( this.props.obj.uid );
    }

    render=()=>{
        return (
            <div className="row row-space-children">
                { !AppState.myContacts.isContactExists(this.props.obj.uid)
                    ? <div data-tooltip="Добавить в контакты" onClick={this.addUser}><Icon iconName="user-plus-icon" size={20}/></div>
                    : null }
                <div data-tooltip="Написать сообщение"><Icon iconName="mail-icon" size={20}/></div>
            </div>
        )
    }
}


export class CompContacts extends React.Component {
    
    loader = null;  // загрузчик
    data = null;    // данные
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        this.loaderStop();
    }
    
    render=()=>{
        //logger.log(this, 'render');

        if (this.data == null) {  // не загружено
            if (this.loader == null) {  // загрузчика нет
                this.loader = new xreq(  // начинаем загрузку
                    'users_list',
                    { fields: ['uid','ln','fn','pn','phone','email','icq','skype'],
                      filters: [['cid','eq', this.props.params.id]],
                      limit: 500 },
                    this.loaderHr
                );
            }
            return (<div>Загрузка...</div>);  // ждем окончания загрузки
        }
        
        if ('err' in this.data) return (<div><p>Ошибка:</p><pre>{JSON.stringify(this.comp_data, null, ' ')}</pre></div>);  // загружено с ошибкой
        
        this.opt = {
            className: "panel panel-default max-size",
            headerClass: TblHead,
            headData: [
                {id: 'ln',      title: 'Фамилия'},
                {id: 'fn',      title: 'Имя'},
                {id: 'pn',      title: 'Отчество'},
                {id: 'mobile',  title: 'Моб.телефон'},
                {id: 'email',   title: 'Email'},
                {id: 'icq',     title: 'ICQ'},
                {id: 'skype',   title: 'Skype'},
                {id: 'uid',     title: 'Действия', cellClass: TblCellCompUserActions}
            ],
            bodyClass: TblBody, bodyData: this.data.data,  // контент
        };
        
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
        //logger.log(this, 'loaderHr');
        this.loaderStop();
        this.data = xr.res;
        this.forceUpdate();
    }
    
}