var React = require('react/addons');
import {Events, Actions, Store} from '../Dispatcher';
import {Loading} from '../SimpleComponents/Loading';
import {
    SimpleTable2,
    TblHead,
    TblBody,
    TblCellSid,
    TblCellCheckbox,
    TblPages,
    TblFooterControls
} from '../SimpleComponents/SimpleTable2';
import {Api} from '../api';
import {TransparentButton} from '../SimpleComponents/TransparentButton';


class TblCellActions extends React.Component {

    render = ()=> {
        return (
            <div>
                <TransparentButton caption="Отменить" onClick={this.props.opt.cancelRequest}/>
            </div>

        )
    }


}

class Requests extends React.Component {
    state = {
        requests: null
    };

    componentWillMount() {
        Api.req('graph', {
            query: {
                comps: {
                    fields: ["id", "name", "addr"],
                    sub   : {
                        users  : {
                            fields: ["id"]
                        },
                        tenders: {
                            fields: ["id"]
                        }
                    }

                }
            }
        }, false).then(res=> {
            console.log(res.comps.data);
            this.setState({requests: res.comps.data})
        })
    }

;

    cancelRequest = ()=> {
        console.log("CANCEL");
        console.log(Store.userState.join_requests[0].comp_id);
        Actions.joinRequestDelete(Store.userState.join_requests[0].comp_id);
    };

    render = ()=> {
        console.log("REQUESTS");
        console.log(Store.userState.join_requests);
        this.opt = {
            // хедер
            headerClass  : TblHead,
            headData     : [
                {id: 'comp_id', title: 'ID'},   // TblCellSid - умеет частично скрывать значение
                {id: 'state', title: 'Состояние'},
                {id: 'ctime', title: 'Время отправки запроса'},
                {id: 'comp_id', title: 'Действия', cellClass: TblCellActions}

            ],
            // контент
            bodyClass    : TblBody,
            //bodyData: Store.sessions,
            bodyData     : Store.userState.join_requests,
            cancelRequest: this.cancelRequest,
            // футер
            // события
            //onCloseSelected: this.onCloseSelected,  // вызывается из футера по клику на "Close"
            // вспомогательные
            title        : 'Запросы',  // заголовок контейнера
            selectionKey : 'sKey',  // ключ в объекте который будет использован для флага выделения
            selectable   : false,  // включает стандартный механизм выбора (кликом по ряду), можно выключить и сделать свой через bodyClass или cellClass
            multiselect  : false  // можно выбирать несколько рядов
        };

        if (this.props.disabled) {
            return null
        } else {
            return (
                <Loading dataRecived={this.state.profile}>
                    <div className="box-row-wr max-size">
                        <SimpleTable2 opt={this.opt}

                            />
                    </div>
                </Loading>
            )
        }
    }
}


export {Requests}