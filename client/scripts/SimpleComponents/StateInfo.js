var React = require('react/addons');

class StateInfo extends React.Component {

    static defaultProps = {
        value: ""
    };

    render() {
        var styles = {
            stateInfoWrap: {
                position: "absolute",
                zIndex  : "1000",
                bottom  : "0"
            },
            stateInfo    : {}
        };
        return (
            <div style={styles.stateInfoWrap}>
                <textarea style={styles.stateInfo} name="area" id="" cols="60" rows="15"
                          value={this.props.value}></textarea>
            </div>
        )
    }
}

export {StateInfo}