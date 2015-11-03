import React from 'react/addons';
import Router, {RouteHandler} from 'react-router';

import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';
import {AppState} from '../../../Auth/Dashboard';
import {logger} from '../../../Classes/Logger';

export default class A_Companies extends React.Component {
	
    state = {
    }

    render = ()=> {
        return (
            <div>
                <h3>Компании</h3>
                <RouteHandler/>
            </div>
        )
    } 
}
