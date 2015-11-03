var React = require('react/addons');

export default class Hint extends React.Component{
    state={
        isNote:false,
        text:''
    };
    mouseLeave=(e)=>{
        this.setState(
            {
                isNote:false,
                text:""
            });
        //console.log("mouseLeave");
    };
    mouseIn=(e)=>{
        //console.log("mouseIN");
        var text= this.props.text;
        //console.log(name);
        this.setState(
            {
                isNote:true,
                text:text
            });
    };

    render=()=>{
        var text = (this.state.isNote)?<div className="note-text">{this.state.text}</div>:null;

        return(
            <div className="note" onMouseEnter={this.mouseIn} onMouseLeave={this.mouseLeave}>
                {text}
                {this.props.children}
            </div>
        )
    }
}