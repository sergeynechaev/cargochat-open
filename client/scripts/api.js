require('whatwg-fetch');
import {Utils} from './utils';
import {Events} from './Dispatcher';
import {logger} from './Classes/Logger';


// это чудокостыль для фетча
// делаешь var r = new xreq('ping', {foo: 'bar'}, onData)
// и можешь сбросить его r.cancel()
export class xreq {
    
    handler = null;       // handler окончания загрузки
    raise_errors = true;  // при получении ошибки от апи слать ее в системный коллектор событий
    res = null;           // полученный json
    
    // usage: var r = new req('ping', {foo: 'bar'}, function (r) { console.debug(r.res) })
    constructor (cm, params, handler) {
        /*
        console.log('xreq')
        console.debug(cm)
        console.debug(params)
        */
        this.handler = handler;
        Api.req(cm, params, true, false).then(this.loaded)
    }
    
    loaded=(res)=>{
        /*
        console.log('loaded')
        console.debug(res)
        */
        this.res = res;
        if (!this.res) this.res = {err: -1, msg: 'api failed'};
        // if (this.raise_errors && this.res.err) Events.runError(this.res.msg);
        Utils.run(this.handler, this);
    }
    
    cancel=()=>{
        this.handler = null;
    }
    
}

// Стандартный FETCH запрос
// 
export var Api = {
		
    API_URI: 'http://cargo.chat/api/',

    sid: Utils.cookieGet("sid"),

    req: function (cm, params = {}, withSid = true, errCrutch = true) {
        //console.log('[Api] req "' + cm + '"')
        params.cm = cm;
        if (withSid) {
            params.sid = this.sid;
        }

        // logger.log( 'API FETCH', this.API_URI + '?cm=' + Utils.o2j(params) );
        
        return fetch( this.API_URI + '?cm=' + encodeURIComponent(Utils.o2j(params)) )
            .then( response => {
                if( response.status >= 200 && response.status < 300) {
                    return response;
                }
                throw new Error( response.statusText );
            })
            .then( response => response.json() )
            .then( json => {
                if( json !== undefined ) {
                    if (json.err === undefined && errCrutch) json.err = null;
                    return json;
                } else {
                    logger.log('API RETURN UNDEF', json);
                    // обрабатывать undefined
                    //throw new Error('API has returned undefined result.');    // потестить!
                }
            })
            .catch( e => {
                console.error('Request failed: ' + e);
                Events.run(Events.EV_SYSTEM_DOWN, {message: e});  // тестируется
            });

        // // old behavior
        // return fetch(this.API_URI + '?cm=' + Utils.o2j(params))
        //     .then(r => r.json())      
        //     .catch(e => console.log('request failed: ' + e));  // todo: show dialog
    },
    
    req_by_post : function (cm, params = {}, form_data = new FormData(), withSid = true) {
      params.cm = cm;
      if (withSid) params.sid = this.sid;
      console.log('req_by_post');
      console.log(form_data);
      return fetch(this.API_URI + '?cm=' + Utils.o2j(params), {method:'post', body: form_data})
        .then(r => r.json())
        .catch(e => console.log('request failed: ' + e));  // todo: show dialog
    },

    lead_reg: function(params){
        return this.req('lead_reg', params, false)
    },

    events          : function (version, delay) {
        return this.req('events', {version:version, delay:delay})
    },
    /*
    compCheck       : function (params) {
        return this.req('comp_check', params)
    },
    */
    userInviteAccept: function (params) {
        return this.req('user_invite_accept', params)
    },
    compInviteCreate: function (params) {
        return this.req('comp_invite_create', params)
    },
    /*
    compInviteAccept: function (params) {
        return this.req('comp_invite_accept', params, false)
    },
    */
    compUserMove: function (params) {
        return this.req('comp_user_move', params)
    },

    getDadata(params){
        return this.req('dadata', params, false);

    },
    compSuggest(params){
        return this.req('comp_suggest', params)
    },

    linkCreateRequest: function (params) {
        return this.req('comp_relation_create', params);
    },
    linkDeleteRequest: function (params) {
        return this.req('comp_relation_delete', params);
    },
    /*
    loginRequest       : function (email, passw) {
        return this.req('user_login', {email: email, passw: passw}, false);
    },
    loginEnterRequest       : function (token, code) {
        return this.req('user_enter', {token: token, code: code}, false);
    },
    */
    logoutRequest      : function () {
        var r = this.req('user_logout');
        Utils.cookieDel('sid');
        Utils.cookieDel('user_id');
        return r;
    },
    closeSessionRequest: function (sid) {
        return this.req('user_logout', {sid: sid}, false);
    },

    changeEmailARequest: function (email) {
        return this.req('user_get_key_a', {
            email: email
        }, false)
    },
    newEmailRequest    : function (key, newEmail) {
        return this.req('user_get_key_b', {
            email: newEmail,
            key_a: key
        }, false)
    },
    userActivationRequest: function (key) {
        return this.req('user_activate', {
            key: key
        }, false)
    },
    userSessionsRequest  : function () {
        return this.req('user_sessions');
    },
    
    userStateRequest     : function () {
        return this.req('user_state');
    },

    userEditRequest: function (newState) {
        return this.req('user_update', newState);
    },


    // Company
    companyStateRequestByInn: function (inn) {
        return this.req('comp_state', {
            inn: inn
        })
    },
    companyStateRequestById : function (id) {
        return this.req('comp_state', {
            comp_id: id
        })
    },
    createCompanyRequest    : function (options) {
        return this.req('comp_create', options)
    },
    createCompanyNewRequest : function (options) {
        return this.req('comp_create2', options)
    },
    
    updateCompanyRequest: function (options) {
        return this.req("comp_update", options)
    },
    
    deleteCompanyRequest: function (id) {
        return this.req('comp_delete', {
            comp_id: id
        })
    },
    checkUnique         : function (f, v) {
        return this.req('check_unique', {field: f, value: v});
    },
    joinRequestCreate   : function (id) {
        return this.req('join_request_create', {comp_id: id})
    },
    joinRequestDelete   : function (id) {
        return this.req('join_request_delete', {comp_id: id})
    },
    getCompsList        : function (params) {
        return this.req('comps_list', params)
    },


    // Tenders
    createTender        : function (params) {
        console.log(("debug"));
        console.debug(this);
        return this.req('tender_create', params)
    },
    updateTender        : function (params) {
        return this.req('tender_update', params)
    },
    deleteTender        : function (id) {
        return this.req('tender_delete', {tender_id: id})
    },
    tender_invite_accept: function (id) {
        return this.req('tender_invite_accept', {invites: [id]})
    },

    // Contacts
    user_contacts_list: function(params){
        return this.req('user_contacts_list', params);
    },
    user_contact_add: function(params){
        return this.req('user_contact_add', params)
    },
    user_contact_rem: function(params){
        return this.req('user_contact_rem', params)
    },

    // Channel
    msg_channels_list: function(params){
        return this.req('msg_channels_list', params);
    },
    msg_channel_users: function(params){
        return this.req('msg_channel_users', params);
    },
    msg_channel_create: function(params){
        return this.req('msg_channel_create', params);
    },
    msg_channel_delete: function(params){
        return this.req('msg_channel_delete', params);
    },
    msg_channel_invite: function(params){
        return this.req('msg_channel_invite', params);
    },
    msg_channel_leave: function(params){
        return this.req('msg_channel_leave', params);
    },
    msg_channel_join: function(params){
        return this.req('msg_channel_join', params);
    },
    /*
    msg_channel_hist: function(params){ // deprecated
        return this.req('msg_channel_hist', params);
    },
    */
    msg_channel_hist_list: function(params){
        return this.req('msg_channel_hist_list', params);
    },
    msg_channel_send: function(params){
        return this.req('msg_channel_send', params);
    },
    msg_channel_erase: function(params){
        return this.req('msg_channel_erase', params);
    },
    msg_channel_correct: function(params){
        return this.req('msg_channel_correct', params);
    },
    msg_channel_readed: function(params){
        return this.req('msg_channel_readed', params);
    },

    // Chat
    /*
    msg_private_hist: function (params) { // deprecated
        return this.req('msg_private_hist', params)
    },
    */
    msg_private_hist_list: function (params) { 
        return this.req('msg_private_hist_list', params)
    },
    msg_private_send: function (params) {
        return this.req('msg_private_send', params)
    },
    msg_private_readed: function (params) {
        return this.req('msg_private_readed', params)
    },
    msg_privates_list: function (params) { 
        return this.req('msg_privates_list', params)
    },


    // Price Requests
    price_request_create: function (params) {
        return this.req('price_request_create', params)
    },
    price_request_delete: function (id) {
        return this.req('price_request_delete', {price_request_id: id})
    },
    price_request_received_delete: function (id) {
        return this.req('price_request_received_delete', {price_request_id: id})
    },
    price_request_bet_create: function (params) {
        return this.req('price_request_bet_create', params)
    },
    price_request_bookmark_create: function (id) {
        return this.req('price_request_bookmark_create', {price_request_id: id})
    },
    price_request_bookmark_delete: function (id) {
        return this.req('price_request_bookmark_delete', {price_request_id: id})
    },
    price_requests_list: function (params) {
        return this.req('price_requests_list', params)
    },
    price_request_bets_list: function (params) {
        return this.req('price_request_bets_list', params)
    },

    // Transport
    /*
    vehicle_upsert: function (params) {
        return this.req('vehicle_upsert', params)
    },
    vehicle_delete: function (id) {
        return this.req('vehicle_delete', {vehicle_id: id})
    },
    */
    vehicle_manage: function (params) {
        return this.req('vehicle_manage', params)
    },
    vehicles_list: function (params) {
        return this.req('vehicles_list', params)
    },
    
    // Uploading file
    temp_file_create: function (params) {
        return this.req_by_post('temp_file_create', {}, params);
    },

    // Common db requests
    justDoRequest: function (c) { 
        return this.req(c); 
    },

    // Company

    comp_invites_list: function(params){
        return this.req('comp_invites_list', params);
    },

    comp_user_perm_change: function(params){
        return this.req('comp_user_perm_change', params);
    },

    user_invite_create: function (params) {
        return this.req('user_invite_create', params)
    },

    user_invite_delete: function (params) {
        return this.req('user_invite_delete', params)
    },

    user_position_change: function(params) {
        return this.req('user_position_change', params);
    },

    users_list: function (params) {
        return this.req('users_list', params)
    },
    
    ping: function (c) {
        //console.log('ping');
        return this.req('ping', {}, false);
    }

};
