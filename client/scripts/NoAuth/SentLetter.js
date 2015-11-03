var React = require('react/addons');


var SentLetter = React.createClass({
    render(){
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-sm-offset-3 col-xs-12 col-md-offset-4 panel panel-default">

                        <h3>Вам выслано письмо с кодом активации</h3>

                        <a href="#">перейти на страницу логина</a>
                    </div>
                </div>
            </div>

        )
    }
});

export {SentLetter}