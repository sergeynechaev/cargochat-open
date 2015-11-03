var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';

// import {ImageHint} from './TransportEditForm';
import {ImageHint} from '../../Controls/ImageHint';

class TransportList__Cell_ImageHint extends React.Component {

	constructor( props ) {
        super( props );
    }

    render = ()=> {
        let img = "http://cargo.chat/file/";
        img += (this.props.cellOpt && this.props.cellOpt.type == "sts") ? this.props.obj.sts_token : this.props.obj.pts_token;
        return <ImageHint src={img}/>
    }
}

export {TransportList__Cell_ImageHint}