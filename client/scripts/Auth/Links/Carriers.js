var React = require('react/addons');
import {RelationRequestsTable} from './RelationRequestsTable';
import {RelationTable} from './RelationTable';
import {logger} from '../../Classes/Logger';
import {AppState} from '../../Auth/Dashboard';

export default class Carriers extends React.Component {
    
    constructor(props) {
        super(props);
    };
    
    render() {
        /*
        logger.log(this, "render");
        console.debug(this.props.company);
        */
        return (
            <div>
                <RelationRequestsTable title='Нам предлагают сотрудничество' type='in_carriers'  in_out={true} />
                <RelationTable         title='Наши перевозчики'              relation='carriers' comp_id={AppState.myCompany.id} />
                <RelationRequestsTable title='Мы предлагаем сотрудничество'  type='out_carriers' in_out={false} />
            </div>
        )
    }
}