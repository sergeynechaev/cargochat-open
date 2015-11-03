var myMap,
    objectManager,
    objectManagerFirst;
var searchControl, editMap, test;
//
//var callGeocode=function(res, addr){
//    var responseObj = j2o(res);
//    console.log(responseObj.response);
//    store.address= responseObj.response;
//    //console.log(store.address.GeoObjectCollection);
//    //dispatcher.runEvent("CompanyProfile_CHANGED");
//};
//
//var addressMapInit = function(){
//    editMap = new ymaps.Map('address-map',{
//        center:[55.74954, 37.621587],
//        controls: [],
//        zoom:15
//    });
//    var searchControl = new ymaps.control.SearchControl({
//        options: {
//            float: 'left',
//            minWidth:[30,72,350],
//            size:'large'
//        }
//    });
//    editMap.controls.add(searchControl);
//    var zoomControl = new ymaps.control.ZoomControl({
//        options: {
//            size: "small",
//            position:{top: 10, right: 30}
//        }
//    });
//    editMap.controls.add(zoomControl);
//
//
//
//    searchControl.events.add('resultselect', function(event){
//        //test = searchControl.getResultsCount(); // количество результатов
//        var adr = searchControl.getResponseMetaData().request;
//        geoRequest(adr,callGeocode);
//
//    })
//};

var mapChanged = function () {
    console.log("map changed");
    //if (dispatcher.searchMode){
    //
    //} else {
    //    //getCompaniesInArea(myMap.getBounds());
    //}
};
//
//var drawingBaloons = function(fullList, indexedList){
//    if (objectManagerFirst) {
//        objectManagerFirst.removeAll();
//        objectManager.removeAll();
//        var firstPage = store.genJson(indexedList[selectedPage], "Point");
//        var otherPages = store.genJson(fullList, "Circle");
//        objectManagerFirst.add(firstPage);
//        objectManager.add(otherPages);
//    }
//};

// Функция инициализации карты
var init = function () {
    // Создаем карту
    myMap = new ymaps.Map("map", {
        center  : [55.76, 37.64],
        zoom    : 12,
        controls: []
    });
    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size    : "small",
            position: {top: 10, right: 30}
        }
    });
    myMap.controls.add(zoomControl);


    //Обновляем данные, если изменилось что то на карте
    myMap.events.add('boundschange', mapChanged);

    //var gB= myMap.getBounds();
    //console.log(gB);
    //
    ////getCompaniesInArea(gB);
    //
    //objectManager = new ymaps.ObjectManager({
    //    clusterize: false
    //});
    //objectManagerFirst = new ymaps.ObjectManager({
    //    clusterize: false
    //});
    //objectManagerFirst.objects.options.set({preset: 'islands#blueStretchyIcon'});
    //
    //myMap.geoObjects.add(objectManager);
    //myMap.geoObjects.add(objectManagerFirst);
};

export {init,myMap}