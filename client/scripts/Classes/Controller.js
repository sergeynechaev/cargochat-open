export default class Controller {

    // контейнер событий
    evs = {};

    // регистрация события
    on = function (id, hr) {
        var l = this.evs[id];
        l ? l.push(hr) : this.evs[id] = [hr]
    };

    // запуск события
    run = function (id, p) {
        var l = this.evs[id];
        if (l) {
            l.forEach(o => o(p));
        }
    };

    // отписка
    rem = function (id, hr) {
        var l = this.evs[id];
        if (l) {
            this.evs[id] = l.filter(h => h != hr)
        }
    };
}