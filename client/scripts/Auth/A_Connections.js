"use strict";
var React = require('react/addons');
import {Api} from '../api';
import {TestAnimate} from '../SimpleComponents/AnimateButton'




export default class A_Connections extends React.Component {
    testClick() {
        console.log("test")
    }

    render() {
        return (
            <div >
                Connections

            </div>
        )
    }
}