var React = require('react/addons');

import {TblDateUTCCls} from '../../../SimpleComponents/TableCells';

export default class ContactsInvitedDataTable__Cell_Time extends React.Component {

	constructor( props ) {
        super( props );
    }

    render = ()=> {
        return (
            <div>
                <TblDateUTCCls value={this.props.obj.ctime}/>
            </div>
        )
    }
}