// 
// 
// DEPRECATED
// 
// 
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'
import {Utils} from '../../utils';
import {Icon} from '../../SimpleComponents/Icons';


export default class ContactCenter__Block extends React.Component {

    static propTypes = {
        blockClass: React.PropTypes.string,
        name: React.PropTypes.string,
        title: React.PropTypes.string,
        isShow: React.PropTypes.bool,
        isShowSearch: React.PropTypes.bool,
        onToggleBlock: React.PropTypes.func,
        onToggleSearch: React.PropTypes.func,
        onSearchChange: React.PropTypes.func,
    }

    onKeyUp =(e)=> {
        if( e.keyCode === 27 ) {
            e.preventDefault();
            let c = this.props.onToggleSearch;
            if(c) c(this.props.name);
        }
    }

    onSearch =(e)=> {
        let c = this.props.onToggleSearch;
        if(c) c(this.props.name);
    }

    render =()=> {
        return(
            <div className="contact-center__box">
                <div className={this.props.blockClass}>
                    <div data-name={this.props.name} 
                         className={ this.props.isShow ? "contact-center__box-show" : "contact-center__box-hide" } 
                         onClick={this.props.onToggleBlock} />

	                        { this.props.isShowSearch && this.props.isShow 
	                                ? <input type="text" 
	                                		 className="contact-center__inputSearch" 
	                                		 placeholder="поиск..." 
	                                		 data-name={this.props.name} 
	                                		 onChange={this.props.onSearchChange}
                                             onKeyUp={this.onKeyUp}
	                                		 autoFocus={true} /> 
	                                : <div className="contact-center__box-title">{this.props.title}</div> }

	                        { this.props.isShow 
	                                ? <div onClick={this.onSearch}>
	                                    <Icon iconName="search-icon" className="icon-light" size={20}/>
	                                  </div> 
	                                : <div style={{width: "20px"}}></div> }

                </div>
                {this.props.isShow ? this.props.children : null}
            </div>
        )
    }

}