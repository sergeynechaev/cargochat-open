import {Icon} from '../SimpleComponents/Icons';
import {Events} from '../Dispatcher';


var React = require('react/addons');

var InputSelect = React.createClass({


    propTypes: {
        selectedItem : React.PropTypes.oneOfType(
            [
                React.PropTypes.string,
                React.PropTypes.number
            ]).isRequired, //установленное по умолчанию значение
        selectedItems: React.PropTypes.array,
        listItems    : React.PropTypes.oneOfType(
            [
                React.PropTypes.arrayOf(React.PropTypes.shape({
                    id  : React.PropTypes.number,
                    name: React.PropTypes.string
                })),
                React.PropTypes.arrayOf(React.PropTypes.string),
                React.PropTypes.arrayOf(React.PropTypes.number)
            ]
        ).isRequired, // массив из вариантов значений
        getValue     : React.PropTypes.func.isRequired, //функция, в которую передается объект с ключом из имени компонента и значением selectedItem
        name         : React.PropTypes.string,  //имя компонента передается как ключ в объекте
        active       : React.PropTypes.bool,  // признак, может компонент редактироваться или нет
        caption      : React.PropTypes.string,
        labelWidth   : React.PropTypes.number,
        multiSelect  : React.PropTypes.bool,
        returnKey    : React.PropTypes.string
    },

    getDefaultProps(){
        return {
            selectedItem : undefined,
            selectedItems: [],
            listItems    : [],
            getValue     : null,
            name         : "select",
            active       : true,
            labelWidth   : 114,
            multiSelect  : false
        }
    },

    componentDidMount(){
        if (this.props.active) {
            Events.on(Events.EV_CLICK_ANYWHERE, this.closeList);
        }
    },
    componentWillUnmount() {
        if (this.props.active) {
            Events.rem(Events.EV_CLICK_ANYWHERE, this.closeList);
        }
    },

    closeList(){
        if (!this.state.hideList) {
            this.setState({
                hideList: true,
                iconName: "select-down"
            })
        }
    },

    getInitialState(){
        var listType = typeof(this.props.listItems[0]);
        var values = this.props.listItems.map((item, id)=> {
            if (listType === "object") {
                return item[this.props.returnKey]
            } else return item
        });


        return {
            listType     : listType,
            listItems    : this.props.listItems,
            selectedItems: this.props.selectedItems,

            listValues  : values,
            selectedItem: this.props.selectedItem,
            hideList    : true,
            iconName    : "select-down"
        }
    },
    toggleList(){
        if (this.props.active) {
            this.setState({
                hideList: (!this.state.hideList),
                iconName: (this.state.iconName === "select-down") ? "select-up" : "select-down"
            })
        }

    },
    selectItem(event){

        var index = event.target.dataset.index;

        var itemFromListItem = this.state.listItems[index];

        console.log(itemFromListItem);
        var getValue;

        if (this.state.listType === "object" && this.props.returnKey) {
            getValue = itemFromListItem[this.props.returnKey];
            console.log(getValue);
        } else {
            getValue = itemFromListItem;
        }

        var obj = {}; //  создаем объект для передачи

        if (!this.props.multiSelect) {

            obj[this.props.name] = getValue; //вставляем в объект свойство со значением
            this.props.getValue(obj); //  передаем объект
            // меняем состояние
            this.setState({
                selectedItem : itemFromListItem,
                selectedValue: getValue,
                hideList     : true,
                iconName     : "select-down"
            });

        } else {

            var newSelectedItems = this.state.selectedItems; // список выбранных значений
            newSelectedItems.push(getValue); // добавляем новое


            var newListItems = this.state.listItems; // список невыбранных значений
            newListItems.splice(index, 1); // убираем

            obj[this.props.name] = newSelectedItems; //вставляем в объект свойство со значением


            this.props.getValue(obj);
            this.setState({
                listItems    : newListItems,
                selectedItems: newSelectedItems
            })


        }

    },
    removeFromList(event){
        var obj = {};
        var index = event.target.dataset.index;
        var value = this.state.selectedItems[index];
        console.log("remove " + index + " " + value);
        var newSelectedItems = this.state.selectedItems;
        var newListItems = this.state.listItems;
        newListItems.push(value);
        console.log(newListItems);
        newSelectedItems.splice(index, 1);
        console.log(newSelectedItems);
        obj[this.props.name] = newSelectedItems;
        this.props.getValue(obj);
        this.setState({
            selectedItems: newSelectedItems,
            listItems    : newListItems
        })
    },
    render(){
        //console.log("MULTITEST");
        //console.log(this.state);
        var Selector;

        var listItems = this.state.listItems;
        var ListItems = listItems.map((item, i)=> {
            if (this.state.listType === "object") {
                return (<p data-select="select" className="select-item" data-value={item.id} data-index={i}
                           key={i}>{item.name}</p>)
            }
            return (
                <p data-select="select" className="select-item" data-value={item.id} data-index={i} key={i}>{item}</p>)
        });
        var list = function () {
            if (this.state.hideList) {
                return null
            } else {
                return ListItems
            }
        }.bind(this);
        var icon = (this.props.noIcon) ? null : <Icon iconName={this.state.iconName}/>;
        var labelClass = "label table-prb " + this.state.labelClass;
        var labelStyle = {
            flex: "0 0 " + this.props.labelWidth + "px"
        };
        var Label = (this.props.caption) ? <label style={labelStyle} className={labelClass}>
            {this.props.caption}
        </label> : null;
        if (this.props.multiSelect) {
            var selectedItems = (this.state.selectedItems.length > 0) ? this.state.selectedItems.map((item, i)=> {
                return <p key={i}>
                    {item}
                    <span data-index={i} onClick={this.removeFromList}>X</span>
                </p>

            }) : this.props.selectedItem;
            Selector =
                <div className="box-row-nw selected">
                    <div className="box-row-wr">
                        {selectedItems}
                    </div>

                    <div onClick={this.toggleList}>
                        {icon}
                    </div>
                </div>
        } else {
            Selector = (
                <div className="box-row-nw selected" onClick={this.toggleList}>
                    <p className="">{this.state.selectedItem}</p>
                    {icon}
                </div>
            )
        }

        return (
            <div className="box-row-nw align-center">
                {Label}
                <div className="select box-cln-nw just-end">

                    {Selector}

                    <div className="select-list" data-select="select" onClick={this.selectItem}>
                        {list()}
                    </div>
                </div>
            </div>
        )
    }
});
export {InputSelect}