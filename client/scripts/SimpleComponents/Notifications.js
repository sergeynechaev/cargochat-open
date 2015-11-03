//
//
// Deprecated
// 
// use Controls/Notifications
// 


var React = require('react/addons');
// import {newMsgSound} from '../../sounds/new_private_msg.mp3';
// import {newMsgSound} from 'http://www.suarezgolborne.se/wp-content/slang.mp3';

// http://mptron.com/agava/sms/03122007/ICQ.mp3
// http://www.freesound.org/data/previews/234/234524_4019029-lq.mp3

class NewPrivateMsg extends React.Component{

    soundClick=()=> {
        var audio = new Audio('http://mptron.com/agava/sms/03122007/ICQ.mp3'); // Создаём новый элемент Audio
        // audio.src = newMsgSound; // Указываем путь к звуку "клика"
        audio.play(); // Автоматически запускаем
    };
    componentDidMount=()=>{
        console.log("sound");
        if (this.props.msg.received > 0) {
            this.soundClick();
        }

    };

    closeWindow=()=>{
        var c=this.props.close;
        if (c) c();
    };

    render=()=>{

        var msg= this.props.msg;
        return(
            <div>
                <span>Новое сообщение</span>
                <p>от {msg.first_name} {msg.last_name}</p>
                <h3>{msg.body}</h3>
                <button onClick={this.closeWindow}>Закрыть</button>
            </div>
        )
    }
}

class NewError extends React.Component{
    closeWindow=()=>{
        var c=this.props.close;
        if (c) c();
    };

    render=()=>{

        var error= this.props.error;
        return(
            <div className="notify-error-window" onClick={this.closeWindow}>
                <span>Ошибка</span>
                <p>{error.message}</p>
            </div>
        )
    }
}

class NewInfo extends React.Component{
    closeWindow=()=>{
        var c=this.props.close;
        if (c) c();
    };

    render=()=>{

        var info= this.props.info;
        return(
            <div className="notify-info-window" onClick={this.closeWindow}>
                <span>Успешно</span>
                <p>{info.message}</p>
            </div>
        )
    }
}


var Notifications = React.createClass({

    getInitialState(){
        return {
            message: this.props.message,
            type   : this.props.type
        }
    },
    componentWillMount(){
        //console.log(this.props.obj);
        //var msg=this.props.obj.msg;
        //
        //switch (msg.type){
        //    case "msg_private_new":
        //        this.setState({message:msg, type:msg.type});
        //        break;
        //}

    },
    componentDidMount () {
        // по тайм-ауту закрываем только инфо и ошибки
        if(this.props.obj.msg.type != "msg_private_new") this.iv = setTimeout(this.closeHr, 3000);
    },

    closeHr () {
        if (this.iv) {
            clearTimeout(this.iv);
            this.iv = null;
        }
        this.props.close(this.props.obj.id)
    },
    selector(msg){
        switch (msg.type){
            case "msg_private_new":
                return  <NewPrivateMsg msg={msg} close={this.closeHr}/>;
            case "error":
                return <NewError error={msg} close={this.closeHr}/>
            case "info":
                return <NewInfo info={msg} close={this.closeHr}/>
        }
    },
    render(){

        var msg=this.props.obj.msg;
        console.log("note");
        console.log(msg);
        //var sel=this.selector(msg);

        return (
            <div className="panel panel-default notify">
                {this.selector(msg)}
            </div>
        )
    }
});

export {Notifications}