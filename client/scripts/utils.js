import {logger} from './Classes/Logger';

export var Utils = {
    // вспомогательные функции - четкая проверка типов
    toStr: function (v) {
        return Object.prototype.toString.call(v);
    },
    isArray: function (v) {
        return this.toStr(v) === '[object Array]';
    },
    isObject: function (v) {
        return this.toStr(v) === '[object Object]';
    },
    isNumber: function (v) {
        return this.toStr(v) === '[object Number]';
    },
    isString: function (v) {
        return this.toStr(v) === '[object String]';
    },
    o2j: function (obj) {
        try {
            return JSON.stringify(obj);
        } catch (e) {
            console.error('JSON.stringify fail: ' + e);
            return '{}';
        }
    },
    j2o: function (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            //console.error('JSON.parse fail: ' + e + ' src=' + json);
            return {};
        }
    },
    
    // вернет объект по пути path из src
    // usage: var o = {k1: {k2: {k3: 1, k4: 888}}}
    // usage: Utils.deep(o, 'k1', null)       // {k2: {k3: 1, k4: 888}}
    // usage: Utils.deep(o, 'k1.k2.k4', 321)  // 888
    // usage: Utils.deep(o, 'k1.k2.k5', 321)  // 321
    deep (src, path, def) {
        if (!Utils.isObject(src)) return def;
        if (!Utils.isString(path)) return def;
        let nodes = path.split('.');
        for (let i = 0, l = nodes.length; i < l; i++) {
            src = src[nodes[i]];
            if (src == null) return def;
        }
        return src;
    },
    
    // вернет true для валидного email
    isEmailValid (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },
    
    // вернет true если el будет найден в ar
    isElementInArray (el, ar) {
        return Utils.isArray(ar) && ar.indexOf(el) != -1;
    },
    
    // проверка даты на соответствие маске YYYY-MM-DD
    dateFix (val, def) {
        if ((val || '').match(/^\d{4}-\d{2}-\d{2}$/) != null) return val;
        return def;
    },
    
    // формат run(func[, arg1[, arg2[, ...]]])
    // func - функция, которая запусткается с передачей в нее агрументов
    // возвращает результат выполнения func
    // если func не передать или передать не функцию, то вернется null
    run () {
      //console.log('Utils.run');
      //console.debug(arguments);
      if (arguments.length < 1) return null;
      //console.debug(Object.prototype.toString.call(arguments[0]));
      var f = arguments[0];
      if (Object.prototype.toString.call(f) != '[object Function]') return null;
      var a = [];
      for (var i = 1, l = arguments.length; i < l; i++) a.push(arguments[i]);
      return f.apply(null, a);
    },
    
    // Функция получения ширины вьюпорта
    getClientWidth   : function () {
        return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
    },
    // Функция получения высоты вьюпорта
    getClientHeight  : function () {
        return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
    },
    getMinMaxXY      : function (array) {
        var minX = 100;
        var minY = 100;
        var maxX = 0;
        var maxY = 0;
        array.forEach(function (item, z, arr) {
            if (item.x && item.y) {
                if (item.x < minX) minX = item.x;
                if (item.y < minY) minY = item.y;
                if (item.x > maxX) maxX = item.x;
                if (item.y > maxY) maxY = item.y;
            }
        });
        return [[minY, minX], [maxY, maxX]]
    },
    cookieGet        : function (name) {
        var re = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
        var matches = document.cookie.match(re);
        return matches ? decodeURIComponent(matches[1]) : null;
    },
    cookieSet        : function (name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    },
    cookieDel        : function (name) {
        this.cookieSet(name, "", {expires: -1})
    },
    lg               : function (txt) {
        var d = new Date();
        var tm = d.toTimeString().split(' ')[0] + '.' + d.getTime().toString().substr(-3);
        console.log(tm + ' ' + txt);
    },
    extract_uri_param: function (uri, key) {
        var m = uri ? uri.match(new RegExp('(\\?|&)' + key + '=([^&#]+)(&?)', '')) : null;
        return (m && m.length == 4) ? m[2] : null;
    },
    extract_phone_number (v) {
        if (!v) return null
        var m = v.match(/(\d)/g)
        return m && m.length == 11 ? m.join('') : null
    },
    extract_longlat (latlong) {
        var m = String(latlong || '').match(/^((?:-?)(?:[0-9]+)?(?:.(?:[0-9]+))) ((?:-?)(?:[0-9]+)?(?:.(?:[0-9]+)))$$/);
        return (m && m.length == 3) ? {x: m[1], y: m[2]} : null;
    },
    extract_ymd_from_date (v) {
        let r = {year: 2015, month: 1, day: 1}
        if (v) {
            let m = v.match(/([^\-]+)\-([^\-]+)\-([^\-T]+)/)  // нестрогое извлечение даты из строки (три вхождения без минусов, разделенных минусами)
            if (m && m.length == 4) {
                r.year = m[1]
                r.month = m[2]
                r.day = m[3]
            }
        }
        return r
    },
    is_valid_yyyymmdd (v) {
        return /^(\d{4})\-(\d{2})\-(\d{2})$/.test(v) // строгая проверка валидности даты (формат YYYY-MM-DD)
    },

    // Показать стек при ошибке
    stackTrace       : function () {
        var err = new Error();
        return err.stack;
    },

    // определение позиции курсора в поле input или textarea
    getCaretPosition( field ) {
        let pos = 0;
        if (document.selection) {   // IE < 11
            field.focus ();
            let sel = document.selection.createRange ();
            sel.moveStart ('character', -field.value.length);
            pos = sel.text.length;
        } else if (field.selectionStart || field.selectionStart == '0') {
            pos = field.selectionDirection == 'backward' ? field.selectionStart : field.selectionEnd;
        }
        return pos;

    },

    // автоматическое увеличение высоты элемента до максимального значения
    elemAutoSize( ta, maxHeight ) {

        if( !ta ) return;

        // считаем оффсет
        let offset = !window.opera ? (ta.offsetHeight - ta.clientHeight) 
                                   : (ta.offsetHeight + parseInt(window.getComputedStyle(t, null).getPropertyValue('border-top-width'))) ;
        ta.style.height = 'auto';
        let viewHeight = ta.clientHeight + offset;
        let totalHeight = ta.scrollHeight + offset;

        // вытаскиваем предыдущее значение, если есть
        let prevHeight = ta.getAttribute('data-prev-height');
        if( !prevHeight ) prevHeight = 0;
        
        if( totalHeight > maxHeight ) {         // если убежали за максимум, оставляем предыдущую высоту поля
            prevHeight = (maxHeight - prevHeight > offset * 2) ? maxHeight - offset : prevHeight;
            ta.style.height = prevHeight ? prevHeight + 'px' : maxHeight + 'px';
            ta.style.overflowY = 'auto';
        } else {                                // увеличиваем поле, пока можно
            ta.style.height = totalHeight + 'px';
            ta.style.overflowY = 'hidden';
            ta.setAttribute('data-prev-height', totalHeight);
        }
        //logger.log('autosize', viewHeight, totalHeight, prevHeight);
    },

    // регистрация глобального события window
    addWindowEvent( eventType, e ) {
        if( window.attachEvent)  {
            window.attachEvent('on'+eventType, () => {
                e();
            });
        } else if( window.addEventListener ) {
            window.addEventListener(eventType, ()=> {
                e();
            }, true);
        }
    },

    // отписка от глобального события window
    remWindowEvent( eventType, e ) {
        if( window.detachEvent)  {
            window.detachEvent('on'+eventType, () => {
                e();
            });
        } else if( window.removeEventListener ) {
            window.removeEventListener(eventType, ()=> {
                e();
            }, true);
        }
    },

    scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    },
    
    // format timestamp to YYYY-MM-DD HH:MM:SS
    ts2tmdhms (ts) {
        if (!Utils.isNumber(ts)) return null;
        let d = new Date(ts * 1000);
        return [d.getYear()+1900, Utils.zf(d.getMonth()+1, 2), Utils.zf(d.getDate(), 2)].join('-') + ' ' + [Utils.zf(d.getHours(), 2), Utils.zf(d.getMinutes(), 2), Utils.zf(d.getSeconds(), 2)].join(':');
    },
    
    // format timestamp to YYYY-MM-DD
    timestamp2YYYYMMDD (ts) {
        if (!Utils.isNumber(ts)) return null;
        let d = new Date(ts * 1000);
        return [d.getYear()+1900, Utils.zf(d.getMonth()+1, 2), Utils.zf(d.getDate(), 2)].join('-');
    },
    
    // zefofill: zf(123, 5) == '00123'
    zf (v, n) {
        v = String(v) || '';
        n = n || 0;
        while (v.length < n) v = '0' + v;
        return v;
    },
    
    // вставка нолика для преобразования времени в формат 00:00
    timeZf( ts ) {
        let date = new Date(ts * 1000);
        return [Utils.zf(date.getHours(), 2), Utils.zf(date.getMinutes(), 2)].join(':');
    },

    // вставка текста в textarea
    setTaText( ta, text ) {

        let startPos = ta.selectionStart;
        let endPos = ta.selectionEnd;

        // вставляем текст
        ta.value = ta.value.substring(0, startPos) + text + ta.value.substring(endPos, ta.value.length);

        // курсор в конец вставки
        ta.focus();
        ta.selectionStart = startPos + text.length;
        ta.selectionEnd = startPos + text.length;
    },

    // удаление всех html тегов, включая атрибуты
    clearHtmlTags( text ) {
        return text.replace(/<(.|\n)*?>/g, '');
    },

    // удаление пробелов и переводов строк в начале и конце строки
    trim( txt ) {
        return txt.replace(/^\s+|\s+$/g,"");
    },
    lTrim( txt ) {
        return txt.replace(/^\s+/,"");
    },
    rTrim( txt ) {
        return txt.replace(/\s+$/,"");
    },
    

    /*
     * Recursively merge properties and return new object
     * obj1 <- obj2 [ <- ... ]
     */
    merge: function () {
        let dst = {}, src, p, args = [].splice.call(arguments, 0);
        while (args.length > 0) {
            src = args.splice(0, 1)[0];
            if (toString.call(src) == '[object Object]') {
                for (p in src) {
                    if (src.hasOwnProperty(p)) {
                        if (toString.call(src[p]) == '[object Object]') {
                            dst[p] = Utils.merge(dst[p] || {}, src[p]);
                        } else {
                            dst[p] = src[p];
                        }
                    }
                }
            }
        }
        return dst;
    },

    checkFlags(flags, flag){
        return (flags & 1) == 1 ? true : (flags & flag) === flag;
    },

    toArray(obj){
        var newArray = [];
        function add(obj, parentKey) {
            var newParentKey = (!parentKey) ? "" : parentKey + ".";
            for (var key in obj) {
                //console.log(typeof(obj[key]));
                if (typeof(obj[key]) === "object") {
                    add(obj[key], newParentKey + key)
                } else {
                    newArray.push({key: newParentKey + key, value: obj[key]})
                }
            }
        }
        add(obj);
        return newArray
    },

    getValue(src, path){
        var len = path.split(".");
        for (var i = 0; i < len.length; i++) {
            src = src[len[i]];
            if (src === undefined) return undefined
        }
        return src
    },

    browserName : navigator.sayswho = (function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })()

};

//module.exports = Utils;
export class DateTime {
    constructor(date) {
        this.newDate = date.match(/(\d{4})-(\d{2})-(\d{2})(?:(?:T|\s)(\d{2}):(\d{2}):(\d{2})){0,1}/);
    }

    __months = [
        {id: 1, value: "Января"},
        {id: 2, value: "Февраля"},
        {id: 3, value: "Марта"},
        {id: 4, value: "Апреля"},
        {id: 5, value: "Мая"},
        {id: 6, value: "Июня"},
        {id: 7, value: "Июля"},
        {id: 8, value: "Августа"},
        {id: 9, value: "Сентября"},
        {id: 10, value: "Октября"},
        {id: 11, value: "Ноября"},
        {id: 12, value: "Декабря"}
    ];

    getFullMonthDate() {
        var intDate = parseInt(this.newDate[2], 10);
        var month = this.__months[intDate - 1].value;
        return this.newDate[3] + " " + month + " " + this.newDate[1]
    }

    getDate() {
        return this.newDate[3] + "." + this.newDate[2] + "." + this.newDate[1]
    }

    getTime() {
        return this.newDate[4] + ":" + this.newDate[5]
    }
}

logger.log(Utils.browserName);