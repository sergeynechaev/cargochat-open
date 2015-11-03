var React = require('react/addons');
import {RelationRequestsTable} from './RelationRequestsTable';
import {RelationTable} from './RelationTable';
import {logger} from '../../Classes/Logger';
import {AppState} from '../../Auth/Dashboard';

export default class Expeditors extends React.Component {
    
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
                <RelationRequestsTable title='Нам предлагают сотрудничество' type='in_expeditors'  in_out={true} />
                <RelationTable         title='Наши экспедиторы'              relation='expeditors' comp_id={AppState.myCompany.id} />
                <RelationRequestsTable title='Мы предлагаем сотрудничество'  type='out_expeditors' in_out={false} />
            </div>
        )
    }
}

