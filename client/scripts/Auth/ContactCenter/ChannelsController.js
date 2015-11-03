import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {Utils} from '../../utils';
import {logger} from '../../Classes/Logger';

import ChannelController from '../Channel/ChannelController';

export default class ChannelsController extends Controller {

    constructor() {
        super();

        this.channels = [];
        this.controller = null;
        this.activeChannelIndex = null;
        this.isReady = false;

        this._getData();
    }

    _getData =()=> {
        let params = {
            type: 'channel',
            self: 'true',
            fields: ['id', 'title', 'unreaded', 'flags', 'users', 'comp_id', 'comp_name', 'lrm', 'orders']
        };
        this.isReady = false;

        Api.msg_channels_list(params).then( res=> {
            if(res){
                if(res.err){
                    logger.log( this, 'Ошибка при получении списка каналов', res.msg, 'error' );
                    return;
                }
                this.channels = res.data || [];
                this.channels.forEach( channel => channel.type = 'channel' );
                this._getGroupsList();

                // logger.log('get channels list', this, res.data);
            }
        });
    }

    _getGroupsList =()=> {
        let params = {
            type: 'group',
            self: 'true',
            fields: ['id', 'title', 'unreaded', 'flags', 'users', 'lrm']
        };

        Api.msg_channels_list(params).then(res => {
            if(res){
                if(res.err){
                    logger.log( this, 'Ошибка при получении списка групп', res.msg, 'error' );
                    return;
                }
                (res.data || []).forEach( channel => {
                    channel.type = 'group';
                    this.channels.push( channel );
                })
                this.isReady = true;
                this.run('Channels_getlist_complete', this.channels);

                // logger.log('groups list', this, res.data, this.channels);
            }
        });
    }


    getAllChannels =()=> {
        return this.channels.filter( channel => channel.type == 'channel' );
    }

    getAllGroups =()=> {
        return this.channels.filter( channel => channel.type == 'group' );
    }

    getChannel =(id)=> {
        if(!id) return undefined;

        this.activeChannelIndex = null;

        this.channels.forEach( (channel, i) => {
            // для запрошенного канала создаем экземпляр канала, если еще нет,
            // и пихаем его в переменную controller
            if( channel.id == id ) {
                if( !channel.controller ) {
                    channel.controller = new ChannelController( channel );
                }
                this.activeChannelIndex = i;
            }
        });
        if( this.activeChannelIndex === null ) return undefined;
        if( this.channels[this.activeChannelIndex] ) return this.channels[this.activeChannelIndex].controller;
    }

    getUnreadedCount =(channel_id)=> {
        let unreaded = null;
        this.channels.some( channel => {
            if( channel.id == channel_id ) return unreaded = channel.unreaded;
        });
        return unreaded;
    }

    getLastReaded =(channel_id)=> {
        let readed = null;
        this.channels.some( channel => {
            if( channels.id == channel_id ) return readed = channel.lrm;
        });
        return readed;
    }

    setUnreaded =(channelIndex, unreaded)=> {
        this.channels[channelIndex].unreaded = unreaded;

        // т.к. MessageHistory - универсальный компонент и работает и с каналами, и с чатами,
        // не забываем изменить число непрочитанных в контроллере канала/чата
        if( this.channels[channelIndex].controller ) this.channels[channelIndex].controller.unreaded = unreaded;
    }

    onChannelEvent =(event)=> {
        //console.debug('onChannelEvent', event);

        // приглашение в канал
        if( event.type == 'msg_channel_invite' ) {
            this.addChannelInvite( event );
            this.run( 'Channels_update', this.channels );
            Events.runInfo( 'Вас пригласили в канал "'+event.title+'"' );
            Events.runNotify( event );
            return;
        }

        // события по конкретному каналу
        this.channels.forEach( (channel, i) => {
            if( channel.id == event.channel_id ) {

                switch( event.type ) {

                    case 'msg_channel_new':
                        // для чужих изменяем число непрочитанных в контакт-центре
                        if( event.user_id != AppState.user.state.id) this.setUnreaded(i, channel.unreaded + 1);
                        this.run( 'Channels_update', this.channels );
                        this.runChannelEvent( event, channel, 'onMsgNew' );
                    break;

                    case 'msg_channel_unreaded':
                        this.setUnreaded( i, event.unreaded );
                        this.run( 'Channels_update', this.channels );
                        this.runChannelEvent( event, channel, 'onMsgUnreaded' );
                    break;

                    case 'msg_channel_correct':
                        this.runChannelEvent( event, channel, 'onMsgCorrect' );
                    break;

                    case 'msg_channel_erase':
                        this.runChannelEvent( event, channel, 'onMsgErase' );
                    break;

                    case 'msg_channel_user_leave':
                        // вычеркиваем юзера из списка в инфо канала
                        this.runChannelEvent( event, channel, 'onMsgChannelUserLeave' );
                        // уменьшаем число участников в контакт-центре
                        channel.users--;
                        this.run( 'Channels_update', this.channels );
                    break;
                    
                    case 'msg_channel_orders':
                        // обновилось кол-во открытых заказов
                        channel.orders = event.orders;
                        this.run( 'Channels_update', this.channels );
                    break;

                    case 'msg_channel_user_upsert':
                        // в инфо канала переносим юзера в участники и показываем событие в истории канала
                        this.runChannelEvent( event, channel, 'onMsgChannelUserUpsert' );
                    break;
                }
            }
        });
    }

