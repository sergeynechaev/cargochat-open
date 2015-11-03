var React = require('react/addons');
import {SmallPanel} from '../../SimpleComponents/SmallPanel';
var Source = require("../../../icons/logo_bt.gif");
import {Icon} from '../../SimpleComponents/Icons';
var Remarkable = require('remarkable');
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


class AboutTextForm extends React.Component {

    state = {
        text    : `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Sint hic libero perspiciatis quibusdam doloribus, culpa illum.
            Officiis ut illo dolorum veniam architecto non, necessitatibus quo alias,
        blanditiis, debitis fugiat sequi!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Sint hic.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Sint hic libero perspiciatis quibusdam doloribus, culpa illum.
    Officiis ut illo dolorum veniam architecto non, necessitatibus quo alias,
    blanditiis, debitis fugiat sequi! Численность: 100 человек`,
        editMode: false
    };


    editTrigger = ()=> {
        if (this.state.editMode) {
            this.state.text = this.refs.edit.getDOMNode().value;
        }
        this.setState({
            editMode: !this.state.editMode
        })
    };

    render = ()=> {


        var textView = <div className="p-list" dangerouslySetInnerHTML={{__html: md.render(this.state.text)}}>

        </div>;
        var Guide = `FORMATTING GUIDE hide

                    **bold**
                    _italic_

                    # heading 1
                    ## heading 2
                    ### heading 3

                    --- (divider)

                    \`pre-formatted text\`

                    * list item
                    * list item two

                    1. first list item
                    1. second list item
                    1. third list item

                    [Google](http://www.google.com)

                    ![image title](http://path.to/filename.png)`;
        var textEdit = <div>
            <textarea ref="edit" rows={30} cols={80} defaultValue={this.state.text}/>;
            <div>{Guide}</div>
        </div>;
        var select = (this.state.editMode) ? textEdit : textView;
        var btn = (this.state.editMode) ? "save" : "edit";


        return (
            <SmallPanel styles={{smallPanel:{width:"1050px"}}}>
                <div className="box-cln-nw panel-md">
                    <div className="box-cln-nw align-center divider">
                        <img className="logo-size" src={Source} alt=""/>
                    </div>
                    <div className="box-row-nw divider">
                        {select}

                    </div>
                    <div className="box-row-nw">
                        <p className="p-list">
                            Мы в социальных сетях:
                        </p>
                        <a href=""><Icon iconName="linkedin-icon" className="icon-color marg-lr"/></a>
                        <a href=""><Icon iconName="facebook-box" className="icon-color marg-r"/></a>
                        <a href=""><Icon iconName="twitter-icon" className="icon-color marg-r"/></a>
                        <a href=""><Icon iconName="vk-icon" className="icon-color"/></a>
                    </div>
                    <button onClick={this.editTrigger}>{btn}</button>
                </div>
            </SmallPanel>
        )
    }
}
export {AboutTextForm}

// render: function() {
//     return (
//       <div className="MarkdownEditor">
//         <h3>Input</h3>
//         <textarea
//           onChange={this.handleChange}
//           ref="textarea"
//           defaultValue={this.state.value} />
//         <h3>Output</h3>
//         <div
//           className="content"
//           dangerouslySetInnerHTML={{
//             __html: converter.makeHtml(this.state.value)
//           }}
//         />
//       </div>
//     );
//   }
