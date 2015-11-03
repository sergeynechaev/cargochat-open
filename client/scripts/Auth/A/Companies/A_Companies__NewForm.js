import React from 'react/addons';
import reactMixin from 'react-mixin';
import _ from 'lodash';

import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';
import {AppState} from '../../../Auth/Dashboard';
import {logger} from '../../../Classes/Logger';

import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';
import {InputCheckbox} from '../../../Controls/Forms/InputCheckbox';

import {Map} from '../../Map';


export default class A_Companies__NewForm extends React.Component {

    constructor(props) {
        super(props);

        // this._context = {};
    }

    state = {}

    _tags = []
    _addr = { x: null, y: null }

    // state = {
    //     inn: '',
    //     kpp: '',
    //     addr: '',
    //     email: '',
    //     phone: '',
    //     web_site: '',
    //     name: '',
    // }

    componentDidMount =()=> {
        // logger.log('did mount new form', this, this.props);
        this._context = this.props.context;
        this.initForm();
    }

    componentWillReceiveProps =(nextProps)=> {
        // logger.log('rcv prps new form', this, nextProps);

        if( this._context.value != nextProps.context.value ) {
            this._context = nextProps.context;
            this.initForm();
        }
    }

    initForm =()=> {
        this.setState({
            name: this._context.value,
            inn: this._context.data.inn,
            kpp: this._context.data.kpp,
            addr: this._context.data.address.value,
            email: '',
            phone: '',
            web_site: '',
        });
        this._tags = [];
        this.getCoordinate( this._context.data.address.value );
        // logger.log('initForm inn= '+this._context.data.inn, this, this.state);
    }

    createCompany =()=> {

        let params = _.cloneDeep(this.state);

        delete params.name;
        params.tags = this._tags;
        params.x = this._addr.x;
        params.y = this._addr.y;

        logger.log('createCompany', this, params);
        // return;
        
        Api.createCompanyNewRequest(params).then(res=> {
            if (res.err) {
                Events.runError('Не удалось добавить компанию: ' + res.msg);
                logger.log('Error creating new company', this, res.msg, 'error');
            } else {
                Events.runInfo('Компания ' + this.state.addr + ' добавлена');
                if( this.props.onClose ) this.props.onClose();
            }
        });
    }

    isFilled =()=> {
        return Object.keys(this.state).every( key => {
            if( key == 'web_site') return true;
                else return this.state[key] != '';
        });
    }

    onCheckHandler = (obj)=> {
        let key = Object.keys(obj)[0];

        if( !obj[key] ) this._tags.push(key);
            else  this._tags = this._tags.filter( tag => tag != key );

        // logger.log('onCheckHandler key= '+key, this, this._tags);
    }


    /* Yandex Maps get x & y */

    inputAddressSelect =(addrX, addrY)=> {
        this._addr = { x: addrX, y: addrY };
    }

    getCoordinate = (addr)=> {
        var myGeocoder = ymaps.geocode(addr, {json: true, results: 1});

        myGeocoder.then(
            (res) => {
                var sugg = res.GeoObjectCollection.featureMember;
                // logger.log('GeoObjectCollection sugg= ', this, res, sugg);
                var coord = sugg[0].GeoObject.Point.pos.split(" ");
                logger.log('Ymaps: get coord = ', this, coord);
                this.inputAddressSelect(coord[0], coord[1]);
            },
            (err) => {
                logger.log('ymaps.geocode failed: ' + err, this, 'error');
            }
        );
    }


    render = ()=> {

        return (
            <div>
                <div className="text-strong padd-bottom">{this.state.name}</div>

                <div className="padd-top-s padd-bottom">Данные из Dadata.ru</div>
                <FormGroup name="ИНН" from="inn">
                    <InputSimple valueLink={this.linkState('inn')} value={this.state.inn} name="inn"/>
                </FormGroup>
                <FormGroup name="КПП" from="kpp">
                    <InputSimple valueLink={this.linkState('kpp')} value={this.state.kpp} name="kpp"/>
                </FormGroup>
                <FormGroup name="Адрес" from="addr">
                    <InputSimple valueLink={this.linkState('addr')} value={this.state.addr} name="addr"/>
                </FormGroup>

                <div className="padd-top padd-bottom">Дополнительные данные</div>
                <FormGroup name="Телефон" from="phone">
                    <InputSimple valueLink={this.linkState('phone')} value={this.state.phone} name="phone"/>
                </FormGroup>
                <FormGroup name="E-mail" from="email">
                    <InputSimple valueLink={this.linkState('email')} value={this.state.email} name="email"/>
                </FormGroup>
                <FormGroup name="Веб-сайт" from="web_site">
                    <InputSimple valueLink={this.linkState('web_site')} value={this.state.web_site} name="web_site"/>
                </FormGroup>
                <FormGroup name="Признаки компании" from="tags">
                    <InputCheckbox name="shipper" onChange={this.onCheckHandler} caption="Грузовладелец"/>
                    <InputCheckbox name="expeditor" onChange={this.onCheckHandler} caption="Экспедитор"/>
                    <InputCheckbox name="carrier" onChange={this.onCheckHandler} caption="Перевозчик"/>
                </FormGroup>

                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.createCompany} disabled={!this.isFilled()} brand="success" caption="Добавить"/>
                </div>
            </div>
        )
    } 
}

reactMixin.onClass(A_Companies__NewForm, React.addons.LinkedStateMixin);