    // передаем событие дальше в контроллер активного канала,
    // он обновит данные и сам разберется, делать апдейт истории или нет
    runChannelEvent =(event, activeChannel, action)=> {
        // если канал еще не загружался, ничего не делаем, т.к. вся история потом все равно подтянется с сервера при загрузке канала
        if( !activeChannel.controller ) return;

        // запускаем событие
        let actionToRun = activeChannel.controller[action];
        if( typeof actionToRun == 'function') actionToRun( event );
    }


    // объект активного в данный момент канала
    activeChannel =()=> {
        if( this.activeChannelIndex === null ) return;
        if( this.channels[this.activeChannelIndex] ) {
            return this.channels[this.activeChannelIndex].controller
        }
    }

    openChannel =(id)=> {
        this.run('Channels_open', id);
    }

    closeChannel =(id)=> {
        this.run('Channels_close', id);
    }

    createChannel =(title)=> {
        if(!title){
            Events.runError( 'Ошибка при создании канала: не задано название' );
            return;
        }
        Api.msg_channel_create({title: title, type: 'channel'}).then(res=>{
            if(res){
                if (res.err){
                    Events.runError( 'Ошибка при создании канала' );
                    logger.log( this, 'Ошибка при создании канала', res.msg, 'error' );
                    return;
                } 
                Events.runInfo( 'Канал "'+title+'" создан' );
                var channel = {
                    id: res.created_channel_id,
                    title: title,
                    type: 'channel',
                    flags: 2,
                    unreaded: null,
                    lrm: null,
                    users: 1
                };
                this.channels.push(channel);
                this.run('Channels_update', this.channels);
            }
        });
    }

    createGroup =(title)=> {
        if(!title){
            Events.runError( 'Ошибка при создании группы: не задано название' );
            return;
        }
        Api.msg_channel_create({title: title, type: 'group'}).then(res=>{
            if(res){
                if (res.err){
                    Events.runError( 'Ошибка при создании группы' );
                    logger.log( this, 'Ошибка при создании группы', res.msg, 'error' );
                    return;
                } 
                Events.runInfo( 'Группа "'+title+'" создана' );
                var channel = {
                    id: res.created_channel_id,
                    title: title,
                    type: 'group',
                    flags: 2,
                    unreaded: null,
                    lrm: null,
                    users: 1
                };
                this.channels.push(channel);
                this.run('Channels_update', this.channels);
            }
        });
    }

    // удаление канала из контакт-центра при выходе юзера из него или отказе от приглашения
    destroyСhannel =(id)=> {
        this.channels.some((channel, i)=>{
            if(channel.id == id){
                delete this.channels[i];
                return true;
            }
        });
        this.run('Channels_update', this.channels);
    }

    // я пригласил кого-то в канал - обновляем число участников
    onMyInviteToСhannel =(id)=> {
        logger.log('trigger onMyInviteToСhannel', this);
        this.channels.some((channel, i)=>{
            if(channel.id == id){
                channel.users++;
                return true;
            }
        });
        this.run('Channels_update', this.channels);
    }

    // пришло приглашение в канал - добавляем его в список
    addChannelInvite =(event)=> {
        this.channels.push({
            id: event.channel_id,
            type: event.ctype,
            title: event.title,
            unreaded: null,
            lrm: null,
            flags: event.flags,
            users: event.users  // TODO: почему апи считает еще не принявшего приглашение участника юзером канала?
        });

        // logger.log('addChannelInvite 2', this, this.channels);
    }

}
