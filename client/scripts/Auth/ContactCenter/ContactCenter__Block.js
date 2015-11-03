var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {Events, Error} from '../../Dispatcher';
import {logger} from '../../Classes/Logger.js'
import {Utils} from '../../utils';
import {Icon} from '../../SimpleComponents/Icons';


export default class ContactCenter__Block extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        title: React.PropTypes.string,
        isShow: React.PropTypes.bool,
        isShowSearch: React.PropTypes.bool,
        onToggleBlock: React.PropTypes.func,
        onToggleSearch: React.PropTypes.func,
        onSearchChange: React.PropTypes.func,
    }

    state = {
        isShowSearch: false,
        isShowBlock: true,
    }

    onKeyUp =(e)=> {
        if( e.keyCode === 27 ) {
            e.preventDefault();
            this.setState({isShowSearch: false});
            let c = this.props.onToggleSearch;
            if(c) c(this.props.name);
        }
    }

    onToggleSearch =(e)=> {
        this.setState({isShowSearch: !this.state.isShowSearch});
        let c = this.props.onToggleSearch;
        if(c) c(this.props.name);
    }

    toggleBlock =(e)=> {
        this.setState({ isShowBlock: !this.state.isShowBlock });
    }

    onCreate =(e)=> {
        e.stopPropagation();
        if( this.props.onCreate ) this.props.onCreate();
    }

    render =()=> {
        return(
            <div className="contact-center__block" data-state={this.state.isShowBlock ? '' : 'collapse'}>
                <div className="contact-center__block-header pointer" onClick={this.toggleBlock}>
                    <span>{this.props.title}</span>
                    { this.props.onCreate ? 
                        <div>
                            <div className="contact-center__btn pointer" onClick={this.onCreate}>+</div>
                        </div> : null }
                </div>
                { this.state.isShowBlock ? 
                    <div className="contact-center__block-subheader">
                        <div className="contact-center__tab">
                            <div className="contact-center__tab-left pointer"
                                 data-state={this.props.activeFilter == "all" ? "active" : ''}
                                 onClick={this.props.onToggleFilter}
                                 data-name={this.props.name} 
                                 data-value="all">все</div>
                            <div className="contact-center__tab-right pointer"
                                 data-state={this.props.activeFilter == "my" ? "active" : ''}
                                 onClick={this.props.onToggleFilter}
                                 data-name={this.props.name} 
                                 data-value="my">{this.props.name == 'contacts' ? "контакты" : "мои"}</div>
                        </div>
                        <div className="contact-center__search">
                            <div className="contact-center__search-icon pointer" onClick={this.onToggleSearch}>
                                <Icon iconName="search-icon" className="icon-dark" fill="#74848d" size={18}/>
                            </div> 
                            { this.state.isShowSearch
                                        ? <input type="text" 
                                                 placeholder="поиск..." 
                                                 data-name={this.props.name} 
                                                 onChange={this.props.onSearchChange}
                                                 onKeyUp={this.onKeyUp}
                                                 autoFocus={true} /> 
                                        : null }
                        
                        </div>
                    </div> : null }
                { this.state.isShowBlock ? 
                    <div className="contact-center__block-content">
                        {this.props.children}
                    </div> : null}
            </div>
        )
    }

}
