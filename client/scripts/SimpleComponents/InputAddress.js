var React = require('react/addons');

import {Utils} from '../utils';
import Logger from '../Classes/Logger';

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
        //console.debug('[InputAddress] change ' + e.target.value)
        this.addr = e.target.value;
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
        //console.log('[InputAddress] addrSelect');
        //console.debug(o);
        this.addr = o.metaDataProperty.GeocoderMetaData.text;
        let pos = Utils.extract_longlat(o.Point.pos) || {x: null, y: null};
        this.refs['input'].getDOMNode().value = this.addr;
        this.expanded = false;
        this.setState({});
        if (this.props.onSelect) this.props.onSelect(this.addr, o, pos.x, pos.y)
    },

    render () {
        //console.log('[InputAddress] render');

        let suggest;
        if (this.expanded && this.sugg && this.sugg.length > 0) {
            suggest = (
                <div className="addressList box-cln-nw">
                    {
                        this.sugg.map((o, i) => {
                            return <div key={i} className="addressListItem"
                                        onMouseDown={this.addrSelect.bind(null, o.GeoObject)}>{o.GeoObject.metaDataProperty.GeocoderMetaData.text}</div>
                        })
                    }
                </div>
            )
        }

        var labelStyle = {
            flex: "0 0 " + this.props.labelWidth + "px"
        };
        return (
            <div className="box-cln-nw">
                <div className={this.props.className ? "box-row-nw align-center " + this.props.className 
                                                      : "box-row-nw align-center"}>
                    <textarea
                      defaultValue={this.props.value}
                      ref="input" type={this.props.type}
                      disabled={!this.props.active}
                      className="text-area input-underline"
                      onFocus={this.focus}
                      onBlur={this.blur}
                      onChange={this.change}
                      />
                </div>
                {suggest}
            </div>
        )
    }

});

export {InputAddress}


                    // <label
                    //     style={labelStyle}
                    //     className={this.isFocus ? 'label label-active' : 'label'}
                    //     >{this.props.caption}</label>
                    //     
                    //     
                    //     
        //             //     if (this.expanded && this.sugg && this.sugg.length > 0) {
        //     suggest = (
        //         <div style={{marginLeft: this.props.labelWidth}} className="addressList box-cln-nw">
        //             {
        //                 this.sugg.map((o, i) => {
        //                     return <div key={i} className="addressListItem"
        //                                 onMouseDown={this.addrSelect.bind(null, o.GeoObject)}>{o.GeoObject.metaDataProperty.GeocoderMetaData.text}</div>
        //                 })
        //             }
        //         </div>
        //     )
        // }