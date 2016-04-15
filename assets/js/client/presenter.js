define(['prototypes/presenter', 'model'], function (Presenter, model) {
    "use strict";
    var presenter = new Presenter;

    presenter.sendMessage = function (targetWindow, content, type) {
        if (arguments.length !== 3) throw new Error('Invalid arguments length. ' + arguments.length + ' given, 3 expected');
        var message = {
            content: content,
            type: type
        };
        targetWindow.postMessage(JSON.stringify(message), '*');
    };

    var postMessageInstructions = {
        'user': function (message) {
            var data = JSON.parse(message.data);
            if (data.type !== 'user') {
                throw new Error('Invalid data type');
            }
            data = data.content;
            presenter.trigger('receiveUsername', [data])
        },
        'message': function (message) {
            var data = JSON.parse(message.data);
            if (data.type !== 'message') {
                throw new Error('Invalid data type');
            }
            var content = data.content;

            presenter.trigger('receiveMessage', [content]);
        }
    };

    presenter.listenPostMessage(postMessageInstructions);

    presenter.getCurrentUsername = function () {
        if (typeof window.name != "undefined") {
            return model.getCurrentUsername(window.name);
        }

        return 'unknown';
    };


    return presenter;
});
