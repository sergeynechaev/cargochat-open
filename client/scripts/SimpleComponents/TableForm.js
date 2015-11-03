var React = require('react/addons');


class TableForm extends React.Component {

    static propTypes = {
        disabled: React.PropTypes.bool,
        body    : React.PropTypes.array
    };

    render = ()=> {

        if (this.props.hidden) {
            return null
        }

        var body = this.props.body.map((row, id)=> {
            if (row.type === "divider") {
                return (
                    <tr>
                        <td style={{fontWeight:"bold"}} colSpan="2">{row.name}</td>
                    </tr>
                )
            }
            return (

                <tr key={id}>
                    <td className="table-pl">{row.fieldName}</td>
                    <td className="table-plbig table-pr">{row.value}</td>
                </tr>
            )
        });
        return (
            <table className="table table-nohead">
                <tbody>
                {body}
                </tbody>
            </table>
        )
    }
}

export {TableForm}