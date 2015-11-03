var React = require('react/addons');

import {Utils} from '../../../utils';

import {AppState} from '../../../Auth/Dashboard';
import {Icon} from '../../../Controls/Icon';
import {ModalWindow} from '../../../Controls/ModalWindow';

import CompanyLogo__Actions_Upload from './CompanyLogo__Actions_Upload';

class CompanyLogo extends React.Component {

    constructor( props ) {
        super( props );
    }

    state = {
        isModalOpen: false,
        perm: Utils.checkFlags(AppState.user.state.comp_flags, 32)
    }

    closeModal = ()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal = ()=> {
        this.setState( {isModalOpen: true} );
    }

    update = ()=>{
        this.forceUpdate()
    }

    render = ()=>{
        let logo = AppState.myCompany.state.logo ? <img id="company-logo" src={`http://cargo.chat/${AppState.myCompany.state.logo}`} alt={AppState.myCompany.state.name}/> : <div id="company-logo-null"></div>,
            companyLogoBox;

        if(Utils.checkFlags(AppState.user.state.comp_flags, 32)){
            companyLogoBox =    <div className="company-logo-box">
                                    <div className="company-logo-box__edit" onClick={this.openModal}>
                                        {logo}
                                    </div>
                                    <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} title="Настройка логотипа компании">
                                        <CompanyLogo__Actions_Upload update={this.update} onClose={this.closeModal}/>
                                    </ModalWindow>
                                </div>;
        } else {
            companyLogoBox =    <div className="company-logo-box">
                                    {logo}
                                </div>;
        }

        return companyLogoBox;
    }
}

export {CompanyLogo}