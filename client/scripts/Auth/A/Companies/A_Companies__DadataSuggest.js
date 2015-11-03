import React from 'react/addons';

import {Events} from '../../../Dispatcher';
import {logger} from '../../../Classes/Logger';

export default class A_Companies__DadataSuggest extends React.Component {

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
