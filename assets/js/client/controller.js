"use strict";
window.Controller = {
    user: function (message) {
        var data = JSON.parse(message[0].data);
        if (data.type !== 'user') {
            throw new Error ('Invalid data type');
        }
        this.insertActiveUsers(data.content);

    },
    message: function (message) {
        var data = JSON.parse(message[0].data);
        if (data.type !== 'message') {
            throw new Error ('Invalid data type');
        }
        var content = data.content;

        this.insertMessage(content);
    },
    insertActiveUsers: function (data) {
        var innerHtml = '';

        for (var key in data) {
            if (window.name == key) {
                this.username = data[key];
            }
            innerHtml += '<li>' + data[key] + '</li>';
        }
        document.querySelector('.chat_clients > ul').innerHTML = innerHtml;

    },
    insertMessage: function (content) {
        var innerHtml = '';

        content.forEach(function (val) {
            innerHtml += '<p class="message"><span class="message_time">' + val.time + '</span><span class="message_name">' + val.name + ': </span>' + val.value + '</p>';
        });

        document.querySelector('.chat_wrapper').innerHTML = innerHtml;
    }
};
