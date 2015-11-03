var React = require('react/addons');
import {SmallPanelTest} from '../SimpleComponents/SmallPanelTest';
import {InputText} from '../SimpleComponents/InputText';
import {TransparentButton} from '../SimpleComponents/TransparentButton';
import {Loading} from '../SimpleComponents/Loading';
import {TenderForm} from './TenderForm';
import {Store, Events, Actions} from '../Dispatcher';
import Card from '../SimpleComponents/Card';
import {FlexBox} from '../SimpleComponents/FlexBox';
import {CreateTender} from './CreateTender'
import {DateTime} from '../utils';
import {Api} from '../api';
import {ModalWindow} from '../SimpleComponents/ModalWindow';


class NewForm extends React.Component {

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    state = {};

    saveForm = (state)=> {
        console.log("debug form");
        console.debug(this);
        var success = this.props.params.onSuccessSave;
        var err = this.props.params.onErrorSave;
        this.props.params.saveData.apply(this.props.params.context, state).then(res=> {
            if (res.err) {
                err(res.err, res.msg)
            } else {
                success(res)
            }
        })
    };

    render = ()=> {
        return (
            <div>
                {this.props.children}
                <p>1</p>
                <button onClick={this.saveForm}>Save</button>
                <p>2</p>
            </div>

        )
    }

}


var CardFooterOwner = React.createClass({

    propTypes: {
        footerProps: React.PropTypes.any

    },
    deleteTender(){
        //Actions.deleteTender(this.props.footerProps.id)
        Api.deleteTender(this.props.footerProps.id).then(res=> {
            if (res.err) {
                console.log(res.msg);
            } else {
                console.log(res);
                this.props.footerProps.update()
            }
        })
    },
    edit(){
        this.props.footerProps.triggerEdit(this.props.footerProps.idInStore)
    },
    render() {
        return (<div className="box-row-nw just-end table-footer table-pr">
                <a target="_blank" href={this.props.footerProps.link}><TransparentButton caption="Подробнее"/></a>
                <TransparentButton onClick={this.edit} caption="Редактировать"/>
                <TransparentButton onClick={this.deleteTender} caption="Удалить"/>

            </div>
        )
    }

});


var Tenders = React.createClass({


    getTenders(){
        Api.req('graph', {
            query: {
                comps: {
                    filters: [
                        ["id", "eq", this.props.company.id]
                    ],
                    sub    : {
                        tenders      : {},
                        owned_tenders: {
                            src     : "tenders",
                            relation: "comp_owner_of_tender"
                        }
                    }
                }
            }
        }, false).then(res=> {
            //console.log("GOT tenders");
            //console.log(res);
            var tenders = res.comps.data[0].tenders.data;
            var owned_tenders = res.comps.data[0].owned_tenders.data;
            this.setState({tenders: tenders, owned_tenders: owned_tenders})
        })

    },

    componentWillMount(){
        this.getTenders()

    },

    getInitialState(){
        return {
            company       : this.props.company,
            editMode      : false,
            selectedTender: null,
            tenders       : [],
            owned_tenders : [],
            isModalOpen   : false
        }
    },
    createTender(){
        this.setState({isModalOpen: true})
    },
    editTender(id){
        this.setState({
            editMode      : !this.state.editMode,
            selectedTender: id
        });
        this.getTenders()
    },
    onModalClose(){
        this.setState({isModalOpen: false})

    },
    testEvent(e){
        console.log("test event");
        console.log(e);
    },
    successSave(e){
        console.log("successSave");
        console.log(e);
    },
    errorSave(e, msg){
        console.log("errorSave");
        console.log(e, msg);
    },

    render(){
        //console.log("Tenders State");
        //console.log(this.state);
        var tenders = this.state.owned_tenders;
        //console.log(tenders);
        var Tenders = tenders.map((tender, id)=> {
            var startDate = new DateTime(tender.stime);
            var endDate = new DateTime(tender.etime);
            var publicDate = new DateTime(tender.ctime);
            return (
                <Card key={id}
                      title={tender.name}
                      subTitle={tender.organizer}
                      footer={CardFooterOwner}
                      footerProps={
                        {
                            id:tender.id,
                            link:tender.organizer,
                            triggerEdit:this.editTender,
                            idInStore:id,
                            update:this.getTenders

                        }
                    }
                    >
                    <div className="box-row-nw just-btw">
                        <div className="card-p">
                            <p className="font-bold">Начало:</p>

                            <p>{startDate.getFullMonthDate()}</p>
                        </div>
                        <div className="card-p">
                            <p className="font-bold">Окончание:</p>

                            <p>{endDate.getFullMonthDate()}</p>
                        </div>
                        <div className="card-p card-disab">
                            <p className="font-bold">Дата публикации:</p>

                            <p>{publicDate.getFullMonthDate()}</p>

                            <p>{publicDate.getTime()}</p>
                        </div>
                    </div>
                </Card>
            )
        });

        var newParams = {
            formName     : "Создание тендера",
            saveData     : Api.createTender,
            context      : Api,
            onSaveData   : this.testEvent,
            onSuccessSave: this.successSave,
            onErrorSave  : this.errorSave
        };

        return (
            <div>
                <FlexBox direction="row">
                    <div className="box-row-nw align-center conn-header panel panel-default">
                        <div className="table-pr sm-header-bord">
                            <a href="" className="sm-header-a font-sec font600 text-under">Наши тендеры</a>
                        </div>
                        <div className="table-pr table-pl sm-header-bord">
                            <a href="" className="sm-header-a font-sec font600 text-under">Закладки</a>
                        </div>
                        <div className="table-pl">
                            <a href="" className="sm-header-a font-sec font600 text-under">Приглашения</a>
                        </div>
                    </div>
                </FlexBox>

                <div className="box-row-nw col-large">
                    <div className="box-col-nw">
                        {Tenders}
                        <TransparentButton onClick={this.createTender} caption="Создать"/>
                    </div>
                    <ModalWindow isOpen={this.state.isModalOpen} onClose={this.onModalClose}>
                        <NewForm params={newParams}>
                            <div value="fff">ggg</div>
                            <div>ggg</div>
                        </NewForm>
                    </ModalWindow>
                </div>
            </div>
        )
    }
});

export {Tenders}
//
//<div className="marg-lr col-default">
//                <Loading dataRecived={!this.state.editMode} dontShow={true}>
//                    <div className="test-animate">
//                        {Tenders}
//                    </div>
//                    <SmallPanelTest headerName="Создание тендера" className="test2-animate">
//                        <div className="box-row-nw just-end table-footer table-pr">
//                            <TransparentButton onClick={this.createTender} caption = "Создать" />
//                        </div>
//                    </SmallPanelTest>
//                </Loading>
//                <Loading dataRecived={this.state.editMode} dontShow={true} >
//                    <CreateTender
//                        company={this.props.company}
//                        tenderObject={tenders[this.state.selectedTender]}
//                        backToTenders={this.editTender}
//                        />
//                </Loading>
//            </div>