var React = require('react/addons');
import {Icon} from '../SimpleComponents/Icons';
import {Events} from '../Dispatcher';
import {InputSelect} from '../SimpleComponents/InputSelect';
import {InputSelect2} from '../SimpleComponents/InputSelect2';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Utils} from '../utils';


var DateSimple = React.createClass({

    propTypes: {
        value     : React.PropTypes.string,
        caption   : React.PropTypes.string,
        onChange  : React.PropTypes.func.isRequired,
        name      : React.PropTypes.string,
        active    : React.PropTypes.bool,
        labelClass: React.PropTypes.string,
        labelWidth: React.PropTypes.number
    },

    getDefaultProps(){
        return {
            name      : "Date",
            active    : true,
            labelWidth: 114
        }
    },

    getInitialState(){
        if (this.props.value) {
            return Utils.extract_ymd_from_date(this.props.value)
        } else return {
            day  : null,
            month: null,
            year : null
        }

    },

    /*
     updateState(newState){
     this.setState(newState);
     var name=this.props.name;
     var newObj={};
     var day=newState.day||this.state.day;
     var month=newState.month||this.state.month;
     var year=newState.year||this.state.year;
     newObj[name]=year+'-'+month+'-'+day;
     this.props.onChange(newObj);
     },
     */

    dayChanged (caller) {
        this.dateChanged(
            this.dateObj.year,
            this.dateObj.month,
            caller.getSelectedList()[0].value
        )
    },

    monthChanged (caller) {
        this.dateChanged(
            this.dateObj.year,
            caller.getSelectedList()[0].value,
            this.dateObj.day
        )
    },

    yearChanged (caller) {
        this.dateChanged(
            caller.getSelectedList()[0].value,
            this.dateObj.month,
            this.dateObj.day
        )
    },

    dateChanged (y, m, d) {
        //console.log('[DateSimple] dateChanged ymd=' + y + ',' + m + ',' + d)
        let o = {}
        o[this.props.name] = [y, m, d].join('-')
        this.props.onChange(o)
    },

    render () {
        //console.log('[DateSimple] render')
        //console.log(this.state)
        //console.log(' this.props.value=' + this.props.value)

        // датапровайдеры для селекторов
        let days = [{id: -1, value: 'число'}],
            months = [{id: -1, value: 'месяц'}],
            years = [{id: -1, value: 'год'}]

        // парсим входящую дату
        if (this.props.value) {
            this.dateObj = Utils.extract_ymd_from_date(this.props.value)
        } else {
            // дата не указана - показываем тектовые поля
            this.dateObj = {year: years[0].value, month: months[0].value, day: days[0].value}
        }

        //console.debug(this.dateObj)

        // заполняем данные для селеторов
        function zerofill(src, len) {
            while (src.length < len) src = '0' + src
            return src
        }

        // ограничиваем выбор года 3 годами назад и 2 вперед
        let d = new Date();
        let startYear = d.getFullYear() - 3;
        let endYear = d.getFullYear() + 2;

        let i
        for (i = 1; i <= 31; i++)   days.push({id: i, value: zerofill(String(i), 2)})
        for (i = 1; i <= 12; i++) months.push({id: i, value: zerofill(String(i), 2)})
        for (i = startYear; i <= endYear; i++)  years.push({id: i, value: zerofill(String(i), 4)})

        // добавляем в данные селекторов недостающие данные (которые могут быть получены извне (в нашем случае this.props.value))
        if (!find_key_value(days, 'value', this.dateObj.day))     days.splice(1, 0, {id: -2, value: this.dateObj.day})
        if (!find_key_value(months, 'value', this.dateObj.month)) months.splice(1, 0, {
            id   : -2,
            value: this.dateObj.month
        })
        if (!find_key_value(years, 'value', this.dateObj.year))   years.splice(1, 0, {id: -2, value: this.dateObj.year})

        // выделяем выбранные данные
        function set_selected_by_value(src, val) {
            let o = find_key_value(src, 'value', val)
            if (o) o.__selected__ = true
        }

        set_selected_by_value(days, this.dateObj.day)
        set_selected_by_value(months, this.dateObj.month)
        set_selected_by_value(years, this.dateObj.year)

        // выделяем выбранные данные по умлочанияю (если они не выбрались в предыдущем шаге)
        function find_key_value(src, key, val) {
            for (let i = 0; i < src.length; i++) {
                if (src[i][key] === val) return src[i]
            }
            return null
        }

        if (!find_key_value(days, '__selected__', true))   days[0].__selected__ = true
        if (!find_key_value(months, '__selected__', true)) months[0].__selected__ = true
        if (!find_key_value(years, '__selected__', true))  years[0].__selected__ = true

        return (
            <div>
                <FlexBox alignItems="center">
                    <label style={{flex: "0 0 " + this.props.labelWidth+"px"}}
                           className={"label table-prb " + this.props.labelClass}>{this.props.caption}</label>
                    <InputSelect2 active={this.props.active} noIcon={true} list={days} onChanged={this.dayChanged}/>
                    <span></span>
                    <InputSelect2 active={this.props.active} noIcon={true} list={months} onChanged={this.monthChanged}/>
                    <span></span>
                    <InputSelect2 active={this.props.active} noIcon={true} list={years} onChanged={this.yearChanged}/>
                    <Icon iconName="event"/>
                </FlexBox>
            </div>
        )
    }
});


export {DateSimple}
