var React = require('react/addons');
import {Store, Events, Actions, Dictionary} from '../../Dispatcher';
import {BigPanel} from '../../SimpleComponents/BigPanel';
import {TableForm} from '../../SimpleComponents/TableForm';
import {Map2} from '../Map2';
import {SmallPanel} from '../../SimpleComponents/SmallPanel';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Api} from '../../api';
import {Icon} from '../../SimpleComponents/Icons';
import {AboutTextForm} from './AboutTextForm';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import {InputSimple} from '../../SimpleComponents/InputSimple';
import {InputSelect2, Tag} from '../../SimpleComponents/InputSelect2.js';
import {MainInfo} from './MainInfo';


class CompanyAbout extends React.Component {

    render() {
        console.log("ABOUT");
        var comp = this.props.company;
        var address = comp.addr;
        var name = comp.name;
        var width = "400px"; // ширина блока с картой
        return (
            <FlexBox direction="row" alignItems="start">
                <AboutTextForm company={this.props.company}/>
            </FlexBox>
        )

    }

}
export {CompanyAbout}