var React = require('react/addons');
import {DateSimple} from '../SimpleComponents/DateSimple';
import {DateTime} from '../utils';
import {Dictionary} from '../Dispatcher';
import {TransparentButton} from './TransparentButton';
import {Icon} from '../SimpleComponents/Icons';
import Hint from './Hint';
import {Events} from '../Dispatcher';
import {AppState} from '../Auth/Dashboard';
import {Utils} from '../utils';
import {logger} from '../Classes/Logger';

export class TblCellActions extends React.Component {
    
    onClick = ()=> {
        console.log("delete");
        // !!!! тут передается не тот параметр для удаления, и оно не удаляется
        AppState.myCompany.deleteLink({relation_id: this.props.value}, this.props.opt.linkType);
    }
    
    sendMsg=()=>{
        console.log(this.props);
    }
    
    // <div data-tooltip="Отправить сообщение в канал компании">
    //     <div className="pagin-pls" data-name="mail" onClick={this.sendMsg} >
    //         <Icon iconName="mail-icon" dataName="mail" size={20} />
    //     </div>
    // </div>
    render = ()=> {
        return (
            <div className="box-row-nw">
                <div data-tooltip="Удалить из связей">
                    <div className="pagin-pls" onClick={this.onClick} data-name="close" >
                        <Icon iconName="close-circle-icon" dataName="close" size={20} />
                    </div>
                </div>
            </div>
        )
    }
    
}

export class TblLinkCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.string
    };
    render() {
        return (
            <a target="_blank" href={this.props.value}><p>Ссылка</p></a>
        )
    }
}

export class TblActionsCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.any
    };
    render() {
        return (
            <div>
                <button>В избранное</button>
                <button>Запрос на участие</button>
            </div>
        )
    }
}

export class TblOwnerCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.object
    };
    render() {
        let value = this.props.value.data[0].name;
        return (
            <div>
                <p>{value}</p>
            </div>
        )
    }
}

export class TblDateTimeCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.any
    };
    render() {
        let value = this.props.value;
        if (value) {
            let newDate = new DateTime(value);
            var date = newDate.getFullMonthDate();
            var time = newDate.getTime();
        }
        return (
            <div>
                <p>{date}</p>
                <p>{time}</p>
            </div>
        )
    }
}

export class TblDateCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.any
    };
    render() {
        let value = this.props.value;
        if (value) {
            var newDate = new DateTime(value);
            value = newDate.getDate();
        }
        return (
            <p>{value}</p>
        )
    }
}

export class TblDateUTCCls extends React.Component {
    static propTypes = {
        value: React.PropTypes.any
    };
    render() {
        var value = parseInt(this.props.value);
        if (value) {
            let d = new Date( value * 1000 );
            let options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            value = d.toLocaleString('ru-RU', options);
        }
        return (
            <p>{value}</p>
        )
    }
}

export class TblCellPartnerName extends React.Component {
    render = ()=> {
        console.log("partner");
        console.log(this.props);
        /*
        var name = this.props.value.data[0].name;
        var inn = this.props.value.data[0].inn;
        var kpp = this.props.value.data[0].kpp;
        var addr = this.props.value.data[0].addr;
        */
        var link = '#/dashboard/comp/info?id=' + this.props.value.data[0].id;
        return (
            <div>
                <a className="text-under" target="_blank" href={link}>{this.props.value.data[0].name}</a>
            </div>
        )
    }
}

export class TblCellPartnerInn extends React.Component {
    render = ()=> {
        return (
            <div>
                {this.props.value.data[0].inn}
            </div>
        )
    }
}

export class TblCellPartnerAti extends React.Component {
    render = ()=> {
        return (
            <div>
                {this.props.value.data[0].ati_code}
            </div>
        )
    }
}

export class TblCellPartnerPhone extends React.Component {
    render = ()=> {
        //console.log(this.props.value.data[0]);
        return (
            <div>
                {this.props.value.data[0].phone || "не указан"}
            </div>
        )
    }
}