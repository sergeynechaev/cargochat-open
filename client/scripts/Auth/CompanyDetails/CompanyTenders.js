var React = require('react/addons');
import {SmallPanelTest} from '../../SimpleComponents/SmallPanelTest';
import {InputText} from '../../SimpleComponents/InputText';
import {TransparentButton} from '../../SimpleComponents/TransparentButton';
import {Loading} from '../../SimpleComponents/Loading';
import {TenderForm} from '../TenderForm';
import {Store, Events, Actions} from '../../Dispatcher';
import Card from '../../SimpleComponents/Card';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {CreateTender} from '../CreateTender'
import {DateTime} from '../../utils';
import {Api} from '../../api';


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
                <TransparentButton caption="Редактировать"/>
            </div>
        )
    }

});


var CompanyTenders = React.createClass({


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
            selectedTender: null,
            tenders       : [],
            owned_tenders : []
        }
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
                    <div className="test-animate">
                        {Tenders}
                    </div>
                </div>
            </div>
        )
    }
});

export {CompanyTenders}