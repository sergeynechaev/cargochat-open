var React = require('react/addons');
import {Api} from '../api';
import {Utils} from '../utils';
import {Icon} from '../SimpleComponents/Icons';

import {ThemeController, Style} from '../../styles/ThemeController';

class LogoName extends React.Component {

    static defaultProps = {
        styleVariables: ThemeController.LogoName.LogoName
    };


    render = ()=> {
        return (
            <div className="logo-name-wrap">
                <a className="logo-name">All shippers</a>
            </div>
        );
    }
}


class UpPanel extends React.Component {

    render() {
        return (

                <div className="up-panel">
                    {this.props.children}
                </div>

        );
    }
}
export {UpPanel};
