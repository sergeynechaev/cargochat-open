var React = require('react/addons');
import {OrdersList} from './OrdersList';

export class OrderTemplates extends React.Component {
    render=()=>{
        return (<OrdersList type='templates' />);
    }
}