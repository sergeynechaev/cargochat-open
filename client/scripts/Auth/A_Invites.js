"use strict";
var React = require('react/addons');


import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {Loading} from '../SimpleComponents/Loading';

import {Api} from '../api';

export default class A_Invites extends React.Component {

    render() {
        return (
            <div>
                <TransparentButton caption="Создать приглашение"/>
            </div>
        )
    }


}