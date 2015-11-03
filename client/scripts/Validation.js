import {Api} from './api';
import {Utils} from './utils';

import {logger} from './Classes/Logger';

var Validation = {

    // валидатор ввода целочисленного значения
    // для применение нужно указать эиу ф-ию свойством onKeyPress у поля ввода
    // допускает ввод символов [0123456789-]
    // знак "-" автоматически втавляется/убирается в начало значения
    typingInt (e) {

        let ev = e || window.event,
            et = ev.target,
            sPos = et.selectionStart,
            ePos = et.selectionEnd,
            ch = String.fromCharCode(e.keyCode || e.which)  // строковое выржение символа

        function abort() {
            ev.returnValue = false
            if (ev.preventDefault) ev.preventDefault()
        }

        function resel() {
            et.setSelectionRange(sPos + 1, sPos + 1)
        }

        if (!/[0-9-]/.test(ch)) {
            abort()
            return
        }

        if (ch == '-') {
            abort()
            et.value = /-/.test(et.value) ? et.value.substr(1) : '-' + et.value
            resel()
            return
        }

    },

    // валидатор ввода числового значения с плавающей точкой
    // для применение нужно указать эиу ф-ию свойством onKeyPress у поля ввода
    // допускает ввод символов [0123456789.-]
    // знак "-" автоматически втавляется/убирается в начало значения
    typingFloat (e) {

        let ev = e || window.event,
            et = ev.target,
            sPos = et.selectionStart,
            ePos = et.selectionEnd,
            ch = String.fromCharCode(e.keyCode || e.which)  // строковое выржение символа

        function abort() {
            ev.returnValue = false
            if (ev.preventDefault) ev.preventDefault()
        }

        function resel() {
            et.setSelectionRange(sPos + 1, sPos + 1)
        }

        if (!/[0-9-.]/.test(ch)) {
            abort()
            return
        }

        switch (ch) {
            case '-':  // перехватываем и исправляем ввод "минуса"
                abort()
                et.value = /-/.test(et.value) ? et.value.substr(1) : '-' + et.value
                resel()
                return
            case '.':  // перехватываем и исправляем ввод "точки"
                abort()
                var v = et.value.replace('.', ' ')
                v = v.substr(0, sPos) + '.' + v.substr(ePos)
                et.value = v.replace(' ', '')
                resel()
                return
        }

    },

    // валидатор ввода email
    // для применение нужно указать эиу ф-ию свойством onKeyPress у поля ввода
    // допускает ввод символов [@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.]
    typingEmail (e) {

        let ev = e || window.event,
            ch = String.fromCharCode(e.keyCode || e.which)  // строковое выржение символа

        function abort() {
            ev.returnValue = false
            if (ev.preventDefault) ev.preventDefault()
        }

        if (String("@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.").indexOf(ch) == -1) {
            abort()
            return
        }

    },

    // валидатор ввода phone
    // для применение нужно указать эиу ф-ию свойством onKeyPress у поля ввода
    // допускает ввод символов [()0123456789+- ]
    typingPhone (e) {

        let ev = e || window.event,
            ch = String.fromCharCode(e.keyCode || e.which)  // строковое выржение символа

        function abort() {
            ev.returnValue = false
            if (ev.preventDefault) ev.preventDefault()
        }

        if (String("()0123456789+- ").indexOf(ch) == -1) {
            abort()
            return
        }

    },

    // валидатор ввода гос. номера автомобиля по маске х000хх00[0]
    // [А-Яа-я]\d{3}[А-Яа-я]{2}\d{2,3}
    typingCarNum (e) {

        if( !e ) e = window.event;

        let eTarget = e.target
        let position = Utils.getCaretPosition(eTarget);
        let ch = String.fromCharCode(e.keyCode || e.which)  // get symbol
        let value = e.target.value + ch;

        function abort() {
            e.returnValue = false;
            if( e.preventDefault ) e.preventDefault();
        }

        function resel() {
            eTarget.setSelectionRange(position + 1, position + 1)
        }

        if( !position || (position >= 4 && position <= 5) ) {
            if (!/[А-Яа-я]/.test(ch)) {
                abort();
                return;
            } 
            // else {
            //     eTarget.value += '-';
            //     //resel()
            // }
        } else if( (position >= 1 && position <= 3) || (position >= 6 && position <= 8) ) {
            if (!/[0-9]/.test(ch)) {
                abort();
                return;
            }
        } else if( position >= 9 ) {
            abort();
            return;
        }
    },

     // валидатор ввода гос. номера прицепа по маске хx0000000[0]
    // [А-Яа-я]{2}\d{6,7}
    typingTrailerNum (e) {

        if( !e ) e = window.event;

        let eTarget = e.target
        let position = Utils.getCaretPosition(eTarget);
        let ch = String.fromCharCode(e.keyCode || e.which)  // get symbol
        let value = e.target.value + ch;

        function abort() {
            e.returnValue = false;
            if( e.preventDefault ) e.preventDefault();
        }

        function resel() {
            eTarget.setSelectionRange(position + 1, position + 1)
        }

        if( !position || position <= 1 ) {
            if (!/[А-Яа-я]/.test(ch)) {
                abort();
                return;
            }
        } else if( position >= 2 && position <= 8 ) {
            if (!/[0-9]/.test(ch)) {
                abort();
                return;
            }
        } else if( position >= 9 ) {
            abort();
            return;
        }
    },

    // валидатор значения через "cm":"check_unique"
    // для применения нужно передать
    //  event - событие из onChange
    //  caller - объект-контейтер поля ввода (для досупа к .props.validation и хранению промежуточных данных)
    //  callback - ф-ия которая будет вызвана при изменених состояния проверки
    //   параметр callback - это объект с ключами
    //    state - состояние проверки
    //     idle - ничего не происходит
    //     pending - проверка в процессее
    //     error - ошибка при проверке
    //     unique - значене проверено и уникально
    //     used - значене проверено и оно уже используется
    //    msg - пояснение
    changingUnique (event, caller, callback) {
        // эта дичь тут из-за тупости фетча, который нельзя отменить
        caller.valueForCheck = event.target.value

        // caller.props.validation = {uniqueType: "user_email", uniqueHolder: "150"}

        if (!caller.valueForCheck || caller.valueForCheck == '') return callback({state: 'idle'})

        callback({state: 'pending', msg: 'Проверка ...'})

        if (caller.ti) {
            clearTimeout(caller.ti)
            caller.ti = null
        }

        caller.ti = setTimeout(doRequest, 800)

        function doRequest() {
            if (caller.req) return  // есть активный зпрос, будем ждать
            let vv = caller.valueForCheck
            caller.valueForCheck = null
            if (!vv || vv == '') return callback({state: 'idle'})
            caller.req = Api.checkUnique(caller.props.validation.uniqueType, vv).then(res=> {
                caller.req = null  // убираем ссылку на активный запрос, типа его больше нет
                if (caller.valueForCheck) return doRequest()  // есть новый запрос
                if (res.err) return callback({state: 'error', msg: 'Ошибка проверки: ' + res.err})
                if (res.unique === true || res.holder_id == caller.props.validation.uniqueHolder) return callback({state: 'unique'})
                callback({state: 'used', msg: 'Email занят'})
                caller.req = null
            })
        }

    },

    foo: 'bar'

};

export {Validation}