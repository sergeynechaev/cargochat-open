var React = require('react/addons');

import {Api} from './api';
import {Utils} from './utils';
import EventsController from './Classes/EventsController';
import {logger} from './Classes/Logger';


export var Error = {
    error: [],
    newError(code, msg){
        console.log("NEW ERROR");
        console.debug("Code:");
        console.debug(code);
        console.debug("Code:");
        console.debug(msg);
        var err = {code: code, msg: msg};
        this.error.push(err);
        Events.run(Events.EV_SHOW_NOTIFY, msg)
    }
};

export var Dictionary = {

    companyPrivateSettingsList: [
        {id: "any", value: 'Любая компания'},
        {id: "none", value: 'Никто'},
        {id: "request", value: 'Только по запросу'}
    ],

    ofpList: [
        {id: 1, value: 'Индивидуальный предприниматель'},
        {id: 2, value: 'Общество с ограниченной ответственностью'},
        {id: 3, value: 'Акционерное общество'},
        {id: 4, value: 'Государственные унитарное предприятие'},
        {id: 5, value: 'Муниципальные унитарное предприятие'}
    ],

    // [DEPRECATED in new API]
    // 
    // tagsList: [
    //     {id: 1, tag: "trade_from", value: 'Склад'},
    //     {id: 2, tag: "transport_from", value: 'Перевозчик'},
    //     {id: 3, tag: "transport_to", value: 'Грузовладелец'},
    //     {id: 4, tag: "trade_to", value: 'Покупатель'},
    //     {id: 5, tag: "expeditor", value: 'Экспедитор'}
    // ],

    tagsList: [
        {id: 1, tag: "carrier", value: 'Перевозчик'},
        {id: 2, tag: "expeditor", value: 'Экспедитор'},
        {id: 3, tag: "shipper", value: 'Грузовладелец'}
    ],

    taxationList: [
        {id: 1, tag: "ОС", value: 'ОСН - Общая система налогообложения'},
        {id: 2, tag: "УСН", value: 'УСН - Упрощенная система налогообложения'},
        {id: 3, tag: "ЕНВД", value: 'ЕНВД - Единый налог на вмененный доход'},
        {id: 4, tag: "ПСН", value: 'ПСН - Патентная система налогообложения'},
        {id: 5, tag: "ЕСХН", value: 'ЕСХН - Единый сельскохозяйственный налог'},
    ],

    getValueFromDadata(key){
        //this.deep_value(this.dadata, key);
        return this.dadata[key]
    },

    selectFromCompPrivateList(id){
        return this.companyPrivateSettingsList.map(item=> {
            var newItem = {
                id   : item.id,
                value: item.value
            };
            newItem.__selected__ = newItem.id === id;

            return newItem;
        })
    },

    // getTags(arr){
    //     //console.log(arr);
    //     var newArr = [];

    //     if (arr.length > 0) {
    //         newArr = arr.map(item=> {
    //             var newItem = this.tagsList.filter(tag=> {
    //                 return tag.tag === item.tag
    //             });

    //             return newItem[0].value
    //         })
    //     }
    //     //console.log(newArr);
    //     return newArr
    // },

    // getTagsForMyComp(arr){
    //     //console.log(arr);
    //     var newArr = [];

    //     if ((arr || []).length > 0) {
    //         newArr = arr.map(item=> {
    //             var newItem = this.tagsList.filter(tag=> {
    //                 return tag.tag === item.tag
    //             });

    //             return newItem[0].value
    //         })
    //     }
    //     //console.log(newArr);
    //     return newArr
    // },
    
    // getTagsSimple(arr){
    //     console.log(arr);
    //     var newArr = [];

    //     if ((arr || []).length > 0) {
    //         newArr = arr.map(item=> {
    //             var newItem = this.tagsList.filter(tag=> {
    //                 return tag.tag === item
    //             });

    //             return newItem[0].value
    //         })
    //     }
    //     console.log(newArr);
    //     return newArr
    // },

    getOfpList(){
        return this.ofpList
    },

    getTagsList(){
        return this.tagsList
    },

    // getCompanyTaxation( taxation ) {
    //     var tax = this.taxationList.filter( tax => {
    //         return tax.tag == taxation;
    //     });
    //     return tax[0].value;
    // },

    selectFromTagsList(arr){
        return this.tagsList.map(item=> {
            var isId = false;
            var newItem = {id: item.id, tag: item.tag, value: item.value};
            for (var i = 0; i < arr.length; i++) {
                if (item.id === arr[i]) {
                    isId = true;
                }
            }
            if (isId) {
                newItem.__selected__ = true;
            }
            return newItem;
        })
    }
};

