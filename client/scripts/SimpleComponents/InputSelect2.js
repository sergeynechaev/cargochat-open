import {Icon} from '../SimpleComponents/Icons';
import {Events} from '../Dispatcher';


var React = require('react/addons');


class Tag extends React.Component {
    static propTypes:{
        item:React.PropTypes.object,
        onMouseDown:React.PropTypes.func,
        onClick:React.PropTypes.func
        };

    ignoreNextMouseUp(b) {
        this.props.onMouseDown(b)
    }

;
    removeItem(b) {
        this.props.onClick(b)
    }

;

    render() {
        console.log('[Tag] render');
        console.debug(this.props);
        return (
            <div className="multi-bord">
                <div className="box-row-nw align-center multi-item">
                    <p className="marg-tags">{this.props.item.value}</p>
                    <span className="span-size" onMouseDown={this.props.onMouseDown.bind(null, true)}
                          onClick={this.props.onClick.bind(null, this.props.item)}>
                        <div className="multi-ic"><Icon iconName="close-icon" size={18}/></div>
                    </span>
                </div>
            </div>
        )
    }
}


var InputSelect2 = React.createClass({


    propTypes: {
        list       : React.PropTypes.arrayOf(React.PropTypes.shape({
            id   : React.PropTypes.any,
            value: React.PropTypes.any
        })).isRequired, // массив из вариантов значений
        onChanged  : React.PropTypes.func.isRequired,
        active     : React.PropTypes.bool,  // признак, может компонент редактироваться или нет
        caption    : React.PropTypes.string,
        labelWidth : React.PropTypes.number,
        multiSelect: React.PropTypes.bool,
        styleGreed: React.PropTypes.bool,
    },

    getDefaultProps () {
        return {
            list       : [],
            name       : "select",
            active     : true,
            labelWidth : 114,
            multiSelect: false,
            styleGreed : false,
        }
    },

    componentDidMount(){
        if (this.props.active) {
            Events.on(Events.EV_GLOBAL_MOUSE_UP, this.globalMouseUp);
        }
    },
    componentWillUnmount() {
        if (this.props.active) {
            Events.rem(Events.EV_GLOBAL_MOUSE_UP, this.globalMouseUp);
        }
    },

    getInitialState () {
        return {
            expanded  : false,
            iconName  : "select-down",
            labelClass: ""
        }
    },

    globalMouseUp (e) {
        //console.log('[InputSelect2] globalMouseUp')
        if (this.igmu) {
            this.igmu = false
            return
        }
        if (this.state.expanded) this.toggleList()
    },

    ignoreNextMouseUp (b) {
        //console.log('[InputSelect2] ignoreNextMouseUp ' + b)
        this.igmu = b
    },

    toggleList () {
        //console.log('[InputSelect2] toggleList')
        if (!this.props.active) return
        this.setState({
            expanded: !this.state.expanded,
            iconName: this.state.iconName === "select-down" ? "select-up" : "select-down"
        })
    },

    toggleInvoke () {
        //console.log('[InputSelect2] toggleInvoke')
        if (!this.props.active) return
        this.toggleList()
    },

    selectItem (obj) {
        //console.log('[InputSelect2] selectItem')
        //console.debug(obj)
        if (!this.props.multiSelect) {
            this.props.list.forEach((i) => {
                delete i.__selected__
            })
        }
        obj.__selected__ = true
        this.toggleList()
        let f = this.props.onChanged
        if (f) f(this)
    },

    removeItem (obj) {
        //console.log('[InputSelect2] removeItem')
        //console.debug(obj)
        delete obj.__selected__
        this.setState({})
        let f = this.props.onChanged
        if (f) f(this)
    },

    /*
     getObjById (id) {
     let l = this.props.list
     for (let i = 0; i < l.length; i++) {
     if (l[i].id == id) return l[i]
     }
     return null;
     },
     */

    // возвращает список выбранных объектов
    getSelectedList () {
        let l = this.props.list;
        return this.props.list.filter((i) => {
            return i.__selected__
        })
    },

    // возвражает первый попавшийся выбранный объект
    getFirstSelectedObj () {
        for (let i = 0, l = this.props.list; i < l.length; i++) {
            if (l[i].__selected__) return l[i]
        }
        return null
    },

    // возвращает значение указанного ключа первого попавшегося выбранного объекта
    getFirstSelectedKeyValue (key) {
        let o = this.getFirstSelectedObj()
        return o ? o[key] : null
    },

    // возвращает значение первого попавшегося выбранного объекта
    getFirstSelectedValue () {
        return this.getFirstSelectedKeyValue('value')
    },

    // возвращает true если выбраны все элементы
    isAllItemsSelected () {
        for (let i = 0, l = this.props.list; i < l.length; i++) {
            if (!l[i].__selected__) return false;
        }
        return true;
    },

    render () {
        //console.log("[InputSelect2] render")
        //console.log(this.props)
        //console.log(this.state)

        //console.debug(this.props);

        var Selector;

        var list1 = !this.state.expanded ? null : this.props.list.map((item, i)=> {
            if (this.props.multiSelect && item.__selected__) return null;
            return <div data-select="select" className="select-item" key={i}
                      onMouseDown={this.ignoreNextMouseUp.bind(null, true)} onClick={this.selectItem.bind(null, item)}>
                {item.value}
            </div>
        });

        var icon = (this.props.noIcon) ? null : <Icon iconName={this.state.iconName}/>

        var Label = this.props.caption ?
            <label style={{flex: "0 0 " + this.props.labelWidth+"px"}}
                   className={"label table-prb marg-md " + this.state.labelClass}>
                {this.props.caption}
            </label>
            : null;

        if (this.props.multiSelect) {
            var isSelected = false;
            var selectedItems = this.props.list.map((item, i) => {
                if (!item.__selected__) {
                    return null;
                }
                else {
                    isSelected = true;
                    if (this.props.elementClass) {
                        return <this.props.elementClass
                            item={item}
                            active={this.props.active}
                            onMouseDown={this.ignoreNextMouseUp}
                            onClick={this.removeItem}
                            />
                    } else {
                        return <div key={i}>
                            {item.value}
                            <span onMouseDown={this.ignoreNextMouseUp.bind(null, true)}
                                  onClick={this.removeItem.bind(null, item)}>X</span>
                        </div>;
                    }
                }
            });

            let dropDownButton = this.isAllItemsSelected() ? null : (
                <div style={{marginRight:"10px"}} onMouseDown={this.ignoreNextMouseUp.bind(null, true)}
                     onClick={this.toggleInvoke}>{(this.props.active) ? icon : null}</div>);

            Selector = (
                <div className="box-row-nw">
                    <div
                        className="box-row-wr selected-tags">{(isSelected) ? selectedItems : "Выберите из списка"}</div>
                    {dropDownButton}
                </div>
            );

        } else {
            let firstSelectedValue;
            for (let i = 0, l = this.props.list; i < l.length; i++) {
                if (l[i].__selected__) {
                    firstSelectedValue = l[i].value;
                    break
                }
            }

            Selector = (
                <div className="box-row-nw selected-ms" onMouseDown={this.ignoreNextMouseUp.bind(null, true)}
                     onClick={this.toggleInvoke}>
                    <div className="">{(!firstSelectedValue) ? "Выберите из списка" : firstSelectedValue}</div>
                    {(this.props.active) ? icon : null}
                </div>
            )
        }

        return (
            <div className={this.props.styleGreed ? "box-row-nw flex-greed align-center" : "box-row-nw align-center"}>
                {Label}
                <div className="select box-cln-nw">
                    {Selector}
                    {list1 
                        ? <div className="select-list" data-select="select">
                            {list1}
                        </div>
                        : null }
                </div>
            </div>
        )

    }
});
export {InputSelect2, Tag}