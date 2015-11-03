var React = require('react/addons');

import {Api} from '../api';
import {AppState} from '../Auth/Dashboard';
import {Events, Error} from '../Dispatcher';
import {logger} from '../Classes/Logger';

import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {ButtonSimple} from '../Controls/Forms/ButtonSimple';
import {SettingsBlock} from '../Controls/SettingsBlock';


class Settings extends React.Component {

    constructor( props ) {
        super(props);
        this.start = AppState.user.state.flags;
    }

    state = { flags: AppState.user.state.flags }
        
    cancelChanges = ()=>{
        this.setState({ flags: this.start });
    }

    onChangeHandler = (flags)=>{
        this.setState({ flags: flags });
    }

    saveChanges = ()=>{
        let message = {};

        Api.userEditRequest({ flags: this.state.flags }).then(res=> {
            if(res){
                if (res.err) {
                    logger.log( this, 'Настройка приватности: ошибка при сохранение настроек', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                    return;
                }

                message = { message: 'Настройки сохранены', type: 'info' };
                this.start = this.state.flags;
            }

            Events.run(Events.EV_SHOW_NOTIFY, message);
        });
    }

    render = ()=>{

        logger.log('settings', this, this.state.flags);

        return(
            <div className="row">
                <div className="col-xs-12">
                    <SettingsBlock  title="Кому показывать Мой профиль" name="show-my-profile" 
                                    type="checkbox" flags={this.state.flags} change={this.onChangeHandler}
                                    choice={[
                                        {id: 0x00002000, value: 'Всем пользователям', exclude: 1,},
                                        {id: 0x00004000, value: 'Пользователям связанных компаний'},
                                        {id: 0x00008000, value: 'Пользователям по переписке'},
                                        {id: 0x00010000, value: 'Пользователям из списка моих контактов'}
                                    ]}
                    />


                    <SettingsBlock  title="Кто может писать мне Сообщения" name="show-my-profile" 
                                    type="checkbox" flags={this.state.flags} change={this.onChangeHandler}
                                    choice={[
                                        {id: 0x00000002, value: 'Все пользователи', exclude: 1},
                                        {id: 0x00000008, value: 'Пользователи связанных компаний'},
                                        {id: 0x00000004, value: 'Пользователи из списка моих контактов'},
                                        {id: 0x00000001, value: 'Никто', exclude: 1}
                                    ]}
                    />


                    <SettingsBlock  title="Кому доступна Контактная информация" name="show-my-profile" 
                                    type="checkbox" flags={this.state.flags} change={this.onChangeHandler}
                                    choice={[
                                        {id: 0x00000200, value: 'Всем пользователям', exclude: 1,},
                                        {id: 0x00000400, value: 'Пользователям связанных компаний'},
                                        {id: 0x00000800, value: 'Пользователям по переписке'},
                                        {id: 0x00001000, value: 'Пользователям из списка моих контактов'}
                                    ]}
                    />

                    <SettingsBlock  title="Кто может приглашать меня в каналы" name="show-my-profile" 
                                    type="checkbox" flags={this.state.flags} change={this.onChangeHandler}
                                    choice={[
                                        {id: 0x00000020, value: 'Все пользователи', exclude: 1},
                                        {id: 0x00000080, value: 'Пользователи связанных компаний'},
                                        {id: 0x00000040, value: 'Пользователи из списка моих контактов'},
                                        {id: 0x00000010, value: 'Никто', exclude: 1}
                                    ]}
                    />


                    <SettingsBlock  title="Использовать двойную проверку при входе" name="invite-to-channel123" 
                                    type="radio" flags={this.state.flags} change={this.onChangeHandler}
                                    choice={[
                                        {id: 0x00000100, value: 'Да', exclude: 1},
                                        {value: 'Нет', exclude: 1},
                                    ]}
                    />

                    <div className="box-row-nw just-end table-footer table-pr">
                        <ButtonSimple brand="success" onClick={this.saveChanges} disabled={this.start === this.state.flags} caption="Сохранить"/>
                        <ButtonSimple brand="danger" onClick={this.cancelChanges} disabled={this.start === this.state.flags} caption="Отменить"/>
                    </div>
                </div>
            </div>
        )
    }

}

export {Settings}
                // <div className="col-6">
                //         <div className="box-cln-nw panel-md">
                //             <div className="divider font600">
                //                 Смена пароля:
                //             </div>
                //             <div className="message message-nl">
                //                 <p>Для смены пароля подтвердите действие кнопкой "Сменить пароль".</p>

                //                 <p>На Ваш email будет выслано письмо с дальнейшими инструкциями.</p>
                //             </div>
                //         </div>
                //         <div className="box-row-nw just-end table-footer table-pr">
                //             <TransparentButton onClick={this.changePass} caption="Сменить пароль"/>
                //         </div>
                // </div>
                // <div className="col-6">
                //         <div className="box-cln-nw panel-md">
                //             <div className="divider font600">
                //                 Смена email:
                //             </div>
                //             <div className="message message-nl">
                //                 <p>Для смены email подтвердите действие кнопкой "Сменить email".</p>

                //                 <p>На Ваш текущий email будет выслано письмо с дальнейшими инструкциями.</p>
                //             </div>
                //         </div>
                //         <div className="box-row-nw just-end table-footer table-pr">
                //             <TransparentButton onClick={this.changeEmail} caption="Сменить email"/>
                //         </div>
                // </div>