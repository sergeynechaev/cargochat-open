var React = require('react/addons');
//import {Dispatcher} from './Dispatcher';
import {Api} from '../api';
import {Utils} from '../utils';
import {Validation} from '../Validation';

import {Loading} from '../SimpleComponents/Loading';
import {Events, Actions, Store} from '../Dispatcher';
import {SmallPanel} from '../SimpleComponents/SmallPanel';

import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {InputSimple} from '../SimpleComponents/InputSimple';
import {InputText} from '../SimpleComponents/InputText';
import {RadioInput} from '../SimpleComponents/RadioInput';
import {InputError} from '../SimpleComponents/InputError';
import {Icon} from '../SimpleComponents/Icons';
import {InputSelect} from '../SimpleComponents/InputSelect';
import {InputSelect2} from '../SimpleComponents/InputSelect2';
import {DateSimple} from '../SimpleComponents/DateSimple';
import Card from '../SimpleComponents/Card';
import {AppState} from '../Auth/Dashboard';

var CardFooter = React.createClass({

    propTypes: {
        footerProps: React.PropTypes.any
    },

    accept(){
        Actions.tender_invite_accept(this.props.footerProps.id);

    },
    reject(){

    },
    render() {
        return (<div className="box-row-nw just-end table-footer table-pr">
                <a target="_blank" href={this.props.footerProps.link}><Button caption="Подробнее"/></a>
                <TransparentButton onClick={this.accept} caption="Принять"/>
                <TransparentButton onClick={this.reject} caption="Отказаться"/>
            </div>
        )
    }
});


