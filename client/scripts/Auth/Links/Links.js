var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import {FlexBox} from '../../SimpleComponents/FlexBox';
import {AppState} from '../../Auth/Dashboard';
import {logger} from '../../Classes/Logger';
import {NavTabs} from '../../Controls/NavTabs';

class Links extends React.Component {
    
    static propTypes = {
        company: React.PropTypes.object
    }
    
    state = {
        relationsQuantity:AppState.myCompany.relationsQuantity
    }

    updateLinks=(relationsQuantity)=>{
        this.setState({relationsQuantity:relationsQuantity})
    }
    
    componentWillMount = ()=> {
        AppState.myCompany.on("updateLinksQuantity", this.updateLinks);
    }
    
    componentWillUnmount= () =>{
        AppState.myCompany.rem("updateLinksQuantity", this.updateLinks);
    }
    
    render = ()=> {
        let q = this.state.relationsQuantity,
            tabs = [{ name: "Поиск" },
                    { name: "Перевозчики", href: "/carriers", hash: "carriers", count: q.carriers },
                    { name: "Экспедиторы", href: "/expeditors", hash: "expeditors", count: q.expeditors },
                    { name: "Грузовладельцы", href: "/shippers", hash: "shippers", count: q.shippers },
                    { name: "Закладки", href: "/bookmarks", hash: "bookmarks", count: q.social },
                    { name: "Черный Список", href: "/blackmarks", hash: "blackmarks", count: q.blacklist }];


            
        return (
            <div className="panel">
                <div className="panel__header">
                    <h1 className="panel__title">Партнеры</h1>
                </div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref="#/dashboard/links" data={tabs}/>
                </div>
                <div className="panel__body">
                    <RouteHandler/>
                </div>
            </div>
        )
    }
}

export {Links}