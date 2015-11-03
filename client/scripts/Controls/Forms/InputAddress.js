var React = require('react/addons');

import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

var PureRenderMixin = React.PureRenderMixin;

var InputAddress = React.createClass({

    mixins: [PureRenderMixin],

    propTypes: {
        labelWidth: React.PropTypes.number,
        value     : React.PropTypes.string
    },
    getDefaultProps(){
        return {
            labelWidth: 114,
            results:5
        }
    },

    //getInitialState () {
    //  return({})
    //},

    focus () {
        this.isFocus = true;
        this.expanded = true;
        this.setState({});
    },

    blur () {
        this.isFocus = false;
        this.expanded = false;
        this.setState({});
    },

    change (e) {
        this.addr = e.target.value;

        // если очистили поле, сообщаем об этом родителю, чистим данные
        if( !this.addr ) {
            let obj = {};
            obj.params = { fieldName: this.props.name, posX: null, posY: null, address: null };
            // передаем и obj, и адреса с точками напрямую для совместимости со старым поведением
            // TODO: выпилить передачу лишних параметров
            if (this.props.onSelect) this.props.onSelect(null, obj, null, null);
        }

        if (this.tid) {
            clearTimeout(this.tid);
            this.tid = null;
        }
        this.tid = setTimeout(this.addrTimerHr, 1000);
        if (this.props.onChange) {
            var obj;
            if (this.props.name) {
                obj = {};
                obj[this.props.name] = e.target.value;
            } else {
                obj = e.target.value;
            }
            this.props.onChange(obj);
        }
    },

    addrTimerHr () {
        console.log('[InputAddress] addrTimerHr')
        if (!ymaps) {
            console.error('ymaps not avaliable now')
            return
        }
        this.selectedAddrObj = null;
        var myGeocoder = ymaps.geocode(this.addr, {json: true, results: this.props.results});
        myGeocoder.then(
            (res) => {
                this.sugg = res.GeoObjectCollection.featureMember;
                //console.debug(this.sugg)
                this.expanded = true;
                this.forceUpdate();
            },
            (err) => {
                console.error('ymaps.geocode failed: ' + err)
            }
        );
    },

    addrSelect (o) {
        this.addr = o.metaDataProperty.GeocoderMetaData.text;
        let pos = Utils.extract_longlat(o.Point.pos) || {x: null, y: null};
        this.refs['input'].getDOMNode().value = this.addr;
        this.expanded = false;
        this.setState({});
        // add params to ymaps object
        o.params = { fieldName: this.props.name, posX: pos.x, posY: pos.y, address: this.addr };
        if (this.props.onSelect) this.props.onSelect(this.addr, o, pos.x, pos.y)
    },

    render () {
        
        let suggest;

        if (this.expanded && this.sugg && this.sugg.length > 0) {
            suggest = (
                <div className="address-form-control-list">
                    {
                        this.sugg.map((o, i) => {
                            return <div key={i} 
                                        className="address-form-control-list__item"
                                        onMouseDown={this.addrSelect.bind(null, o.GeoObject)}>
                                            {o.GeoObject.metaDataProperty.GeocoderMetaData.text}
                                    </div>
                        })
                    }
                </div>
            )
        }

        return (
            <div className="address-form-control">
                <input type="text" 
                       ref="input" 
                       className="form-control" 
                       disabled={!this.props.active} 
                       value={this.props.value} 
                       defaultValue={this.props.defaultValue} 
                       onFocus={this.focus} 
                       onBlur={this.blur} 
                       onChange={this.change}/>
                {suggest}
            </div>
        )
    }

});

export {InputAddress}