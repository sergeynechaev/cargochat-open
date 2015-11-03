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

import A_Companies__DadataSuggest from './A_Companies__DadataSuggest';
import A_Companies__NewForm from './A_Companies__NewForm';

export default class A_Companies__Create extends React.Component {
    
    state = {
        dadataInp: '',
        dadataResponse: null,
        dadataRenderType: 'full',
        dadataObj: null,
    }

    getSuggest =()=> {
        // logger.log('getSuggest =' + this.state.dadataInp);

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
                <h3>Добавить компанию</h3>
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
                        <A_Companies__DadataSuggest list={this.state.dadataResponse} onSelect={this.selectCompany} renderType={this.state.dadataRenderType} /> }
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
            </div>
        )
    } 
}

reactMixin.onClass(A_Companies__Create, React.addons.LinkedStateMixin);