var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DatePicker = require('react-datepicker');
var moment = require('moment');

import {AppState} from '../../Auth/Dashboard';
import {xreq} from '../../api';
import {logger} from '../../Classes/Logger';
import {Events} from '../../Dispatcher';
import {Utils} from '../../utils';
import {Validation} from '../../Validation';

import {FlexBox} from '../../SimpleComponents/FlexBox';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
import {InputAddress} from '../../SimpleComponents/InputAddress';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {InputSelect2} from '../../SimpleComponents/InputSelect2';

// new
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
// import {InputSelect} from '../../Controls/Forms/InputSelect';    // не работает

export class OrderCreate extends React.Component {
    
    state = {
        isTmplSaveOpen: false,
    };           
    
    order_src = null;     // исходный объект заявки (object)
    order_inp = {};       // хранилище введенных данных для создания заявки
    order_manager = null; // создатель/изменятель заявки (xreq)
    lp_manager = null;    // менеджер (создает/изменяет) мест погрузки (xreq)
    lps_loader = null;    // загрузчик мест погрузки (xreq)
    lps_data = null;      // хранилище загруженных мест погрузки (object)
    lps_sel = null;       // датапровайдер для комобобокса мест погрузки (array)
    lp_add_mode = false;  // режим добавления места погрузки
    lp_inp = {};          // хранилище введенных данных для создания места погрузки

    edit_type = null;     // тип редактирования (string copy|tmpl)
    removed_id = null;    // пока костыль, храним id, который удалили при редактировании, а вообще надо в редактор 
                          // передавать клон заказа, а не shallow copy
    
    vtypes = [
        {id: 'tent',         value: 'Тент'},
        {id: 'refrigerator', value: 'Рефрижератор'},
        {id: 'thermos',      value: 'Термос'},
        {id: 'container',    value: 'Контейнер'},
        {id: 'tank',         value: 'Цистерна'},
        {id: 'closed',       value: 'Закрытый'}
    ];
    
    ltypes = [
        {id: 'back',         value: 'Задняя'},
        {id: 'side',         value: 'Боковая'},
        {id: 'top',          value: 'Верхняя'}
    ];
    
    componentWillMount=()=> {
        //logger.log(this, 'mount');
        //console.debug(this.props);
        this.loadExpeditors();
    }
    
    componentWillUnmount=()=> {
        //logger.log(this, 'unmount');
        this.lpManagerStop();
        this.lpsLoaderStop();
        this.orderManagerStop();
        this.exp_loader_stop();
    }
    
    componentWillReceiveProps=(p)=>{
        let is_null = p.order == null;
        let was_null = this.order_src == null;
        let diff = !is_null && !was_null && p.order.id != this.order_src.id;

        // logger.log(this, p, 'order create receive isNull= ' + is_null + ' wasNull= '+was_null + ' diff= '+diff);

        //console.debug(is_null, was_null, diff);
        if ((is_null && !was_null) || (!is_null && was_null) || diff) {

            this.order_src = p.order;
            this.edit_type = p.type? p.type : null;

            if( this.edit_type == 'copy' ) {
                this.removed_id = this.order_src.id;
                delete this.order_src.id;
            }

            // logger.log('ORDER CREATE rec prps', this, p);

            if (this.order_src != null) {
                
                let inp = this.order_inp;
                let src = this.order_src;
                let re = this.refs;
                
                inp['lplace_id'] = src['lpid'];
                if (this.lps_sel != null) this.setSelected(this.lps_sel, inp['lplace_id']);

                inp['expeditor'] = src['expid'];
                if (this.exp_sel != null) this.setSelected(this.exp_sel, inp['expeditor']);
                
                inp['cargo'] = src['cargo'];
                re['cargo'].refs['inp'].getDOMNode().value = inp['cargo'];
                
                inp['ltype'] = src['ltype'];
                this.setSelected(this.ltypes, inp['ltype']);
                
                inp['mass'] = src['mass'];
                re['mass'].refs['inp'].getDOMNode().value = inp['mass'];
                
                inp['vol'] = src['vol'];
                re['vol'].refs['inp'].getDOMNode().value = inp['vol'];
                
                inp['vtype'] = src['vtype'];
                this.setSelected(this.vtypes, inp['vtype']);
                
                inp['ltime'] = src['ltime'];
                inp['utime']  = src['utime'];
                
                inp['receiver'] = src['receiver'];
                re['receiver'].refs['inp'].getDOMNode().value = inp['receiver'];
                
                inp['addr'] = src['addr'];
                inp['x'] = src['x'];
                inp['y'] = src['y'];
                re['addr'].refs['input'].getDOMNode().value = inp['addr'];
                
                inp['note'] = src['note'];
                re['note'].refs['inp'].getDOMNode().value = inp['note'];

                inp['tname'] = src['tname'];
                
            } else {
                this.order_inp = {};
            }
            this.forceUpdate();
        }
    }
    
