import React, {Component} from 'react/addons';

import {logger} from '../../Classes/Logger';

export default class DataTable__Header extends Component {

	componentWillMount =()=> {}

	componentDidMount =()=> { }

	componentWillUnmount =()=> { }

	componentWillReceiveProps =()=> {}

	componentDidUpdate =()=> {}

    render =()=> {

    	// logger.log('render DataTable__Header', this, this.props.columns);
        
        let columns = this.props.provider.getColumns();
        let baseWidth = this.props.provider.getBaseColumnWidth();
        
    	let header = columns.map( (item,index) => {
            let colWidth = baseWidth ? (item.width * baseWidth) + '%' : null;
    		return colWidth ? <th key={index} width={colWidth}>{item['title']}</th>
                            : <th key={index}>{item['title']}</th>
    	})

    	return (
    		<thead><tr>{header}</tr></thead>
    	)
    }

}