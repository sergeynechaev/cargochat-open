var React = require('react/addons');
import {Events} from '../../Dispatcher';
import {logger} from '../../Classes/Logger';

import {Icon} from '../../SimpleComponents/Icons';
import Hint from '../../SimpleComponents/Hint';

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';


// кликабельное название компании
export class TblCellRelationCompName extends React.Component {

    render =()=> {
        let compId = this.props.obj.requested_id || this.props.obj.requester_id || this.props.obj.comp_id;
        
        return (
            <div className="box-row-nw">
                <a target='_blank' href={"/#/dashboard/comp/" + compId}>{this.props.value}</a>
            </div>
        )
    }
}


// действия на существующую связь компании
export class TblCellRelationActions extends React.Component {

    state = { isModalRemoveOpen: false }

    // message=()=>{ Events.run(Events.EV_RELATION_REQUEST_MESSAGE, this.props.obj); };

    remove =()=> { 
        Events.run(Events.EV_RELATION_REQUEST_DELETE, this.props.obj);
        this.triggerModalRemove();
    }

    triggerModalRemove =()=> { this.setState( {isModalRemoveOpen: !this.state.isModalRemoveOpen } ) }

    render =()=> {
        if( !this.props.opt.delAvailable ) return null;

        return (
            <div className="row row-nw row-space-children">
                <ButtonSimple onClick={this.triggerModalRemove} brand="warning" size="small" caption="Удалить связь"/>
                <ModalWindow isOpen={this.state.isModalRemoveOpen} 
                             onClose={this.triggerModalRemove} 
                             title="Удаление связи">
                         <div className="modal-container__body">
                            <div>Вы действительно хотите удалить связь с компанией {this.props.obj.name}?</div>
                            <div className="modal-container__footer">
                                <ButtonSimple brand="danger" onClick={this.remove} caption="Удалить"/>
                            </div>
                         </div>
                </ModalWindow>
            </div>
        )

        //  OLD
        // <div data-tooltip="Удалить" className="pagin-pls" data-name="close" onClick={this.remove} >
        //                 <Icon iconName="close-circle-icon" dataName="close" size={20} />
        //             </div>
    }
}


// действия на предложение создания связей с моей компанией
export class TblCellRelationInRequestActions extends React.Component {

    state = { isModalRefuseOpen: false }

    // message=()=>{ Events.run(Events.EV_RELATION_REQUEST_MESSAGE, this.props.obj); };

    refuse =()=> { 
        Events.run(Events.EV_RELATION_REQUEST_REFUSE, this.props.obj);
        this.triggerModalRefuse();
    }

    accept =()=> { 
        Events.run(Events.EV_RELATION_REQUEST_ACCEPT, this.props.obj);
    }

    triggerModalRefuse =()=> { this.setState( {isModalRefuseOpen: !this.state.isModalRefuseOpen } ) }

    render=()=> {
        return (
            <div className="row row-nw row-space-children">
                <ButtonSimple onClick={this.accept} brand="success" size="small" caption="Принять"/>
                <ButtonSimple onClick={this.triggerModalRefuse} brand="warning" size="small" caption="Отклонить"/>
                <ModalWindow isOpen={this.state.isModalRefuseOpen} 
                             onClose={this.triggerModalRefuse} 
                             title="Отклонить запрос">
                         <div className="modal-container__body">
                            <div>Вы действительно хотите отклонить запрос на создание связи с компанией {this.props.obj.requester_name}?</div>
                            <div className="modal-container__footer">
                                <ButtonSimple brand="danger" onClick={this.refuse} caption="Отклонить"/>
                            </div>
                         </div>
                </ModalWindow>
            </div>
        )
    }

    // OLD
    // render=()=> {
    //     return (
    //         <div className="box-row-nw">
    //             <div data-tooltip="Отклонить" className="pagin-pls" data-name="close" onClick={this.refuse} >
    //                 <Icon iconName="close-circle-icon" dataName="close" size={20} />
    //             </div>
    //             <div data-tooltip="Принять" className="pagin-pls" data-name="mail" onClick={this.accept} >
    //                 <Icon iconName="plus-circle-icon" dataName="close" size={20} />
    //             </div>
    //         </div>
    //     )
    // }
}


// действия на предложение создания связей от моей компании
export class TblCellRelationOutRequestActions extends React.Component {

    state = { isModalCancelOpen: false }

    // message=()=>{ Events.run(Events.EV_RELATION_REQUEST_MESSAGE, this.props.obj); }

    cancel =()=> { 
        Events.run(Events.EV_RELATION_REQUEST_CANCEL, this.props.obj);
        this.triggerModalCancel();
    }

    triggerModalCancel =()=> { this.setState( {isModalCancelOpen: !this.state.isModalCancelOpen } ) }

    render=()=> {
        return (
            <div className="row row-nw row-space-children">
                <ButtonSimple onClick={this.triggerModalCancel} brand="warning" size="small" caption="Отменить запрос"/>
                <ModalWindow isOpen={this.state.isModalCancelOpen} 
                             onClose={this.triggerModalCancel} 
                             title="Отмена запроса">
                         <div className="modal-container__body">
                            <div>Вы действительно хотите отменить запрос на создание связи с компанией {this.props.obj.requested_name}?</div>
                            <div className="modal-container__footer">
                                <ButtonSimple brand="danger" onClick={this.cancel} caption="Отменить"/>
                            </div>
                         </div>
                </ModalWindow>
            </div>
        )

        // OLD
        // return (
        //     <div className="row row-nw row-space-children">
        //         <div data-tooltip="Отменить" className="pagin-pls" data-name="close" onClick={this.cancel} >
        //             <Icon iconName="close-circle-icon" dataName="close" size={20} />
        //         </div>
        //     </div>
        // )
    }
}
