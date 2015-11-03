var React = require('react/addons');
import {Store, Events, Actions} from '../Dispatcher';
import {Api} from '../api';
import {Utils} from '../utils';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {Loading} from '../SimpleComponents/Loading';
import {InputText} from '../SimpleComponents/InputText';
import {InputAddress} from '../SimpleComponents/InputAddress';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {InputSelect} from '../SimpleComponents/InputSelect.js';
import {RadioInput} from '../SimpleComponents/RadioInput.js';
import {DateSimple} from '../SimpleComponents/DateSimple';

var TenderForm = React.createClass({


    propTypes: {
        id       : React.PropTypes.number.isRequired,
        name     : React.PropTypes.string.isRequired,
        stime    : React.PropTypes.string.isRequired,
        etime    : React.PropTypes.string.isRequired,
        organizer: React.PropTypes.string.isRequired


    },

    getInitialState(){
        return {
            comp_id  : Store.userState.comps[0].id,
            id       : this.props.id,
            editMode : false,
            name     : this.props.name,
            stime    : this.props.stime,
            etime    : this.props.etime,
            organizer: this.props.organizer

        }
    },

    componentWillMount(){
        console.log("CREATE Tender");
        console.log(this.props.params)
    },
    mergeState(obj){
        this.setState(obj)
    },

    cancelEdit(){
        //window.location.hash="#/dashboard/tenders";
        this.setState({editMode: false})
    },

    editInfo(){
        this.setState({editMode: true})
    },
    saveInfo(){
        var params = {
            tender_id: this.state.id,
            name     : this.state.name,
            stime    : this.state.stime,
            etime    : this.state.etime,
            organizer: this.state.organizer

        };
        this.setState({editMode: false})
        Actions.updateTender(params)
    },
    deleteTender(){
        Actions.deleteTender(this.props.id)
    },

    render(){
        console.log(this.state);
        if (this.props.hidden) {
            return null
        }
        return (
            <div className="box-row-wr align-start">
                <SmallPanel headerName={this.props.name}>
                    <div className="box-cln-nw align-stretch panel-md">
                        <div className="">
                            <InputText
                                type="text"
                                active={this.state.editMode}
                                inputName="name"
                                caption="Название тендера"
                                value={this.state.name}
                                returnValue={this.mergeState}
                                labelWidth={150}
                                />
                        </div>
                        <div className="wrap-tb">
                            <DateSimple
                                name="stime"
                                caption="Дата начала приема заявок"
                                onChange={this.mergeState}
                                value={this.state.stime}
                                active={this.state.editMode}
                                labelWidth={150}
                                />
                        </div>
                        <div className="wrap-tb">
                            <DateSimple
                                name="etime"
                                caption="Дата окончания приема заявок"
                                onChange={this.mergeState}
                                value={this.state.etime}
                                active={this.state.editMode}
                                labelWidth={150}
                                />
                        </div>
                        <div className="">
                            <InputText
                                type="text"
                                active={this.state.editMode}
                                inputName="organizer"
                                caption="Электронная площадка торгов"
                                value={this.state.organizer}
                                returnValue={this.mergeState}
                                labelWidth={150}
                                />
                        </div>
                    </div>
                    <div className="box-row-nw just-end table-footer table-pr">
                        <TransparentButton hidden={this.state.editMode} onClick={this.editInfo} caption="Изменить"/>
                        <TransparentButtonton hidden={this.state.editMode} onClick={this.deleteTender}
                                              caption="Удалить"/>
                        <TransparentButton hidden={!this.state.editMode} onClick={this.saveInfo} caption="Сохранить"/>

                        <TransparentButton hidden={!this.state.editMode} onClick={this.cancelEdit} caption="Отменить"/>
                    </div>

                </SmallPanel>
            </div>
        )
    }
});

export {TenderForm}