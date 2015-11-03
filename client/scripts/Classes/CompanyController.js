import Controller from './Controller';
import {Events, Error, Dictionary} from './../Dispatcher';
import {Api} from './../api';
import {AppState} from '../Auth/Dashboard';
import PriceRequestsController from '../Auth/PriceRequests/PriceRequestsController';
import {logger} from '../Classes/Logger';

export default class CompanyController extends Controller {
    
    constructor(comp_id) {
        super();
        
        // кол-во связанных компаний по группам
        this.relationsQuantity={blacklist:null, carriers:null, expeditors:null, shippers: null, social:null};
        
        // таблица данных связанных компаний
        this.relations = {};

        // таблица данных сотрудников 
        this.users = []
        
        // таблица данных приглашенных юзеров
        this.users_invited = [];
        
        this.id = null;
        if (comp_id) {
            this.id = comp_id;
            this.getLinksQuantity();
            this.update()
        }
        
    }

    perms_list = [
        {id: 1, tags: 'all' ,value: 'Все права', exclude: 1},
        {id: 2, tags: 'staff' ,value: 'Управления правами сотрудников в компании'},
        {id: 4, tags: 'tender' ,value: 'Управления тендерами'},
        {id: 16,  tags: 'comm' ,value: 'Управления связями'},
        {id: 32,  tags: 'data' ,value: 'Изменения данных компании'},
        {id: 64,  tags: 'invite' ,value: 'Управлять приглашениями сотрудников в компанию'}
    ]

    getPerms(perms){
        let Perms = [];

        this.perms_list.forEach(item=>{
            if((perms & item.id) === item.id){
                Perms.push(item.tags)
            }
        });

        return Perms;
    }

    userPermsChange(perm, id){
        if(!perm || !id) return;

        Api.comp_user_perm_change({perm_flags: perm, user_id: id}).then(res=>{
            if(res){
                if (res.err) {
                    Events.run(Events.EV_SHOW_NOTIFY, { type:"error", error:res.msg })
                    return;
                }

                this.users.some(user=>{
                    if(user.uid == id){
                        user.cflg = perm;
                        return true;
                    }
                });

                if(AppState.user.state.id == id) AppState.user.state.comp_flags = perm;
                this.run("MyCompany_Users-update", this.users);
            }
        });
    }

    getUsers = ()=>{
        let params = {
            fields: ['uid', 'rts', 'flg', 'fn', 'ln', 'pn', 'phone', 'email', 'gender', 'cid', 'cflg', 'position'],
            filters: [ ['cid', 'eq', this.id] ]
        };
        Api.users_list(params).then(res=>{
            if(res){
                if (res.err) {
                    Events.run(Events.EV_SHOW_NOTIFY, { type:"error", error:res.msg })
                    return;
                }
                this.users = res.data;
                this.run("MyCompany_Users-update", res.data);
            }
        });
    }

    updateCompanyRequest = (params)=>{
        if(!params) return;

        Api.updateCompanyRequest(params).then(res=>{
            if(res){
                if(res.err){
                    logger.log(this, 'userInviteCreate', res.msg, 'error');
                    Events.run(Events.EV_SHOW_NOTIFY, { message: res.msg,  type: "error" });
                    return;
                }
                
                Events.run(Events.EV_SHOW_NOTIFY, { message: "Данные компании изменены",  type: "info" });
                this.update();
            }
        });
    }

    getUsersInvited = ()=>{
        let params = {
            fields: ['id', 'ctime', 'email', 'last_name', 'first_name', 'pat_name', 'position', 'phone']
        };

        Api.comp_invites_list(params).then(res=>{
            if (res.err) {
                var error = {
                    type:"error",
                    error:res.msg
                };
                Events.run(Events.EV_SHOW_NOTIFY, error)
            } else {
                this.users_invited = res.data;
                this.run("MyCompany_UsersInvited-update", res.data);
            }
        });
    }

    userInviteSend = (params)=>{
        let message = {};
        Api.user_invite_create(params).then(res=> {
            if (res.err) {
                logger.log(this, 'userInviteCreate', res.msg, 'error');
                message = { message: res.msg,  type: "error" };
            } else {
                message = { message: "Приглашение отправлено", type: "info" };
                this.getUsersInvited();
            }
        });
        Events.run(Events.EV_SHOW_NOTIFY, message);
    }

