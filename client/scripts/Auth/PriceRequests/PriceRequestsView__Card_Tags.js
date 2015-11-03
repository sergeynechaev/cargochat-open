var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {Icon} from '../../SimpleComponents/Icons';
import {ModalWindow} from '../../SimpleComponents/ModalWindow';
import Hint from '../../SimpleComponents/Hint';
import {logger} from '../../Classes/Logger';

class PriceRequestsView__Card_Tags extends React.Component {

	constructor( props ) {
        super( props );
    }

    render = ()=> {

    	let tags = AppState.myCompany.getTagNames( this.props.obj.tags );
    	let tagsList = tags.map( (tag, key) => {
    		return <div key={key}>{tag}</div>;
    	})
    	
        return (
            <div>
            	{tagsList}
            </div>
        )
    }
}

export {PriceRequestsView__Card_Tags}