    vis=(b)=>{ return b ? {} : {display: 'none'}; }
    
    setSelected=(src, id)=>{
        for (let i in src) {
            let o = src[i];
            if (o.id == id) { o.__selected__ = true; } else { delete o.__selected__; }
            //console.debug(id, o);
        }
    }
    
    lpManagerStop=()=>{ if (this.lp_manager) { this.lp_manager.cancel(); this.lp_manager = null; } }
    lpsLoaderStop=()=>{ if (this.lps_loader) { this.lps_loader.cancel(); this.lps_loader = null; } }
    orderManagerStop=()=>{ if (this.order_manager) { this.order_manager.cancel(); this.order_manager = null; } }
    
    lpCancelHr=()=>{
        this.lp_add_mode = false;  // переключаемся обратно
        this.forceUpdate();  // передергиваем
    }
    
    lpCreateHr=()=>{
        //logger.log(this, 'lpCreateHr');
        //console.debug(this.lp_inp);
        if (this.lp_manager) return;  // создатель занят
        let inp = this.lp_inp;
        this.lp_manager = new xreq('lplace_manage', {
            action:  'create',
            flags:   0x00,        // todo: добавить чекбокс для флага 0x0001 (см api:lplace_flags)
            name:    inp['name'],
            addr:    inp['addr'],
            x:       inp['x'],
            y:       inp['y']
        },
        this.lpCreatedHr);  // создаем место погрузки
    }
    
    lpCreatedHr=(xr)=>{
        logger.log(this, 'lpCreatedHr');
        this.lpManagerStop();
        if ('err' in xr.res) return Events.runError( "Не удалось создать место погрузки: " + xr.res.msg );
        if ('lplace_id' in xr.res == false || 'channel_id' in xr.res == false) return Events.runError('api fail: lplace_id and channel_id required');  // неожиданный ответ api
        this.lp_add_mode = false;  // переключаемся обратно
        this.lpsLoaderStop();  // убиваем загрузчик мест (может еще что то грузить в фоне)
        this.lps_data = null;  // зачищаем предыдущий список мест
        this.forceUpdate();  // передергиваем (список мест будет подгружен заново)
    }
    
    lpsLoaderHr=(xr)=>{
        logger.log(this, 'lpsLoaderHr');
        this.lpsLoaderStop();  // грохаем загрузчик
        // проверяем ответ
        if ('err' in xr.res) return Events.runError( "Не удалось место погрузки: " + xr.res.msg );
        if ('data' in xr.res == false) return Events.runError('api fail: data required');  // неожиданный ответ api
        this.lps_data = xr.res;
        // строим датапровайдер для выбора места погрзки
        this.lps_sel = [];
        for (let i = 0, l = this.lps_data.data.length; i < l; i++) {
            let o = this.lps_data.data[i];
            let s = {id: o['id'], value: o['name']};
            if (this.order_inp['lplace_id'] == o['id']) s.__selected__ = true;
            this.lps_sel.push(s);
        }
        this.forceUpdate();
    }
    
    lplaceInpHr=(o)=>{ for (var k in o) this.lp_inp[k] = o[k]; } // мержим ввод юзера в this.lp_inp
    lplaceAddrSelHr=(addr, obj, x, y)=>{ this.lplaceInpHr({addr: addr, x: x, y: y}); }
    
