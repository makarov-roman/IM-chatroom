define(['eventEmitter'], function (ee) {
    "use strict";
    var exp = function Presenter() {
        this.init()
    };


    //inheriting EventEmittor
    exp.prototype = Object.create(ee.prototype);

    exp.prototype.init = function () {};

    /**
     * listen current window for html5 postmessage event
     * @param {object} instructions - key should equal type of incoming message, value is callback to that message
     */
    exp.prototype.listenPostMessage = function (instructions) {
        if (window.addEventListener) {
            window.addEventListener("message", this._handlePostMessage.bind(this, instructions));
        } else {
            // IE8
            window.attachEvent("onmessage", this._handlePostMessage.bind(this));
        }
    };
    exp.prototype._handlePostMessage = function (instructions, message) {
        var data = JSON.parse(message.data);
        if (typeof instructions[data.type] == "function") {
            instructions[data.type](message);
        } else throw new Error ('Instruction for type "' + data.type + '" not found');
    };

    return exp;
});
