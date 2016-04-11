"use strict";
window.Controller = {
    clients: frames,

    user: function (message) {
        var data = JSON.parse(message[0].data),
            content = data.content,
            client = message[0].source.name;

        if (data.type !== 'user') {
            throw new Error ('Invalid data type');
        }

        Storage.setUser(content, client);

        this.fetch('user');
        this.fetch('message');
    },
    message: function (message) {
        var data = JSON.parse(message[0].data),
            content = data.content;
        delete content.type;

        if (data.type !== 'message') {
            throw new Error ('Invalid data type');
        }

        Storage.setMessage(content);

        this.fetch('message');
    },

    sendDataToAllClients: function (dataToSend) {
        for(var i = 0; i < this.clients.length; i++) {
            this.clients[i].postMessage(dataToSend, '*');
        }
    },
    fetch: function (target) {
        var dataToSend = JSON.stringify({
            content: Storage['get' + target.charAt(0).toUpperCase() + target.slice(1) + 's'](),
            type: target
        });

        this.sendDataToAllClients(dataToSend);
    }

};

