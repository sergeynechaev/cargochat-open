var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import Logger from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Loading} from '../../SimpleComponents/Loading';

import {PriceRequestsDataTable} from './PriceRequestsDataTable';


class PriceRequestsCreated extends React.Component {

    state = {
    }

    componentWillMount = ()=> {
    }

    render = ()=> {

        let priceRequestsCreated = AppState.PriceRequests.getPriceRequestsCreated();
        
        return (
            <div>
                <Loading dontShow={true} dataRecived={priceRequestsCreated}>
                    <PriceRequestsDataTable 
                            type="created"
                            priceRequests={(priceRequestsCreated) ? priceRequestsCreated : null} />
                </Loading>
            </div>
        );

    } // render

}

export {PriceRequestsCreated}