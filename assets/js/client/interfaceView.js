define(['./view', './presenter', 'prototypes/IView'], function (view, presenter, IView) {
    "use strict";

    var iView = new IView(view, presenter);
    view.on('sendMessage', function (eTarget) {
        var content = {
            value: eTarget.value,
            time: (new Date).toLocaleString("en", {
                hour: 'numeric',
                minute: 'numeric'
            }),
            name: window.name
        };

        eTarget.value = '';
        presenter.sendMessage(window.parent, content, 'message');
    });

    view.on('sendUsername', function (eTarget) {
        var data = eTarget.value;
        presenter.sendMessage(window.parent, data, 'user');
    });


    presenter.on('receiveMessage', function (data) {
        var innerHtml = '';

        data.forEach(function (val) {
            innerHtml += '<p class="message"><span class="message_time">' + val.time + '</span><span class="message_name">' + val.name + ': </span>' + val.value + '</p>';
        });

        document.querySelector('.chat_wrapper').innerHTML = innerHtml;
    });

    presenter.on('receiveUsername', function (data) {
        var innerHtml = '';
        for (var key in data) {
            if (window.name == key) {
                this.username = data[key];
            }
            innerHtml += '<li>' + data[key] + '</li>';
        }
        document.querySelector('.chat_clients > ul').innerHTML = innerHtml;
    });

    return iView;

});

