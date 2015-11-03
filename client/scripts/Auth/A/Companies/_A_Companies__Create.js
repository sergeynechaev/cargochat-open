// 
// 
// BACKUP
// 
// 
// 



import React from 'react/addons';

import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';
import {AppState} from '../../../Auth/Dashboard';
import {logger} from '../../../Classes/Logger';

import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';

import A_Companies__Dadata from './A_Companies__Dadata';

export default class A_Companies__Create extends React.Component {
	
    state = {
    }

    render = ()=> {
        return (
            <div>
                <h3>Добавить компанию</h3>
                <A_Companies__Dadata />
            </div>
        )
    } 
}