var Test = React.createClass({

    //относится к InputSelect
    onChangeValueSelect (obj) {
        this.setState(obj)
    },

    inputSelect2Changed (caller) {
        console.log('[Test] inputSelect2Changed');
        console.debug(caller);
        console.log(caller.getSelectedList());
    },

    getInitialState () {
        return {
            compFormationValue: 1,
            list              : "10", //относится к InputSelect,
            date              : null,
            apiMode           : true
        }
    },
    changeInput(v){
        console.log("changeInputValue" + v)
    },
    compFormationHandler (o) {
        console.log('compFormationHandler');
        //console.debug(o.date)
        this.setState(o)
    },
    click(){
        console.log("ddd")
    },

    graphRequestApply () {
        //console.log('graphRequestApply');
        let v = this.refs.graphRequestInput.getDOMNode().value;
        let q;
        try {
            q = JSON.parse(v)
        } catch (e) {
            this.graphResultSet('invalid json: ' + e);
            return;
        }
        this.graphResultSet('Loading...');


        Api.req('graph', {query: q}, false).then(res=> {
            this.graphResultSet(JSON.stringify(res, null, '  '))
        })

    },
    graphRequestSet (r) {
        //console.log('graphRequestSet');
        this.refs.graphRequestInput.getDOMNode().value = JSON.stringify(r, null, '  ');
    },
    graphResultSet (t) {
        //console.log('graphResultSet');
        this.refs.graphRequestResult.getDOMNode().value = t;
    },
    changeMode(){
        this.setState({apiMode: !this.state.apiMode})
    },
    go(o){
        console.log("links ready");
        console.log(o.getBookmarksList());
    },
    testOn(){

        AppState.myCompanyLinks.on("links_ready", this.go);
        AppState.myCompanyLinks.updateLinks();
    },
    render() {
        console.log("TEST STATE");
        console.log(this.state);
        let compFormationFiz = 'физ. лицо';
        let compFormationJur = 'юр. лицо';

        function getInnElement(v) {
            switch (v) {
                case compFormationFiz:
                    return <InputText type="search" active={true} validation={{typing:Validation.typingInt}}
                                      maxLength="12" minLength="12" unique="comp_inn" inputName="testInn12"
                                      caption="тест ИНН 12 зн."/>;
                case compFormationJur:
                    return <InputText type="search" active={true} validation={{typing:Validation.typingInt}}
                                      maxLength="10" minLength="10" unique="comp_inn" inputName="testInn10"
                                      caption="тест ИНН 10 зн."/>
            }
            return null
        }

        let s = 1000;
        return (
            <div>

                <button onClick={this.changeMode}>
                    {(!this.state.apiMode) ? "API" : "Test INTERFACE"}
                </button>
                <button onClick={this.testOn}>
                    test
                </button>
                <div className="box-row-wr max-size">


                    <SmallPanel headerName="Testing place" styles={{smallPanel:{width:"410px"}}}>

                        <Loading dataRecived={!this.state.apiMode} dontShow={true}>
                            <RadioInput active={true} inputName="compFormationValue" caption="тест формы компании"
                                        choice={[compFormationFiz, compFormationJur]}
                                        selected={this.state.compFormationValue}
                                        returnValue={this.compFormationHandler}/>
                            {getInnElement(this.state.compFormationValue)}

                            <InputText key="vldInt" type="search" inputName="inInt" caption="valid Int" active={true}
                                       validation={{typing:Validation.typingInt}}/>
                            <InputText key="vldFlt" type="search" inputName="inFlt" caption="valid Float" active={true}
                                       validation={{typing:Validation.typingFloat}}/>
                            <InputText key="vldEml" type="search" inputName="inEml" caption="valid Email" active={true}
                                       validation={{typing:Validation.typingEmail}}/>
                            <InputText key="vldPhn" type="search" inputName="inPhn" caption="valid Phone" active={true}
                                       validation={{typing:Validation.typingPhone}}/>
                            <InputText key="uniEml" type="search" inputName="inEml" caption="unique Email" active={true}
                                       validation={{typing:Validation.typingEmail, changing:Validation.changingUnique, uniqueType:'user_email',  uniqueHolder:Api.user_id}}/>
                            <InputText key="uniMob" type="search" inputName="inMob" caption="unique Mobile"
                                       active={true}
                                       validation={{typing:Validation.typingPhone, changing:Validation.changingUnique, uniqueType:'user_mobile'}}/>
                            <InputText key="uniIcq" type="search" inputName="inIcq" caption="unique Icq" active={true}
                                       validation={{typing:Validation.typingInt,   changing:Validation.changingUnique, uniqueType:'user_icq'}}/>
                            <InputText key="uniSkype" type="search" inputName="inSkype" caption="unique Skype"
                                       active={true}
                                       validation={{                               changing:Validation.changingUnique, uniqueType:'user_skype'}}/>
                            <InputText key="uniINN" type="search" inputName="inINN" caption="unique INN" active={true}
                                       validation={{typing:Validation.typingInt,   changing:Validation.changingUnique, uniqueType:'comp_inn'}}/>
                            <InputText key="uniOGRN" type="search" inputName="inORGN" caption="unique OGRN"
                                       active={true}
                                       validation={{typing:Validation.typingInt,   changing:Validation.changingUnique, uniqueType:'comp_ogrn'}}/>

                            <InputError type="search" active={true} validation={{typing:Validation.typingInt}}
                                        inputName="testInput" caption="тест input"/>


                            <div className="box-row-wr align-center just-end table-footer pagin-pr">
                                <div>
                                    <p className="footer-style">Отображать по:&nbsp;</p>
                                </div>
                                <div className="">
                                    <InputSelect
                                        name="list"
                                        selectedItem={this.state.list}
                                        listItems={[10, 20, 40]}
                                        getValue={this.onChangeValueSelect}
                                        />
                                </div>
                                <div className="pagin-plb">
                                    <p className="footer-style">1-10 из 100</p>
                                </div>
                                <div className="pagin-plb">
                                    <Icon iconName="arrow-left"/>
                                </div>
                                <div className="pagin-pl">
                                    <Icon iconName="arrow-right"/>
                                </div>


                            </div>
                            <DateSimple
                                caption="Date"
                                name="super_date"
                                value={this.state.super_date || '2000-01-01'}
                                onChange={this.compFormationHandler}
                                />


                            <InputSelect2
                                name="list2"
                                list={[{id:0, value:10}, {id:2, value:20}, {id:999, value:40, __selected__:true}]}
                                onChanged={this.inputSelect2Changed}
                                />

                            <InputSelect2
                                name="list3"
                                list={[{id:0, value:10}, {id:2, value:20, __selected__:true}, {id:999, value:40}]}
                                multiSelect={true}
                                onChanged={this.inputSelect2Changed}
                                />

                            <InputSelect2
                                active={false}
                                name="list3"
                                list={[{id:0, value:10000}, {id:2, value:5555}, {id:999, value:66666, __selected__:true}, {id:4, value:777777}, {id:5, value:'ololololo'}]}
                                onChanged={this.inputSelect2Changed}
                                />

                            <br />
                            <br />
                        </Loading>

                        <Loading dataRecived={this.state.apiMode} dontShow={true}>
                            Запрос:
                            <br />
                            <br />
                            <input key={s++} type="button" value="все юзеры (все поля)"
                                   onClick={this.graphRequestSet.bind(null, {users:{}})}/>
                            <input key={s++} type="button" value="все юзеры (email)"
                                   onClick={this.graphRequestSet.bind(null, {users:{fields:["email"]}})}/>
                            <input key={s++} type="button" value="все юзеры (email) с алиасом"
                                   onClick={this.graphRequestSet.bind(null, {peoples:{src:"users",fields:["email"]}})}/>
                            <input key={s++} type="button" value="все юзеры (email) с сортировкой по email"
                                   onClick={this.graphRequestSet.bind(null, {peoples:{src:"users",fields:["email"],order:"email"}})}/>
                            <input key={s++} type="button" value="все юзеры (email) с обратной сортировкой по email"
                                   onClick={this.graphRequestSet.bind(null, {peoples:{src:"users",fields:["email"],order:"email",dir:"DESC"}})}/>
                            <input key={s++} type="button" value="первые два юзера (email)"
                                   onClick={this.graphRequestSet.bind(null, {users:{fields:["email"],limit:2}})}/>
                            <input key={s++} type="button" value="третий юзер (email)"
                                   onClick={this.graphRequestSet.bind(null, {users:{fields:["email"],offset:2,limit:1}})}/>
                            <input key={s++} type="button" value="юзеры у которых в имени есть 'sLa'"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["first_name","contains","sLa"]]}})}/>
                            <input key={s++} type="button" value="юзер 168 (все поля)"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["id","eq",168]]}})}/>
                            <input key={s++} type="button" value="юзеры 168 и 120 (все поля)"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["id","in",[168,120]]]}})}/>
                            <input key={s++} type="button" value="юзер 168 (email,skype)"
                                   onClick={this.graphRequestSet.bind(null, {users:{fields:["email","skype"],filters:[["id","eq",168]]}})}/>
                            <input key={s++} type="button" value="юзер 168 + его компании (с inn)"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["id","eq",168]],sub:{comps:{fields:["inn"]}}}})}/>
                            <input key={s++} type="button" value="юзер 168 + его общие права"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["id","eq",168]],sub:{user_perm:{}}}})}/>
                            <input key={s++} type="button" value="юзер 168 + его права в компаниях"
                                   onClick={this.graphRequestSet.bind(null, {users:{filters:[["id","eq",168]],sub:{perms:{}}}})}/>
                            <br />
                            <br />
                            <input key={s++} type="button" value="все компании(inn) + их юзеры(email)"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["inn"],sub:{users:{fields:["email"]}}}})}/>
                            <input key={s++} type="button" value="компания 204 + расшифровка опф"
                                   onClick={this.graphRequestSet.bind(null, {comps:{filters:[["id","eq",204]],sub:{dadata_opf:{}}}})}/>
                            <input key={s++} type="button" value="компания 169 + тендеры в которых участвет"
                                   onClick={this.graphRequestSet.bind(null, {comps:{filters:[["id","eq",169]],sub:{tenders:{}}}})}/>
                            <input key={s++} type="button" value="компания 169 + тендеры которыми владеет"
                                   onClick={this.graphRequestSet.bind(null, {comps:{filters:[["id","eq",169]],sub:{owned_tenders:{src:"tenders",relation:"comp_owner_of_tender"}}}})}/>
                            <input key={s++} type="button" value="компания 9 + ее тэги"
                                   onClick={this.graphRequestSet.bind(null, {comps:{filters:[["id","eq",9]],sub:{comp_tags:{}}}})}/>
                            <input key={s++} type="button" value="компания 5 + запросы вступления в нее"
                                   onClick={this.graphRequestSet.bind(null, {comps:{filters:[["id","eq",5]],sub:{join_requests:{}}}})}/>
                            <input key={s++} type="button" value="компания 221 + связи от нее"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["inn"],filters:[["id","eq",221]],sub:{comp_relations:{}}}})}/>
                            <input key={s++} type="button" value="компания 221 + связи на нее"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["inn"],filters:[["id","eq",221]],sub:{comp_relations:{relation:"reverse"}}}})}/>
                            <input key={s++} type="button" value="все компани + все их связи"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["id"],sub:{directLinks:{src:"comp_relations",relation:"default"},reverseLinks:{src:"comp_relations",relation:"reverse"}}}})}/>
                            <input key={s++} type="button" value="все компани + запросы связей от них и к ним"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["id"],sub:{directLinks:{src:"comp_relation_requests",relation:"default"},reverseLinks:{src:"comp_relation_requests",relation:"reverse"}}}})}/>
                            <input key={s++} type="button" value="компания 221 + связанные компании"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["inn"],filters:[["id","eq",221]],sub:{comp_relations:{sub:{comps:{fields:["inn"]}}}}}})}/>
                            <input key={s++} type="button" value="компания 281 + приглашения сотрудников"
                                   onClick={this.graphRequestSet.bind(null, {comps:{fields:["inn"],filters:[["id","eq",281]],sub:{user_invites:{}}}})}/>
                            <br />
                            <br />
                            <input key={s++} type="button" value="все связи компаний"
                                   onClick={this.graphRequestSet.bind(null, {comp_relations:{}})}/>
                            <input key={s++} type="button" value="все связи компаний + компании"
                                   onClick={this.graphRequestSet.bind(null, {comp_relations:{sub:{compFrom:{src:"comps",relation:"from",fields:["inn"]},compTo:{src:"comps",relation:"default",fields:["inn"]}}}})}/>
                            <br />
                            <br />
                            <input key={s++} type="button" value="все тендеры"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{}})}/>
                            <input key={s++} type="button" value="тендеры созданные 2015-07-03"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{filters:[["ctime","gt","2015-07-03"],["ctime","lt","2015-07-04"]]}})}/>
                            <input key={s++} type="button" value="все тендеры + участники"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{sub:{comps:{}}}})}/>
                            <input key={s++} type="button" value="все тендеры + участники + юзеры участников"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{sub:{comps:{sub:{users:{}}}}}})}/>
                            <input key={s++} type="button" value="все тендеры + участники + владелец"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{sub:{comps:{},owner:{src:"comps",relation:"comp_owner_of_tender"}}}})}/>
                            <input key={s++} type="button" value="все тендеры + приглашения в них"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{sub:{invites_to_this_tender:{src:"tender_invites"}}}})}/>
                            <input key={s++} type="button" value="первый тендер + создатели"
                                   onClick={this.graphRequestSet.bind(null, {tenders:{limit:1,sub:{owner:{src:"comps",relation:"comp_owner_of_tender"}}}})}/>
                            <br />
                            <br />
                            <textarea key={s++} ref="graphRequestInput" style={{height:300, width:400}}></textarea>
                            <input key={s++} type="button" value="Выполнить" onClick={this.graphRequestApply}/>
                            <br />
                            Ответ: <textarea key={s++} ref="graphRequestResult"
                                             style={{height:400, width:400}}></textarea>

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </Loading>

                    </SmallPanel>
                </div>
            </div>
        )
    }

});


export {Test}
