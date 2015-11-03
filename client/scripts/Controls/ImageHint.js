var React = require('react/addons');

import {Icon} from './Icon';

class ImageHint extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        src: React.PropTypes.string.isRequired
    }
    
    state = {
        isNote: false
    }

    mouseLeave = ()=> { this.setState({isNote: false}); }
    mouseEnter = ()=> { this.setState({isNote: true}); }

    render=()=>{
        let image = this.state.isNote ? <div className="image-hint__box"><img src={this.props.src}/></div> : null;
        return(
            <div className="image-hint" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                {image}
                <Icon name="image"/>
            </div>
        )
    }
}

export {ImageHint}