export var Store = {
    userId            : null,
    userState         : null,
    companies         : null,
    sessions          : [],
    selectedCompany   : null,
    searchResult      : null,
    setSearchResult   : function (query, result) {
        if (query) {
            this.searchResult = {query: query, results: result};
        } else {
            console.log("не передан поисковый запрос (первый аргумент)")
        }
    },
    getSearchResult   : function (query) {
        var res = this.searchResult;
        if (res && res.query === query) {
            console.log("из кэша");
            return res
        }
        return false
    },
    setSelectedCompany: function (company) {
        //console.log('[Store] setSelectedCompany')
        //console.debug(company)
        this.selectedCompany = company;
        Events.run(Events.EV_COMP_DETAILS, {company: Store.selectedCompany});
    },
    setSessions       : function (sessions) {
        //console.log('[Store] setSessions');
        //console.debug(sessions)
        this.sessions = sessions;
        Events.run(Events.EV_SESSIONS_UPDATE, {sessions: this.sessions})
    },
    setUserState      : function (state) {
        //console.log('[Store] setUserState');
        this.userState = state;
        //this.deleteAllCompanies(); 
        Events.run(Events.EV_PROFILE_UPDATE, {
            profile : this.userState,
            editMode: false
        });
        if (this.userState.comps.length > 0) {
            Actions.getCompanyByInn(this.userState.comps[0].inn);
        }
    },

    addCompanies: function (comps) {
        //console.log('[Store] addCompanies')
        //console.debug(comps)
        this.companies = comps
        Events.run(Events.EV_COMPS_CHANGED, {})
    },

    removeCompById: function (id) {
        //console.log('[Store] removeCompById ' + id)
        for (let i = 0; i < this.companies.length; i++) {
            let c = this.companies[i];
            if (c.id != id) continue;
            if (this.selectedCompany && this.selectedCompany.id == c.id) {
                this.selectedCompany = null;
                this.userState = null;
                this.companies = null;
                Actions.getUserState();
                return
            }
            this.companies.splice(i, 1);
            Events.run(Events.EV_COMPS_CHANGED, {});
            return
        }
    },
    companiesReady () {
        return this.companies != null;
    }
};


export var Actions = {

    createLink(params){
        Api.linkCreateRequest(params).then(res=> {
            if (res.err) {
                console.log("Error " + res.msg)
            } else {
                console.log("СВЯЗЬ СОЗДАНА")
            }
        })
    },

    tender_invite_accept(id){
        Api.tender_invite_accept(id).then(res=> {
            console.log(res);
            if (res.invites_accepted.length === 0) {
                console.log("Error")
            } else {

            }
        })
    },

    createTender(params){
        Api.createTender(params).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                console.log(res);
                window.location.hash = 'dashboard/company/tenders'
            }
        })
    },
    updateTender(params, backToTenders){
        Api.updateTender(params).then(res=> {
            if (res.err) {
                alert(res.msg);
                console.log(res.msg);
            } else {
                console.log(res);
                this.updateCompanyInfo();
                backToTenders();
            }
        })
    },
    deleteTender(id){
        Api.deleteTender(id).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                console.log(res);
                this.updateCompanyInfo();
            }
        })
    },


    getCompsList(params){
        Api.getCompsList(params).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                console.log(res);
                Store.setSearchResult(res.data)
            }
        })
    },


    joinRequestCreate(id){
        console.log('[Actions] joinRequestCreate ' + id)
        Api.joinRequestCreate(id).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {

            }

        })

    },
    joinRequestDelete(id){
        console.log('[Actions] joinRequestDelete ' + id)
        Api.joinRequestDelete(id).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                Store.userState = null
                this.getUserState()
            }

        })

    },

    createCompany(options){
        console.log('[Actions] createCompany')
        console.debug(options)
        Api.createCompanyRequest(options).then(res=> {
            if (res.err) {
                if (res.err === -1) {
                    Events.run(Events.EV_CHECK_EDIT, {
                        checkedInn: false,
                        message   : "Компания с таким ИНН уже существует"
                    });
                } else {
                    alert(Utils.o2j(res))
                }
            } else {
                Store.userState = null
                this.getUserState()
                window.location.hash = 'dashboard/company/details'
            }
        })
    },

    updateCompanyRequest(options){
        Api.updateCompanyRequest(options).then(res=> {
            if (res.err) {
                alert(res.msg)

            } else {
                this.updateCompanyInfo();
            }
        })

    },

    getUserState : function () {
        //console.log('[Actions] getUserState')
        if (Store.userState) return;
        //console.log('[Actions] getUserState do')
        //console.log(new Error().stack)
        Api.userStateRequest().then(res=> {
            //Store.deleteAllCompanies();  
            Store.setUserState(res);
            //console.log(res.comps);
            this.loadComps(res.comps);
        })
    },
    saveUserState: function (state) {
        //console.log('[Actions] saveUserState')
        //console.debug(state)
        Api.userEditRequest(state).then(res=> {
            if (res.err) {
                Events.run(Events.EV_PROFILE_UPDATE_FAIL, res);
                return;
            }
            Store.userState = null
            this.getUserState()
        })
    },
    getSessions  : function () {
        //console.log('[Actions] getSessions')
        Api.userSessionsRequest().then(res=> {
            if (res.err) {

            } else {
                Store.setSessions(res.sessions);
            }
        })
    },

    deleteSession: function (sid) {
        //console.log('[Actions] deleteSession ' + sid)
        Api.closeSessionRequest(sid).then(res=> {
            if (res.err) {
                Events.run(Events.EV_SESSIONS_UPDATE, {info: res.msg})
            } else {
                //console.log(res);
                Events.run(Events.EV_SESSIONS_UPDATE, {info: "Сессия закрыта"});
                this.getSessions();
            }
        })
    },
    updateCompanyInfo(){
        if (Store.userState.comps.length > 0) {
            this.getCompanyByInn(Store.userState.comps[0].inn)
        }


    },

    getCompanyByInn: function (companyInn) {
        //console.log('[Actions] getCompanyByInn ' + companyInn)
        Api.companyStateRequestByInn(companyInn).
            then(res=> {
                //console.log("Api response companyByInn");
                if (res.err) {
                    //console.log("нет компании с таким инн");
                } else {
                    //console.log("компания найдена");
                    Store.setSelectedCompany(res);
                }
            })
    },
    deleteCompany  : function (id) {
        //console.log('[Actions] deleteCompany ' + id)
        Api.deleteCompanyRequest(id).then(res=> {
            if (res.err) {
                if (err === -1) {
                } else {
                }
            } else {
                //this.getUserState();
                Store.removeCompById(id)
            }
        })
    },

    loadComps (inns) {
        //console.log('[Actions] loadComps ' + inns);
        var comps_buffer = [];
        if (!inns || inns.length < 1) {
            Store.addCompanies(comps_buffer);
            return;
        }
        var comps_pending = inns.length;
        for (var j = 0; j < inns.length; j++) {
            //console.log('load ' + j);
            Api.companyStateRequestByInn(inns[j].inn).then(resp=> {
                //console.log('loaded');
                comps_pending--;
                comps_buffer.push(resp);
                //console.log('comps_pending ' + comps_pending);
                if (comps_pending === 0) {
                    //console.log('done');
                    //console.debug(comps_buffer);
                    Store.addCompanies(comps_buffer);
                }
            })
        }

    }

};


