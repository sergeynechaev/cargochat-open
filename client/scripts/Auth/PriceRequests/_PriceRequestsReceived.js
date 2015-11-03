var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import Logger from '../../Classes/Logger';

import {Loading} from '../../SimpleComponents/Loading';

import {PriceRequestsDataTable} from './PriceRequestsDataTable';


class PriceRequestsReceived extends React.Component {

    state = {
    }

    componentWillMount = ()=> {
    }

    render = ()=> {

        let priceRequestsReceived = AppState.PriceRequests.getPriceRequestsReceived();
        return (
            <div>
                <Loading dontShow={true} dataRecived={priceRequestsReceived}>
                    <PriceRequestsDataTable 
                            type="received"
                            priceRequests={(priceRequestsReceived) ? priceRequestsReceived : null} />
                </Loading>
            </div>
        )

    } // render

}

export {PriceRequestsReceived}