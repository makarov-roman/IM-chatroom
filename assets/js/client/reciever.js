"use strict";
var reciever  = new window.parent.Reciever(Controller.user.bind(Controller), Controller.message.bind(Controller));

if (window.addEventListener) {
    window.addEventListener("message", reciever.handleMessage.bind(reciever));
} else {
    // IE8
    window.attachEvent("onmessage", reciever.handleMessage.bind(reciever));
}