// создаем экземпляр класса, отвечающего за обработку событий от cервера
export var Events = new EventsController();


/**
 * DEPRECATED
 *
 * управление событиями перенесено в EventsController
 * вызов Events.on вместо Events.on
 * 
 */
// var Events = {
//     EV_SEARCH_RESULT      : 'EV_SEARCH_RESULT',
//     EV_PROFILE_UPDATE     : 'EV_PROFILE_UPDATE',
//     EV_COMP_DETAILS       : 'EV_COMP_DETAILS',
//     EV_COMP_STATE         : 'EV_COMP_STATE',
//     EV_ROUTE_CHANGED      : 'EV_ROUTE_CHANGED',
//     EV_SESSIONS_UPDATE    : 'EV_SESSIONS_UPDATE',
//     EV_SHOW_NOTIFY        : 'EV_SHOW_NOTIFY',
//     EV_CHECK_EDIT         : 'EV_CHECK_EDIT',
//     EV_PROFILE_UPDATE_FAIL: 'EV_PROFILE_UPDATE_FAIL',
//     EV_USER_REQUESTS      : 'EV_USER_REQUESTS',
//     EV_COMPS_CHANGED      : 'EV_COMPS_CHANGED',
//     EV_CLICK_ANYWHERE     : 'EV_CLICK_ANYWHERE',
//     EV_GLOBAL_MOUSE_UP    : 'EV_GLOBAL_MOUSE_UP',
//     EV_MSG_PRIVATE_NEW: 'EV_MSG_PRIVATE_NEW',
//     EV_USER_STATE_UPDATE  : 'EV_USER_STATE_UPDATE',
//     EV_NEW_PRIVATE_UNREADED : 'EV_NEW_PRIVATE_UNREADED',
//     EV_ASK_OPEN_CHAT_WINDOW : 'EV_ASK_OPEN_CHAT_WINDOW',
//     EV_INVITE_CHANNEL     : 'EV_INVITE_CHANNEL',
//     EV_MSG_CHANNEL        : 'EV_MSG_CHANNEL',
//     EV_SYSTEM_DOWN        : 'EV_SYSTEM_DOWN',
//     EV_SYSTEM_UP          : 'EV_SYSTEM_UP',

//     evs: {},

//     reg: function (id, hr) {
//         var l = this.evs[id];
//         l ? l.push(hr) : this.evs[id] = [hr]
//     },

//     run: function (id, p) {
//         var l = this.evs[id];
//         if (l) {
//             l.forEach(o => o(p));
//         }
//     },

//     rem: function (id, hr) {
//         var l = this.evs[id];
//         if (l) {
//             this.evs[id] = l.filter(h => h != hr)
//         }
//     }

// };