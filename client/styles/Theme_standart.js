
var IndigoPalette={
    PrimaryColor:"#3F51B5",
    TextIconsColor:"#ffffff",
    LightPrimaryColor:"rgba(197, 202, 233, 0.4)",
    AccentColor:"#FF4081",
    PrimaryText:"#212121",
    SecondaryText:"#727272",
    DividerColor:"#B6B6B6",
    DarkPrimaryColor:"#303F9F",
    InactivePrimaryColor:"#aaaaaa"
};

var CurrentPalette=IndigoPalette;  // устанавливаем текущую палитру


var options={
    btnBorderFocus: `1px solid ${CurrentPalette.PrimaryColor}`,
    btnBorder: `solid ${CurrentPalette.DividerColor} 1px`,
    defaultBorderRadius:'2px',
    defaultBoxShadow:'0 1px 6px rgba(0,0,0,.25)',
    buttonBoxShadow:'0px 1px 6px rgba(0,0,0,.4)',
    borderBottomDivider:`2px solid ${CurrentPalette.LightPrimaryColor}`

};





var PrimaryColor = CurrentPalette.PrimaryColor;
var TextIconsColor = CurrentPalette.TextIconsColor;
var LightPrimaryColor = CurrentPalette.LightPrimaryColor;
var AccentColor = CurrentPalette.AccentColor;
var PrimaryText = CurrentPalette.PrimaryText;
var SecondaryText = CurrentPalette.SecondaryText;
var DividerColor = CurrentPalette.DividerColor;
var DarkPrimaryColor = CurrentPalette.DarkPrimaryColor;
var InactivePrimaryColor = CurrentPalette.InactivePrimaryColor;
var hoverColor="rgba(63, 81, 181, 0.8)"; //  сопоставить с палитрой
var tableText="rgba(0,0,0,0.87)";        //  сопоставить с палитрой

var Theme_standart={
    ButtonActive:{
        color:PrimaryColor,
        backgroundColor: TextIconsColor,
        hover:{
            backgroundColor:LightPrimaryColor
        }
    },
    TransparentButton:{
        color:PrimaryColor,
        hover:{
            backgroundColor:LightPrimaryColor
        }
    },
    TransparentButtonDisabled:{
        color:InactivePrimaryColor,
        hover:{
            backgroundColor:LightPrimaryColor
        }
    },
    UpPanel:{
        backgroundColor: PrimaryColor
    },
    LogoName:{
        headingName:{
            color:TextIconsColor
        }
    },
    InputSimple:{
        borderBottom:options.btnBorder,
        focus:{
            borderBottom:options.btnBorderFocus
        },
        disabled:{
            backgroundColor:TextIconsColor
        }
    },
    SmallPanel:{
        borderRadius:options.defaultBorderRadius,
        boxShadow:options.defaultBoxShadow,
        backgroundColor:TextIconsColor ,
        color: PrimaryText,
        header:{
            backgroundColor:LightPrimaryColor,
            color:PrimaryColor
        }
    },
    AnimateButton:{
        boxShadow:options.buttonBoxShadow ,
        backgroundColor:PrimaryColor ,
        color: TextIconsColor,
        hover:{
            backgroundColor:hoverColor
        }
    },
    Card:{
        backgroundColor:TextIconsColor,
        boxShadow:options.buttonBoxShadow,
        cardTitle:{
            color:tableText
        },
        subTitle:{
            color:tableText
        }
    },
    LeftMenu:{
        borderRadius: options.defaultBorderRadius,
        boxShadow: options.defaultBoxShadow,
        backgroundColor: TextIconsColor
    }
};

export{Theme_standart}