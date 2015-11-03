//
//
// заменено на общий Message
// пусть пока полежит
// 
// 

var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {Utils} from '../../utils';

import {FlexBox} from '../../SimpleComponents/FlexBox';
import {Emoji} from '../../Controls/Emoji';
import {Icon} from '../../SimpleComponents/Icons';

export default class ChannelMessage extends React.Component {

    constructor() {
        super();

        // активный элемент - канал или чат
        this.activeContext = null;

        this.msg = null;
        this.bodyOrig = '';
        this.bodyParsed = '';
    }

    static propTypes = {
        data: React.PropTypes.object.isRequired
    }

    static defaultProps = {
        data: {}
    }

    _setContext( context ) {
        this.activeContext = context;
    }

    componentWillMount =()=> {

        this._setContext( this.props.context );
        this.msg = this.activeContext.getMsg(this.props.data.id);

        // получаем контроллер сообщения
        // this.msg = AppState.myChannels.activeChannel().getMsg(this.props.data.id);

        // здесь храним оригинальный body для редактирования
        this.bodyOrig = this.props.data.body;

        // парсим сообщение на предмет эмотиконов и ссылок
        this.bodyParsed = this.parseBody( this.props.data.body );
    }

    componentWillReceiveProps =(props)=> {
        this.bodyParsed = this.parseBody( props.data.body );
    }

    state={
        isShowActions: false,
        isEdit: false,
        isDelete: false,
    }

    // позволяем удалять и редактировать только если сообщение не старше 10 минут
    isMsgControllable =()=> {
        let currentTs = parseInt( Date.now() / 1000 );
        return (currentTs - this.props.data.ts > 600) ? false : true;
    }

    msgOnMouseLeave =(e)=> {
        if( this.isMsgControllable()
            && AppState.user.state.id == this.props.data.author.id ) {
                this.setState({isShowActions: false});
        }
    }

    msgOnMouseEnter =(e)=> {
        if( this.isMsgControllable()
            && AppState.user.state.id == this.props.data.author.id ) {
                this.setState({isShowActions: true});
        }
    }

    msgOnEditMessage =(e)=> {

        // отслеживаем нажатие enter и escape
        switch( e.key ) {
            case "Enter":
                if (e.preventDefault) e.preventDefault();
                this.correctMessage( e.target.value );
                this.setState({isEdit: false});
                break;
            break;
            case "Escape":
                this.setState({isEdit: false});
            break;
        }
        return;
    }

    msgOnCancelEditMessage =()=> {
        this.setState({isEdit: false});
    }

    msgOnCancelDeleteMessage =()=> {
        this.setState({isDelete: false});
    }

    editMessage =()=> {
        this.setState({isEdit: !this.state.isEdit, isDelete: false});
    }

    deleteMessage =()=> {
        this.setState({isDelete: !this.state.isDelete, isEdit: false});
    }

    correctMessage =(body)=> {
        // parse html data - drop any tags
        let msg = Utils.clearHtmlTags( body );

        this.msg.correctMessage( msg );
        this.bodyOrig = body;
    }

    eraseMessage =()=> {
        this.msg.eraseMessage();
    }

