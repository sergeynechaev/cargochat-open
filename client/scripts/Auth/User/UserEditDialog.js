var React = require('react/addons');
var moment = require('moment');
var DatePicker = require('react-datepicker');
import {Utils} from '../../utils';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
// import {InputSimple} from '../../SimpleComponents/InputSimple';
import {Icon} from '../../SimpleComponents/Icons';
import {AppState} from '../Dashboard';
import Logger from '../../Classes/Logger';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../Controls/Forms/InputSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {InputDate} from '../../Controls/Forms/InputDate';

import {ModalWindow} from '../../Controls/ModalWindow';

export class UserEditDialog extends React.Component {

    constructor(props) {
        super(props);
    }
    
    static propTypes = {
        user: React.PropTypes.object.isRequired
    }
    
    onChangeHandler = (obj)=> {
        this.state.isEdit = true;
        this.setState(obj);
    };
    
    onBirthdayChangeHr = (d)=> {
        this.state.isEdit = true;
        this.setState({birthday: d.format('YYYY-MM-DD')});
    }
    
    state = {
        isEdit:false,
        isValidated: false,
        isModalOpen: false
    }
    
    saveChanges = ()=> {
        
    }

    closeModal = ()=> {
        this.setState({isModalOpen: false});
    }
    openModal = ()=> {
        this.setState({isModalOpen: true});
    }
    
    render = ()=> {
        
        return (
            <div>
                <ButtonSimple onClick={this.openModal} caption="Изменить данные" type="primary"/>
                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Редактирование информации">
                    <div className="modal-container__body">
                        <FormGroup name="Фамилия" from="last_name">
                            <InputSimple name="last_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Имя" from="first_name">
                            <InputSimple name="first_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Отчество" from="pat_name">
                            <InputSimple name="pat_name" onChange={this.onChangeHandler}/>
                        </FormGroup>
                        <FormGroup name="Дата рождения" from="pat_name">
                            <DatePicker dateFormat="YYYY-MM-DD" selected={moment(Utils.dateFix(this.state.birthday, '1982-01-01'))} onChange={this.onBirthdayChangeHr}/>
                        </FormGroup>
                        <FormGroup name="Телефон" from="mobile">
                            <InputSimple name="mobile" onChange={this.onChangeHandler}/>
                        </FormGroup>
                         <FormGroup name="ICQ" from="icq">
                            <InputSimple name="icq" onChange={this.onChangeHandler}/>
                        </FormGroup>
                         <FormGroup name="Skype" from="skype">
                            <InputSimple name="skype" onChange={this.onChangeHandler}/>
                        </FormGroup>

                        <div className="modal-container__footer">
                            <ButtonSimple caption="Сохранить" onClick={this.saveChanges}/>
                        </div>
                    </div>
                </ModalWindow>
            </div>
        )
    }
}
            // <div>
            //     <table className="text-form">
            //         <tbody>
            //         <tr>
            //             <td><p className="text-card padd-right">Фамилия</p></td>
            //             <td className="tbl-width"><InputSimple name="last_name" onChange={this.onChangeHandler} value={this.state.last_name}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="text-card padd-right">Имя</p></td>
            //             <td><InputSimple name="first_name" onChange={this.onChangeHandler} value={this.state.first_name}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="text-card padd-right">Отчество</p></td>
            //             <td><InputSimple name="pat_name" onChange={this.onChangeHandler} value={this.state.pat_name}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="text-card padd-right">Должность</p></td>
            //             <td><InputSimple name="position" onChange={this.onChangeHandler} value={this.state.position}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="text-card padd-right">Дата рождения</p></td>
            //             <td><DatePicker dateFormat="YYYY-MM-DD" selected={moment(Utils.dateFix(this.state.birthday, '1982-01-01'))} onChange={this.onBirthdayChangeHr}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="padd-icon-mod icon-shift"><Icon iconName="cellphone-icon" className="icon-color "/></p></td>
            //             <td><InputSimple name="mobile" onChange={this.onChangeHandler} value={this.state.mobile}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="padd-icon-mod icon-shift"><Icon iconName="skype-icon" className="icon-color"/></p></td>
            //             <td><InputSimple name="skype" onChange={this.onChangeHandler} value={this.state.skype}/></td>
            //         </tr>
            //         <tr>
            //             <td><p className="text-card padd-right">ICQ</p></td>
            //             <td><InputSimple name="icq" onChange={this.onChangeHandler} value={this.state.icq}/></td>
            //         </tr>
            //         </tbody>
            //     </table>
            //     <div className="box-row-nw just-end table-pr marg-t">
            //         <TransparentButton caption="Сохранить" onClick={this.saveChanges}/>
            //         <TransparentButton caption="Отменить" onClick={this.close}/>
            //     </div>
            // </div>