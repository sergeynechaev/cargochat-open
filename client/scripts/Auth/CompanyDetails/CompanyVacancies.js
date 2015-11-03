var React = require('react/addons');
import {SmallPanelTest} from '../../SimpleComponents/SmallPanelTest';
import {InputText} from '../../SimpleComponents/InputText';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {TenderForm} from '../TenderForm';
import {Store, Events, Actions} from '../../Dispatcher';
import Card from '../../SimpleComponents/Card';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {CreateTender} from '../CreateTender'
import {DateTime} from '../../utils';
import {Api} from '../../api';


class CompanyVacancies extends React.Component {

    render = ()=> {
        return (
            <div>
                Вакансии
            </div>
        )
    }

}

export {CompanyVacancies}