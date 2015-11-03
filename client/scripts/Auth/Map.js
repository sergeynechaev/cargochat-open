//require('../../styles/map.scss');

var React = require('react/addons');
//import {init, myMap} from '../MapController';

var Map = React.createClass({

    componentDidMount () {
        console.log('[Map] componentDidMount')

        if (!this.props.disabled) {
            this.ymapsLoader = document.createElement('script')
            this.ymapsLoader.onload = this.ymapsLoaded
            this.ymapsLoader.src = "http://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;amp;load=package.full"
            document.getElementsByTagName('head')[0].appendChild(this.ymapsLoader)
        }

    },

    componentWillUnmount(){
        this.ymapsLdrRemove()
        if (this.mapIns) this.mapIns.destroy()
    },

    ymapsLoaded () {
        this.ymapsLdrRemove()
        //console.log("[Map] ymapsLoaded")
        ymaps.ready(this.ymapsReady)
    },


    ymapsReady () {
        //console.log("[Map] ymapsReady")
        this.mapIns = new ymaps.Map("map", {center: [55.76, 37.64], zoom: 12, controls: []});
        this.mapIns.controls.add(new ymaps.control.ZoomControl({
            options: {
                size    : "small",
                position: {top: 10, right: 30}
            }
        }));
        this.mapIns.events.add('boundschange', this.changeBounds);
        let f = this.props.onReady;
        if (f) f();
    },

    ymapsLdrRemove () {
        if (this.ymapsLoader) {
            document.getElementsByTagName('head')[0].removeChild(this.ymapsLoader)
            this.ymapsLoader.onload = null
            this.ymapsLoader = null
        }
    },

    changeBounds () {
        //console.log("[Map] changeBounds");
        if (this.props.changeBounds) {
            this.props.changeBounds(this.mapIns)
        }
    },

    getMap () {
        return this.mapIns
    },
    setPos (x, y) {
        this.mapIns.setCenter([y, x])
    },
    addBaloon (x, y, name) {
        this.mapIns.geoObjects.add(
            new ymaps.Placemark(
                [y, x],
                {iconContent: name, balloonContent: name},
                {preset: "islands#circleDotIcon"}
            )
        );
    },
    setBounds (b) {
        //console.log('[Map] setBounds ' + b)
        this.mapIns.setBounds(b, {checkZoomRange: true})
    },
    clearGeoObjects () {
        try {
            if (this.mapIns.geoObjects)
                this.mapIns.geoObjects.each((o) => {
                    this.mapIns.geoObjects.remove(o)
                })

        } catch (e) {
            console.log(e)
        }

    },

    render () {
        //console.log("[Map] render");
        //console.log(this.props);
        if (this.props.disabled) return null
        return (
            <div style={this.props.style} className={this.props.className} id="map">
                {this.props.children}
            </div>
        )
    }
});

export {Map}
