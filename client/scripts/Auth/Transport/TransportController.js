import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {Events} from '../../Dispatcher';
import Controller from '../../Classes/Controller';
import {logger} from '../../Classes/Logger';

export default class TransportController extends Controller {

    constructor(props) {
        super(props);
        this.vehiclesList = [];
    }

    updateData() {
        this.vehiclesList = this.getVehiclesList();
    }

    createVehicle( params ) {
        this.updateVehicle( params, 'create' );
    }

    typesList = [
        {id: 1, tag: "truck", value: 'Тягач'},
        {id: 2, tag: "lorry", value: 'Грузовик'},
        {id: 3, tag: "trailer", value: 'Прицеп'},
        {id: 4, tag: "semitrailer", value: 'Полуприцеп'},
    ]

    // при передаче в params vehicle_id будет update, иначе create
    updateVehicle( params, type = 'update' ) {
        let message = {};
        if (params) {
            params['action'] = (type == 'update') ? 'update' : 'create';
            logger.log( 'Updating vehicle...', params );
            Api.vehicle_manage( params ).then(res=> {
                if( res.err ) {
                    logger.log( 'error', (type == 'update') ? "Error while updating vehicle" : "Error while creating new vehicle", res.msg );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: (type == 'update') ? "Данные по ТС обновлены" : "Новое ТС создано", type: "info" };
                }
                //this.run("Transport_updated", this);
                this.getVehiclesList();
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //window.location.hash = 'dashboard/company/transport';
            })

        } else {
            message = { message: "Ошибка при обновлении ТС: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    deleteVehicle( id ) {
        let message = {};
        if( id ) {
            logger.log( 'Deleting the vehicle from DB...', id );
            Api.vehicle_manage( { action: 'delete', vehicle_id: id } ).then(res=> {
                if( res.err ) {
                    logger.log( 'error', 'Error while deleting the vehicle', res.msg );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "ТС успешно удалено.", type: "info" };
                }
                this.getVehiclesList();
                Events.run(Events.EV_SHOW_NOTIFY, message);
                //this.run("Transport_updated", this);
            })
        } else {
            message = { message: "Ошибка при удалении ТС: не найден ID.", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    getVehiclesList() {
        let message = {};
        let params = {
            comp_id: AppState.myCompany.id,
            fields:   [ "id",
                        "model", 
                        "num", 
                        "type", 
                        "sts", 
                        "sts_name", 
                        "sts_size", 
                        "sts_token",
                        "pts",
                        "pts_name",
                        "pts_size",
                        "pts_token" ]
        };
        logger.log( 'Geting vehicles list...' );
        Api.vehicles_list( params ).then(res=> {
            if( res.err ) {
                logger.log( 'Error while getting vehicles list', res.msg );
                message = { message: res.msg, type: "error" };
                Events.run(Events.EV_SHOW_NOTIFY, message);
                return null;
            } else {
                logger.log( "res tr=", res);
                this.vehiclesList = res.data;
                this.run("Transport_vehicleslist_complete", res.data);
            }
        })
    }

    countVehicles() {
        return this.vehiclesList.length;
    }

    getVehicleType =(typeTag)=> {
        var typeName = this.typesList.filter( type => {
            return type.tag == typeTag;
        });
        return ((typeName || []).length) ? typeName[0].value : null;
    }

}

// фильтры getVehiclesList
// тут формат фильтров упращен
// вместо "списка объектов с клчами col, op, val" - тут "список списков из трех элементов col, op, val"
// пример:
// вместо [{"col":"x","op":"lt","val":30},{"col":"x","op":"gt","val":10}]
// тут просто [["id","lt",30],["id","gt",10]]