var React = require('react/addons');
import {ModalWindow} from '../../Controls/ModalWindow';
import {Icon} from '../../SimpleComponents/Icons';
import {Api} from '../../api';
import {Events} from '../../Dispatcher';
import {logger} from '../../Classes/Logger';
import {CompRelationCreateDialog} from './CompRelationCreateDialog';
import {AppState} from '../Dashboard';

export class OtherCompanyFooter extends React.Component {
    
    state = {
        isRelDialog: false
    }
    
    relDialogOpen=()=> {
        this.setState({isRelDialog: true})
    }
    
    relDialogClose=()=> {
        this.setState({isRelDialog: false})
    }
    
    linkRequest=(from, to, type)=>{
        Api.linkCreateRequest({comp_from: from, comp_to: to, relation_type: type}).then(res=> {
            if (!res) { res = {err: '-1', msg:'Api.linkCreateRequest failed'}; }
            if (res.err) {
                Events.runError(res.msg)
            } else {
                // а как же черный список тут только про закладки ...
                Events.run(Events.EV_SHOW_NOTIFY, {message:`Компания ${this.props.otherCompany.name} добавлена в закладки`, type: "new_link"});
            }
        })
    }
    
    addToBookmarks=()=>{
        this.linkRequest(AppState.myCompany.id, this.props.otherCompany.id, "social");
    }
    
    addToBlackmarks=()=>{
        this.linkRequest(AppState.myCompany.id, this.props.otherCompany.id, "blacklist");
    }
    
    render=()=>{
        //logger.log(this, 'render')
        //console.debug(this.state, this.props)
        
        // todo: узнать не находится ли компания в "закладках" или "черном списке"
        // и рисовать мол "уже в закладках", "уже в черном списке"
        // ждем пока родится функционал api
        
        return (
            <div className="">
                <ModalWindow isOpen={this.state.isRelDialog} params={this.state.paramsForInvite} createLink={this.linkRequest} onClose={this.relDialogClose} title="Выберите тип связи">
                    <CompRelationCreateDialog company={this.props.otherCompany} onClose={this.relDialogClose}/>
                </ModalWindow>
                <div className="box-row-nw just-btw table-pr table-pl border">
                    <div onClick={this.relDialogOpen} className="box-row-nw footer-a-div">
                        <Icon iconName="plus-circle-icon" size={20} className="icon-green"/>
                        <span className="footer-a-green">Создать связь</span>
                    </div>
                    <div onClick={this.addToBookmarks} className="box-row-nw footer-a-div" >
                        <Icon iconName="star-icon" size={20} className="icon-yellow"/>
                        <span className="footer-a-yellow">В закладки</span>
                    </div>
                    <div className="box-row-nw footer-a-div">
                        <Icon iconName="message-icon" size={20} className="icon-blue"/>
                        <span className="footer-a-blue">Написать сообщение</span>
                    </div>
                    <div onClick={this.addToBlackmarks} className="box-row-nw footer-a-div">
                        <Icon iconName="minus-circle-icon" size={20} className="icon-black"/>
                        <span className="footer-a-black">В черный список</span>
                    </div>
                </div>
            </div>
        )
    }

}