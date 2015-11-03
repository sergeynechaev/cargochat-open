//
//
//
//
// BACKUP
// 
// 
// 
// 




import React from 'react/addons';
import reactMixin from 'react-mixin';

import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';
import {AppState} from '../../../Auth/Dashboard';
import {logger} from '../../../Classes/Logger';

import {Icon} from '../../../Controls/Icon';
import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';
import {InputSimple} from '../../../Controls/Forms/InputSimple';
import {FormGroup} from '../../../Controls/Forms/FormGroup';

import A_Companies__NewForm from './A_Companies__NewForm';

export default class A_Companies__Dadata extends React.Component {
	
    state = {
        dadataInp: '',
        dadataResponse: null,
        dadataRenderType: 'full',
        dadataObj: null,
    }

    getSuggest =()=> {
        logger.log('getSuggest =' + this.state.dadataInp);

        if (this.state.dadataInp) {
            let params = {
                type: "suggest/party",
                data: {
                    query: this.state.dadataInp,
                    count: 10
                }
            };
            Api.getDadata(params).then(res=> {
                let resp;
                try { resp = res.dadata.suggestions }
                catch (e) {
                    logger.log('Error getting dadata: ', this, e);
                }
                this.setState({dadataResponse: resp});
            })
        }
    }

    selectCompany =(obj)=> {
        logger.log('selectCompany', this, obj);
        this.setState({dadataRenderType: 'short', dadataObj: obj});
    }

    onKeyUp =(e)=> {
        if( e.keyCode === 13 ) this.getSuggest();
    }

    onCloseForm =()=> {
        this.setState({dadataRenderType: 'full', dadataObj: null});
    }

    render = ()=> {

        // logger.log('render Dadata, compstate= ', this, AppState.myCompany.state);

        return (
            <div>
                <div className="row row-nw row-space-children">
                    <FormGroup name="Название компании или ИНН" from="dadata">
                        <InputSimple name="dadata" valueLink={this.linkState('dadataInp')} onKeyUp={this.onKeyUp} />
                    </FormGroup>
                    <div className="padd-top">
                        <ButtonSimple onClick={this.getSuggest} brand="success" caption="Искать в Dadata"/>
                    </div>
                </div>
                <div className="row row-nw row-align-start row-space-children">
                {this.state.dadataResponse &&
                    <DadataSuggest list={this.state.dadataResponse} onSelect={this.selectCompany} renderType={this.state.dadataRenderType} /> }
                { this.state.dadataRenderType == 'short' && 
                    <div style={{width: "50%", "border": "1px solid #ddd", "padding": "10px" }}>
                        <div className="row row-nw row-space-children row-between row-align-start">
                            <h3>Добавление компании</h3>
                            <Icon name="close" onClick={this.onCloseForm}/>
                        </div>
                        { this.state.dadataObj && 
                            <A_Companies__NewForm context={this.state.dadataObj} onClose={this.onCloseForm} /> }
                    </div> }
                </div>
            </div>
        )
    } 
}


class DadataSuggest extends React.Component {

    static propTypes = {
        list: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        renderType: React.PropTypes.string,
    }

    selectItem =(e)=> {
        this.props.onSelect( this.props.list[ e.target.parentNode.dataset.id ] );
    }

    render = ()=> {
        if (this.props.list) {
            var suggestList = this.props.list.map((item, index)=> {
                return (
                    <tr key={index} data-id={index} onClick={this.selectItem} className="pointer">
                        <td data-id={index}>
                            <span className="text-strong">{item.value}</span><br/>
                            ИНН: {item.data.inn}
                        </td>
                        {this.props.renderType == 'full' && <td>{item.data.address.value}</td> }
                    </tr>
                )
            });
        }

        let curWidth = this.props.renderType == 'full' ? "100%" : "50%";

        return (
            <div style={{width: curWidth}}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Компания</th>
                        {this.props.renderType == 'full' && <th>Адрес</th> }
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

reactMixin.onClass(A_Companies__Dadata, React.addons.LinkedStateMixin);