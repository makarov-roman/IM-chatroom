"use strict";
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
window.Reciever.prototype.startListen = function () {
    console.log(this);
    if (window.addEventListener) {
        window.addEventListener("message", this.handleMessage.bind(this));
    } else {
        // IE8
        window.attachEvent("onmessage", this.handleMessage.bind(this));
    }
};

var reciever  = new Reciever(Controller.user.bind(Controller), Controller.message.bind(Controller));

/*if (window.addEventListener) {
    window.addEventListener("message", reciever.handleMessage.bind(reciever));
} else {
    // IE8
    window.attachEvent("onmessage", reciever.handleMessage.bind(reciever));
}*/
reciever.startListen();
