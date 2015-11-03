import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class PriceRequestsController extends Controller {

    constructor(props) {
        super(props);
        this.priceRequestsCreated = [];
        this.priceRequestsReceived = [];
        this.priceRequestBookmarks = [];
        this.priceRequestSearchResults = [];
        this.isUpdating = false;
        this.savedSearchParams = null;
    }

    updateData() {

        this.getPriceRequestsList('regular', true);
        this.getPriceRequestsList('received', true);
        this.getPriceRequestsList('bookmarks', true);
        // this.priceRequestsCreated = AppState.myCompany.state.price_requests_created;
        // this.priceRequestsReceived = AppState.myCompany.state.price_requests_received;
        // this.priceRequestBookmarks = AppState.myCompany.state.price_request_bookmarks;


    }

    createPriceRequest( state ) {
        let message = {};
        if (state) {
            // logger.log( this, 'Creating new price request...', state );
            Api.price_request_create(state).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while creating the price request', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "Новый запрос создан", type: "info" };
                }
                // update list
                this.getPriceRequestsList('regular');
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("PriceRequests_updated", this);
                window.location.hash = 'dashboard/price-requests';
            })

        } else {
            message = { message: "Ошибка при создании запроса ставок: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    deletePriceRequest( id ) {
        let message = {};
        if( id ) {
            // logger.log( this, 'Deleting the price request from DB...', id );
            Api.price_request_delete( id ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while deleting the price request', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "Запрос успешно удален.", type: "info" };
                }
                // update list
                this.getPriceRequestsList('regular');
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("PriceRequests_updated", this);
            })
        } else {
            message = { message: "Ошибка при удалении запроса: не найден ID запроса.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    deletePriceRequestReceived( id ) {
        let message = {};
        if( id ) {
            // logger.log( this, 'Deleting the received price request from DB...', id );
            Api.price_request_received_delete( id ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while deleting the received price request', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "Входящий запрос успешно удален.", type: "info" };
                }
                 // update list
                this.getPriceRequestsList('received');
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("PriceRequests_updated", this);
            })
        } else {
            message = { message: "Ошибка при удалении входящего запроса: не найден ID запроса.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    createPriceRequestBet( state, type = null ) {
        let message = {};
        if (state) {
            // logger.log( this, 'Creating new price request BET...', state );
            Api.price_request_bet_create(state).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while creating the price request bet', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "Ваша ставка сохранена", type: "info" };
                    logger.log( this, 'Price request bet created, ID=', res );
                }
                // update list
                if( type && (type == 'received' || type == 'bookmarks') ) {
                    this.getPriceRequestsList(type);
                } else {
                    // перезапускаем поиск
                    this.searchPriceRequests( null, true );
                }
                //this.run("PriceRequests_updated", this);
                Events.run(Events.EV_SHOW_NOTIFY, message);
            })

        } else {
            message = { message: "Ошибка при создании ставки: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    createBookmark( id ) {
        let message = {};
        if( id ) {
            // logger.log( this, 'Creating the bookmark...', id );
            Api.price_request_bookmark_create( id ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while creating the bookmark for price request', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = {
                            message: "Закладка успешно создана.",
                            type: "info"
                            };
                }
                // update list
                this.getPriceRequestsList('bookmarks');
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("PriceRequests_updated", this);
            })
        } else {
            message = { message: "Ошибка при создании закладки: не найден ID запроса.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    deleteBookmark( id ) {
        let message = {};
        if( id ) {
            // logger.log( this, 'Deleting the bookmark...', id );
            Api.price_request_bookmark_delete( id ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while creating the bookmark for price request', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = {
                            message: "Закладка успешно удалена.",
                            type: "info"
                            };
                }
                // update list
                this.getPriceRequestsList('bookmarks');
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("PriceRequests_updated", this);
            })
        } else {
            message = {
                    message: "Ошибка при удалении закладки: не найден ID запроса.",
                    type: "error"
                    };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    searchPriceRequests( params, saved = false ) {

        // если параметы не переданы, вытаскиваем сохраненные
        if( params == null && saved && this.savedSearchParams ) {
            params = this.savedSearchParams;
        }

        let message = {};
        if( params ) {

            // сохраняем параметры
            this.savedSearchParams = params;

            // logger.log( this, 'Searching price requests...', params );
            Api.price_requests_list( params ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while getting price requests', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                    Events.run(Events.EV_SHOW_NOTIFY, message);
                    return null;
                } else {
                    this.priceRequestSearchResults = res.data;
                    this.run("PriceRequests_search_complete", res.data);
                    //return res.data;
                }
            })
        } else {
            message = { message: "Ошибка при поиске: недостаточно параметров.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
            return null;
        }
    }

    /**
     * Список "ставок" в "запросах ставок" 
     * Список не глобальный, отображаются только ставки сделаные в запросах которые создала эта компания
     */
    getPriceRequestBetsList( params ) {
        let message = {};
        if( params ) {
            // logger.log( this, 'Geting the price request bets list...', params );
            Api.price_request_bets_list( params ).then(res=> {
                if (res.err) {
                    logger.log( this, 'Error while getting price request bets list', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                    Events.run(Events.EV_SHOW_NOTIFY, message);
                    return null;
                } else {
                    this.priceRequestSearchResults = res.data;
                    this.run("PriceRequests_betslist_complete", res.data);
                }
            })
        } else {
            message = { message: "Ошибка при запросе: недостаточно параметров.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
            return null;
        }
    }

    /**
     * Для показа деталей по одному запросу. Доступны только созданные
     * данной компанией запросы, которые вытаскиваются из state (price_requests_created)
     * @param  {int} id ID запроса
     * @return {Object} Объект 'запрос ставки'
     */
    getPriceRequestDetails( id ) {
        let priceRequest = [];
        if( this.priceRequestsCreated.length ) {
            priceRequest = this.priceRequestsCreated.filter( request => {
                return request.price_request_id == id;
            });
        }
        return priceRequest;
    }

    /**
     * Выборка моих, входящих запросов, закладок
     * type = regular|received|bookmarks
     */
    getPriceRequestsList(type, showUpdating = false, filters = []) {

        this.isUpdating = showUpdating;

        let message = {};
        let params = {
            "filters" : [],
            "fields": [ "price_request_id",
                        "cargo_name", 
                        "from_addr",
                        "from_x",
                        "from_y",
                        "to_addr",
                        "to_x",
                        "to_y",
                        "volume", 
                        "mass", 
                        "unit", 
                        "ctime", 
                        "shipment_time", 
                        "bets",
                        "bet",
                        "bet_flags",
                        "comp_id",
                        "name",
                        "inn",
                        "addr",
                        "note",
                        "flags" ]
        };

        params.type = type;

        // применяем фильтры, если заданы
        if( filters.length ) {
            filters.forEach( filter => {
                params.filters.push( filter );
            })
        }

        // params.offset = 10;

        // мои запросы
        if( type == 'regular' ) {
             params.filters.push( ["comp_id", "eq", AppState.myCompany.id] );
        }

        // формируем параметры в зависимости от типа

        if( params ) {
            Api.price_requests_list( params ).then(res=> {

                if (res.err) {
                    logger.log( this, 'Error while getting price requests', res.msg, 'error' );
                    message = { message: res.msg, type: "error" };
                    Events.run(Events.EV_SHOW_NOTIFY, message);
                    return null;

                } else {
                    switch( type ) {
                        case 'regular':
                            if( res.data) this.priceRequestsCreated = res.data;
                        break;

                        case 'received':
                            if( res.data) this.priceRequestsReceived = res.data;
                        break;

                        case 'bookmarks':
                            if( res.data) this.priceRequestBookmarks = res.data;
                        break;
                    }

                    this.run("PriceRequests_updated", res.data);
                    this.isUpdating = false;
                    //return res.data;
                }
            })
        } else {
            message = { message: "Ошибка при получении запросов ставок: недостаточно параметров.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
            this.isUpdating = false;
            return null;
        }
    }

    getPriceRequestsCreated() {
        return this.priceRequestsCreated;
    }

    getPriceRequestsReceived() {
        return this.priceRequestsReceived;
    }

    getPriceRequestBookmarks() {
        return this.priceRequestBookmarks;
    }

    countPriceRequestsCreated() {
        return this.priceRequestsCreated.length || 0;
    }

    countPriceRequestsReceived() {
        return this.priceRequestsReceived.length || 0;
    }

    countPriceRequestBookmarks() {
        return this.priceRequestBookmarks.length || 0;
    }

    isBookmarkExists( id ) {
        return this.priceRequestBookmarks.some( bookmark => bookmark.price_request_id === id );
    }

}