var React = require('react/addons');

var RadioInput = React.createClass({
    propTypes: {
        labelWidth: React.PropTypes.number,
        choice:React.PropTypes.array,
        selected:React.PropTypes.any,
        inputName:React.PropTypes.string
    },

    getDefaultProps(){
        return {
            labelWidth: 114
        }
    },


    change(e){
        var value = {};
        var r = this.props.returnValue;
        value[this.props.inputName] = e.target.dataset.name;
        if (r) r(value);
    },
    render (){
        var Choice = this.props.choice;
        var els = Choice.map((el, id)=> {
            return (
                <div key={id} className="radio">
                    <p className="radioP">
                        <input
                            id={this.props.inputName +id}
                            type="radio"
                            name={this.props.inputName}
                            data-name={el.value} onChange={this.change}
                            defaultChecked={(this.props.selected === el.value)?"checked":null}
                            />
                        <label className="marg-left marg-right text-form" htmlFor={this.props.inputName +id}>
                            <span className="radioButtonGraph"></span>
                            {el.text}
                        </label>
                    </p>
                </div>
            )
        });
        var option = (this.props.disabled) ? <p className="font13 table-text">{this.props.selected}</p> : {els};
        var labelStyle = {
            flex: "0 0 " + this.props.labelWidth + "px"
        };
        return (
            <div className="box-row-nw align-center div-const">
                <label style={labelStyle} className="label">
                    <p className="table-prb font600">{this.props.caption}</p>
                </label>
                {option}
            </div>
        )
    }
});

export {RadioInput}