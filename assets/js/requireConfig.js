require.config({
    baseUrl: 'assets/js',
    paths: {
        'eventEmitter': '/bower_components/eventEmitter/EventEmitter'
    },
    //prevent caching, dev only
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
    'presenter',
    'model',
    'storage'
], function (presenter, model, storage) {
    "use strict";
});