    orderInpHr=(o)=>{ for (var k in o) this.order_inp[k] = o[k]; } // мержим ввод юзера в this.order_inp
    onLplaceChangeHr=(caller)=>{ this.orderInpHr({'lplace_id': caller.getSelectedList()[0].id}); }
    onExpeditorChangeHr=(caller)=>{ this.orderInpHr({'expeditor': caller.getSelectedList()[0].id}); }
    onLTypeChangeHr=(caller)=>{ this.orderInpHr({'ltype': caller.getSelectedList()[0].id}); }
    onVTypeChangeHr=(caller)=>{ this.orderInpHr({'vtype': caller.getSelectedList()[0].id}); }
    orderAddrSelHr=(addr, obj, x, y)=>{ this.orderInpHr({addr: addr, x: x, y: y}); }
    onUTimeChangeHr=(mnt)=>{ this.orderInpHr({'utime': mnt._d.getTime() / 1000}); }
    onLTimeChangeHr=(mnt)=>{ 
        this.orderInpHr({'ltime': Math.ceil(mnt._d.getTime() / 1000)});
        // if( this.order_inp.utime && this.order_inp.utime < this.order_inp.ltime ) delete this.order_inp.utime;
        if( this.order_inp.utime && this.order_inp.utime < this.order_inp.ltime ) this.order_inp.utime = null;
        this.forceUpdate(); 
    }
    
    lplaceCreateHandler=()=>{
        logger.log(this, 'lplaceCreateHandler');
        this.lp_add_mode = true;
        this.forceUpdate();
    }
    
    orderCreateHr=()=>{
        // logger.log(this, 'create order', this.order_inp);

        if (this.order_manager) return;  // менеджер занят
        let inp = this.order_inp;
        this.order_manager = new xreq('order_manage', {
            action:    'create',
            // shipper:   inp['shipper'],
            shipper:   AppState.myCompany.state.id, // заявки создаем пока только от грузовладельца
            lplace_id: inp['lplace_id'],
            cargo:     inp['cargo'],
            ltype:     inp['ltype'],
            mass:      inp['mass'],
            vol:       inp['vol'],
            vtype:     inp['vtype'],
            ltime:     inp['ltime'],
            utime:     inp['utime'],
            receiver:  inp['receiver'],
            addr:      inp['addr'],
            x:         inp['x'],
            y:         inp['y'],
            note:      inp['note'],
            expeditor: inp['expeditor']
        },
        this.orderCreatedHr);  // создаем заявку
    }
    
    orderCreatedHr=(xr)=>{  // создание завершено
        logger.log(this, 'orderCreatedHr');
        this.orderManagerStop();
        // if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        if ('err' in xr.res) return Events.runError( "Не удалось создать заказ: " + xr.res.msg );
        if ('order_id' in xr.res == false) return Events.runError('api fail');
        Events.runInfo('Создан заказ № ' + xr.res.order_id);

        if(this.props.onCancel) Utils.run(this.props.onCancel)
            else window.location.hash = "dashboard/orders/new"
    }

    onCancel =()=> {
        if( this.removed_id ) this.order_src.id = this.removed_id;
        if( this.props.onCancel ) Utils.run(this.props.onCancel)
    }
    
    // создание шаблона заказа
    templateCreateHr=()=>{
        logger.log(this, 'templateCreateHr');
        if (this.order_manager) return;  // менеджер занят

        let p = {
            action:   'template',
            shipper:  AppState.myCompany.state.id, // пока только от грузовладельца
        };

        for (let k in this.order_inp) p[k] = this.order_inp[k];
        if( !p['tname'] ) p['tname'] = 'Шаблон от ' + Utils.ts2tmdhms(new Date().getTime() / 1000);
        if( this.edit_type == 'tmpl' ) p['order_id'] = this.order_src['id'];

        this.order_manager = new xreq('order_manage', p, this.templateCreatedHr);
    }
    
    templateCreatedHr=(xr)=>{  // создание шаблона завершено
        logger.log(this, 'templateCreatedHr');

        this.orderManagerStop();
        if ('err' in xr.res) return Events.runError( "Не удалось создать шаблон заказа: " + xr.res.msg );
        if ('order_id' in xr.res == false) return Events.runError('api fail');

        Events.runInfo('Создан шаблон № ' + xr.res.order_id);

        // if( this.edit_type == 'tmpl' ) Events.runInfo('Шаблон № ' + xr.res.order_id + ' успешно обновлен');
        //     else Events.runInfo('Создан шаблон № ' + xr.res.order_id);

        if (this.props.onCancel) this.props.onCancel()
            else window.location.hash = "dashboard/orders/tpls";
    }
    
