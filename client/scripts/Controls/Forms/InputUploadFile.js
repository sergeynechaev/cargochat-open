var React = require('react/addons');

import {Events} from '../../Dispatcher';
import {Api} from '../../api';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';

import {Icon} from '../Icon';
import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {FormGroup} from '../../Controls/Forms/FormGroup';
import {ImageHint} from '../../Controls/ImageHint';


export default class InputUploadFile extends React.Component {

    state = {
        isUploading: false,
        isNewUpload: false,
    }

    componenDidMount =()=> {
        this.selectedFile = null;
        // this.fileToken = null;
        this.fileToken = this.props.value || null;
    }

    componentWillReceiveProps = (nextProps)=>{
		this.fileToken = nextProps.value || null;
	}

    onClickFileSelect = () => {
        this.refs['fileInputRef'].getDOMNode().click();
    }

    onChangeFileSelect = () => {
        this.selectedFile = this.refs.fileInputRef.getDOMNode().isValidated;
        this.setState({isUploading: true});
        this.uploadFile();
    }

    uploadFile =()=> {

        let frmData = new FormData( document.forms.namedItem('fileUploadingForm') );
        let message = {};

        if( frmData ) {
            logger.log( 'Uploыading new file...' );

            this.setState({isUploading: true, isNewUpload: false});
            Api.temp_file_create( frmData ).then( res=> {
                if( res.err ) {
                    logger.log( 'error', 'Error while uploading new file', res.msg );
                    message = { message: res.msg, type: "error" };
                } else {
                    message = { message: "Файл успешно загружен", type: "info" };
                    this.onUploadSuccess(res);
                }
                Events.run(Events.EV_SHOW_NOTIFY, message);
            })
        } else {
            message = { message: "Ошибка загрузке файла: invalid data", type: "error" };
            Events.run(Events.EV_SHOW_NOTIFY, message);
        }
    }

    onUploadSuccess =(res)=> {
        logger.log('file uploaded', res);
        this.fileToken = res.token;
        this.setState({isUploading: false, isNewUpload: false});
        this.props.onUpload ? this.props.onUpload(this.props.filename, res.token) : null;

        logger.log('onUploadSuccess IUF f=' + this.fileToken);
    }

    resetUpload =()=> {
        this.selectedFile = null;
        this.fileToken = null;
        this.setState({isUploading: false, isNewUpload: true});

        logger.log('resetUpload IUF f=' + this.fileToken);
    }

    render() {

        // if( this.props.value && ! this.state.isNewUpload 
        //                      && ! this.state.isUploading
        //                      && ! this.fileToken) this.fileToken = this.props.value;

        if( this.state.isUploading ) return <div className="input-upload__uploading">Загрузка файла...</div>

        if( this.fileToken ) {
            // let img = `http://cargo.chat/file/${this.fileToken}`;
            return ( 
                <div className="input-upload">
                    <ImageHint src={'http://cargo.chat/file/' + this.fileToken} />
                    <div className="input-upload__select-another">
                    	<div>Файл загружен.</div>
                    	<ButtonSimple brand="warning" size="small" onClick={this.resetUpload} caption="Удалить"/>
                    </div>
                </div>
            )
        }

        return (
            <div className="input-upload">
                <div style={{display:'none'}}>
                    <form id='fileUploadingForm' enctype='multipart/form-data' method='post'>
                        <input type='file' ref='fileInputRef' name='tempFile' onChange={this.onChangeFileSelect}/>
                    </form>
                </div>
                <ButtonSimple brand="success" size="small" onClick={this.onClickFileSelect} caption="Выбрать файл"/>
            </div>
        )
    }
}

// <button ref="button" className="button-span button button-submit" onClick={this.onClickFileSelect}>
//                         <span>{this.props.caption}</span>
//                     </button>

// <span className="Transport__Temp_InputUploadFile_Select" onClick={this.resetUpload}>[выбрать другой]</span>

// <ImageHint src={img}>
//                             <div className="pagin-prs" onClick={this.editVehicle}>
//                                 <Icon iconName="view-icon" size={20}/>
//                             </div>
//                         </ImageHint>