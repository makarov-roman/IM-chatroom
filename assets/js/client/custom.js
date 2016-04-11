"use strict";
document.querySelector('.chat_button_change-username').onclick = function () {
    setUsernameInputOffset('-100%');
};

document.querySelector('.chat_username-input').onkeydown = function (e) {
    if (e.keyCode === 13 && e.currentTarget.value != '') {
        setUsernameInputOffset('0');
        sendMessage(window.parent, e.currentTarget.value, 'user');
    }
};

document.querySelector('.chat_input').onkeydown = function (e) {

    if (e.keyCode === 13) {
        e.preventDefault();
        if (e.currentTarget.value != '') {
            var content = {
                value: e.currentTarget.value,
                time: (new Date).toLocaleString("en", {
                    hour: 'numeric',
                    minute: 'numeric'
                }),
                name: Controller.username
            };
            sendMessage(window.parent, content, 'message');
            e.currentTarget.value = '';
        }
    }
};
document.querySelector('.chat_wrapper').ondblclick = function (e) {
    sessionStorage.clear();
};


function setUsernameInputOffset(val) {
    var UsernameFormWindowStyles = document.querySelector('.chat_get-username').style;
    UsernameFormWindowStyles.webkitTransform = 'translate(' + val + ')';
    UsernameFormWindowStyles.transform = 'translate(' + val + ')';
}
function sendMessage(targetWindow, content, type) {
    if (arguments.length !== 3) throw new Error('Invalid arguments length. ' + arguments.length + ' given, 3 expected');
    var message = {
        content: content,
        type: type
    };
    targetWindow.postMessage(JSON.stringify(message), '*');
}