import React from 'react/addons';
import Router from 'react-router';

import {logger} from './Classes/Logger';
import {routes} from './routes';
import {Events} from './Dispatcher';


// Styles 
require('../scss/index.scss');
// require('../styles/index.scss');     // OLD styles


// Start router
Router.run(routes, function (Handler) {
    Events.run(Events.EV_ROUTE_CHANGED, null);
    React.render(<Handler/>, document.body);
});


// Yandex Metrika
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter32354600 = new Ya.Metrika({
                id:32354600,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true,
                ut:"noindex"
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
} else { f(); }
})(document, window, "yandex_metrika_callbacks");
