import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class ChatMessageController extends Controller {

    constructor(message, chat_id) {
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
        this.chat_id = chat_id;
        this.isDeleted = message.isDeleted;
        this.readed = message.readed;
        this.opp_readed = message.opp_readed;
    }


    eraseMessage =()=> {
        // not in Api yet
        logger.log('Не реализовано в api', this);
    }

    correctMessage =( body )=> {
        // not in Api yet
        logger.log('Не реализовано в api', this);
    }

    // реализовано через AppState.myChats.activeChat().sendMessage
    // sendMessage =()=> {}

    // реализовано через AppState.myChats.activeChat().markReaded
    // readedMessage =()=> {}

}