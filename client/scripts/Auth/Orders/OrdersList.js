var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DatePicker = require('react-datepicker');
var moment = require('moment');

import {Api, xreq} from '../../api';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';
import {AppState} from '../Dashboard';
import {Events} from '../../Dispatcher';
import {OrderCreate} from './OrderCreate';
import {Validation} from '../../Validation';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {InputSelect2} from '../../SimpleComponents/InputSelect2';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {Icon} from '../../Controls/Icon';


export class OrdersList extends React.Component {
    
    state = {
        offerCreateExtPark: false,      // (bool) использовать для закрытия заказа параметры перевозчика, которого нет в системе
    };  
    
    ordering_src = [  // дата провайдер для выбора сортировки сортировки
        {id: 'orderByTime',  value: 'дате',  __selected__: true},
        {id: 'expname',      value: 'экспедиторам'},
        {id: 'lpaddr',       value: 'месту погрузки'}
    ];
    ordering_focus = this.ordering_src[0].id;   // текущая сортировка
    
    orders_loader  = null;  // загрузчик заявок (xreq)
    orders_data    = null;  // хранилище загруженных заявок (object)
    
    order_manager  = null;  // удалятель/открыватель/сниматель/... заявок (xreq)
    order_edit     = null;  // редактируемая заявка (object)

    // order_copy     = false; // редактируемая заявка (boolean)
    edit_type      = null;  // тип редактирования (string: copy|tmpl)
    
    offer_obj      = null;  // (object) заявка которая в фокусе предложения
    offer_inp      = {};    // (object) ввод предложения
    
    offers_obj     = null;  // заявка в фокусе просмотра предложений
    offers_loader  = null;  // загрузчик предложений (xreq)
    offers_data    = null;  // хранилище загруженных предложений (object)
    
    cancel_order   = null;  // (object) фокус на отменяемой заявке
    cancel_inp     = {};    // (object) хранилище для инпута причины отмены
    
    shipping_order = null;  // (object) фокус на заявке которую перевозим в "перевозку"
    done_order     = null;  // (object) фокус на заявке которую перевозим в "доставлено"
    
    memo_order     = null;  // (object) фокус на заявке для которой делается заметка
    memo_inp       = {};    // (object) хранилище для инпута заметки
    
    bid_inp        = {};    // (object) ввод торгов

