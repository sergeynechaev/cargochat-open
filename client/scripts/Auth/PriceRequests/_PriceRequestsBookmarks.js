var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import Logger from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Loading} from '../../SimpleComponents/Loading';

import {PriceRequestsDataTable} from './PriceRequestsDataTable';


class PriceRequestsBookmarks extends React.Component {

    state = {
    }

    componentWillMount = ()=> {
    }

    render = ()=> {

        let priceRequestBookmarks = AppState.PriceRequests.getPriceRequestBookmarks();
        return (
            <div>
                <Loading dontShow={true} dataRecived={priceRequestBookmarks}>
                    <PriceRequestsDataTable 
                            type="bookmarks"
                            priceRequests={(priceRequestBookmarks) ? priceRequestBookmarks : null} />
                </Loading>
            </div>
        )

    } // render

}

export {PriceRequestsBookmarks}