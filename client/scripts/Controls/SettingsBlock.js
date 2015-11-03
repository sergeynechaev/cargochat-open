var React = require('react/addons');

class SettingsBlock extends React.Component {

    static propTypes = {
        title: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        choice: React.PropTypes.array.isRequired,
        flags: React.PropTypes.number.isRequired,
        change: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired
    }

    check = (flags)=>{ 
        return (this.props.flags & flags) === flags;
    }

    flagsChange = (type, option)=>{
        let flags;

        if(!option.id) return;

        if(type){
            flags = this.props.flags |= option.id;
        } else {
            flags = this.props.flags &= ~option.id;
        }

        if(this.props.change) this.props.change(flags);
    }

    handleChange = (event)=>{
        this.props.choice.forEach(option=>{
            if(event.exclude == 1 && event.id != option.id && option.check){
                this.flagsChange(false, option);
                return;
            }

            if(!event.exclude && option.exclude == 1 && option.check){
                this.flagsChange(false, option);
                return;
            }

            if(event == option){
                this.flagsChange(!event.check, option);    
            }
        });

    }

    render = ()=>{
        var Header, 
            Content, 
            state = false, 
            choiceLength = this.props.choice.length-1;

        if(this.props.type == 'checkbox'){
            Content =   this.props.choice.map((option, i)=>{
                            option.check = this.check(option.id);
                            return(
                                <div className="checkbox-form-control " key={i}>
                                    <label>
                                        <input  type="checkbox" 
                                            name={"SettingsBlock-"+this.props.name} 
                                            className="checkbox"
                                            checked={option.check} 
                                            onChange={this.handleChange.bind(this, option)}/>
                                        {option.value}
                                    </label>
                                </div>
                            )
                        });
        }

        if(this.props.type == 'radio'){
            Content =   <div className="box-row-nw align-center div-const">
                            {this.props.choice.map((option, i)=>{
                                if(option.id){
                                    option.check = this.check(option.id);
                                    if(option.check) state = option.check;
                                } else {
                                    option.check = !state;
                                }


                                return(
                                    <div className="message message-nl" key={i}>
                                        <div className="radio">
                                            <p className="radioP marg-right">
                                                <input 
                                                    id={"SettingsBlock-"+this.props.name+i}
                                                    name={"SettingsBlock-"+this.props.name}
                                                    type="radio" 
                                                    onChange={this.handleChange.bind(this, option)}
                                                    checked={option.check}
                                                    className="marg-right"
                                                />
                                                <label className=" text-form" htmlFor={"SettingsBlock-"+this.props.name+i} >
                                                    <span className="radioButtonGraph"></span>
                                                    {option.value}
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
        }

        if(this.props.title){
            Header =    <div className="divider font600 marg-top marg-bottom">
                            {this.props.title}:
                        </div>;
        }

        return(
            <div className="box-cln-nw panel-md marg-top marg-bottom">
                {Header}
                {Content}
            </div>
        )
    }
}

export {SettingsBlock}