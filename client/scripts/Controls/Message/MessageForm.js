// 
// общий компонент для каналов и чатов
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Icon} from '..//Icon';
import {Emoji} from '../Emoji';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

export default class MessageForm extends React.Component {

    constructor( props ) {
        super( props );
        this.ctrlPressed = false;
    }

    static propTypes = {
        onSend: React.PropTypes.func.isRequired
    }

    state = {
        value: '',
        isShowEmoji: false
    }

    handleChange =(e)=> {
        this.setState({value: e.target.value});
    }

    replacer =(match, p1, p2, p3, offset, string)=> {
      return [p1, p2, encodeURIComponent(p3)].join('');
    }

    sendMessage =(e)=> {

        // parse html data - drop any tags
        let msg = Utils.clearHtmlTags( this.state.value );

        // escape uri
        if( /https?:\/\/[._\w\d\-\/&%\?;А-Яа-я]+/gi.test(msg) ) {
            msg = msg.replace(/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/ig, this.replacer);
            msg = msg.replace(/(^|[\n ])([\w]*?)((www|ftp)\.[^ \,\"\t\n\r<]*)/ig, this.replacer);
        }

        // logger.log('sendMessage', this, msg);

        this.props.onSend( msg );
        this.setState({ value: '' });

        // восстанавливаем область ввода
        let ta = this.refs.taMessage.getDOMNode();
        ta.value = '';
        Utils.elemAutoSize( ta, 120 );
    }

    // отлавливаем нажатие enter и отсылаем сообщение
    onKeyUp =(e)=> {
       
        // авторесайз области ввода
        Utils.elemAutoSize( e.target, 120 );

        switch( e.keyCode ) {

            // Enter
            case 13:
                if( !this.ctrlPressed ) {

                    // не даем отсылать пустое сообщение
                    let val = Utils.trim( e.target.value ); 
                    if( val == '' ) {
                        if (e.preventDefault) e.preventDefault();
                        if (e.stopPropagation) e.stopPropagation();
                        return;
                    }
                    
                    this.sendMessage();
                    this.setState({isShowEmoji: false});

                    if (e.preventDefault) e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();

                } else {
                    let ta = this.refs.taMessage.getDOMNode();
                    Utils.setTaText( ta, "\n" );
                    this.setState({value: ta.value});
                }
            break;

            // Shift|Ctrl|Alt
            case 16:
            case 17:
            case 18:
                this.ctrlPressed = false;
            break;
        }
        return;
    };

    // перехватываем enter и запоминаем, нажат ли ctrl
    onKeyDown=(e)=>{

        switch( e.keyCode ) {

            // Enter
            case 13:
                if (e.preventDefault) e.preventDefault();
            break;

            // Shift|Ctrl|Alt
            case 16:
            case 17:
            case 18:
                this.ctrlPressed = true;
            break;
        }
    }

    triggerEmoji =()=> {
        this.setState({isShowEmoji: !this.state.isShowEmoji})
    }

    setEmoji =(name)=> {
        let ta = this.refs.taMessage.getDOMNode();
        Utils.setTaText( ta, " ::" + name + ":: " );
        this.setState({value: ta.value});
        // закрываем эмоджи
        this.setState({isShowEmoji: false})
    }

    // формируем доступные эмотиконы
    buildEmoji =()=> {
        let emoji = [];
        emoji = Emoji.emojiNames.map( (name, i) => {
            return <Emoji key={i} name={name} onClick={this.setEmoji} className="emoji-set" />
        })
        return emoji;
    }

    render = ()=>{

        return (

            <div className="channel__sendarea">
                <div className="channel__sendarea-textarea">
                    <textarea 
                        className="ta-message" 
                        ref="taMessage" 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        onKeyUp={this.onKeyUp} 
                        onKeyDown={this.onKeyDown} 
                        placeholder="Ваше сообщение ..." />
                </div>
                <div className="channel__sendarea-emoji">
                    {this.state.isShowEmoji ? 
                        <div className="channel__sendarea-emoji-open">
                            {this.buildEmoji()}
                        </div> 
                        : null}
                    <div><Icon name="emoji" size={24} onClick={this.triggerEmoji} /></div>
                </div>

            </div>
           
        )
    }
};

// TODO: пока убраны. Восстановить потом !
// <div className="channel__sendarea">
//                 <div className="channel__sendarea-actions">
//                     <Icon iconName="add" size={24} fill="#E0E0E0" />
//                 </div>
//                 <div className="channel__sendarea-textarea">
//                     <textarea 
//                         className="ta-message" 
//                         ref="taMessage" 
//                         value={this.state.value} 
//                         onChange={this.handleChange} 
//                         onKeyUp={this.onKeyUp} 
//                         onKeyDown={this.onKeyDown} 
//                         placeholder="Ваше сообщение ..." />
//                 </div>
//                 <div className="channel__sendarea-emoji">
//                     <Icon iconName="tag-faces" size={24} fill="#E0E0E0" onClick={this.triggerEmoji} />
//                     {this.state.isShowEmoji ? 
//                         <div className="channel-textarea__smiles-open">
//                             <FlexBox>
//                                 {this.buildEmoji()}
//                             </FlexBox>
//                         </div> 
//                         : null}
//                 </div>
//             </div>






// var selected_text = (
//     (window.getSelection && window.getSelection()) ||
//     (document.getSelection && document.getSelection()) ||
//     (document.selection && document.selection.createRange && document.selection.createRange().text)
//     );
//     
//     
// //             // get images
//         var re = /https?:\/\/[._\w\d\-\/&%\?;А-Яа-я]+/gi;
//         var tmpRes = this.props.data.body.match( re ) || [];

//         //logger.log(tmpRes);

//         // get only links ending with picture ext (gif, jpeg, png, bmp)
//         // or links started with '/pic' word - for some picture hostings
//         // for( var i = 0; i < tmpRes.length; i++ ) {
//         //    if( tmpRes[i] != '' && ( tmpRes[i].search(/\.?[jpe?g|png|gif|bmp]$/i) != -1 
//         //                          || tmpRes[i].search(/\/pic\/[\w\d]{8}$/i) != -1 ) ) {

//         // //this.body = '';
//         //     }
//         // }
//         // 
//         // 
//         // 
