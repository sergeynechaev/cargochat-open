var React = require('react/addons');
import {SmallPanel} from '../../SimpleComponents/SmallPanel';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {Icon} from '../../SimpleComponents/Icons';
import {UserEditDialog} from './UserEditDialog';
import Logger from '../../Classes/Logger';

var User = React.createClass({
    
    getInitialState () {
        return {isModalOpen: false}
    },
    
    editMode () {
        try {
        this.setState({isModalOpen: true})
        } catch (e) {
            console.debug(e)
        }
    },
    
    componentWillMount () {
        this.setState(this.props);
    },
    
    componentWillReceiveProps (props) {
        this.setState(props);
    },
    
    
    closeModal () {
        this.setState({isModalOpen: false});
    },
    
    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                        <div className="box-cln-nw align-center photo-box">
                            <Icon iconName="user-icon" size={100} className="icon-photo-box"/>
                        </div>
                        <div className="box-cln-nw panel-md">
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label">Фамилия</p>
                                <p className="p-list">{this.state.user.last_name}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label">Имя</p>
                                <p className="p-list">{this.state.user.first_name}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label">Отчество</p>
                                <p className="p-list">{this.state.user.pat_name}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="text-card p-list profile-label">Должность</p>
                                <p className="p-list">{this.state.user.position}</p>
                            </div>
                            <div className="box-row-nw divider padd-top-card">
                                <p className="text-card p-list padd-right">Дата рождения</p>
                                <p className="p-list">{this.state.user.birthday}</p>
                            </div>
                            <div className="box-row-nw divider padd-top-card">
                                <p className="padd-icon-mod"><Icon iconName="mail-icon" size={20} className="icon-color"/></p>
                                <p className="p-list padd-user">{this.state.user.email}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="padd-icon-mod"><Icon iconName="cellphone-icon" size={20} className="icon-color"/></p>
                                <p className="p-list padd-user">{this.state.user.mobile}</p>
                            </div>
                            <div className="box-row-nw divider">
                                <p className="padd-icon-mod"><Icon iconName="skype-icon" size={20} className="icon-color"/></p>
                                <p className="p-list padd-user">{this.state.user.skype}</p>
                            </div>
                            <div className="box-row-nw">
                                <p className="text-card p-list padd-right">ICQ</p>
                                <p className="p-list">{this.state.user.icq}</p>
                            </div>
                        </div>
                        <UserEditDialog user={this.state.user}/>
                </div>
            </div>
        )
    }
});

export {User};
