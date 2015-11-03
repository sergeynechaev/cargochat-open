"use strict";
var React = require('react/addons');
import {Api} from '../api';
import {InputSelect2, Tag} from '../SimpleComponents/InputSelect2.js';
import {Dictionary, Error} from '../Dispatcher';
import {Icon} from '../SimpleComponents/Icons';
import {InputText} from '../SimpleComponents/InputText';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {TableForm} from '../SimpleComponents/TableForm';
import {Utils} from '../utils';
import {ButtonActive} from '../SimpleComponents/ButtonActive';
import {Loading} from '../SimpleComponents/Loading';
import {StateInfo} from '../SimpleComponents/StateInfo';
import {Map} from './Map';
//7705714511 бумтранс
//290303665550 Осипов РА


class DadataSuggest extends React.Component {


    static propTypes = {
        list    : React.PropTypes.array,
        onSelect: React.PropTypes.func,
        name    : React.PropTypes.func,
        hidden  : React.PropTypes.bool
    };


    static defaultProps = {};


    selectItem = (e)=> {
        //console.log(e.target.dataset.id);
        var id = parseInt(e.target.dataset.id);
        var obj = {};
        obj[this.props.name] = this.props.list[id];
        this.props.onSelect(obj);
        this.setState({hidden: true})

    };

    render = ()=> {
        //console.log(this.state);
        if (this.props.list) {
            var suggestList = this.props.list.map((item, id)=> {
                return (
                    <tr data-id={id} onClick={this.selectItem}>
                        <td data-id={id}>
                            <p data-id={id}>{item.data.inn}</p>
                        </td>
                        <td data-id={id}>
                            <p data-id={id}>{item.value}</p>
                        </td>
                        <td data-id={id}>
                            <p data-id={id}>{item.data.address.value}</p>
                        </td>
                    </tr>
                )
            });
        }


        if (this.props.hidden) {
            return null
        }
        return (

            <div>
                <table className="table-nohead" style={{width: "parent"}}>
                    <thead>
                    <tr>
                        <th>
                            <p>ИНН</p>
                        </th>
                        <th>
                            <p>Название</p>
                        </th>
                        <th>
                            <p>Адрес</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {suggestList}
                    </tbody>
                </table>
            </div>

        )
    }

}


export default class A_CreateCompany extends React.Component {

    state = {
        dadataResponse: null,
        searchRequest : null,
        isSelected    : false,
        searchMode    : false
    };


    getSuggest = () => {
        if (this.state.searchRequest) {
            let params = {
                type: "suggest/party",
                data: {
                    query: this.state.searchRequest,
                    count: 5
                }
            };
            Api.getDadata(params).then(res=> {
                var resp;
                try {
                    resp = res.dadata.suggestions
                }
                catch (e) {
                    console.log(e)
                }
                this.setState({dadataResponse: resp, searchMode: true, isSelected: false, selectedCompany: null});
            })

        } else console.log("ничего не введено");
    };


    selectInputChange = (value)=> {
        console.log("from select");
        var tags = value.getSelectedList().map(tag=> {
            return tag.id
        });
        this.setState({tags: tags})

    };
    selectCompany = (obj)=> {

        obj.searchMode = false;
        obj.isSelected = true;
        obj.onYmapsReadyGeoCodingStart = true;
        this.setState(obj);

    };
    updateInputs = (obj)=> {
        this.setState(obj)
    };
    saveCompany = ()=> {
        var newObj = {};
        newObj.phone = this.state.phone;
        newObj.inn = this.state.selectedCompany.data.inn;
        newObj.addr = this.state.selectedCompany.data.address.value;
        newObj.kpp = this.state.selectedCompany.data.kpp;
        newObj.tags = this.state.tags;
        newObj.email = this.state.email;
        // newObj.ati_code = this.state.ati_code;   // deprecated
        newObj.web_site = this.state.web_site;

        newObj.x = this.state.x;
        newObj.y = this.state.y;

        //console.log("Сохранить");
        //console.log(newObj);
        Api.createCompanyNewRequest(newObj).then(res=> {
            if (res.err) {
                console.log(res.msg);
                Error.newError(res.err, res, msg)
            } else {
                console.log(res.comp_id);
                window.location.hash = "/dashboard/admin/companies"
            }
        })

    };
    cancel = ()=> {

        this.setState({
            searchMode: false, isSelected: false, selectedCompany: null, searchRequest: ""

        });
        console.log("Отменить")
    };

