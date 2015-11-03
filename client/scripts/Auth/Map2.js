//require('../../styles/map.scss');

var React = require('react/addons');
//import {init, myMap} from '../MapController';

class Map2 extends React.Component {

    static propTypes = {
        onReady: React.PropTypes.func,
        changeBounds: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        baloon: React.PropTypes.object,
        center: React.PropTypes.array,
        style: React.PropTypes.object,
        zoom: React.PropTypes.number
    };

    static defaultProps = {
        center: [55.76, 37.64],
        zoom:   12
    };

    state = {
        style: this.props.style
    };
    componentWillReceiveProps = (props)=> {
        if (props.style) {
            this.setState({style: props.style});
        }

    };

    componentDidMount = ()=> {

        console.log('[Map] componentDidMount', this.props.center);

        if (!this.props.disabled) {
            this.ymapsLoader = document.createElement('script');
            this.ymapsLoader.onload = this.ymapsLoaded;
            this.ymapsLoader.src = "http://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;amp;load=package.full";
            document.getElementsByTagName('head')[0].appendChild(this.ymapsLoader)
        }

    };

    componentWillUnmount = ()=> {
        this.ymapsLdrRemove();
        if (this.mapIns) this.mapIns.destroy()
    };

    ymapsLoaded = ()=> {
        this.ymapsLdrRemove();
        //console.log("[Map] ymapsLoaded")
        ymaps.ready(this.ymapsReady)
    };
    getCoordinate = (address, callback)=> {
        var myGeocoder = ymaps.geocode(address, {json: true, results: 1});
        myGeocoder.then(
            (res) => {
                var sugg = res.GeoObjectCollection.featureMember;
                //console.debug(sugg);
                var coord = sugg[0].GeoObject.Point.pos.split(" ");
                //console.log("COORD");
                //console.log(coord);
                var x = coord[0];
                var y = coord[1];
                callback(x, y)

            },
            (err) => {
                console.error('ymaps.geocode failed: ' + err);
                return false
            }
        );
    };

    ymapsReady = ()=> {
        //console.log("[Map] ymapsReady")
        this.mapIns = new ymaps.Map("map", {center: this.props.center, zoom: this.props.zoom, controls: []});
        this.mapIns.controls.add(new ymaps.control.ZoomControl({
            options: {
                size    : "small",
                position: {top: 10, right: 30}
            }
        }));
        this.mapIns.events.add('boundschange', this.changeBounds);
        if (this.props.baloon) {
            let b = this.props.baloon;
            if (b.address) {
                var coord = this.getCoordinate(b.address, (x, y)=> {
                        //console.log("callback");
                        this.addBaloon(x, y, b.name);
                        this.setPos(x, y)
                    }
                );

            } else {
                this.addBaloon(b.x, b.y, b.name)
            }
        }
        let f = this.props.onReady;
        if (f) f();
    };

    ymapsLdrRemove = ()=> {
        if (this.ymapsLoader) {
            document.getElementsByTagName('head')[0].removeChild(this.ymapsLoader);
            this.ymapsLoader.onload = null;
            this.ymapsLoader = null
        }
    };

    changeBounds = ()=> {
        //console.log("[Map] changeBounds");
        if (this.props.changeBounds) {
            this.props.changeBounds(this.mapIns)
        }
    };

    getMap = ()=> {
        return this.mapIns
    };
    setPos = (x, y)=> {
        this.mapIns.setCenter([y, x])
    };
    addBaloon = (x, y, name)=> {
        //console.log("add baloon");
        //console.log(x + ' '+ y + ' ' + name);
        this.mapIns.geoObjects.add(
            new ymaps.Placemark(
                [y, x],
                {iconContent: name, balloonContent: name},
                {preset: "islands#circleDotIcon"}
            )
        );
    };
    setBounds = (b)=> {
        //console.log('[Map] setBounds ' + b)
        this.mapIns.setBounds(b, {checkZoomRange: true})
    };
    clearGeoObjects = ()=> {
        try {
            if (this.mapIns.geoObjects)
                this.mapIns.geoObjects.each((o) => {
                    this.mapIns.geoObjects.remove(o)
                })

        } catch (e) {
            console.log(e)
        }

    };

    render = ()=> {
        //console.log("[Map] render");
        //console.log(this.props);
        if (this.props.disabled) return null;
        return (
            <div style={this.state.style} className={this.props.className} id="map">
                {this.props.children}
            </div>
        )
    }
}

export {Map2}