    userInviteCanсel = (params)=>{
        let message = {};
        Api.user_invite_delete(params).then(res=> {
            if(res){
                if (res.err) {
                    logger.log(this, 'userInviteCancel', res.msg, 'error');
                    message = { message: res.msg,  type: "error" };
                    return;
                }

                this.users_invited.some((invite, i)=>{
                    if(invite.id == res.deleted_invite_id){
                        this.users_invited.splice(i, 1);
                        return true;
                    }
                });

                message = { message: "Приглашение удалено", type: "info" };
                this.run("MyCompany_UsersInvited-update", this.users_invited);
            }

            Events.run(Events.EV_SHOW_NOTIFY, message);
        }); 
    }
    
    userPositionChange = (params)=>{
        let message = {};
        if(params){
            Api.user_position_change(params).then(res=> {
                if(res){
                    if (res.err) {
                        console.log(res);
                        logger.log(this, 'user_position_change', res.msg, 'error');
                        message = { message: res.msg,  type: "error" };
                        return;
                    }

                    this.users.some((user, i)=>{
                        if(user.uid == params.user_id){
                            user.position = params.position;
                            return true;
                        }
                    });

                    message = { message: "Должность измененена", type: "info" };
                    this.run("MyCompany_Users-update", this.users);
                }
                Events.run(Events.EV_SHOW_NOTIFY, message);
            }); 
        } else {
            message = { message: "Ошибка при изменение Должности: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    update =()=> {
        Api.companyStateRequestById(this.id).then(res=>{
            if (res.err) {
                var error = {
                    type:"error",
                    error:res.msg
                };
                Events.run(Events.EV_SHOW_NOTIFY, error)
            } else {
                this.state = res;
                this.run("update_companyState", res);
            }
        });
    }

    getCompanyTaxation =(taxation)=> {
        var tax = Dictionary.taxationList.filter( tax => {
            return tax.tag == taxation;
        });
        return ((tax || []).length) ? tax[0].value : null;
    }
    
    getTagNames=(arr)=> {
        //console.log(arr);
        //arr = this.replaceTagToExpeditor( arr );
        //console.log(arr);
        var newArr = [];
        if ((arr || []).length > 0) {
            newArr = arr.map( item=> {
                var newItem = Dictionary.tagsList.filter(tag=> {
                    return tag.tag === item
                });
                return ((newItem || []).length) ? newItem[0].value : null;
            })
        }
        //console.log(newArr);
        return newArr;
    }
    
    // [DEPRECATED in new API]
    // 
    // replaceTagToExpeditor =(arr)=> {
    //     var tmpArr = [];
    //     if( this.isExpeditor(arr) ) {
    //         tmpArr = arr.splice( arr.indexOf("transport_to"), 1, "expeditor" );
    //         tmpArr = arr.splice( arr.indexOf("transport_from"), 1);
    //     }
    //     return arr;
    // }
    
    isExpeditor =(arr=null)=> {
        if(!arr) var arr = this.state.tags;
        return arr.some( item => item == "expeditor" )
        //return arr.some( item => item == "transport_to" ) && arr.some( item => item == "transport_from" );
    }
    
    isCarrier =(arr=null)=> {
        if(!arr) var arr = this.state.tags;
        return arr.some( item => item == "carrier" )
    }
    
    isShipper =(arr=null)=> {
        if(!arr) var arr = this.state.tags;
        return arr.some( item => item == "shipper" )
    }
    
    getLinksQuantity =()=>{
        Api.req('comp_rel_summary', {comp_id:this.id, types:["carriers", "shippers", "expeditors", "blacklist", "social"]}).then(res=>{
            if (res.err){
                console.log(res.msg)
            } else {
                console.log("linksss");
                console.log(res);
                this.relationsQuantity= {blacklist:res.blacklist, carriers:res.carriers, expeditors:res.expeditors, shippers: res.shippers, social:res.social};
                this.run("updateLinksQuantity", this.relationsQuantity)
            }
        })
    };
    
    getBookmarks=()=> {
        //console.log("GET Bookmarks!");
        Api.req('comp_rel_list', {comp_id: this.id, relation: "social", fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
            if (res.err){
                console.log(res.msg)
            } else{
                console.log("socialList");
                console.log(res);
                this.relations.social= res;
                this.getLinksQuantity();
                this.run("updateSocialLinks", res)
            }
        })
    };
    
    getBlacklist=()=> {
        console.log("GET blacklist!");
        Api.req('comp_rel_list', {comp_id: AppState.myCompany.id, relation: "blacklist", fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
            if (res.err){
                console.log(res.msg)
            } else{
                console.log("BlackList:");
                console.log(res);
                this.relations.blacklist= res;
                this.getLinksQuantity();
                this.run("updateBlacklist", res)
            }
        })
    };
    
    deleteLink = (params, linkType)=> {
        console.log(params);
        Api.linkDeleteRequest(params).then(res=> {
            if (res.err) {
                console.log("ОШИБКА удаления связи");
                console.log(res.msg);
            } else {
                this.updateLinks(linkType);
            }
        })
    };
    
    updateLinks=(linkType)=>{
        Api.req('comp_rel_list', {comp_id: AppState.myCompany.id, relation: linkType, fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
            if (res.err){
                console.log(res.msg)
            } else{
                logger.log(this, 'loaded relations type: ' + linkType);
                console.debug(res);
                this.relations[linkType]= res;
                this.getLinksQuantity();
                this.run(linkType, res)
            }
        })
    }
    
}

// import Controller from './Controller';
// import {Events, Error, Dictionary} from './../Dispatcher';
// import {Api} from './../api';
// import {AppState} from '../Auth/Dashboard';
// import PriceRequestsController from '../Auth/PriceRequests/PriceRequestsController';
// import {logger} from '../Classes/Logger';

// export default class CompanyController extends Controller {
    
//     constructor(comp_id) {
//         super();
// <<<<<<< HEAD
//         this.linksQuantity={
//             blacklist:null, carriers:null, expeditors:null, shippers: null, social:null
//         };
//         this.links={};
//         this.users_invited = [];
//         this.users = [];        
// =======
        
//         // кол-во связанных компаний по группам
//         this.relationsQuantity={blacklist:null, carriers:null, expeditors:null, shippers: null, social:null};
        
//         // таблица данных связанных компаний
//         this.relations = {};
        
//         // таблица данных приглашенных юзеров
//         this.usersInvites = [];
        
//         this.id = null;
// >>>>>>> master
//         if (comp_id) {
//             this.id = comp_id;
//             this.getLinksQuantity();
//             this.update()
// <<<<<<< HEAD
//         } else this.id = null;
//     }

//     perms_list = [
//         {id: 1, tags: 'all' ,value: 'Все права', exclude: 1},
//         {id: 2, tags: 'staff' ,value: 'Управления правами сотрудников в компании'},
//         {id: 4, tags: 'tender' ,value: 'Управления тендерами'},
//         {id: 16,  tags: 'data' ,value: 'Изменения данных компании'},
//         {id: 32,  tags: 'invite' ,value: 'Управлять приглашениями сотрудников в компанию'}
//     ]

//     userPermChange(perm, id){
//         if(!perm || !id) return;

//         Api.comp_user_perm_change({perm_flags: perm, user_id: id}).then(res=>{
//             if(res){
//                 if (res.err) {
//                     Events.run(Events.EV_SHOW_NOTIFY, { type:"error", error:res.msg })
//                     return;
//                 }

//                 this.users.some(user=>{
//                     if(user.uid == id){
//                         user.cflg = perm;
//                         return true;
//                     }
//                 });

//                 this.run("MyCompany_Users-update", this.users);
//             }
//         });
//     }

//     getPerm(perms){
//         let Perms = [];

//         this.perms_list.forEach(item=>{
//             if((perms & item.id) === item.id){
//                 Perms.push(item.tags)
//             }
//         });

//         return Perms;
// =======
//         }
        
// >>>>>>> master
//     }
    
//     update =()=> {
//         Api.companyStateRequestById(this.id).then(res=>{
//             if (res.err) {
//                 var error = {
//                     type:"error",
//                     error:res.msg
//                 };
//                 Events.run(Events.EV_SHOW_NOTIFY, error)
//             } else {
//                 this.state = res;
//                 this.run("update_companyState", res);
//             }
//         });
//     }
// <<<<<<< HEAD

//     getUsers = ()=>{
//         let params = {
//             fields: ['uid', 'rts', 'flg', 'fl', 'ln', 'pn', 'tel', 'email', 'gender', 'cid', 'cflg', 'position'],
//             filters: [ ['cid', 'eq', this.id] ]
//         };

//         Api.users_list(params).then(res=>{
//             if(res){
//                 if (res.err) {
//                     Events.run(Events.EV_SHOW_NOTIFY, { type:"error", error:res.msg })
//                     return;
//                 }
//                 this.users = res.data;
//                 this.run("MyCompany_Users-update", res.data);
//             }
//         });
//     }

//     getUsersInvited = ()=>{
//         let params = {
//             fields: ['id', 'ctime', 'email', 'last_name', 'first_name', 'pat_name', 'position', 'phone']
//         };

//         Api.comp_invites_list(params).then(res=>{
// =======
    
//     getUsersInvites = ()=>{
//         if(this.usersInvites.length){
//             return this.usersInvites
//         }
//         this.updateUsersInvites();
//     }
    
//     updateUsersInvites = ()=>{
//         Api.comp_invites_list({fields: ['id', 'ctime', 'email', 'last_name', 'first_name', 'pat_name', 'position', 'phone']}).then(res=>{
// >>>>>>> master
//             if (res.err) {
//                 var error = {
//                     type:"error",
//                     error:res.msg
//                 };
//                 Events.run(Events.EV_SHOW_NOTIFY, error)
//             } else {
//                 this.users_invited = res.data;
//                 this.run("MyCompany_UsersInvited-update", res.data);
//             }
//         });
//     }
    
//     userInviteCreate = (params)=>{
//         let message = {};
//         Api.user_invite_create(params).then(res=> {
//             if (res.err) {
//                 logger.log(this, 'userInviteCreate', res.msg, 'error');
//                 message = { message: res.msg,  type: "error" };
//             } else {
//                 message = { message: "Приглашение отправлено", type: "info" };
//                 this.getUsersInvited();
//             }
//         });
//         Events.run(Events.EV_SHOW_NOTIFY, message);
//     }
// <<<<<<< HEAD

//     deleteUserInvited = (params)=>{
// =======
    
//     userInviteDelete = (params)=>{
// >>>>>>> master
//         let message = {};
//         Api.user_invite_delete(params).then(res=> {
// <<<<<<< HEAD
//             if(res){
//                 if (res.err) {
//                     logger.log(this, 'userInviteDreate', res.msg, 'error');
//                     message = { message: res.msg,  type: "error" };
//                     return;
//                 }

//                 this.users_invited.some((invite, i)=>{
// =======
//             if (res.err) {
//                 logger.log(this, 'userInviteDreate', res.msg, 'error');
//                 message = { message: res.msg,  type: "error" };
//             } else {
//                 message = { message: "Приглашение удалено", type: "info" };
//                 console.log('1', this.usersInvites);
                
//                 this.usersInvites.some((invite, i)=>{
// >>>>>>> master
//                     if(invite.id == res.deleted_invite_id){
//                         this.users_invited.splice(i, 1);
//                         return true;
//                     }
//                 });
// <<<<<<< HEAD

//                  message = { message: "Приглашение удалено", type: "info" };
//                  this.run("MyCompany_UsersInvited-update", this.users_invited);
//             }

//             Events.run(Events.EV_SHOW_NOTIFY, message);
//         }); 
// =======
//                 console.log('2', this.usersInvites);
//                 // this.run("MyCompany_UsersInvites-update", this.usersInvites);
//             }
//         }); 
//         Events.run(Events.EV_SHOW_NOTIFY, message);
// >>>>>>> master
//     }
    
//     getCompanyTaxation =(taxation)=> {
//         var tax = Dictionary.taxationList.filter( tax => {
//             return tax.tag == taxation;
//         });
//         return ((tax || []).length) ? tax[0].value : null;
//     }
    
//     getTagNames =(arr)=> {
//         console.log(arr);
//         //arr = this.replaceTagToExpeditor( arr );
//         console.log(arr);
//         var newArr = [];
//         if ((arr || []).length > 0) {
//             newArr = arr.map( item=> {
//                 var newItem = Dictionary.tagsList.filter(tag=> {
//                     return tag.tag === item
//                 });
//                 return ((newItem || []).length) ? newItem[0].value : null;
//             })
//         }
//         //console.log(newArr);
//         return newArr;
//     }
    
//     // [DEPRECATED in new API]
//     // 
//     // replaceTagToExpeditor =(arr)=> {
//     //     var tmpArr = [];
//     //     if( this.isExpeditor(arr) ) {
//     //         tmpArr = arr.splice( arr.indexOf("transport_to"), 1, "expeditor" );
//     //         tmpArr = arr.splice( arr.indexOf("transport_from"), 1);
//     //     }
//     //     return arr;
//     // }
    
//     isExpeditor =(arr=null)=> {
//         if(!arr) var arr = this.state.tags;
//         return arr.some( item => item == "expeditor" )
//         //return arr.some( item => item == "transport_to" ) && arr.some( item => item == "transport_from" );
//     }
    
//     isCarrier =(arr=null)=> {
//         if(!arr) var arr = this.state.tags;
//         return arr.some( item => item == "carrier" )
//     }
    
//     isShipper =(arr=null)=> {
//         if(!arr) var arr = this.state.tags;
//         return arr.some( item => item == "shipper" )
//     }
    
//     getLinksQuantity =()=>{
//         Api.req('comp_rel_summary', {comp_id:this.id, types:["carriers", "shippers", "expeditors", "blacklist", "social"]}).then(res=>{
//             if (res.err){
//                 console.log(res.msg)
//             } else {
//                 console.log("linksss");
//                 console.log(res);
//                 this.relationsQuantity= {blacklist:res.blacklist, carriers:res.carriers, expeditors:res.expeditors, shippers: res.shippers, social:res.social};
//                 this.run("updateLinksQuantity", this.relationsQuantity)
//             }
//         })
//     };
    
//     getBookmarks=()=> {
//         //console.log("GET Bookmarks!");
//         Api.req('comp_rel_list', {comp_id: this.id, relation: "social", fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
//             if (res.err){
//                 console.log(res.msg)
//             } else{
//                 console.log("socialList");
//                 console.log(res);
//                 this.relations.social= res;
//                 this.getLinksQuantity();
//                 this.run("updateSocialLinks", res)
//             }
//         })
//     };
    
//     getBlacklist=()=> {
//         console.log("GET blacklist!");
//         Api.req('comp_rel_list', {comp_id: AppState.myCompany.id, relation: "blacklist", fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
//             if (res.err){
//                 console.log(res.msg)
//             } else{
//                 console.log("BlackList:");
//                 console.log(res);
//                 this.relations.blacklist= res;
//                 this.getLinksQuantity();
//                 this.run("updateBlacklist", res)
//             }
//         })
//     };
    
//     deleteLink = (params, linkType)=> {
//         console.log(params);
//         Api.linkDeleteRequest(params).then(res=> {
//             if (res.err) {
//                 console.log("ОШИБКА удаления связи");
//                 console.log(res.msg);
//             } else {
//                 this.updateLinks(linkType);
//             }
//         })
//     };
    
//     updateLinks=(linkType)=>{
//         Api.req('comp_rel_list', {comp_id: AppState.myCompany.id, relation: linkType, fields:["name", "inn","comp_id", "phone", "ati_code", "relation_id"]}).then(res=> {
//             if (res.err){
//                 console.log(res.msg)
//             } else{
//                 logger.log(this, 'loaded relations type: ' + linkType);
//                 console.debug(res);
//                 this.relations[linkType]= res;
//                 this.getLinksQuantity();
//                 this.run(linkType, res)
//             }
//         })
//     }
    
// }