    inputAddressSelect(addrX, addrY) {
        this.setState({
            x: addrX,
            y: addrY
        });
        let m = this.refs.yandexMap;
        m.clearGeoObjects();
        m.setPos(addrX, addrY);
        m.addBaloon(addrX, addrY, name)
    }

;
    getCoordinate = ()=> {
        var myGeocoder = ymaps.geocode(this.state.selectedCompany.data.address.value, {json: true, results: 1});
        myGeocoder.then(
            (res) => {
                var sugg = res.GeoObjectCollection.featureMember;
                console.debug(sugg);
                var coord = sugg[0].GeoObject.Point.pos.split(" ");
                console.log("COORD");
                console.log(coord);
                var x = coord[0];
                var y = coord[1];
                this.inputAddressSelect(x, y)

            },
            (err) => {
                console.error('ymaps.geocode failed: ' + err)
            }
        );
    };
    ymapsReadyHandler = ()=> {
        console.log("READY YMAPS");
        if (this.state.onYmapsReadyGeoCodingStart) {
            this.state.onYmapsReadyGeoCodingStart = false;
            this.getCoordinate();

        }
    };


    render = ()=> {
        console.log(this.state);
        if (this.state.isSelected) {
            var dadata = this.state.selectedCompany;
            console.log(dadata);
            var body = [
                {
                    type: "divider",
                    name: "Данные из Dadata.ru"
                },
                {
                    fieldName: "Название",
                    value    : Utils.getValue(dadata, 'value')
                },
                {
                    fieldName: "ИНН",
                    value    : Utils.getValue(dadata, 'data.inn')
                },
                {
                    fieldName: "КПП",
                    value    : Utils.getValue(dadata, 'data.kpp')
                },
                {
                    fieldName: "ОГРН",
                    value    : Utils.getValue(dadata, 'data.ogrn')
                },
                {
                    fieldName: "Адрес",
                    value    : Utils.getValue(dadata, 'data.address.value')
                },
                {
                    type: "divider",
                    name: "Дополнительные данные"
                }
            ];
        }
        var stateStringify = JSON.stringify(this.state, null, '   ');
        return (
            <FlexBox direction="row" alignItems="start">
                <SmallPanel headerName="Создание компании" styles={{smallPanel:{marginRight:"10px"}}}>
                    <FlexBox >
                        <InputSimple
                            type="search"
                            placeholder='Введите ИНН или название'
                            name="searchRequest"
                            value={this.state.searchRequest}
                            onChange={this.updateInputs}
                            />
                        <ButtonActive caption="Проверить" onClick={this.getSuggest}/>
                    </FlexBox>
                    <DadataSuggest
                        hidden={!this.state.searchMode}
                        list={this.state.dadataResponse}
                        name="selectedCompany"
                        onSelect={this.selectCompany}
                        />

                    <TableForm hidden={!this.state.isSelected} body={body}/>
                    <Loading dataRecived={(this.state.isSelected)} dontShow={true}>
                        <table >
                            <tbody>
                            <tr>
                                <td style={{width:"100px"}}>
                                    <p>email</p>
                                </td>
                                <td>
                                    <InputSimple name="email" onChange={this.updateInputs}/>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <p>Телефон</p>
                                </td>
                                <td>
                                    <InputSimple name="phone" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Веб-сайт</p>
                                </td>
                                <td>
                                    <InputSimple name="web_site" onChange={this.updateInputs}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Признаки компании</p>
                                </td>
                                <td style={{padding:"5px"}}>
                                    <InputSelect2
                                        ref="tags"
                                        list={Dictionary.getTagsList()}
                                        multiSelect={true}
                                        elementClass={Tag}
                                        onChanged={this.selectInputChange}
                                        />
                                </td>

                            </tr>
                            </tbody>
                        </table>
                        <ButtonActive caption="Сохранить" onClick={this.saveCompany}/>
                        <ButtonActive caption="Отменить" onClick={this.cancel}/>
                    </Loading>

                </SmallPanel>
                <SmallPanel headerName="Address" disabled={(!this.state.isSelected)}>
                    <Map ref='yandexMap'
                         className="border"
                         style={{width:'410px', height:'300px'}}
                         disabled={false}
                         onReady={this.ymapsReadyHandler}
                        >

                    </Map>
                </SmallPanel>
                <StateInfo value={stateStringify}/>
            </FlexBox>

        )
    }
}

// deprecated
// 
// <tr>
//                                 <td>
//                                     <p>Код в АТИ</p>
//                                 </td>
//                                 <td>
//                                     <InputSimple name="ati_code" onChange={this.updateInputs}/>
//                                 </td>
//                             </tr>