import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class MessageNotifyController extends Controller {

    constructor(body, channel_id) {
        super();

		this.id = -1;
		this.ts = Math.round(new Date().getTime() / 1000);

        // нотифай-сообщение заводим как бы от себя
		this.author = {
			id: AppState.user.state.id,
			first_name: AppState.user.state.first_name,
			last_name: AppState.user.state.last_name,
            comp_name: AppState.user.state.comp.name,
            comp_id: AppState.user.state.comp.id,
		};

		this.body = body;
        this.channel_id = channel_id;

        this.isDeleted = false;
        this.readed = true;
        this.opp_readed = true;
    }

}