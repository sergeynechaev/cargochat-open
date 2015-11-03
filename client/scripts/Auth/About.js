// import {Events} from '../Dispatcher';
// import {Map2} from './Map2';
// import {SmallPanel} from '../SimpleComponents/SmallPanel';
// import {FlexBox} from '../SimpleComponents/FlexBox';
// import {xreq} from '../api';
// import {Icon} from '../SimpleComponents/Icons';
// import {AboutOurCompTextForm} from './AboutOurCompTextForm';
// import {TransparentButton} from '../SimpleComponents/TransparentButton';
// import {ModalWindow} from '../SimpleComponents/ModalWindow';
// import {InputSimple} from '../SimpleComponents/InputSimple';
// import {MainInfo} from './MainInfo';
// import {Utils} from '../utils';
// import {logger} from '../Classes/Logger';

// export class About extends React.Component {
    
//     render=()=>{
        
//         let comp = this.props.company,
//             address = comp.addr,
//             name = comp.name,
//             width = "400px"; // ширина блока с картой
        
//         return (
//             <FlexBox direction="row" alignItems="start">

//                 <SmallPanel styles={{smallPanel:{width:width, marginRight:"10px"}}}>
//                     <MainInfo company={this.props.company}/>
//                     <Map2 ref='yandexMap' className="border" style={{width:width, height:'200px'}} baloon={{address:address, name:name}} />
//                     <MyCompanyFooter company={this.props.company}/>
//                 </SmallPanel>
//                 <AboutOurCompTextForm company={this.props.company}/>
//             </FlexBox>
//         )
        
//     }
    
// }

// class MyCompanyFooter extends React.Component {
    
//     state = {
//         isModalEditProfileOpen: false
//     }
    
//     edit=()=>{
//         this.setState({isModalEditProfileOpen: true})
//     }
    
//     closeModal=()=>{
//         this.setState({isModalEditProfileOpen: false});
//     }
    
//     render=()=> {
//         return (
//             <div className="box-row-nw just-end table-pr table-footer">
//                 <TransparentButton caption="Редактировать" onClick={this.edit} />
//                 <FlexBox direction="column">
//                     <ModalWindow isOpen={this.state.isModalEditProfileOpen} onClose={this.closeModal}>
//                         <EditCompanyModal company={this.props.company} onClose={this.closeModal} />
//                     </ModalWindow>
//                 </FlexBox>
//             </div>
//         )
//     }
// }

// class EditCompanyModal extends React.Component {

//     static propTypes = {
//         company: React.PropTypes.object.isRequired
//     }
    
//     state = {};
//     comp = null;
//     xr1 = null;
//     input = {};
    
//     xrStop=()=>{  // выключаем api
//         if (this.xr1) { this.xr1.cancel(); this.xr1 = null; }
//     }
    
//     componentWillMount=()=>{  // компонент родился
//         //logger.log(this, 'mount');
//         this.comp = this.props.company;
//     }
    
//     componentWillUnmount=()=>{
//         //logger.log(this, 'unmount');
//         this.xrStop();
//     }
    
//     render=()=> {
//         //logger.log(this, 'render');
//         return (
//             <div>
//                 <div className="panel-md">
//                     <h3 className="list-h3 divider">Редактирование информации</h3>
//                     <table className="text-form">
//                         <tr>
//                             <td><p className="padd-icon-mod"><Icon iconName="clock-icon" className="icon-color"/></p></td>
//                             <td className="tbl-width"><InputSimple active={true} defaultValue={this.comp.work_hours} name="work_hours" onChange={this.inputHandler} /></td>
//                         </tr><tr>
//                             <td><p className="padd-icon-mod"><Icon iconName="phone-icon" size={18} className="icon-color"/></p></td>
//                             <td><InputSimple name="phone" defaultValue={this.comp.phone} onChange={this.inputHandler} /></td>
//                         </tr><tr>
//                             <td><p className="padd-icon-mod"><Icon iconName="web-icon" size={18} className="icon-color"/></p></td>
//                             <td><InputSimple name="web_site" defaultValue={this.comp.web_site} onChange={this.inputHandler} /></td>
//                         </tr><tr>
//                             <td><p className="padd-icon-mod"><Icon iconName="mail-icon" className="icon-color"/></p></td>
//                             <td><InputSimple name="email" defaultValue={this.comp.email} onChange={this.inputHandler} /></td>
//                         </tr><tr>
//                             <td><p className="text-card">Код АТИ</p></td>
//                             <td><InputSimple name="ati_code" defaultValue={this.comp.ati_code} onChange={this.inputHandler} /></td>
//                         </tr>
//                     </table>
//                 </div>
//                 <div className="box-row-nw just-end table-footer table-pr">
//                     <TransparentButton caption="Сохранить" onClick={this.saveChanges}/>
//                     <TransparentButton caption="Отменить" onClick={this.closeHandler}/>
//                 </div>
//             </div>
//         )
//     }
    
//     inputHandler=(o)=>{
//         for (let k in o) this.input[k] = o[k];
//     }
    
//     saveChanges=()=> {
//         console.log("save");
//         // todo: проверить данные в this.input на валидность
//         this.xr1 = new xreq('comp_update', this.input, this.xrCompUpdateHandler);  // загружаем данные инвайта
//     }
    
//     xrCompUpdateHandler=(xr)=>{
//         //logger.log(this, 'xrCompUpdateHandler');
//         this.xrStop();
//         if (xr.res.err) return;
//         Events.runInfo('данные сохранены');
//         Events.run(Events.EV_PROFILE_UPDATE);
//         this.closeHandler();
//     }
    
//     closeHandler=()=> {
//         Utils.run(this.props.onClose);
//     }
    
// }