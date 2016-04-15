define(['prototypes/presenter', 'model'], function (Presenter, model) {
    "use strict";
    Presenter.init = function () {

    };
    var presenter = new Presenter();

    // _.extend will make it more neatly

    var postMessageInstructions = {
        'message': function (message) {
            var data = JSON.parse(message.data),
                content = data.content;
            delete content.type;

            if (data.type !== 'message') {
                throw new Error ('Invalid data type');
            }

            model.setMessage(content);

            presenter.fetch('message');
        },
        'user': function (message) {
            var data = JSON.parse(message.data),
                content = data.content,
                client = message.source.name;

            if (data.type !== 'user') {
                throw new Error ('Invalid data type');
            }

            model.setUser(content, client);

            presenter.fetch('user');
            presenter.fetch('message');
        }
    };

    presenter.sendDataToAllClients = function (dataToSend) {
        for(var i = 0; i < frames.length; i++) {
            frames[i].postMessage(dataToSend, '*');
        }
    };
    presenter.fetch = function (target) {
        var dataToSend = JSON.stringify({
            content: model[formatMethodName(target)](),
            type: target
        });

        this.sendDataToAllClients(dataToSend);
    };

    presenter.listenPostMessage(postMessageInstructions);

    /**
     * format string to get proper method name for fetch function
     * @param {string} target example: 'user'
     * @returns {string} example: 'getUsers'
     */
    function formatMethodName (target) {
        return 'get' + target.charAt(0).toUpperCase() + target.slice(1) + 's';
    }

    return presenter;
});