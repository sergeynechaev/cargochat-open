var React = require('react/addons');
var Source = require('../../icons/logo_bt.gif');
var Remarkable = require('remarkable');
import {SmallPanel} from '../SimpleComponents/SmallPanel';
import {Icon} from '../SimpleComponents/Icons';
import AboutOurLogo from './Company/CompanyAbout/AboutOurLogo';
import {logger} from '../Classes/Logger';
import {xreq} from '../api';

var md = new Remarkable({
    html      : true,        // Enable HTML tags in source
    xhtmlOut  : true,        // Use '/' to close single tags (<br />)
    breaks    : false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks
    linkify   : true,        // Autoconvert URL-like text to links
    // Enable some language-neutral replacement + quotes beautification
    typographer: true,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’'
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
});

export class AboutOurCompTextForm extends React.Component {
    
    state = {};
    info_content = '';
    is_edit = false;
    
    xrStop=()=>{  // выключаем api
        if (this.xr1) { this.xr1.cancel(); this.xr1 = null; }
    }
    
    componentWillMount=()=>{  // компонент родился
        //logger.log(this, 'mount');
    }
    
    componentWillUnmount=()=>{
        //logger.log(this, 'unmount');
        this.xrStop();
    }
    
    render = ()=> {
        
        //
        // почему то эта хрень (md.render) одноразовая ...
        // todo: пофиксить
        // или прилепить другую
        //
        
        var info_view = <div className="p-list" dangerouslySetInnerHTML={{__html: md.render(this.props.company.info)}}></div>;
        var info_edit = (
            <div>
                <textarea ref="edit" rows={30} cols={80} defaultValue={this.props.company.info} />
                <div>
                    FORMATTING GUIDE hide<br />
                    **bold**<br />
                    _italic_<br />
                    # heading 1<br />
                    ## heading 2<br />
                    ### heading 3<br />
                    --- (divider)<br />
                    \`pre-formatted text\`<br />
                    * list item<br />
                    * list item two<br />
                    1. first list item<br />
                    1. second list item<br />
                    1. third list item<br />
                    [Google](http://www.google.com)<br />
                    ![image title](http://path.to/filename.png)
                </div>
            </div>
        );
        var info_object = this.is_edit ? info_edit : info_view;
        var bt_label = this.is_edit ? "save" : "edit";
        
        return (
            <SmallPanel styles={{smallPanel:{width:"640px"}}}>
                <div className="box-cln-nw panel-md">
                    <AboutOurLogo />
                    <div className="box-row-nw divider">
                        {info_object}
                    </div>
                    <div className="box-row-nw">
                        <p className="p-list">Мы в социальных сетях:</p>
                        <a href=""><Icon iconName="linkedin-icon" className="icon-color marg-lr"/></a>
                        <a href=""><Icon iconName="facebook-box" className="icon-color marg-r"/></a>
                        <a href=""><Icon iconName="twitter-icon" className="icon-color marg-r"/></a>
                        <a href=""><Icon iconName="vk-icon" className="icon-color"/></a>
                    </div>
                    <button onClick={this.triggerHandler}>{bt_label}</button>
                </div>
            </SmallPanel>
        )
        
    }
    
    triggerHandler=()=> {
        logger.log(this, 'triggerHandler');
        if (this.is_edit) {
            console.debug(this.refs.edit.getDOMNode().value);
            this.props.company.info = this.refs.edit.getDOMNode().value;
            this.xr1 = new xreq('comp_update', {info: this.props.company.info}, this.xrCompUpdateHandler);
            // this.refs.edit.getDOMNode().value;
        }
        this.is_edit = !this.is_edit;
        this.forceUpdate();
    }
    
    xrCompUpdateHandler=(xr)=>{
        logger.log(this, 'xrCompUpdateHandler');
        this.xrStop();
    }
    
}