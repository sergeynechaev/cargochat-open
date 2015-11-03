var React = require('react/addons');

import {Events, Dictionary} from '../../../Dispatcher';
import {AppState} from '../../../Auth/Dashboard';
import {Utils} from '../../../utils';
import {logger} from '../../../Classes/Logger';

export default class ContactsDataTable__Cell_Perms extends React.Component {

	constructor( props ) {
        super( props );
        this.start = this.props.value;
    }

    state = {
    	perms: this.props.value
    }

    componentWillReceiveProps = (nextProps)=>{
    	this.start = nextProps.value;
    	this.setState({ perms: nextProps.value });
    }

    render = ()=> {
        let Perms = AppState.myCompany.getPerms(this.props.value);

		return (
            <div>
                {Perms.map((perm, i)=>{
                    return <div className="label label-primary marg-right-xs" key={i}>{perm}</div>
                })}
            </div>
        )
    }
}