    orderSaveHr=()=>{
        //logger.log(this, 'orderSaveHr');
        
        if (this.order_manager) return;  // менеджер занят
        let params = {
            action:    'update',
            order_id:  this.order_src['id'],
            shipper:   AppState.myCompany.state.id, // пока только от грузовладельца
        };
        for( let k in this.order_inp ) if( this.order_inp[k] !== null ) params[k] = this.order_inp[k];

        this.order_manager = new xreq('order_manage', params, this.orderSavedHr);  // сохраняем заявку (todo: передавать только изменившиеся данные)
    }
    
    orderSavedHr=(xr)=>{  // сохранение завершено
        logger.log(this, 'orderSavedHr');

        this.orderManagerStop();
        if ('err' in xr.res) return Events.runError( "Не удалось сохранить: " + xr.res.msg );
        if ('order_id' in xr.res == false) return Events.runError('api fail');

        if( this.edit_type == 'tmpl' ) Events.runInfo('Шаблон № ' + xr.res.order_id + ' успешно обновлен');
            else Events.runInfo('Заказ № ' + xr.res.order_id + ' изменен успешно');

        let src = this.order_src;
        let inp = this.order_inp;
        src['shipper']    = AppState.myCompany.state.id; // пока только от грузовладельца
        src['cargo']      = inp['cargo'];
        src['lpid']       = inp['lplace_id'];
        src['lpname']     = this.refs['lp'].getFirstSelectedObj() ? this.refs['lp'].getFirstSelectedObj().value : null;
        src['mass']       = inp['mass'];
        src['vol']        = inp['vol'];
        src['addr']       = inp['addr'];
        src['vtype']      = inp['vtype'];
        src['ltype']      = inp['ltype'];
        src['utime']      = inp['utime'];
        src['note']       = inp['note'];
        src['expeditor']  = inp['expeditor'];
        
        Utils.run(this.props.onCancel);
    }


    // Loading expeditors
    exp_loader = null;   // api.xreq
    exp_data = null;
    exp_sel = null;
    exp_loader_stop=()=>{
        if (this.exp_loader) { this.exp_loader.cancel(); this.exp_loader = null; }
    }
    loadExpeditors=(cid, rel)=>{
        // загрузка существующих связей
        this.exp_loader_stop();
        var p = {
            comp_id: AppState.myCompany.state.id,
            relation: 'expeditors',
            fields: ['relation_id', 'name', 'inn', 'phone', 'ati_code', 'comp_id']
        };
        this.exp_loader = new xreq('comp_rel_list', p, this.onExpeditorsLoaded);
    }
    onExpeditorsLoaded=(req)=>{
        // logger.log('loaded expeditors', this, req);

        this.exp_loader_stop();
        if (req.res.err) return;

        this.exp_data = req.res;
        this.exp_sel = [];
        for (let i = 0, l = this.exp_data.data.length; i < l; i++) {
            let o = this.exp_data.data[i];
            let s = {id: o['comp_id'], value: o['name']};
            if (this.order_inp['expeditor'] == o['comp_id']) s.__selected__ = true;
            this.exp_sel.push(s);
        }
        this.forceUpdate();
    }

    toggleSaveAsTemplate =()=> {
        this.setState({isTmplSaveOpen: !this.state.isTmplSaveOpen});
        if( !this.state.isTmplSaveOpen ) setTimeout( Utils.scrollToBottom, 1 );
    }


