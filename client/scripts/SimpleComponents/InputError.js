/*

 параметры

 format - ограничение символов
 int - только целые числа
 float - только числа
 email - только мыло
 phone - только цифры, пробелы, плюс и минус, должно содержать 11 цифр
 skype - только символы и цифры
 Skype Username Restrictions
 A Skype username cannot be shorter than six characters or longer than 32.
 It can contain both letters and numbers, but must start with a letter;
 accented characters are not allowed.
 The only punctuation marks you can use are commas, dashes, periods and underscores.

 unique - проверка уникального ИНН
 user_email
 user_mobile
 user_icq
 user_skype
 comp_inn
 comp_ogrn


 */

var React = require('react/addons');
var PureRenderMixin = React.PureRenderMixin;
import {Api} from '../api';
import {Utils} from '../utils';

var InputError = React.createClass({
    mixins: [PureRenderMixin],
    componentWillUnmount() {
        this.clear_timeout()
    },
    getInitialState(){
        return ({
            unique    : true,
            value     : this.props.value,
            labelClass: ""
        })
    },
    change(e){
        var v = e.target.value;
        this.setState({value: v});
        var obj = {};
        obj[this.props.inputName] = v;
        var r = this.props.returnValue
        if (r) r(obj)
        this.clear_timeout()
        if (v != '' && this.props.unique && this.isValid(v)) {
            this.setUniquePending()
            this.ti = setTimeout(this.content_ready_for_check, 800)
        } else {
            this.setUniqueTrue()
        }
    },
    focus(){
        this.setState({labelClass: "label-active"})
    },
    blur(){
        this.setState({labelClass: ""})
    },

    setUniquePending () {
        this.setState({unique: 'pending'})
    },
    setUniqueTrue () {
        this.setState({unique: true})
    },
    setUniqueFalse () {
        this.setState({unique: false})
    },

    clear_timeout () {
        if (this.ti) {
            clearTimeout(this.ti);
            this.ti = null;
        }
    },
    content_ready_for_check () {
        console.log('content_ready_for_check ' + this.state.value)
        if (!this.props.unique) return
        var v = this.state.value
        if (this.props.format == 'phone') {
            v = Utils.extract_phone_number(v)
        }
        Api.checkUnique(this.props.unique, v).then(res=> {
            if (res.err === -1) {
                alert('неверный тип')
            } else {
                console.log(res.holder_id, Api.user_id)
                res.unique === true || res.holder_id == Api.user_id ? this.setUniqueTrue() : this.setUniqueFalse()
            }
        })
    },

    keypress (e) {  // перехват события ввода
        var ev = e || window.event  // событие
        //for (var q in ev) { console.log('ev['+q+']=' + ev[q]) }
        //for (var q in ev.target) { console.log('ev.target['+q+']=' + ev.target[q]) }
        var et = ev.target
        var sPos = et.selectionStart;
        var ePos = et.selectionEnd;

        function chk(exp, t) {
            return new RegExp(exp).test(t)
        }

        function abort() {
            ev.returnValue = false
            if (ev.preventDefault) ev.preventDefault()
        }

        function resel() {
            et.setSelectionRange(sPos + 1, sPos + 1)
        }

        var kCode = e.keyCode || e.which  // код символа
        var kChar = String.fromCharCode(kCode)  // строковое выржение символа
        switch (this.props.format) {
            case 'int':
                if (!chk('[0-9-]', kChar)) {
                    // предотвращаем ввод недопустимого символа
                    abort()
                    return
                }
                if (kChar == '-') {
                    // перехватываем и исправляем ввод "минуса"
                    abort()
                    et.value = chk('-', et.value) ? et.value.substr(1) : '-' + et.value
                    return
                }
                break
            case 'float':
                if (!chk('[0-9-.]', kChar)) {
                    // предотвращаем ввод недопустимого символа
                    abort()
                    return
                }
                switch (kChar) {
                    case '-':
                        // перехватываем и исправляем ввод "минуса"
                        abort()
                        et.value = chk('-', et.value) ? et.value.substr(1) : '-' + et.value
                        resel()
                        return
                    case '.':
                        // перехватываем и исправляем ввод "точки"
                        abort()
                        var v = et.value.replace('.', ' ')
                        v = v.substr(0, sPos) + '.' + v.substr(ePos)
                        et.value = v.replace(' ', '')
                        resel()
                        return
                }
                break
            case 'email':
                if (String("@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.").indexOf(kChar) == -1) {
                    abort()
                    return
                }
                break
            case 'phone':
                if (String("()0123456789+- ").indexOf(kChar) == -1) {
                    abort()
                    return
                }
                break
        }
    },

    isValid (v) {
        if (!v || v == '') return true
        let p = this.props

        function isContentValid() {
            function chk(exp, t) {
                return exp.test(t);
            }

            switch (p.format) {
                case 'int':
                    return chk(/^-?[0-9]+$/, v)
                case 'float':
                    return chk(/^-?[0-9]+(.[0-9]+)?$/, v)
                case 'email':
                    return chk(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, v)
                case 'phone':
                    let m = v.match(/(\d)/g);
                    return m && m.length == 11
            }
            return true
        }

        function isLengthValid() {
            if (p.minLength && v.length < parseInt(p.minLength)) return false
            if (p.maxLength && v.length > parseInt(p.maxLength)) return false
            return true
        }

        return isContentValid() && isLengthValid()
    },

    getFormStyle () {
        var s1 = {background: '#f88'}  // invalid
        if (this.isValid(this.state.value)) {
            switch (this.state.unique) {
                case true:
                    return {background: '#fff'}  // valid
                case false:
                    return s1  // invalid
                case 'pending':
                    return {background: '#ff8'}  // pending
            }
        }
        return s1  // invalid
    },

    render(){
        var labelClass = "label error table-prb " + this.state.labelClass;
        var inputClass = "input-underline text-form " + this.state.inputClass;
        //когда делается проверка, в случае невалидности ввода надо добавить класс .error в labelClass
        //и добавить в класс input className="input-error"
        //отобразить <p className="error error-text">текст ошибки</p>
        return (
            <div className="">
                <div className="box-row-nw align-center">
                    <label style={this.props.labelStyle} className={labelClass}>
                        {this.props.caption}
                    </label>
                    <input type={this.props.type}
                           disabled={!this.props.active}
                           style={this.getFormStyle()}
                           className={inputClass}
                           onChange={this.change} value={this.props.value}
                           onFocus={this.focus}
                           onBlur={this.blur}
                           onKeyPress={this.keypress}
                        />
                </div>
                <div className="box-row-nw align-center">
                    <p className="error error-text">Ошибка</p>
                </div>
            </div>
        )
    }
});

export {InputError}