    componentWillMount=()=>{
        //logger.log(this, 'mount');
        Events.on('EV_ORDER_FLOW', this.orderFlowHr);
        Events.on('EV_ORDER_OFFER_FLOW', this.orderOfferFlowHr);

        this.loadVehicles();
    }
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        this.orderLoaderStop();
        this.orderManagerStop();
        this.offersLoaderStop();
        Events.rem('EV_ORDER_FLOW', this.orderFlowHr);
        Events.rem('EV_ORDER_OFFER_FLOW', this.orderOfferFlowHr);
    }
    
    render=()=>{
        //logger.log(this, 'render');
        
        moment.locale('ru');
        
        let k = 789456;
        
        let generate_fields=()=>{
            switch (this.props['type']) {
                
                // шаблоны заказов
                case 'templates': return ['id', 'tname', 'lpid', 'lpname', 'cargo', 'ltype', 'mass', 'vol', 'vtype', 'ltime', 'utime', 'receiver', 'addr', 'x', 'y', 'note', 'expid', 'expname'];
                
                // заявки созданне своей компаний
                case 'created': return ['id', 'cid', 'shid', 'shname', 'cargo', 'createts', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'x', 'y', 'note', 'memo'];
                
                // все открытые заявки
                case 'opened': return ['id', 'cid', 'shid', 'shname', 'cargo', 'opents', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'oid', 'ocprice', 'oeprice', 'memo'];
                
                // закрытые заявки
                case 'closed': return ['id', 'cid', 'shid', 'shname', 'cargo', 'closets', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'crid', 'crname', 'vid', 'vmodel', 'vnum', 'price', 'memo', 'did', 'dln', 'dfn', 'ecveh', 'ectr', 'ecdfio', 'ecddoc'];
                
                // закрытые заявки
                case 'canceled': return ['id', 'cid', 'shid', 'shname', 'cargo', 'cancelts', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'crid', 'crname', 'vid', 'vmodel', 'vnum', 'price', 'creason', 'memo', 'did', 'dln', 'dfn', 'ecveh', 'ectr', 'ecdfio', 'ecddoc'];
                
                // перевозка
                case 'shipping': return ['id', 'cid', 'shid', 'shname', 'cargo', 'shipts', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'crid', 'crname', 'vid', 'vmodel', 'vnum', 'price', 'creason', 'memo', 'did', 'dln', 'dfn', 'ecveh', 'ectr', 'ecdfio', 'ecddoc'];
                
                // выполненные
                case 'done': return ['id', 'cid', 'shid', 'shname', 'cargo', 'donets', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'crid', 'crname', 'vid', 'vmodel', 'vnum',  'price', 'creason', 'memo', 'did', 'dln', 'dfn', 'ecveh', 'ectr', 'ecdfio', 'ecddoc'];
                
                // архив
                case 'archive': return ['id', 'cid', 'shid', 'shname', 'cargo', 'arhts', 'lpid', 'lpname', 'lpaddr', 'mass', 'vol', 'vtype', 'ltype', 'receiver', 'utime', 'ltime', 'expid', 'expname', 'addr', 'note', 'crid', 'crname', 'vid', 'vmodel', 'vnum', 'driver', 'price', 'creason', 'memo', 'did', 'dln', 'dfn', 'ecveh', 'ectr', 'ecdfio', 'ecddoc'];
                
            }
            return [];
        }
        
        let generate_filters=()=>{
            switch (this.props['type']) {
                case 'templates':  return [['state', 'eq', 'template']];  // шаблоны заказов
                case 'created':  return [['state', 'eq', 'created']];   // заявки созданне своей компаний
                case 'opened':   return [['state', 'eq', 'opened']];    // все открытые заявки
                case 'closed':   return [['state', 'eq', 'closed']];    // закрытые заявки
                case 'canceled': return [['state', 'eq', 'canceled']];  // отмененные заявки
                case 'shipping': return [['state', 'eq', 'shipping']];  // перевозка
                case 'done':     return [['state', 'eq', 'done']];      // доставлено
                case 'archive':  return [];                             // в архиве в общем то могут быть любые заявки но, скорее всего, будут только доставленные, фильтр состояния стоит оставить пустым на случай если все таки состояния как им то образом поменяются
            }
            return [];
        }
        
        let generate_orger_canceler=(o)=>{

            if( this.cancel_order != null &&  this.cancel_order['id'] == o['id'] ) {
                return (
                    <div className="padd-top-s">
                        <div className="orders-popup-form__caller">Отменить заказ?</div>
                        <div className="orders-popup-form" data-context="offer">
                            <InputSimple ref='reason' name='reason' autoFocus={true} placeholder="укажите причину отмены" onChange={this.orderCancelInpHr} />
                            <div className="modal-container__footer">
                                <ButtonSimple onClick={this.orderCancleConfirmHr.bind(null, o)} brand="danger" size="small" caption="Отменить заказ"/>
                                <ButtonSimple onClick={this.orderCancleClickHr.bind(null, null)} brand="success" size="small" caption="Не отменять"/>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <ButtonSimple onClick={this.orderCancleClickHr.bind(null, o)} brand="danger" size="small" caption="Отменить заказ"/>;
            }
        }
        
        let generate_orger_memoer=(o)=>{

            if( this.memo_order != null && this.memo_order['id'] == o['id'] ) {
                return(
                    <div>
                        <div className="orders-popup-form__caller">Введите текст заметки</div>
                        <div className="orders-popup-form" data-context="note">
                            <InputSimple ref='memo' name='memo' defaultValue={o['memo']} autoFocus={true} onChange={this.orderMemoInpHr} />
                            <div className="modal-container__footer">
                                <ButtonSimple onClick={this.orderMemoConfirmHr.bind(null, o)} brand="success" size="small" caption="Сохранить"/>
                                <ButtonSimple onClick={this.orderMemoClickHr.bind(null, null)} brand="warning" size="small" caption="Отменить"/>
                            </div>
                         </div>
                    </div>
                )
            } else {
                return <div className="orders-table__actions-memo"><ButtonSimple onClick={this.orderMemoClickHr.bind(null, o)} brand="success" size="small" caption={o['memo'] ? "Изменить заметку" : "Сделать заметку"}/></div>;
            }
        }


        let generate_order_actions=(o)=>{

            switch (this.props['type']) {

                // <ButtonSimple onClick={this.templateClickHr.bind(null, o)} type="success" size="small" caption="Использовать"/>
                // <ButtonSimple onClick={this.editBeginHr.bind(null, o)} type="warning" size="small" caption="Изменить"/>
                
                case 'templates':  // шаблон заказа
                    return (
                        <div className="orders-table__actions-btn">
                            <ButtonSimple onClick={this.editBeginHr.bind(null, o, 'copy')} brand="success" size="small" caption="Использовать"/>
                            <ButtonSimple onClick={this.editBeginHr.bind(null, o, 'tmpl')} brand="warning" size="small" caption="Изменить"/>
                            <ButtonSimple onClick={this.delClickHr.bind(null, o)} brand="danger" size="small" caption="Удалить"/>
                        </div>
                    );
                    
                case 'created':  // заявка созданная своей компаний
                    return (
                        <div className="orders-table__actions-btn">
                            <ButtonSimple onClick={this.openClickHr.bind(null, o)} brand="success" size="small" caption="Разместить"/>
                            <ButtonSimple onClick={this.editBeginHr.bind(null, o)} brand="warning" size="small" caption="Изменить"/>
                            <ButtonSimple onClick={this.delClickHr.bind(null, o)} brand="danger" size="small" caption="Удалить"/>
                        </div>
                    );

                case 'opened':  // открытая заявки
                    // let shipperOrExpeditor = Utils.isElementInArray(AppState.myCompany.id, [o['shid'], o['expid']]);
                    // let сanMakeOffer = !shipperOrExpeditor && o['oid'] == null && this.offer_obj == null;
                    let сanMakeOffer = AppState.myCompany.id != o['shid'] && o['oid'] == null && this.offer_obj == null;

                    // <InputSimple ref='drv' name='drv' defaultValue={this.offer_inp['drv']} onChange={this.offerInpHr} />
                    // <InputSimple ref='veh' name='veh' defaultValue={this.offer_inp['veh']} onChange={this.offerInpHr} />
                    
                    // logger.log('offers', this, o);

                    return (
                        <div>
                            {(o['cid'] == AppState.myCompany.id) 
                                ? <ButtonSimple onClick={this.backClickHr.bind(null, o)} brand="danger" size="small" caption="Снять заказ с размещения"/> 
                                : null}

                            {сanMakeOffer 
                                ? <div className="orders-popup-form__caller"><ButtonSimple onClick={this.offerClickHr.bind(null, o)} brand="success" size="small" caption="Сделать предложение"/></div>
                                : null}

                            { this.offer_obj != null && this.offer_obj['id'] == o['id']
                              ? <div>
                                    <div className="orders-popup-form__caller">Ваше предложение</div>
                                    <div className="orders-popup-form" data-context="offer">
                                        <div className="orders-popup-form__make-offer" data-state="make-offer">
                                            { AppState.myCompany.id == o['expid'] &&
                                            <div className="orders-popup-form__tab">
                                                <div className="orders-popup-form__tab-left pointer" data-state={!this.state.offerCreateExtPark && 'active'} onClick={this.offerCreateTogglePark}>Мой парк</div>
                                                <div className="orders-popup-form__tab-right pointer" data-state={this.state.offerCreateExtPark && 'active'} onClick={this.offerCreateTogglePark}>Внешний парк</div>
                                            </div> }  
                                            { this.state.offerCreateExtPark && AppState.myCompany.id == o['expid']
                                                ?
                                                <div>
                                                    <FormGroup name="Данные ТС" from="vehicle">
                                                        <InputSimple ref='vehicle' name='vehicle' onChange={this.offerInpHr} />
                                                    </FormGroup>
                                                    <FormGroup name="Данные прицепа (опция)" from="trailer">
                                                        <InputSimple ref='trailer' name='trailer' onChange={this.offerInpHr} />
                                                    </FormGroup>
                                                     <FormGroup name="ФИО водителя" from="dfio">
                                                        <InputSimple ref='dfio' name='dfio' onChange={this.offerInpHr} />
                                                    </FormGroup>
                                                     <FormGroup name="Документы водителя" from="ddoc">
                                                        <InputSimple ref='ddoc' name='ddoc' onChange={this.offerInpHr} />
                                                    </FormGroup>
                                                    <FormGroup name="Сумма сделки (опция)" from="price">
                                                        <InputSimple ref='price' name='price' castTo='number' onChange={this.offerInpHr} validation={{typing:Validation.typingFloat}} />
                                                    </FormGroup>
                                                    <div className="modal-container__footer">
                                                        <ButtonSimple onClick={this.offerCreateClickHr.bind(null, o, 'my-park')} brand="success" caption="Взять заказ"/>
                                                        <ButtonSimple onClick={this.offerCreateClickHr.bind(null, null)} brand="warning" caption="Отмена"/>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <FormGroup name="Водитель" from="drv">
                                                        <InputSelect2 ref='drv' name='drv' active={true} noIcon={true} list={this.getDriversList()} onChanged={this.onDriverChangeHr}/>
                                                    </FormGroup>
                                                    <FormGroup name="Транспортное средство" from="veh">
                                                        <InputSelect2 ref='veh' name='veh' active={true} noIcon={true} list={this.getVehicleList()} onChanged={this.onVehicleChangeHr}/>
                                                    </FormGroup>
                                                    <FormGroup name="Ваша цена" from="bid">
                                                        <InputSimple ref='bid' name='bid' defaultValue={this.offer_inp['bid']} castTo='number' onChange={this.offerInpHr} validation={{typing:Validation.typingFloat}} />
                                                    </FormGroup>
                                                    <div className="modal-container__footer">
                                                        <ButtonSimple onClick={this.offerCreateClickHr.bind(null, o, 'regular-bid')} brand="success" caption="Сделать предложение"/>
                                                        <ButtonSimple onClick={this.offerCreateClickHr.bind(null, null)} brand="warning" caption="Отмена"/>
                                                    </div>
                                                </div>
                                            }
                                            
                                        </div>
                                     </div>
                                </div>
                                : null }

                            {o['oid'] != null ? (
                                o['ocprice'] != null ?
                                    <div>
                                        <span className="orders-table__my-price">Мое предложение:</span>
                                        <span className="orders-table__my-price-value">{o['ocprice']} руб.</span>
                                    </div>
                                    :
                                    <div>
                                        <div className="orders-table__expeditor-price">
                                            <div className="orders-table__expeditor-price-title">Предложение экспедитора:</div>
                                            <div className="orders-table__expeditor-price-accept">
                                                <span className="orders-table__expeditor-price-value">{o['oeprice']} руб.</span><ButtonSimple onClick={this.offerBidClickHr.bind(null, o['oid'], o['oeprice'])} brand="warning" size="small" caption="Принять"/>
                                            </div>
                                        </div>
                                        <div className="orders-table__offer-price">
                                            <div className="orders-table__offer-price-input">
                                                <InputSimple ref='price' name='price' castTo='number' onChange={this.orderOfferPriceInpHr} placeholder="или укажите вашу цену" validation={{typing:Validation.typingFloat}} />
                                            </div>
                                            <div className="orders-table__offer-price-set">
                                                <ButtonSimple onClick={this.offerBidClickHr.bind(null, o['oid'], null)} brand="success" size="small" caption="Предложить свою цену"/>
                                            </div>
                                        </div>
                                    </div>
                            ) : null}

                            {o['expid'] == AppState.myCompany.id ?
                                (
                                    this.offers_obj != null && this.offers_obj['id'] == o['id'] ? 
                                            (<div onClick={this.offersListClickHr.bind(null, null)}><span className="orders-table__offer-hide">Свернуть предложения</span></div>)
                                        : (true) 
                                            ? (<div onClick={this.offersListClickHr.bind(null, o)}><span className="orders-table__offer-show">Посмотреть предложения</span></div>)
                                            : (<div>Нет предложений</div>)
                                )
                                : null}
                        </div>
                    );

                case 'closed':  // закрытая заявка

                    return (
                        <div className="orders-table__actions-btn">
                            {(Utils.isElementInArray(AppState.myCompany.id, [o['expid'], o['crid']])) ?
                                (
                                    this.shipping_order != null && this.shipping_order['id'] == o['id'] ? 
                                        <div>
                                            <div className="orders-popup-form__caller">Дата начала погрузки</div>
                                            <div className="orders-popup-form" data-context="offer">
                                                <DatePicker ref='shipping_date' dateFormat='YYYY-MM-DD' selected={moment(Utils.timestamp2YYYYMMDD(Math.floor((new Date().getTime()) / 1000)))} />
                                                <div className="modal-container__footer">
                                                    <ButtonSimple onClick={this.orderShippingConfirmClickHr.bind(null, o)} brand="warning" size="small" caption="Начать погрузку"/>
                                                    <ButtonSimple onClick={this.orderShippingConfirmClickHr.bind(null, null)} brand="success" size="small" caption="Отмена"/>
                                                </div>
                                            </div>
                                        </div>
                                            :
                                        <ButtonSimple onClick={this.orderShippingClickHr.bind(null, o)} brand="warning" size="small" caption="Прибыл на погрузку"/>
                                        
                                ) : null}

                            {(Utils.isElementInArray(AppState.myCompany.id, [o['expid'], o['crid'], o['shid']])) ? generate_orger_canceler(o) : null}
                        </div>
                    );

                case 'shipping':  // заявка в состоянии "перевозка"

                    return (
                        <div>
                            {(Utils.isElementInArray(AppState.myCompany.id, [o['expid'], o['crid']])) ?
                                (
                                    this.done_order == null ?
                                        <ButtonSimple onClick={this.orderDoneClickHr.bind(null, o)} brand="warning" size="small" caption="Доставлена"/>
                                        :
                                        <div>
                                            <div className="orders-popup-form__caller">Дата доставки</div>
                                            <div className="orders-popup-form" data-context="offer">
                                                <DatePicker ref='done_date' dateFormat='YYYY-MM-DD' selected={moment(Utils.timestamp2YYYYMMDD(Math.floor((new Date().getTime()) / 1000)))} />
                                                <div className="modal-container__footer">
                                                    <ButtonSimple onClick={this.orderDoneConfirmClickHr.bind(null, o)} brand="warning" size="small" caption="Подтвердить перевозку"/>
                                                    <ButtonSimple onClick={this.orderDoneConfirmClickHr.bind(null, null)} brand="success" size="small" caption="Отмена"/>
                                                </div>
                                            </div>
                                        </div>
                                ) : null}
                        </div>
                    );

                case 'done':  // заявка в состояни "дотсавлена"
                    return (
                        <div>
                            {(Utils.isElementInArray(AppState.myCompany.id, [o['expid'], o['crid'], o['shid']])) ? <ButtonSimple onClick={this.orderArhClickHr.bind(null, o)} brand="warning" size="small" caption="Архивировать"/> : null}
                        </div>
                    );

            }

            return null;
        }
        
        let generate_title=()=>{
            switch (this.props['type']) {
                case 'templates': return 'Шаблоны';
                case 'created':   return 'Новые заказы';
                case 'opened':    return 'Открытые заказы';
                case 'closed':    return 'Закрытые заказы';
                case 'shipping':  return 'Перевозка';
                case 'done':      return 'Доставленные заказы';
                case 'canceled':  return 'Отмененные заказы';
                case 'archive':   return 'Архивные заказы';
            }
            return null;
        }
        
        let generate_offer_actions=(order, offer)=>{
            
            let isExp = order['expid'] == AppState.myCompany.id;
            
            if (offer['cprice'] != null) {

                if (isExp) {
                    return (
                        <td>
                            <div className="orders-table__expeditor-price">
                                <div className="orders-table__expeditor-price-title">Предложение перевозчика:</div>
                                <div className="orders-table__expeditor-price-accept">
                                    <span className="orders-table__expeditor-price-value">{offer['cprice']} руб.</span><ButtonSimple onClick={this.offerBidClickHr.bind(null, offer['id'], offer['cprice'])} brand="warning" size="small" caption="Принять"/>
                                </div>
                            </div>
                            <div className="orders-table__offer-price">
                                <div className="orders-table__offer-price-input">
                                    <InputSimple ref='price' name='price' castTo='number' onChange={this.orderOfferPriceInpHr} placeholder="или укажите вашу цену" validation={{typing:Validation.typingFloat}} />
                                </div>
                                <div className="orders-table__offer-price-set">
                                    <ButtonSimple onClick={this.offerBidClickHr.bind(null, offer['id'], null)} brand="success" size="small" caption="Предложить свою цену"/>
                                </div>
                            </div>
                        </td>
                    )
                } else {
                    return <td>Мы перевезем за: <strong>{offer['cprice']}</strong> руб.<br/></td>;
                }

                // if (isExp) {
                //     return [
                //         <td>
                //             Перевозчик предлагает:<br/>
                //             Стоимость: {offer['cprice']} <a onClick={this.offerBidClickHr.bind(null, offer['id'], offer['cprice'])}>[принять]</a>
                //         </td>,
                //         <td>
                //             <InputSimple ref='price' name='price' onChange={this.orderOfferPriceInpHr} validation={{typing:Validation.typingFloat}} /><br/>
                //             <a onClick={this.offerBidClickHr.bind(null, offer['id'], null)}>[предложить свою цену]</a>
                //         </td>
                //     ];
                // } else {
                //     return <td>мы перевезем за: {offer['cprice']}<br/></td>;
                // }
            }
            
            if (offer['eprice'] != null) {

                if (isExp) {
                    return <td>Мы экспедируем за: <strong>{offer['eprice']}</strong> руб.<br/></td>;
                } else {
                    return (
                        <td>
                            <div className="orders-table__expeditor-price">
                                <div className="orders-table__expeditor-price-title">Предложение экспедитора:</div>
                                <div className="orders-table__expeditor-price-accept">
                                    <span className="orders-table__expeditor-price-value">{offer['eprice']} руб.</span><ButtonSimple onClick={this.offerBidClickHr.bind(null, offer['id'], offer['eprice'])} brand="warning" size="small" caption="Принять"/>
                                </div>
                            </div>
                            <div className="orders-table__offer-price">
                                <div className="orders-table__offer-price-input">
                                    <InputSimple ref='price' name='price' castTo='number' onChange={this.orderOfferPriceInpHr} placeholder="или укажите вашу цену" validation={{typing:Validation.typingFloat}} />
                                </div>
                                <div className="orders-table__offer-price-set">
                                    <ButtonSimple onClick={this.offerBidClickHr.bind(null, offer['id'], null)} brand="success" size="small" caption="Предложить свою цену"/>
                                </div>
                            </div>
                        </td>
                    )
                }

                // if (isExp) {
                //     return <td>мы экспедируем за: {offer['eprice']}<br/></td>;
                // } else {
                //     return [
                //         <td>
                //             Экспедитор предлагает:<br/>
                //             Стоимость: {offer['eprice']} <a onClick={this.offerBidClickHr.bind(null, offer['id'], offer['eprice'])}>[принять]</a>
                //         </td>,
                //         <td>
                //             <InputSimple ref='price' name='price' onChange={this.orderOfferPriceInpHr} validation={{typing:Validation.typingFloat}} /><br/>
                //             <a onClick={this.offerBidClickHr.bind(null, offer['id'], null)}>[предложить свою цену]</a>
                //         </td>
                //     ];
                // }
            }
            
            return null;
            
        }
        
        let generate_offers_content=(order)=>{
            
            let cont = [];
            
            if ('err' in this.offers_data) return (<div>Предложения не загружены: {this.offers_data.msg}</div>);  // загружены с ошибкой
            if (!Utils.isArray(this.offers_data['data'])) return (<div>не загружены: list.data required</div>);  // api не вернул data
            
            for (let i = 0, l = this.offers_data['data'].length; i < l; i++) {
                
                let ofr = this.offers_data['data'][i];
                console.debug('offer', ofr)
                
                let ctime = new Date(ofr['ts'] * 1000).toLocaleString('ru-RU', {year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'});
                
                // <td>ТС: <a tagert='_blank' href={'?vehicle_id=' + ofr['vid']}>{ofr['vmodel']} ({ofr['vnum']})</a><br/>Водитель: <a target='_blank' href={'?user_id=' + ofr['did']}>{ofr['dln']} {ofr['dfn']}</a></td>

                cont.push(
                    <tr key={k++} style={{backgroundColor: '#eee'}}>
                        <td><span className="orders-table__order-num">#{ofr['id']}</span><br/>{ctime}</td>
                        <td>
                            <span className="orders-table__s-title">Перевозчик</span>: <a target='_blank' href={'#/dashboard/comp/' + ofr['cid']}>{ofr['cname']}</a><br/>
                            <span className="orders-table__s-title">ТС</span>: {ofr['vmodel']} ({ofr['vnum']})<br/>
                            <span className="orders-table__s-title">Водитель</span>: {ofr['dln']} {ofr['dfn']}<br/>
                        </td>
                        {generate_offer_actions(order, ofr)}
                    </tr>
                );
                
            }
            
            return (<table cellSpacing={1}><tbody>{cont}</tbody></table>);
            
        }
        
        let generate_order_cost=(o)=>{
            // грузовладелец не должен видеть договорной цены
            return AppState.myCompany.id != o['shid'] ? <div><span className="orders-table__s-title">Цена</span>: {o['price']} руб.<br/></div> : null;
        }
        
        let generate_extra_order_data=(o)=>{
            if (this.props['type'] == 'created' || this.props['type'] == 'opened' || this.props['type'] == 'templates') return null;

            let shipperData = "не указан";
            let tsData = "не указано";
            let driverData = "не указан";

            if( o['crid'] && o['crname'] ) {
                shipperData = <a target='_blank' href={'#/dashboard/comp/' + o['crid']}>{o['crname']}</a>
            // если есть указанные экспедитором данные, перевозчиком ставим экспедитора 
            } else if ( o['ecveh'] && o['ecdfio'] ) {
                shipperData = <a target='_blank' href={'#/dashboard/comp/' + o['expid']}>{o['expname']}</a>
            }

            if( o['vmodel'] || o['vnum'] ) {
                tsData = o['vmodel'] ? o['vmodel'] : '';
                tsData += o['vnum'] ? ' ('+o['vnum']+')' : '';
            } else if( o['ecveh'] || o['ectr'] ) {
                tsData = o['ecveh'] ? o['ecveh'] : '';
                tsData += o['ectr'] ? ' ('+o['ectr']+')' : '';
            }

            if( o['dln'] || o['dfn'] ) {
                driverData = o['dln'] ? o['dln'] : '';
                driverData += o['dfn'] ? ' '+o['dfn'] : '';
            } else if( o['ecdfio'] || o['ecddoc'] ) {
                driverData = o['ecdfio'] ? o['ecdfio'] : '';
                driverData += o['ecddoc'] ? ' ('+o['ecddoc']+')' : '';
            }

            return (
                <div>
                <br />
                <span className="orders-table__s-title">Перевозчик</span>: {shipperData}<br/>
                <span className="orders-table__s-title">ТС</span>: {tsData}<br/>
                <span className="orders-table__s-title">Водитель</span>: {driverData}<br/>
                {generate_order_cost(o)}
                </div>
            );
        }
        
        let generate_order_times=(o)=>{
            switch (this.props['type']) {
                case 'created':   return <div className="orders-table__s-title">Создана <span className="orders-table__order-num">{Utils.ts2tmdhms(o['createts'])}</span></div>;
                case 'opened':    return <div className="orders-table__s-title">Размещена <span className="orders-table__order-num">{Utils.ts2tmdhms(o['opents'])}</span></div>;
                case 'closed':    return <div className="orders-table__s-title">Закрыта <span className="orders-table__order-num">{Utils.ts2tmdhms(o['closets'])}</span></div>;
                case 'shipping':  return <div className="orders-table__s-title">Перевозка <span className="orders-table__order-num">{Utils.ts2tmdhms(o['shipts'])}</span></div>;
                case 'done':      return <div className="orders-table__s-title">Доставлено <span className="orders-table__order-num">{Utils.ts2tmdhms(o['donets'])}</span></div>;
                case 'archive':   return <div className="orders-table__s-title">Архивировано <span className="orders-table__order-num">{Utils.ts2tmdhms(o['arhts'])}</span></div>;
                case 'canceled':  return <div className="orders-table__s-title">Отменена <span className="orders-table__order-num">{Utils.ts2tmdhms(o['cancelts'])}</span></div>;
            }
            return null;
        }
        
        let get_time_field=()=>{
            switch (this.props['type']) {
                case 'created':   return 'createts';
                case 'opened':    return 'opents';
                case 'closed':    return 'closets';
                case 'shipping':  return 'shipts';
                case 'done':      return 'donets';
                case 'archive':   return 'arhts';
                case 'canceled':  return 'cancelts';
            }
            return null;
        }
        
        let generate_orders_content=()=>{
            
            if (this.orders_data == null) {  // места погрузки не загружены
                if (this.orders_loader == null) {  // места погрузки не загружаются
                    // todo: сделать компопнент типа bufferedTable (успех такой операции маловероятен)
                    this.orders_loader = new xreq('orders_list', {
                        archive: this.props['type'] == 'archive',
                        fields: generate_fields(),
                        filters: generate_filters(),
                        orderBy: this.ordering_focus == 'orderByTime' ? get_time_field() : this.ordering_focus,   // если выбрана сортировка по времени, то у каждого раздела свое поле времени
                        limit: 500
                    }, this.ordersLoaderHr);  // загружаем места погрузки
                }
                return (<div>загрузка ...</div>);
            }
            
            if ('err' in this.orders_data) return (<div>Заказы не загружены: {this.orders_data.msg}</div>);  // места погрузок загружены с ошибкой
            if (!Utils.isArray(this.orders_data['data'])) return (<div>места погрузки не загружены: list.data required</div>);  // api не вернул data
            
            //console.debug(this.orders_data);
            
            let day_last = 0;
            let cont = [];
            
            for (let i = 0, l = this.orders_data['data'].length; i < l; i++) {
                
                let o = this.orders_data['data'][i];
                let time_field = get_time_field();
                
                if (this.ordering_focus == 'orderByTime' && this.props['type'] != 'templates' ) {  // использована сортировка по времени, 
                                                                                                   // значит можно сделать группировку по дням
                    let t = o[time_field] || Math.floor((new Date()).getTime() / 1000);
                    let day_cur = Math.ceil(t / 60 / 60 / 24);  // номер дня
                    if (day_last != day_cur) {  // номер дня сменился, рисуем его
                        cont.push(
                            <tr key={k++}>
                                <td colSpan={5} className="orders-table__date">{moment(t * 1000).format("D MMMM")}</td>
                            </tr>
                        );
                        day_last = day_cur;  // запоминаем какой номер дня в фокусе
                    }
                }

                if( this.props['type'] == 'templates' ) {

                    // вывод шаблонов
                    cont.push(
                        <tr key={k++}>
                            <td colSpan={4}>
                                <div className="orders-table__lp-name">{o['tname']}</div>
                                <div><span className="orders-table__s-title">Место погрузки:</span> {o['lpname']}</div>
                                {o['lpaddr'] && 
                                    <div><span className="orders-table__s-title">Погрузка:</span> {o['lpaddr']}</div>
                                }
                                {o['addr'] && 
                                    <div><span className="orders-table__s-title">Доставка:</span> {o['addr']}</div>
                                }
                            </td>
                            <td className="text-right">{generate_order_actions(o)}</td>
                        </tr>
                    );

                } else {

                    // остальные состояния заказа, кроме шаблонов
                    cont.push(
                        <tr key={k++} data-state={(this.offer_obj != null && this.offer_obj['id'] == o['id']) || (this.offers_obj != null && this.offers_obj['id'] == o['id']) ? "active" : ''}>
                            <td>
                                <div className="row row-between">
                                    <div>
                                        <span className="orders-table__order-num">#{o['id']}</span> 
                                        <span className="orders-table__lp-name">{o['lpname']}</span>
                                    </div>
                                    <div className="row row-space-children-xs">
                                        { (o['cid'] == AppState.myCompany.id) ? <span data-tooltip="Копировать"><Icon name="copy" size={20} onClick={this.editBeginHr.bind(null, o, 'copy')}/></span> : null }
                                        <span data-tooltip="Экспорт в Excel"><Icon name="file-download" size={20} onClick={this.orderExportClickHr.bind(null, o)}/></span>
                                    </div>
                                </div>
                                <div className="orders-table__s-title padd-top-s">Погрузка</div>
                                <div className="orders-table__address">{o['lpaddr']}</div>
                                <div className="orders-table__s-title padd-top-s">Доставка</div>
                                <div className="orders-table__address">{o['addr']}</div>
                            </td>
                            <td>
                                <div className="orders-table__s-title">Грузополучатель</div>
                                {o['receiver']}
                                 <div className="orders-table__s-title padd-top-s">Груз</div>
                                <div className="orders-table__cargo">{o['cargo']}: {o['mass']}&nbsp;т, {o['vol']}&nbsp;м<sup>3</sup>, {this.ltype2txt(o['ltype'])}, {this.vtype2txt(o['vtype'])}</div>
                            </td>
                            <td><div className="orders-table__s-title">Дата выгрузки</div>{Utils.timestamp2YYYYMMDD(o['utime'])}</td>
                            <td>
                                <div className="orders-table__s-title">Грузовладелец <a target='_blank' href={'#/dashboard/comp/' + o['shid']}>{o['shname']}</a></div>
                                <div className="orders-table__s-title">Экспедитор <a target='_blank' href={'#/dashboard/comp/' + o['expid']}>{o['expname']}</a></div>
                                <div className="orders-table__s-title padd-top-s">Примечание</div> {o['note']}
                                {generate_extra_order_data(o)}
                            </td>
                            <td>
                                <div className="orders-table__actions">
                                {generate_order_times(o)}
                                {(o['memo'] || '').length > 0 ? <div><span className="orders-table__s-title">Заметка</span> {o['memo']}</div> : null}
                                {(Utils.isElementInArray(AppState.myCompany.id, [o['expid'], o['crid'], o['shid']])) ? generate_orger_memoer(o) : null}
                                {generate_order_actions(o)}
                                {this.props['type'] == 'canceled' ? <div><span className="orders-table__s-title">Причина отмены</span> {o['creason']}</div> : null}
                                </div>
                            </td>
                        </tr>
                    );
                }
                
                // сделано на всплывающем окне
                // 
                // if (this.offer_obj != null && this.offer_obj['id'] == o['id']) {
                //     cont.push(
                //         <tr key={k++}>
                //             <td colSpan={5}>
                //                 <FormGroup name="id водителя" from="drv">
                //                     <InputSimple ref='drv' name='drv' defaultValue={this.offer_inp['drv']} onChange={this.offerInpHr} />
                //                 </FormGroup>
                //                 <FormGroup name="id ТС" from="veh">
                //                     <InputSimple ref='veh' name='veh' defaultValue={this.offer_inp['veh']} onChange={this.offerInpHr} />
                //                 </FormGroup>
                //                  <FormGroup name="Ваша цена" from="bid">
                //                     <InputSimple ref='bid' name='bid' defaultValue={this.offer_inp['bid']} onChange={this.offerInpHr} validation={{typing:Validation.typingFloat}} />
                //                 </FormGroup>
                //                 <div className="modal-container__footer">
                //                     <ButtonSimple onClick={this.offerCreateClickHr.bind(null, o)} type="success" caption="Сделать предложение"/>
                //                     <ButtonSimple onClick={this.offerCreateClickHr.bind(null, null)} type="warning" caption="Отмена"/>
                //                 </div>
                //             </td>
                //         </tr>
                //     );
                // }

                    //- old design
                    // <tr key={k++}>
                    //         <td colSpan={5}>
                    //             id водителя: <InputSimple ref='drv' name='drv' defaultValue={this.offer_inp['drv']} onChange={this.offerInpHr} /> (todo: сделать диалог выбора)<br/>
                    //             id TC: <InputSimple ref='veh' name='veh' defaultValue={this.offer_inp['veh']} onChange={this.offerInpHr} /> (todo: сделать диалог выбора)<br/>
                    //             цена: <InputSimple ref='bid' name='bid' defaultValue={this.offer_inp['bid']} onChange={this.offerInpHr} validation={{typing:Validation.typingFloat}} /><br/>
                    //             <a onClick={this.offerCreateClickHr.bind(null, o)}>[Сделать предложение]</a>
                    //             <a onClick={this.offerCreateClickHr.bind(null, null)}>[Отмена]</a>
                    //         </td>
                    //     </tr>
                
                
                if (this.offers_obj != null && this.offers_obj['id'] == o['id']) {
                    if (this.offers_data == null) {  // предложения не загружены
                        if (this.offers_loader == null) {  // и еще не загружаются
                            // todo: сделать компопнент типа bufferedTable
                            this.offers_loader = new xreq('order_offers_list', {
                                fields: ['id', 'ts', 'cid', 'cname', 'vid', 'vnum', 'vmodel', 'did', 'dln', 'dfn', 'cprice', 'eprice'],
                                filters: [['oid', 'eq', this.offers_obj['id']]],
                                limit: 500
                            }, this.offersLoaderHr);  // загружаем места погрузки
                        }
                        cont.push(<tr key={k++}><td colSpan={5}>загрузка ...</td></tr>);
                    } else {
                        cont.push(
                            <tr key={k++}>
                                <td colSpan={5} className="orders-table__offers-td">
                                    <div className="orders-table__offers-list">
                                        {generate_offers_content(o)}
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                }
                
            }
            
            return (<table className="table"><tbody>{cont}</tbody></table>);
            
        }
        
        return (
            <div>
                <div style={this.vis(this.order_edit == null)}>
                    <div className="orders-list__header">
                        <div className="orders-list__title">{generate_title()}</div>
                        { this.props['type'] != 'templates' && 
                            <div className="orders-list__sort">
                                <span>Упорядочить по:</span>
                                <InputSelect2 name="ordering_src" noIcon={true} list={this.ordering_src} onChanged={this.orderingChangeHr} />
                            </div>
                        }
                    </div>
                    <div className="orders-list">
                        {generate_orders_content()}
                    </div>
                </div>
                <div style={this.vis(this.order_edit != null)}>
                    <OrderCreate order={this.order_edit} type={this.edit_type} onCancel={this.editCancelHr} />
                </div>
            </div>
        )
        // (my_comp_id={AppState.myCompany.id})<br />
        //             {generate_title()}<br />
        //             Упорядочить по <InputSelect2 name="ordering_src" list={this.ordering_src} onChanged={this.orderingChangeHr} /><br />
        //             {generate_orders_content()}
        
    }


    offerCreateTogglePark =()=> {
        this.setState({offerCreateExtPark: !this.state.offerCreateExtPark});
    }

    onDriverChangeHr=(caller)=>{ this.offerInpHr({'drv': caller.getSelectedList()[0].id}); }
    onVehicleChangeHr=(caller)=>{ this.offerInpHr({'veh': caller.getSelectedList()[0].id}); }


    // Loading vehicles list once
    veh_loader = null;   // api.xreq
    veh_data = null;
    veh_sel = [];
    veh_loader_stop=()=>{
        if (this.veh_loader) { this.veh_loader.cancel(); this.veh_loader = null; }
    }
    loadVehicles=()=>{
        this.veh_loader_stop();
        let params = {
            comp_id: AppState.myCompany.id,
            fields:  [ "id",
                        "model", 
                        "num", 
                        "type" ]
        };
        this.veh_loader = new xreq('vehicles_list', params, this.onVehiclesLoaded);
    }
    onVehiclesLoaded=(req)=>{
        this.veh_loader_stop();
        if (req.res.err) return;
        this.veh_data = req.res;
        this.forceUpdate();
    }
    getVehicleList =()=> {
        if( this.veh_data && (this.veh_data.data || []).length ) {
            this.veh_sel = [];
            for (let i = 0, l = this.veh_data.data.length; i < l; i++) {
                let o = this.veh_data.data[i];
                if( o['type'] == 'lorry' || o['type'] == 'truck' ) {
                    let type = o['type'] == 'lorry' ? 'Грузовик ' : 'Тягач ';
                    let s = {id: o['id'], value: type+o['model']+', г/н: '+o['num']};
                    // if (this.order_inp['veh'] == o['id']) s.__selected__ = true;
                    this.veh_sel.push(s);
                }
            }
        }
        return this.veh_sel;
    }

    drv_sel = [];
    getDriversList =()=> {
        let drv_list = AppState.myCompany.state.users || [];
        this.drv_sel = [];
        for (let i = 0, l = drv_list.length; i < l; i++) {
            let o = drv_list[i];
            let s = {id: o['id'], value: o['first_name']+' '+o['last_name']};
            // if (this.offer_inp['drv'] == o['id']) s.__selected__ = true;
            this.drv_sel.push(s);
        }
        return this.drv_sel;
    }

    
    vis=(b)=>{ return b ? {} : {display: 'none'}; }
    
    refresh=(onlyOffers = false)=>{
        logger.log(this, 'refresh');
        if( !onlyOffers )  {
            this.orders_data = null;  // стираем загруженные данные заявок
            this.orderLoaderStop();   // прибиваем загрузчик заявок
        }
        this.offers_data = null;  // стираем загруженные данные предложений
        this.offersLoaderStop();  // прибиваем загрузчик предложений
        this.forceUpdate();       // передергиваем
    }
    
    orderLoaderStop=()=> { if (this.orders_loader) { this.orders_loader.cancel(); this.orders_loader = null; } }
    offersLoaderStop=()=>{ if (this.offers_loader) { this.offers_loader.cancel(); this.offers_loader = null; } }
    orderManagerStop=()=>{ if (this.order_manager) { this.order_manager.cancel(); this.order_manager = null; } }
    
    
    // загрузка списка
    
    ordersLoaderHr=(xr)=>{
        logger.log(this, 'ordersLoaderHr');
        this.orderLoaderStop();
        this.orders_data = xr.res;
        this.forceUpdate();
    }
    
    
    // сортировка
    
    orderingChangeHr=(caller)=>{  // изменена сортировка
        logger.log(this, 'orderingChangeHr');
        this.ordering_focus = caller.getSelectedList()[0].id;
        this.refresh();
    }
    
    
    // события
    
    orderFlowHr=(e)=>{  // изменилось состояние заявки
        logger.log(this, 'orderFlowHr');
        //console.debug(e);  // {order_id: 32, state: "created", type: "order_flow"}
        this.refresh();  // todo: сделать что то блее умное чем передернуть все
    }
    
    orderOfferFlowHr=(e)=>{  // изменилось состояние предложения к заявке
        logger.log(this, 'orderOfferFlowHr');
        console.debug(e);  // {order_id: 24, offer_id: 7, type: "order_offer_flow"}
        this.refresh();  // todo: сделать что то блее умное чем передернуть все
    }
    
    
    // шаблоны
    
    templateClickHr=(o)=>{
        logger.log(this, 'templateClickHr');
        this.order_edit = o;
        // this.order_copy = true;
        this.forceUpdate();
    }
    
    
    // размещение
    
    openClickHr=(o)=>{  // клик по "разместить"
        logger.log(this, 'openClickHr');
        if (!confirm('Разместить ' + o['lpname'] + '?')) return;
        if (this.order_manager != null) return;  // менеджер занят
        this.order_manager = new xreq('order_state_flow', {order_id: o['id'], state: 'opened'}, this.openXrHr);  // открываем заявку
    }
    
    openXrHr=(xr)=>{
        logger.log(this, 'openXrHr');
        this.orderManagerStop();  // зачищаем размещатель
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        if ('order_id' in xr.res == false) return Events.runError('api fail: order_id required in answer of order_state_flow request');  // api должен вернуть order_id
        Events.runInfo('Заказ ' + xr.res['order_id'] + ' размещен');
        //this.refresh();  // передергивать не обязательно, т.к. прийдет событие которое обновит сосоятние
    }
    
    
    // редактирование, в случае копирования заказа или изменения шаблона передаем type = copy|tmpl
    
    editBeginHr=(o, type=null)=>{  // клик по "изменить"
        logger.log(this, 'editBeginHr type= ' + type);
        this.order_edit = o;
        this.edit_type = type ? type : null;
        this.forceUpdate();
    }
    
    editCancelHr=()=>{
        logger.log(this, 'editCancelHr');
        this.order_edit = null;
        // this.order_copy = false;
        this.edit_type = null;
        this.forceUpdate();
    }


    // копирование
    // copyBeginHr=(o)=>{
    //     logger.log(this, 'copyBeginHr');
    //     this.order_copy = true;
    //     this.editBeginHr(o);
    // }

    
    // удаление
    
    delClickHr=(o)=>{  // клик по "удалить"
        logger.log(this, 'delClickHr');
        if (!confirm('Удалить ' + o['lpname'] + '?')) return;
        if (this.order_manager) return;  // менеджер занят
        this.order_manager = new xreq('order_manage', {action: 'delete', order_id: o['id']}, this.delXrHr);  // удаляем заявку
    }
    
    delXrHr=(xr)=>{
        logger.log(this, 'delXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        if ('order_id' in xr.res == false) return Events.runError('api fail: order_id required in answer of order_manage request');  // api должен вернуть order_id
        Events.runInfo('Заказ ' + xr.res['order_id'] + ' удален');
        this.refresh();
    }
    
    
    // снятие
    
    backClickHr=(o)=>{  // клик по "снять с размещения"
        logger.log(this, 'backClickHr');
        if (!confirm('Снять с размещения ' + o['lpname'] + '?')) return;
        if (this.order_manager) return;  // менеджер занят
        this.order_manager = new xreq('order_state_flow', {order_id: o['id'], state: 'created'}, this.backXrHr);  // отменяем заявку
    }
    
    backXrHr=(xr)=>{
        logger.log(this, 'backXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        if ('order_id' in xr.res == false) return Events.runError('api fail: order_state_flow answ requreq order_id');  // api должен вернуть order_id
        Events.runInfo('Заказ ' + xr.res['order_id'] + ' отменен');
        //this.refresh();  // передергивать не обязательно, т.к. прийдет событие которое обновит сосоятние
    }
    
    
    // отмена
    
    orderCancleClickHr=(o)=>{
        logger.log(this, 'orderCancleClickHr');
        this.resetFocus();
        this.cancel_order = o;
        this.cancel_inp = {};
        this.forceUpdate();
    }
    
    orderCancelInpHr=(o)=>{ for (var k in o) this.cancel_inp[k] = o[k]; }
    
    orderCancleConfirmHr=(o)=>{
        logger.log(this, 'orderCancleConfirmHr');
        if (!confirm('Отменить заказ ' + o['id'] + '?')) return;
        if (this.order_manager) return;  // менеджер занят
        this.order_manager = new xreq('order_state_flow', {order_id: o['id'], state: 'canceled', reason: this.cancel_inp['reason']}, this.cancelXrHr);  // отменяем заявку
    }
    
    cancelXrHr=(xr)=>{
        logger.log(this, 'cancelXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        if ('order_id' in xr.res == false) return Events.runError('api fail: order_state_flow answ requreq order_id');  // api должен вернуть order_id
        Events.runInfo('Заказ ' + xr.res['order_id'] + ' отменен');
        //this.refresh();  // передергивать не обязательно, т.к. прийдет событие которое обновит сосоятние
    }
    
    
    // заметка
    
    orderMemoClickHr=(o)=>{
        logger.log(this, 'orderMemoClickHr');
        this.resetFocus();
        this.memo_order = o;
        this.memo_inp = {};
        this.forceUpdate();
    }
    
    orderMemoInpHr=(o)=>{ for (var k in o) this.memo_inp[k] = o[k]; }
    
    orderMemoConfirmHr=(o)=>{
        logger.log(this, 'orderMemoConfirmHr');
        if (this.order_manager) return;  // менеджер занят
        this.order_manager = new xreq('order_memo', {order_id: o['id'], memo: this.memo_inp['memo']}, this.memoXrHr);  // делаем заметку
    }
    
    memoXrHr=(xr)=>{
        logger.log(this, 'memoXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        //if ('memo_id' in xr.res == false) return Events.runError('api fail: order_state_flow answ requreq order_id');
        Events.runInfo('Заметка сделана');
        this.memo_order['memo'] = this.memo_inp['memo'];  // напрямую меняем заметку в данных
        this.memo_order = null;  // забываем про фокус на заметке
        this.forceUpdate();  // тупо по-рекатовски перерисовываем тонну дом-а
    }
    
    
    // предложение
    
    offerClickHr=(o)=>{
        logger.log(this, 'offerClickHr');
        this.offer_obj = o;
        this.forceUpdate();
    }
    
    offerInpHr=(o)=>{ for (var k in o) this.offer_inp[k] = o[k]; }
    
    offerCreateClickHr=(o, type="my-park")=>{

        // logger.log(this, 'offerCreateClickHr', this.offer_inp);

        if (o == null) {  // отмена диалога создания предложения
            this.offer_obj = null;
            this.offer_inp = {};  // стираем данные ввода предложения
            this.forceUpdate();
            return;
        }
        if (this.order_manager) return;  // менеджер занят

        // предложение делает экспедитор за перевозчика, которого нет в системе
        if( type == "ext-park" ) {
            let params = {
                order_id:   o['id'],
                vehicle:    this.offer_inp['vehicle'],
                dfio:       this.offer_inp['dfio'],
                ddoc:       this.offer_inp['ddoc']
            };
            if( this.offer_inp['trailer'] ) params.trailer = this.offer_inp['trailer'];
            if( this.offer_inp['price'] ) params.price = this.offer_inp['price'];

            this.order_manager = new xreq('order_state_close', params, this.offerCreateXrHr);  

        // предложение из своего парка ТС и водителей
        } else {
            this.order_manager = new xreq('order_offer_create', {
                order_id:    o['id'],
                vehicle_id:  this.offer_inp['veh'],
                driver_id:   this.offer_inp['drv'],
                price:       this.offer_inp['bid']
            }, this.offerCreateXrHr);  
        }
    }
    
    offerCreateXrHr=(xr)=>{
        logger.log(this, 'offerCreateXrHr');
        this.orderManagerStop();

        if ('err' in xr.res) return Events.runError(JSON.stringify(xr.res));  // с ошибкой
        // if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой

        this.offer_obj = null;
        this.offer_inp = {};  // стираем данные ввода предложения (в новом предложении не будет данных из предыдущего)
        Events.runInfo('Заказ ' + xr.res['order_id'] + ' успешно взят. Заказ перемещен в закрытые');
        this.refresh();  // todo: сделать что то более умное чем просто передернуть всю фигню
    }
    
    
    // список предложений
    
    offersListClickHr=(o)=>{
        logger.log(this, 'offersListClickHr');
        this.offersLoaderStop();
        this.offers_obj = o;
        this.refresh(true);
    }
    
    offersLoaderHr=(xr)=>{
        logger.log(this, 'offersLoaderHr');
        this.offersLoaderStop();
        this.offers_data = xr.res;
        this.forceUpdate();
    }
    
    
    // торги
    
    orderOfferPriceInpHr=(o)=>{ for (var k in o) this.bid_inp[k] = o[k]; }
    
    offerBidClickHr=(offer_id, bid)=>{
        logger.log(this, 'offerBidClickHr');
        console.debug(offer_id, bid);
        if (bid == null) bid = this.bid_inp['price'];
        if (this.order_manager) return;  // менеджер занят
        this.order_manager = new xreq('order_offer_bid', {
            offer_id:  offer_id,
            price:     bid
        }, this.offerBidXrHr);  // отменяем заявку
    }
    
    offerBidXrHr=(xr)=>{
        logger.log(this, 'offerBidXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        this.offers_data = null;  // todo: сделать что то более умное чем просто передернуть все предложения
        this.forceUpdate();
    }
    
    
    // перевод в "перевозка"
    
    orderShippingClickHr=(o)=>{
        logger.log(this, 'orderShippingClickHr');
        this.resetFocus();
        this.shipping_order = o;
        this.forceUpdate();
    }
    
    orderShippingConfirmClickHr=(o)=>{
        logger.log(this, 'orderShippingConfirmClickHr');
        this.shipping_order = o;
        if (o == null) return this.forceUpdate();
        if (this.order_manager) return;  // менеджер занят
        if (!confirm('Перевести заказ ' + o['lpname'] + ' в состояние "перевозка" ?')) return;
        let params = {order_id: o['id'], state: 'shipping'};
        let d = Utils.deep(this.refs, 'shipping_date.state.selected._d', null);
        //if (d == null) return alert('date failed');
        if (d != null) params['time'] = Math.floor(d.getTime() / 1000);
        this.order_manager = new xreq('order_state_flow', params, this.shippingXrHr);  // переводим заявку в состояние "перевозка"
    }
    
    shippingXrHr=(xr)=>{
        logger.log(this, 'shippingXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        //this.refresh();  // передергивать не нужно, прийдет событие по которому эта заявка должна исчезнуть из списка
    }
    
    
    // доставлена
    
    orderDoneClickHr=(o)=>{
        logger.log(this, 'orderDoneClickHr');
        this.done_order = o;
        this.forceUpdate();
    }
    
    orderDoneConfirmClickHr=(o)=>{
        logger.log(this, 'orderDoneConfirmClickHr');
        this.done_order = o;
        if (o == null) return this.forceUpdate();
        if (this.order_manager) return;  // менеджер занят
        if (!confirm('Заказ ' + o['lpname'] + ' доставлен ?')) return;
        let params = {order_id: o['id'], state: 'done'};
        let d = Utils.deep(this.refs, 'done_date.state.selected._d', null);
        //if (d == null) return alert('date failed');
        if (d != null) params['time'] = Math.floor(d.getTime() / 1000);
        this.order_manager = new xreq('order_state_flow', params, this.doneXrHr);  // переводим заявку в состояние "доставлено"
    }
    
    doneXrHr=(xr)=>{
        logger.log(this, 'doneXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        //this.refresh();  // передергивать не нужно, прийдет событие по которому эта заявка должна исчезнуть из списка
    }
    
    
    // архивация
    
    orderArhClickHr=(o)=>{
        logger.log(this, 'orderArhClickHr');
        if (this.order_manager) return;  // менеджер занят
        if (!confirm('Архивировать заказ ' + o['lpname'] + ' ?')) return;
        this.order_manager = new xreq('order_archive', {order_id: o['id']}, this.arhXrHr);  // архивируем заявку
        
    }
    
    arhXrHr=(xr)=>{
        logger.log(this, 'arhXrHr');
        this.orderManagerStop();
        if ('err' in xr.res) return alert(JSON.stringify(xr.res));  // с ошибкой
        this.refresh();  // тут вместо перезагрузки можно просто выдернуть зявку из списка
    }
    
    
    // экспорт
    
    orderExportClickHr=(o)=>{
        //logger.log(this, 'orderExportClickHr');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', Api.API_URI + '?cm=' + encodeURIComponent(Utils.o2j({cm: 'order_export', sid: Api.sid, order_id: o['id']})), true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            if (xhr.getResponseHeader('Content-Type').indexOf('application/json') != -1) {
                // ответпришел в json, скорее всего ошибка
                var r = new FileReader();
                r.onload = function () {
                    alert(r.result.substr(0, 256));  // todo: сделать нормальный обработчик ошибок
                };
                return r.readAsText(xhr.response);
            }
            // иначе воспринимаем ответ как бинарь, отдаем его как приложенный файл
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = 'order' + o['id'] + '.xlsx';  // или можно считать filename из хедеров ответа, но хз как это сделать
            a.click();
        }
        xhr.send(null);
        // todo: по-хорошему бы нужно сделать глушилку этого xhr при закрытии компонента, и не давать запускать новый при незавершенном предыдущем
        // todo: можно переделать на новомодный fetch, он вроде умеет response.blob()
    }
    
    
    // локализация
    
    vtype2txt=(v)=>{
        switch (v) {
            case 'tent':          return 'тент';
            case 'refrigerator':  return 'рефрижератор';
            case 'thermos':       return 'термос';
            case 'container':     return 'контейнер';
            case 'tank':          return 'цистерна';
            case 'closed':        return 'закрытый';
        }
        return v;
    }
    
    ltype2txt=(v)=>{
        switch (v) {
            case 'back':  return 'задняя';
            case 'side':  return 'боковая';
            case 'top':   return 'верхняя';
        }
        return v;
    }

    // reset
    resetFocus=()=>{
        this.cancel_order = null;
        this.memo_order = null;
        this.shipping_order = null;
        this.done_order = null;
    }
    
}