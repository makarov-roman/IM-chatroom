"use strict";

//TODO передавать контекст в конструктор?
window.Reciever = function (userHandler, messageHandler) {
    this.userHandler = userHandler;
    this.messageHandler = messageHandler;
};
window.Reciever.prototype.handleMessage = function (message) {
    var data = JSON.parse(message.data);
    switch (data.type) {
        case 'user':
            this.userHandler(arguments);
            break;
        case 'message':
            this.messageHandler(arguments);
            break;
        default:
            throw new Error('Type wasn\'t recognized');
    }
};
