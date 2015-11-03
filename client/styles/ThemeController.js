import {Theme_standart} from './Theme_standart'
import {Theme_new} from './Theme_new'

// создает ноду <style> с переданным id и фрагментом css

class Style{
    constructor(params){
        this.params=params;
        this.state= "idle";
        this.node = document.getElementById(params.id);
        if (this.node){
            this.done()

        } else{
            this.state="appending";
            var styleImplementation= document.createElement('style');
            styleImplementation.type='text/css';
            styleImplementation.id=params.id;
            styleImplementation.innerHTML=params.css;
            document.getElementsByTagName('head')[0].appendChild(styleImplementation);
            styleImplementation.onload = this.done
        }
    }
    done=()=>{
        this.state= "ready";
        var f=this.params.onLoad;
        if (f) f()
    };

    removeFromDOM=()=>{
        try {this.node.remove();}
        catch(ex){
            console.log(ex);
        }
    };

}
// меняет темы для конкретных компонентов
var ThemeController = {
    ButtonActive:Theme_standart,      //+
    TransparentButton:Theme_standart, //+
    UpPanel:Theme_standart,           //+
    LogoName:Theme_standart,          //+
    InputSimple:Theme_standart,       //+
    SmallPanel:Theme_standart,        //+
    AnimateButton:Theme_standart,     //-
    Card:Theme_standart,              //+
    LeftMenu:Theme_standart           //+

};

export {ThemeController, Style}