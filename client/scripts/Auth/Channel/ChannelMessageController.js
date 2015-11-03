import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class ChannelMessageController extends Controller {

    constructor(message, channel_id) {
        super();
		this.id = message.id;
		this.ts = message.ts;
		this.author = {
			id: message.user_id,
			first_name: message.first_name,
			last_name: message.last_name,
            comp_name: message.comp_name,
            comp_id: message.comp_id,
		};
		this.body = message.body;
        this.channel_id = channel_id;
        this.isDeleted = message.isDeleted;
        this.readed = message.readed;
        this.opp_readed = message.opp_readed;
    }

    eraseMessage =()=> {

    	let params = { message_id: this.id, 
	    			   channel_id: this.channel_id
	    			 };
    	let infoMessage = {};

    	logger.log('erasing message', params);

        if (params) {
            Api.msg_channel_erase( params ).then(res=> {
                if( res.err ) {
                    logger.log( 'error', "Error while deleting the message", res.msg );
                    infoMessage = { message: res.msg, type: "error" };
                } else {
                    infoMessage = { message: "Сообщение удалено", type: "info" };
                }
                Events.run(Events.EV_SHOW_NOTIFY, infoMessage);
                // событие EV_MSG_CHANNEL_ERASE придет по сокету автоматически
            })

        } else {
            infoMessage = { message: "Ошибка при удалении сообщения: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, infoMessage);
        }
    }

    correctMessage =( body )=> {

    	let params = { message_id: this.id, 
	    			   channel_id: this.channel_id,
	    			   body: body
	    			 };
    	let infoMessage = {};

    	logger.log('correcting message', params);

        if (params) {
            Api.msg_channel_correct( params ).then(res=> {
                if( res.err ) {
                    logger.log( 'error', "Error while correcting the message", res.msg );
                    infoMessage = { message: res.msg, type: "error" };
                } else {
                    infoMessage = { message: "Сообщение отредактировано", type: "info" };
                }
                Events.run(Events.EV_SHOW_NOTIFY, infoMessage);
                // событие EV_MSG_CHANNEL_CORRECT придет по сокету автоматически
            })

        } else {
            infoMessage = { message: "Ошибка при редактировании сообщения: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, infoMessage);
        }
    }

    // реализовано через AppState.myChannels.activeChannel().sendMessage
    // sendMessage =()=> {}

    // реализовано через AppState.myChannels.activeChannel().markReaded
    // readedMessage =()=> {}

}