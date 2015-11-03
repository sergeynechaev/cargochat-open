var React = require('react/addons');

import {AppState} from '../../../Auth/Dashboard';
import {Events} from '../../../Dispatcher';
import {Api} from '../../../api';

import {Icon} from '../../../SimpleComponents/Icons';
import {FlexBox} from '../../../SimpleComponents/FlexBox';
import {ModalWindow} from '../../../SimpleComponents/ModalWindow';
import {TransparentButton} from '../../../SimpleComponents/TransparentButton';
import {InputSimple} from '../../../SimpleComponents/InputSimple';

import {ButtonSimple} from '../../../Controls/Forms/ButtonSimple';


export default class CompanyLogotype extends React.Component {

	constructor( props ) {
        super( props );
    }
	
    state = {
        logo: AppState.myCompany.state.logo,
        selectedFile: null
    }

    saveForm = ()=> {
        this.closeModal();
    }

    openInputUpload = ()=>{
        this.refs['input-upload-ref'].getDOMNode().click();
    }
    
    cancelLogoComp = ()=>{
        this.setState({selectedFile: ''});
    }

    loadLogoComp = (image)=>{
        if(!image) return;
        let message = {};

        if(image.type == 'image/gif' || image.type == 'image/png' || image.type == 'image/jpeg'){
            if(image.size <= 1024){
                if(image.width <= 100 && image.height <= 100){        
                    let form = new FormData(document.forms.namedItem('uploadLogoComp'));
                    Api.req_by_post('comp_logo_upsert', {}, form, true).then(res=> {
                        if(res){
                            if(res.err){
                                logger.log( 'error', 'Error while upload logotype company', res.msg );
                                message = { message: res.msg, type: "error" };
                                return;
                            }

                            message = { message: "Логотип загружен.", type: "info" };
                            AppState.myCompany.state.logo = res.logo;
                            this.props.update();
                            this.setState({ logo: res.logo, selectedFile: '' });
                        }
                    });
                } else {
                    message = { message: "Недопустимое разрешение файла.", type: "error" };
                }
            } else {
                message = { message: "Размер загружаемого файла: "+image.size+"кб. \n Максимальный размер файла: 1024кб.", type: "error" };
            }
        } else {
            message = { message: "Недопустимое формат файла. \n Допустимые форматы: jpeg, gif, png", type: "error" };
        }

        Events.run(Events.EV_SHOW_NOTIFY, message);
    }

    onHandleFile = (e)=>{
        let file = e.target.files[0],
            image = new Image(),
            reader = new FileReader();

        reader.readAsDataURL(file);  
        reader.onload = (upload)=> {
            image.src = upload.target.result;
            image.onload = (_file)=> {
                this.loadLogoComp({
                    type: file.type,
                    size: (file.size/1000).toFixed(0),
                    width: _file.path[0].width,
                    height: _file.path[0].height
                });
            }
        }        
    }

    deleteLogoComp = ()=>{
        Api.justDoRequest('comp_logo_delete').then(res=> {
            let message = {};
            if(res){
                if(res.err){
                    logger.log( 'error', 'Error while deleting the logotype company', res.msg );
                    message = { message: res.msg, type: "error" };
                    return;
                }

                message = { message: "Логотип удален.", type: "info" };
                AppState.myCompany.state.logo = null;
                this.setState({ logo: null });
                this.props.update();
            }
            Events.run(Events.EV_SHOW_NOTIFY, message);
        });
    }

    render = ()=> {
        return(
            <div className="modal-container__body">
                <FlexBox direction="row" justify="center" className="panel-sm">
                    <div className="company-logo">
                        {this.state.logo ? <div id="company-logo"><img src={`http://cargo.chat/${this.state.logo}`}/></div> : <div id="company-logo-null"></div>}
                    </div>
                    <div style={{display:'none'}}>
                        <form id='uploadLogoComp' encType='multipart/form-data' method='post'>
                            <input name='compLogoImage' type="file" ref="input-upload-ref" onChange={this.onHandleFile}/>
                        </form>
                    </div>
                </FlexBox>
                <div className="modal-container__info well well-small">
                    <div>Допустимые форматы: jpeg, gif, png</div>
                    <div>Максимальное разрешение: 100x100</div>
                    <div>Максимальный размер: 1мб</div>
                </div>
                <div className="modal-container__footer">
                    <ButtonSimple onClick={this.openInputUpload} caption="Выбрать" brand="success" disabled={this.state.logo}/>
                    <ButtonSimple onClick={this.deleteLogoComp} caption="Удалить" brand="danger" disabled={!this.state.logo}/>
                </div>
            </div>
        )
    }
}