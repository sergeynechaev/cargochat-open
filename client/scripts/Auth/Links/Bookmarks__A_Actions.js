var React = require('react/addons');

import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {ModalWindow} from '../../Controls/ModalWindow';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';

import A_Companies__Invite from '../A/Companies/A_Companies__Invite';

export default class Bookmarks__A_Actions extends React.Component {

	constructor(props) {
        super(props);
    }
	
    static defaultProps = {}

    state = {
        isModalOpen: false
    }

    closeModal =()=> {
        this.setState( {isModalOpen: false} );
    }

    openModal =()=> {
        this.setState( {isModalOpen: true} );
    }

    render =()=> {

        return(
            <div className="box-row-nw padd-right">
                <ButtonSimple onClick={this.openModal} brand="success" size="small" caption="Отправить приглашение"/>
	            <ModalWindow isOpen={this.state.isModalOpen} onClose={this.closeModal} width={350} title="Отправить приглашение">
                        <A_Companies__Invite context={this.props.obj} onClose={this.closeModal} />
                </ModalWindow>
            </div>
        )
    }
}

