import React, {Component} from 'react/addons';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export class InputDate extends Component {

    constructor(props) {
        super(props);

        moment.locale('ru');
    }

    static propTypes = {
        onChange   : React.PropTypes.func.isRequired,
        name       : React.PropTypes.string,
        placeholder: React.PropTypes.string,
        autoFocus  : React.PropTypes.bool,
        disabled   : React.PropTypes.any,
        className  : React.PropTypes.string,
        value      : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    }

    static defaultProps = {
        // disabled:   false,
    }

    state = {
        // defaultValue: this.props.value
    }

    change =(momentObj)=> {

        let v = momentObj._d.getTime() / 1000;
        let obj;

        if (this.props.name) {
            obj = {};
            obj[this.props.name] = v;
        } else {
            obj = v;
        }

        if (this.props.onChange) this.props.onChange(obj);
    }
    
    // componentWillReceiveProps = (newProps)=> {
    //     this.setState({defaultValue: newProps.value})
    // }

    render = ()=> {

        return (
            <DatePicker
                dateFormat="YYYY-MM-DD" 
                locale="ru" 
                weekdays={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                placeholderText={this.props.placeholder} 
                selected={this.props.defaultValue} 
                onChange={this.change}
                minDate={this.props.minDate}
                ref={this.props.ref} />
        );
    }


}
