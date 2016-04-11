"use strict";
var mainReciever = new Reciever(Controller.user.bind(Controller), Controller.message.bind(Controller));

if (window.addEventListener) {
    window.addEventListener("message", mainReciever.handleMessage.bind(mainReciever));
} else {
    // IE8
    window.attachEvent("onmessage", mainReciever.handleMessage.bind(mainReciever));
}









