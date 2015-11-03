var React = require('react/addons');
/*
 props:
 dontShow
 className
 dataRecived
 */
class Loading extends React.Component {

    static propTypes = {

        className  : React.PropTypes.string,
        dontShow   : React.PropTypes.bool
    };
    static defaultProps = {
        dataRecived: true
    };

    render() {
        if (this.props.dataRecived) {
            return (
                <div className={this.props.className}>
                    {this.props.children}
                </div>
            )
        } else {

            if (this.props.dontShow) {
                return null
            } else {
                return (
                    <div className="box-row-wr">
                        Loading...
                    </div>
                )
            }
        }
    }
}

export {Loading}