    parseBody =( body )=> {

        // с удаленным сообщением ничего не делаем
        if( this.props.data.isDeleted ) return body;

        let bodyParsedArr = [];
        
        /**
         * Сначала делим текст на массив по смайлам
         * Массив нужен для хранение реакт компонента эмотикона
         * Потом проверяем на наличие ссылок и подставляем теги
         */
        let reEmo = /(::)(\w+)(::)/g;
        let reEmoSplit = /(::\w+::)/g;
        let reHref = /https?:\/\/[._\w\d\-\/&%\?;А-Яа-я]+/gi;
        // let reHrefSplit = /(.+)(https?:\/\/[._\w\d\-\/&%\?;А-Яа-я]+)(.+)/gi;
        

        // заменяем переводы строк на br
        body = body.replace(/\n/g, '<br/>');

        let txtArrSplit = [];
        txtArrSplit = body.split( reEmoSplit );

        txtArrSplit.forEach( txt => {

            // подключаем эмотикон
            if( reEmoSplit.test(txt) ) {
                // убираем ::
                let emo = txt.replace(reEmo, '$2');
                let emoObj = <Emoji name={emo} size={20} />;

                // парсим реакт компонент в строку не отходя от кассы
                if( emoObj ) {
                    bodyParsedArr.push( React.renderToStaticMarkup( emoObj ) );

                // если не нашли эмотикона, возвращаем текст как есть
                } else {
                    bodyParsedArr.push( txt );
                }

            // проверяем на наличие ссылок
            } else if( reHref.test(txt) ) {
                let txtHref = txt.replace(/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/ig, '$1$2<a target="_blank" href=\"$3\" >$3</a>');
                txtHref = txtHref.replace(/(^|[\n ])([\w]*?)((www|ftp)\.[^ \,\"\t\n\r<]*)/ig, '$1$2<a target="_blank" href=\"http://$3\" >$3</a>');

                //let txtHref = txt.replace(reHrefSplit, this._setHref);
                bodyParsedArr.push( txtHref );

            //  простой текст
            } else {
                bodyParsedArr.push( txt );
            }
        });

        return bodyParsedArr.join("");

        //  txtArrSplit.forEach( txt => {

        //     // подключаем эмотикон
        //     if( reEmoSplit.test(txt) ) {
        //         // убираем ::
        //         let emo = txt.replace(reEmo, '$2');
        //         // let emoObj = <Emoji name={emo} size={20} />;
        //         // let emoObjStr = React.renderToStaticMarkup( emoObj);
        //         logger.log('render to stat', emo);
        //         this.bodyParsed2.push( React.renderToStaticMarkup(<Emoji name={emo} size={20}/>) );
        //     } 

        // })

        // logger.log('parsed body', this.bodyParsed2);

    }

    _setHref =(match, p1, href, p2)=> {
        let str = '';
        str += p1;
        str += '<a target="_blank" href="' + href + '">' + href + '</a>';
        str += p2;
        return str;
    }

    render = ()=>{

        let messageClass = "channel-message ";
        if(AppState.user.state.id == this.props.data.author.id){
            messageClass += "channel-message--my";
        }

        let actions = null;
        if( this.state.isShowActions || this.state.isEdit || this.state.isDelete ) {
            actions = <FlexBox direction="row">
                        <div className="pagin-prs" onClick={this.deleteMessage}>
                            <Icon iconName="delete-icon" size={16}/>
                        </div>
                        <div className="pagin-prs" onClick={this.editMessage}>
                            <Icon iconName="edit-icon" size={16}/>
                        </div>
                      </FlexBox>
        }


        // let memb =  AppState.myChannels.activeChannel().getMember(this.props.data.author.id);
        // logger.log('message2 memb', this,  this.props.data.author.id, memb);



        // удаленное сообщение
        if( this.props.data.isDeleted ) {
            return (
                <div className="channel-history__message" id={"message--"+this.props.data.id}>
                    <div className={messageClass}>
                        <div className="channel-message__info">
                            {this.props.data.body}
                            <a>{this.props.data.author.first_name+' '+this.props.data.author.last_name}</a>
                            <span>{Utils.timeZf(this.props.data.ts)}</span>
                        </div>
                    </div>
                </div>
            )

        // нормальный месседж
        } else {
            return (
                <div className="channel-history__message" 
                     id={"message--"+this.props.data.id} 
                     onMouseEnter={this.msgOnMouseEnter} 
                     onMouseLeave={this.msgOnMouseLeave}>
                    <div className={messageClass}>
                        <div className="channel-message__info">
                            <a>{this.props.data.author.first_name+' '+this.props.data.author.last_name}</a>
                            <span>{Utils.timeZf(this.props.data.ts)}</span>
                            {actions}
                        </div>
                        {this.state.isDelete ? <FlexBox direction="row" className="channel-message__actions_delete">
                                                <div className="channel-message__actions_delete-yes" onClick={this.eraseMessage}>[Да]</div>
                                                <div className="channel-message__actions_delete-no" onClick={this.msgOnCancelDeleteMessage}>[Нет]</div>
                                                <div className="channel-message__actions_delete-confirm">Удалить сообщение?</div>
                                               </FlexBox>
                                            : null}
                        {this.state.isEdit ? <ContentEditable html={this.bodyOrig} onEnter={this.msgOnEditMessage} onEscape={this.msgOnCancelEditMessage} />
                                           : <div className="channel-message__body" dangerouslySetInnerHTML={{__html: this.bodyParsed }}></div> }
                    </div>
                </div>
            ) 
        }
    }
};

 // {this.state.isEdit ? <ContentEditable html={this.bodyOrig} onEnter={this.msgOnEditMessage} onEscape={this.msgOnCancelEditMessage} />
 //                                       : <div className="channel-message__body" dangerouslySetInnerHTML={{__html: this.bodyParsed }} />


export class ContentEditable extends React.Component {

    // shouldComponentUpdate =(nextProps)=> {
    //     return nextProps.html !== this.refs.msgEditRef.getDOMNode().innerHTML;
    // }

    // onChange =()=> {
    //     var html = this.refs.msgEditRef.getDOMNode().innerHTML;
    //     if (this.props.onChange && html !== this.lastHtml) {
    //         this.props.onChange({
    //             target: {
    //                 value: html
    //             },
    //             key: this.key
    //         });
    //     }
    //     this.lastHtml = html;
    // }

    componentDidMount =()=> {
          this.refs.msgEditRef.getDOMNode().focus();
    }

    onKeyDown =(e)=> {
        var html = this.refs.msgEditRef.getDOMNode().innerHTML;

        switch( e.key ) {

            // перехватываем нажатие на Enter для сохранения результата
            case "Enter":
                if( e.preventDefault ) e.preventDefault();
                // имитируем event для передачи взад
                if( this.props.onEnter ) {
                    this.props.onEnter({
                        target: {
                            value: html
                        },
                        key: e.key
                    });
                }
            break;

            case "Escape":
                if( this.props.onEscape ) this.props.onEscape();
            break;
        }
        
    }

    render =()=> {
        return (
            <div className="channel-message__actions_edit">
                <div className="channel-message__actions_edit-caption">Enter - сохранить, Escape - отменить</div>
                <div className="channel-message__actions_edit-area" onKeyDown={this.onKeyDown} contentEditable ref='msgEditRef' dangerouslySetInnerHTML={{__html: this.props.html}} />
            </div>
        );
    }

}

//<textarea onKeyDown={this.onKeyDown} ref='msgEditRef' value={this.props.html} />

export {ContentEditable}









// handleChange =(event)=> {
//     this.setState({html: event.target.value});
// }
// return (<ContentEditable html={this.state.html} onChange={handleChange} />);

 // render =()=> {
 //        return <div 
 //            onInput={this.onChange} 
 //            onBlur={this.onChange}
 //            onKeyDown={this.onKeyDown}
 //            contentEditable
 //            ref='msgEditRef'
 //            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
 //    }
 //    
 //    
 //    move cursor to the end?
//  if (typeof el.selectionStart == "number") {
//     el.selectionStart = el.selectionEnd = el.innerHTML.length;
// } else if (typeof el.createTextRange != "undefined") {
//     el.focus();
//     var range = el.createTextRange();
//     range.collapse(false);
//     range.select();
// }
