var React = require('react/addons');

export class LandingHowItWorks extends React.Component {

    constructor(props) {
        super(props);
    }

    dataSlider = [
        {img: 'http://cargo.chat/static/landing/slide1.jpg', desc: 'Грузовладельцы размещают в сервисе заказы для своих экспедиторов'},
        {img: 'http://cargo.chat/static/landing/slide2.jpg', desc: 'Выданные экспедитору заказы доступны для его партнеров-перевозчиков'},
        {img: 'http://cargo.chat/static/landing/slide3.jpg', desc: 'Перевозчики выбирают заказы и договариваются с экспедитором'},
        {img: 'http://cargo.chat/static/landing/slide4.jpg', desc: 'Водитель отмечает начало и окончание рейса через мобильное приложение'}
    ]

    state = {
        currentSlide: 0,
        frameWidth: null,
        listWidth: null
    }

    resize = ()=>{
        if(this.refs.frame && this.dataSlider.length > 1){
            this.setState({
                frameWidth: this.refs.frame.getDOMNode().offsetWidth,
                listWidth:  this.refs.frame.getDOMNode().offsetWidth * this.dataSlider.length
            });
        }
    }

    prevSlide = ()=>{
        if(this.state.currentSlide != 0){
            this.setState({currentSlide: this.state.currentSlide-1});    
        } else {
            this.setState({currentSlide: this.dataSlider.length-1});    
        }
    }

    nextSlide = (c)=>{
        
        this.setState({currentSlide: c});    

    }

    componentDidMount = ()=>{
        let $this = this;
        setTimeout(()=>{ $this.resize() }, 100);

        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount = ()=>{
        window.removeEventListener('resize', this.resize);
    }
        
	render = ()=>{
        let x = this.state.currentSlide * this.state.frameWidth;
		return(
			<div className="page-block page-block--light how-it-work">
                <h2 className="page-block__title">Как это работает?</h2>
                <div className="how-it-work">
                    <div className="slider">
                        <div className="slider__container-dots">
                            <div className="slider__dots">
                                {this.dataSlider.map((slide, i)=>{
                                    let dotClass = this.state.currentSlide >= i  ? this.state.currentSlide == i ? 'slider__dot slider__dot--active' : 'slider__dot slider__dot--done' : 'slider__dot';
                                    return  <div key={i} className={dotClass}>
                                                <span className="slider__dot-number" onClick={this.nextSlide.bind(this, i)}>
                                                    {i+1}
                                                </span>
                                            </div>
                                })}
                            </div>
                        </div>
                        <div className="slider__container">
                            <div className="slider__slide-description">
                                {this.dataSlider[this.state.currentSlide].desc}
                            </div>
                            <div className="slider__browser">
                                <div className="slider__frame" ref="frame">
                                    <ul className="slider__list" style={{left: -x, width: this.state.listWidth, transition: 'left 1s'}}>
                                        {this.dataSlider.map((slide, i)=>{
                                            return  <li className="slider__slide" key={i} style={{width: this.state.frameWidth}}>
                                                        <img src={slide.img} alt=""/>
                                                    </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}

}