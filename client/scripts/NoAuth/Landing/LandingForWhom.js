var React = require('react/addons'),
	CTG = React.addons.CSSTransitionGroup;

import {Api} from '../../api';

import {ButtonSimple} from '../../Controls/Forms/ButtonSimple';
import {Icon} from '../../Controls/Icon';

export class LandingForWhom extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
    	isCurrent: "shipper"
    }

    handleClick = (category)=>{
    	this.setState({ isCurrent: category });
    }
	
	render = ()=>{

		let tabs = [
			{text: "Грузовладельцы", category: "shipper"},
			{text: "Экспедиторы", category: "expeditor"},
			{text: "Перевозчики", category: "carrier"}
        ];

        let content = [
            {icon: "local-atm", text: "Получайте лучшие цены на перевозки с помощью Запросов ставок", category: "shipper"},
            {icon: "check", text: "Фиксируйте срывы и поощряйте выполнение срочных заказов", category: "shipper"},
            {icon: "swap-horiz", text: "Автоматизируйте размещение заказов на перевозку путём интеграции в вашу систему управления", category: "shipper"},
            {icon: "visibility", text: "Ваши актуальные заказы доступны экспедиторам и их перевозчикам", category: "shipper"},
            {icon: "group-add", text: "Привлекайте больше партнеров для перевозки ваших грузов. Оценивайте ваших партнеров.", category: "shipper"},
            {icon: "local-shipping", text: "Ваш груз всегда под контролем с помощью нашей системы", category: "shipper"},

            {icon: "cached", text: "Автоматическое получение заказов от ваших клиентов ", category: "expeditor"},
            {icon: "visibility", text: "Перевозчики всегда знают об актуальных заказах и получают информацию об изменениях", category: "expeditor"},
            {icon: "check", text: "Проверяйте перевозчиков и транспортные средства через единую базу данных", category: "expeditor"},
            {icon: "message", text: "Получайте предложения от перевозчиков и договаривайтесь о ценах через систему торгов", category: "expeditor"},
            {icon: "local-shipping", text: "Груз вашего клиента всегда под контролем с помощью нашей системы", category: "expeditor"},
            {icon: "info-outline", text: "Получайте информацию о свободном транспорте в местах погрузок ваших клиентов", category: "expeditor"},

            {icon: "info-outline", text: "Узнавайте информацию о местах погрузок клиентов и их официальных экспедиторах", category: "carrier"},
            {icon: "check", text: "Получайте актуальные заказы, созданные реальными грузовладельцами", category: "carrier"},
            {icon: "search", text: "Находите заказы, предлагайте свои цены и договаривайтесь через систему торгов", category: "carrier"},
            {icon: "phone-iphone", text: "Мобильное приложение позволяет вашему водителю быть всегда на связи и получать лучшие заказы", category: "carrier"},
            {icon: "access-time", text: "Через приложение водитель указывает время приходов на погрузки и разгрузки для подтверждения простоев и срывов", category: "carrier"},
            {icon: "message", text: "Общайтесь в профессиональном сообществе и информируйте друг друга об экстренных ситуациях", category: "carrier"}
        ];

		return(
			<div className="page-block for-whom" name="for-whom">
                <h2 className="page-block__title">Наши клиенты</h2>
                <div className="for-whom__nav">
                    <div className="btn-group">
                        {tabs.map((tab, i)=>{
                            return <ButtonSimple key={i} className={ tab.category == this.state.isCurrent ?  "for-whom__link for-whom__link--active" : "for-whom__link"} onClick={this.handleClick.bind(this, tab.category)} caption={tab.text}/>
                        })}
                    </div>
                </div>
                    
                <div className="for-whom__content container">
                    <div className="row">
						{content.map((card, i)=>{
							return card.category == this.state.isCurrent ? <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-4"><div className="for-whom__card"><div className="for-whom__icon"> <Icon name={card.icon} size={36}/> </div><p className="for-whom__text">{card.text}</p></div></div> : null
						})}
                    </div>
                </div>
            </div> 
		)
	}

}
