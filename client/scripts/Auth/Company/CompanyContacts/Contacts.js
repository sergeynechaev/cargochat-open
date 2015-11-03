var React = require('react/addons');

import {AppState} from '../../Dashboard';
import {Utils} from '../../../utils';

import Contacts__Actions_Invite from './Contacts__Actions_Invite';
import ContactsInvitedDataTable from './ContactsInvitedDataTable';
import ContactsDataTable from './ContactsDataTable.js';

class Contacts extends React.Component {

    constructor( props ) {
        super( props );
    }

    state = {
        users: []
    }

    render = ()=>{
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <ContactsDataTable/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <ContactsInvitedDataTable/>
                        {Utils.checkFlags(AppState.user.state.comp_flags, 64) ? <Contacts__Actions_Invite/> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export {Contacts}