    render=()=> {
        // logger.log(this, 'render order create= ', this.order_inp);

        // места погрузки
        if (this.lps_data == null) {  // места погрузки не загружены
            if (this.lps_loader == null) {  // места погрузки не загружаются
                this.lps_loader = new xreq('lplaces_list', {fields:['id', 'name']}, this.lpsLoaderHr);  // загружаем места погрузки
            }
            return (<div>загрузка ...</div>);
        }
        
        if ('err' in this.lps_data) return (<div>места погрузки не загружены: {this.lps_data.msg}</div>);  // места погрузок загружены с ошибкой
        if (!Utils.isArray(this.lps_data['data'])) return (<div>места погрузки не загружены: list.data required</div>);  // api не вернул data

        moment.locale('ru');
        
        let now = Math.floor((new Date().getTime()) / 1000);
        // let ltime = Utils.timestamp2YYYYMMDD(this.order_inp['ltime'] || now);    // deprecated
        // let utime = Utils.timestamp2YYYYMMDD(this.order_inp['utime'] || now);    // deprecated
        let ltime = this.order_inp['ltime'] ? moment( Utils.timestamp2YYYYMMDD(this.order_inp['ltime']) ) : null;
        let utime = this.order_inp['utime'] ? moment( Utils.timestamp2YYYYMMDD(this.order_inp['utime']) ) : null;

        // expeditors list
        if (this.exp_data == null) {
            if (this.exp_loader == null) this.loadExpeditors();
            return (<div>загрузка ...</div>);
        }
        if (!Utils.isArray(this.exp_data['data'])) return <div>не удалось загрузить список экспедиторов</div>;




        let order_title = this.order_src == null || !this.order_src.id 
                            ? 'Создание заказа' 
                            : this.edit_type == 'tmpl' ? 'Редактирование шаблона' : 'Редактирование заказа';
        
        let bt_cancel = (this.props.onCancel != null) 
                        ? (<ButtonSimple onClick={this.onCancel} brand="warning" caption="Отменить"/>) 
                        : null;

        let buttons = (
                <div className={"row padd-top " + (this.edit_type != 'tmpl' ? "row-between" : "row-end") }>
                    { this.edit_type != 'tmpl' && !this.state.isTmplSaveOpen &&
                         <ButtonSimple onClick={this.toggleSaveAsTemplate} brand="success" caption="Сохранить как шаблон"/> }
                    { this.edit_type != 'tmpl' && this.state.isTmplSaveOpen &&
                        <div>
                            <div className="orders-popup-form__caller">Сохранить как шаблон</div>
                            <div className="orders-popup-form" data-context="template">
                                <FormGroup name="Название шаблона" from="tname">
                                    <InputSimple ref='tname' name='tname' autoFocus={true} onChange={this.orderInpHr} />
                                </FormGroup>
                                <div className="modal-container__footer">
                                    <ButtonSimple onClick={this.templateCreateHr} brand="success" size="small" caption="Сохранить шаблон"/>
                                    <ButtonSimple onClick={this.toggleSaveAsTemplate} brand="warning" size="small" caption="Отмена"/>
                                </div>
                            </div>
                        </div> }
                    <div className="row row-nowrap row-space-children">
                        {(this.order_src == null || !this.order_src.id)
                            ? <ButtonSimple onClick={this.orderCreateHr} brand="success" caption="Создать заказ"/>
                            : <ButtonSimple onClick={this.orderSaveHr} 
                                            brand="success" 
                                            caption={"Сохранить " + (this.edit_type != 'tmpl' ? "заказ" : "шаблон") } />
                        }
                        {bt_cancel}
                    </div>
                </div>
            )

        return (
            <div>
                <div style={this.vis(this.lp_add_mode)}>
                    <div className="orders__form">
                        <h1>Создание места погрузки</h1>

                        <FormGroup name="Название" from="name">
                            <InputSimple name="name" onChange={this.lplaceInpHr} />
                        </FormGroup>
                        <FormGroup name="Адрес" from="addr">
                            <InputAddress name="addr" onSelect={this.lplaceAddrSelHr} caption="Адрес" active={true} />
                        </FormGroup>

                        <div className="modal-container__footer">
                            <ButtonSimple onClick={this.lpCreateHr} brand="success" caption="Создать место погрузки"/>
                            <ButtonSimple onClick={this.lpCancelHr} brand="warning" caption="Отмена"/>
                        </div>

                    </div>
                </div>
                <div style={this.vis(!this.lp_add_mode)}>

                    <div className="orders__form">
                        <h1>{order_title}</h1>

                        <div className="row row-nw row-between row-space-children">
                            <FormGroup name="Экспедитор" from="expeditor">
                                <InputSelect2 ref='expeditor' name='expeditor' active={true} noIcon={true} list={this.exp_sel} onChanged={this.onExpeditorChangeHr}/>
                            </FormGroup>
                            <FormGroup name="Место погрузки" from="lp">
                                <InputSelect2 ref='lp' name='lp' active={true} noIcon={true} styleGreed={true} list={this.lps_sel} onChanged={this.onLplaceChangeHr}/>
                            </FormGroup>
                            <div><ButtonSimple onClick={this.lplaceCreateHandler} brand="warning" size="small" caption="Создать новое место погрузки"/>
                            </div>
                        </div>

                        <FormGroup name="Наименование груза" from="cargo">
                            <InputSimple ref='cargo' name="cargo" defaultValue={this.order_inp['cargo']} onChange={this.orderInpHr} />
                        </FormGroup>

                        <FormGroup name="Получатель" from="receiver">
                            <label style={{display: 'none'}}> !!! todo !!! сделать диалог выбора получателя</label>
                            <InputSimple ref='receiver' name="receiver" defaultValue={this.order_inp['receiver']} onChange={this.orderInpHr} />
                        </FormGroup>

                        <div className="row row-nw row-between row-space-children">
                            <FormGroup name="Место доставки" from="addr">
                                <InputAddress ref='addr' name="addr" onSelect={this.orderAddrSelHr} caption="Место доставки" active={true} />
                            </FormGroup>
                            <FormGroup name="Дата погрузки" from="ltime">
                                <DatePicker key={1}
                                            dateFormat="YYYY-MM-DD" 
                                            locale="ru" 
                                            weekdays={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                                            minDate={moment()}
                                            placeholderText="выберите дату" 
                                            selected={ltime} 
                                            onChange={this.onLTimeChangeHr} />
                            </FormGroup>
                            <FormGroup name="Дата разгрузки" from="utime">
                                <DatePicker key={2}
                                            dateFormat="YYYY-MM-DD" 
                                            locale="ru" 
                                            weekdays={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                                            minDate={ltime ? ltime : moment()}
                                            selected={utime} 
                                            placeholderText="выберите дату" 
                                            onChange={this.onUTimeChangeHr} />
                            </FormGroup>
                        </div>

                        <div className="row row-nw row-between row-space-children">
                            <FormGroup name="Погрузка / разгрузка" from="ltype">
                                <InputSelect2 ref='ltype' name='ltype' active={true} noIcon={true} list={this.ltypes} onChanged={this.onLTypeChangeHr}/>
                            </FormGroup>
                            <FormGroup name="Тип ТС" from="vtypes">
                                <InputSelect2 ref='vtypes' name='vtypes' active={true} noIcon={true} list={this.vtypes} onChanged={this.onVTypeChangeHr}/>
                            </FormGroup>
                            <FormGroup name="Масса, тонн" from="mass">
                                <InputSimple ref='mass' name="mass" defaultValue={this.order_inp['mass']} castTo='number' onChange={this.orderInpHr} validation={{typing:Validation.typingFloat}} />
                            </FormGroup>
                            <FormGroup name="Объем, куб.м." from="vol">
                                <InputSimple ref='vol' name="vol" defaultValue={this.order_inp['vol']} castTo='number' onChange={this.orderInpHr} validation={{typing:Validation.typingFloat}} />
                            </FormGroup>
                        </div>

                        <FormGroup name="Заметка" from="note">
                            <InputSimple ref='note' name="note" defaultValue={this.order_inp['note']} onChange={this.orderInpHr} />
                        </FormGroup>

                        { this.edit_type == 'tmpl' && 
                        <FormGroup name="Название шаблона" from="tname">
                            <InputSimple ref='tname' name="tname" defaultValue={this.order_inp['tname']} onChange={this.orderInpHr} />
                        </FormGroup> }

                        <div className="modal-container__footer">{buttons}</div>
                    </div>
                </div>
            </div>
        )
    }
}

// переделаны на список
// <InputSimple ref='expeditor' name="expeditor" defaultValue={this.order_inp['expeditor']} onChange={this.orderInpHr} />

// заявки пока только от грузовладельца
// <FormGroup name="id грузовладельца" from="shipper">
//                                 <InputSimple ref='shipper' name='shipper' defaultValue={this.order_inp['shipper']} onChange={this.orderInpHr} />
//                                 <p style={{display: 'none'}}>todo: сделать диалог выбора</p>
//                             </FormGroup>


//  раньше было место погрузки и кнопка
// <FormGroup name="Место погрузки" from="lp">
//                             <div className="row row-nw marg-top-s">
//                                 <InputSelect2 ref='lp' name='lp' active={true} noIcon={true} styleGreed={true} list={this.lps_sel} onChanged={this.onLplaceChangeHr}/>
//                                 <ButtonSimple onClick={this.lplaceCreateHandler} type="warning" size="small" caption="Создать новое место погрузки"/>
//                             </div>
//                         </FormGroup>




//  old design
//  return (
        //     <div>
        //         <div style={this.vis(this.lp_add_mode)}>
        //             <h1>Создание места погрузки</h1>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Название</label>
        //                 <InputSimple name="name" onChange={this.lplaceInpHr} />
        //             </FlexBox>
        //             <InputAddress name="addr" onSelect={this.lplaceAddrSelHr} caption="Адрес" active={true} labelWidth={105} />
        //             <div className="box-row-nw just-end marg-t"><TransparentButton onClick={this.lpCreateHr} caption="Создать место погрузки" /></div>
        //             <div className="box-row-nw just-end marg-t"><TransparentButton onClick={this.lpCancelHr} caption="Отмена" /></div>
        //         </div>
        //         <div style={this.vis(!this.lp_add_mode)}>
        //             <h1>{order_title}</h1>

        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">место погрузки</label>
        //                 <InputSelect2 ref='lp' active={true} noIcon={true} list={this.lps_sel} onChanged={this.onLplaceChangeHr}/>
        //                 <input type="button" onClick={this.lplaceCreateHandler} value="добавить" />
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Наименование груза</label>
        //                 <InputSimple ref='cargo' name="cargo" defaultValue={this.order_inp['cargo']} onChange={this.orderInpHr} />
        //             </FlexBox>
                    
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">id грузовладельца</label>
        //                 <InputSimple ref='shipper' name='shipper' defaultValue={this.order_inp['shipper']} onChange={this.orderInpHr} />
        //                 <p>todo: сделать диалог выбора</p>
        //             </FlexBox>
                    
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">id экспедитора</label>
        //                 <InputSimple ref='expeditor' name="expeditor" defaultValue={this.order_inp['expeditor']} onChange={this.orderInpHr} />
        //                 <p>todo: сделать диалог выбора</p>
        //             </FlexBox>
                    
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Погрузка / разгрузка</label>
        //                 <InputSelect2 ref='ltype' active={true} noIcon={true} list={this.ltypes} onChanged={this.onLTypeChangeHr}/>
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Получатель</label>
        //                 <label style={{display: 'none'}}> !!! todo !!! сделать диалог выбора получателя</label>
        //                 <InputSimple ref='receiver' name="receiver" defaultValue={this.order_inp['receiver']} onChange={this.orderInpHr} />
        //             </FlexBox>
        //             <InputAddress ref='addr' name="addr" onSelect={this.orderAddrSelHr} caption="Место доставки" active={true} labelWidth={105} />
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Масса, тонн</label>
        //                 <InputSimple ref='mass' name="mass" defaultValue={this.order_inp['mass']} onChange={this.orderInpHr} validation={{typing:Validation.typingFloat}} />
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Объем, куб.м.</label>
        //                 <InputSimple ref='vol' name="vol" defaultValue={this.order_inp['vol']} onChange={this.orderInpHr} validation={{typing:Validation.typingFloat}} />
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Тип ТС</label>
        //                 <InputSelect2 active={true} noIcon={true} list={this.vtypes} onChanged={this.onVTypeChangeHr}/>
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Дата погрузки</label>
        //                 <DatePicker dateFormat="YYYY-MM-DD" selected={moment(ltime)} onChange={this.onLTimeChangeHr} />
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Дата разгрузки</label>
        //                 <DatePicker dateFormat="YYYY-MM-DD" selected={moment(utime)} onChange={this.onUTimeChangeHr} />
        //             </FlexBox>
        //             <FlexBox direction="row" alignItems="center">
        //                 <label className="label label-width-md">Заметка</label>
        //                 <InputSimple ref='note' name="note" defaultValue={this.order_inp['note']} onChange={this.orderInpHr} />
        //             </FlexBox>
        //             {bt_submit}
        //             {bt_cancel}
        //         </div>
        //     </div>
        // )