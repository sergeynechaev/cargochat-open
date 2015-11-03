var React = require('react/addons');

import {Api} from '../../api';
import {logger} from '../../Classes/Logger';

import {Icon} from '../Icon';
import {ButtonSimple} from './ButtonSimple';

class InputUpload extends React.Component {

    constructor(props){
        super(props);

        this.selectedFile = null;
        this.fileToken = null;
    }

    static propTypes = {
        onUpload:   React.PropTypes.func.isRequired,
        name:       React.PropTypes.string.isRequired,
        value:    React.PropTypes.string
    }

    static defaultProps = {
        value: "Загрузить файл"
    }

    state = {
        isUploading: false
    }

    onClickFileSelect = () => {
        this.refs['fileInputRef'].getDOMNode().click();
    }

    onClickFileReset = ()=>{
        this.selectedFile = null;
        this.fileToken = null;
        this.setState({isUploading: false});
    }

    onChangeFileSelect = (event) => {
        this.selectedFile = event.target.files[0];
        this.setState({isUploading: true});
        this.uploadFile();
    }

    uploadFile =()=> {
        let formData = new FormData(document.forms.namedItem('fileUploadingForm'));

        if(formData){
            Api.temp_file_create( formData ).then( res=> {
                if(res.err){
                    logger.log( 'error', 'Error while uploading new file', res.msg );
                    return;
                }
                
                this.onUploadSuccess(res);
            });
            return;
        } 

        Events.run(Events.EV_SHOW_NOTIFY, {message: "Ошибка при загрузке файла: invalid data", type: "error"});
    }

    onUploadSuccess =(res)=> {
        this.fileToken = res.token;
        this.setState({isUploading: false});

        if(!this.props.onUpload) return;
        this.props.onUpload(this.props.name, res.token);
    }

    render = ()=>{

        let value = this.props.value;

        if(this.state.isUploading){
            value = "Файл загружается ..."
        } else if(this.fileToken && this.selectedFile){
            value = `Файл "${this.selectedFile.name}" загружен`
        }

        return(
            <div className="upload-form-control">
                <input type="text" name={this.props.name} className="form-control upload-form-control__input" value={value}/>
                {this.fileToken ? <button type="button" onClick={this.onClickFileReset} className="upload-form-control__btn-reset"><Icon name="delete" fill="#fff" size={18}/></button> : <button type="button" onClick={this.onClickFileSelect} className="upload-form-control__btn-upload"><Icon name="file-upload" fill="#fff" size={18}/></button>}
                
                <div style={{display:'none'}}>
                    <form id="fileUploadingForm" enctype='multipart/form-data' method='post'>
                        <input type="file" ref="fileInputRef" name="tempFile" onChange={this.onChangeFileSelect}/>
                    </form>
                </div>
            </div>
        )
    }

}







// var React = require('react/addons');

// import {ButtonSimple} from './ButtonSimple';
// import {Icon} from '../Icon';
// import {logger} from '../../Classes/Logger';

// import {Api} from '../../api';

// class InputUpload extends React.Component {

//     constructor(props){
//         super(props);

//         this.selectedFile = null;
//         this.fileToken = null;
//     }

//     static propTypes = {
//         onUpload:   React.PropTypes.func.isRequired,
//         name:       React.PropTypes.string.isRequired,
//         caption:    React.PropTypes.string
//     }

//     static defaultProps = {
//         caption: "Загрузить файл"
//     }

//     state = {
//         isUploading: false
//     }

//     onClickFileSelect = () => {
//         this.refs['fileInputRef'].getDOMNode().click();
//     }

//     onClickFileReset = ()=>{
//         this.selectedFile = null;
//         this.fileToken = null;
//         this.setState({isUploading: false});
//     }

//    onChangeFileSelect = (event) => {
//         this.selectedFile = event.target.files[0];
//         this.setState({isUploading: true});
//         this.uploadFile();
//     }

//     uploadFile =()=> {

//         let frmData = new FormData( document.forms.namedItem('fileUploadingForm') );
//         let message = {};

//         if( frmData ) {
//             logger.log( 'Uploading new file...' );

//             this.setState({isUploading: true, isNewUpload: false});
//             Api.temp_file_create( frmData ).then( res=> {
//                 if( res.err ) {
//                     logger.log( 'error', 'Error while uploading new file', res.msg );
//                     message = { message: res.msg, type: "error" };
//                 } else {
//                     message = { message: "Файл успешно загружен", type: "info" };
//                     this.onUploadSuccess(res);
//                     console.log('[RES]',res);
//                 }
//                 Events.run(Events.EV_SHOW_NOTIFY, message);
//             })
//         } else {
//             message = { message: "Ошибка загрузке файла: invalid data", type: "error" };
//             Events.run(Events.EV_SHOW_NOTIFY, message);
//         }
//     }

//     onUploadSuccess =(res)=> {
//         logger.log('file uploaded', res);
//         this.fileToken = res.token;
//         this.setState({isUploading: false, isNewUpload: false});
//         this.props.onUpload ? this.props.onUpload(this.props.filename, res.token) : null;

//         console.log('[fileToken]', this.fileToken);
//     }

//     render = ()=> {
//         let value;

//         return (
//             <div className="upload-form-control">
//                 <input type="text" className="form-control upload-form-control__input" value={this.state.isUploading ? "Файл загружается ..." : this.fileToken ? `Файл "${this.selectedFile.name}" загружен` : this.props.caption} readOnly/>
                
//                 {this.fileToken ? <button type="button" onClick={this.onClickFileReset} className="upload-form-control__btn-reset"><Icon name="close" fill="#fff" size={18}/></button> : <button type="button" onClick={this.onClickFileSelect} className="upload-form-control__btn-upload"><Icon name="file-upload" fill="#fff" size={18}/></button>}

//                 <div style={{display:'none'}}>
//                     <form id='fileUploadingForm' enctype='multipart/form-data' method='post'>
//                         <input type='file' ref='fileInputRef' name='tempFile' onChange={this.onChangeFileSelect}/>
//                     </form>
//                 </div>
//             </div>
//         )
//     }


// }

export {InputUpload}