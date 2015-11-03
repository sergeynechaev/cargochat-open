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

class PriceRequestsView__Card_Actions extends React.Component {

	constructor( props ) {
        super( props );
    }

    componentWillMount =()=> {
    }

    //
    // TODO: собрать все в контроллеры компании
    // 

    createBookmark =()=> {
        var params = {
            comp_from: AppState.myCompany.id,
            comp_to: this.props.obj.comp_id,
            relation_type: "social"
        };
        let message = {};
        Api.linkCreateRequest(params).then(res=> {
            if (res.err) {
                message = { message: res.msg, type: "error" };
            } else {
                message = {
                            message: `Компания добавлена в закладки`,
                            type: "info"
                        };
            }
            Events.run(Events.EV_SHOW_NOTIFY, message);
        })
    }

    sendMessage =()=> {
        logger.log('Not implemented in messages controller yet.');
    }

    render = ()=> {

        logger.log(this.props.obj);

        return (
        	<FlexBox direction="row">
                <div data-tooltip="Добавить компанию в закладки" className="pagin-pls" onClick={this.createBookmark}>
                    <Icon iconName="bookmark-icon" size={20}/>
                </div>
        	</FlexBox>
        )
    } // render
}

export {PriceRequestsView__Card_Actions}

// TODO: send message
// <div data-tooltip="Написать сообщение" className="pagin-pls" onClick={this.sendMessage}>
//                     <Icon iconName="mail-icon" size={20}/>
//                 </div>