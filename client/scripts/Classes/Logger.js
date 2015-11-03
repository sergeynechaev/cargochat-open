/**
 * System Logger - Логгер для отладки
 * Нужно использовать вместо console.log.
 * 
 * В логгер можно передавать любое число параметров в любом порядке, в том числе this класса,
 * откуда вызывается сам логгер. Логгер выведет в консоли текущую дату, название класса (если передано),
 * комментарий (первая текстовая строка, которая передана в логгер), остальные параметры будут
 * показаны по одному на каждой строке.
 *
 * - Подключение логгера:
 *   import {logger} from '{путь_до}/Classes/Logger';
 *
 * - Использование логгера:
 *   вызывается командой logger.log( параметры );
 *
 * - Параметры логгера:
 *   принимает любое количество параметров в любом порядке, при этом:
 *   - первая встреченная строка будет интерпретирована как комментарий
 *   - первый встреченный объект с именем конструктора, отличным от Object и Array, будет
 *     интерпретирован как объект {this}, из которого был вызван логгер, и будет показано имя класса
 *   - если в логгер передать строку 'error', то будет сделан вызов console.error вместо console.debug
 *
 * - Примеры:
 *   - Вызов
 *     logger.log('render transport list', this.state, 'another string', this, AppState.Transport, 'error', [1,2,3,4]);
 *   - Ответ
 *     *error* [ 5 сент. 2015 г., 22:32 ] {TransportList} render transport list test
 *     объект this.state
 *     another string
 *     объект AppState.Transport
 *     массив [1,2,3,4]
 * 
 */
 
 // usage:
 // import {logger} from '../../Classes/Logger';
 // ...
 // logger.log(this, 'Text to log')
 // ...
 
export default class Logger {
    
    with_time = false;
    
    constructor( env ) {
        this.env = env || "development";
    }

    log =(...params)=> {

        if( this.env != "development" ) return;

        if( params.length ) {

            // get date
            let d = new Date();
            let currentDate = d.toLocaleString('ru-RU', 
                                { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            // get the first string and the first object with the classname - it's a {this} object
            let commentString = '';
            let className = '';
            let isError = false;
            let paramsToLog = params.filter( param => {
                if( !commentString.length && typeof param === 'string' ) {
                    commentString = ' ' + param;
                } else if( !className.length 
                            && typeof param === 'object' 
                            && param.constructor.name !== 'Object'
                            && param.constructor.name !== 'Array'
                            && param.constructor.name !== 'RegExp' ) {
                    className = '{' + param.constructor.name + '}' ;
                } else if( typeof param === 'string' && param.toLowerCase() === 'error' ) {
                    isError = true;
                } else {
                    return param;
                }
            });

            // print the log header with the date, class name and comment string
            var t = className + commentString;
            if (this.with_time) t = '[' + currentDate + '] ' + t;
            isError ? console.error(t) : console.debug(t);
            
            // print other params one by one, each param at the new string
            paramsToLog.forEach( param => {
                console.log( param );
            });
        }
    }

    /**
     * DEPRECATED
     */
    static debug( e, msg, ...params ) {
    	console.log( "[" + Logger.getDate() + "] {" + e.constructor.name + "} " + msg);
        if( params.length ) {
            params.map( (param, key) => {
                console.debug( param );
            });
        }
    }

    /**
     * DEPRECATED
     */
    static error( e, msg, ...params ) {
        console.error( "[" + Logger.getDate() + "] {" + e.constructor.name + "} " + msg);
        if( params.length ) {
            params.map( (param, key) => {
                console.error( param );
            });
        }
    }

    /**
     * DEPRECATED
     */
    static getDate() {
    	let d = new Date();
	    let dd = (d.getDate() < 10 ? '0' : '') + d.getDate();
	   	let MM = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
	   	let hh = (d.getHours() < 10 ? '0' : '') + d.getHours();
	   	let mm = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
	   	let ss = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
	   	//let yy = d.getFullYear().toString().substr(-2);
    	return d.getFullYear() + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
    }
}

export var logger = new Logger("development");