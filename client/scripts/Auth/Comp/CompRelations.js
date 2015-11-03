var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;


import {logger} from '../../Classes/Logger';

import {NavTabs} from '../../Controls/NavTabs';

export class CompRelations extends React.Component {
    
    /*
    state = {};
    
    componentWillMount=()=> {
        logger.log(this, 'mount');
    }
    
    componentWillUnmount=()=>{
        logger.log(this, 'unmount');
    }
    */
    
    render=()=>{
        //logger.log(this, 'render');
        
        let cfg = {
            carriers:  {title: 'Перевозчики',         relation: 'carriers',  first: true},
            shippers:  {title: 'Заказчики перевозок', relation: 'shippers',  last: true}
        };
        
        let comp_id = this.props.query['id'];
        let h = window.location.hash;
        let m = h.match(/dashboard\/comp\/relations(?:\/([^\/\?]{0,})){0,1}/i);
        //console.debug(window.location.hash, m);
        
        // if (!m) return (<div>invalid path</div>);
        // let focus = m.length == 2 ? m[1] : null;
        //console.debug(focus);
        
        // let menu_list = [];
        // for (var k in cfg) {
        //     let o = cfg[k];
        //     let href = '#/dashboard/comp/relations/' + k + '?id=' + comp_id;
        //     let acl = (k === focus) ? 'sm-header-a active-item' : 'sm-header-a';
        //     let wcl = o.first ? 'table-pr sm-header-bord' : o.last ? 'table-pl' : 'table-pr table-pl sm-header-bord';
        //     menu_list.push(
        //         <div key={k} className={wcl}>
        //             <a href={href} className={acl}>
        //                 <div className='box-row-nw'>
        //                     <span className='font600 font-sec marg-tags'>{o.title}</span>
        //                 </div>
        //             </a>
        //         </div>
        //     );
        // }
        
        // let dir = cfg[focus];
        // let rou = dir ? <RouteHandler relation={dir.relation} comp_id={comp_id} /> : null;


        let tabs = [{ name: "Перевозчики" },
                    { name: "Экспедиторы", href: "/expeditors", hash: "expeditors"},
                    { name: "Грузовладельцы", href: "/shippers", hash: "shippers"}];

        let relation = location.hash.split('/')[5] ? location.hash.split('/')[5] : "carriers";

        return (
            <div>
                <div className="panel__nav-tabs">
                    <NavTabs baseHref={`#/dashboard/comp/${this.props.params.id}/relations`} data={tabs} nHash={5} className="nav-tabs nav-tabs--lower"/>
                </div>
                <RouteHandler relation={relation} comp_id={this.props.company.id}/>
            </div>
        )
        
    }
    
}