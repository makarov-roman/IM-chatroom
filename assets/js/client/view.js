define (['prototypes/view'], function (View) {
    "use strict";

    var clientView = new View();
    clientView.body = function () {
        "use strict";
        var self = this;

        document.querySelector('.chat_button_change-username').onclick = function () {
            setUsernameInputOffset('-100%');
        };

        document.querySelector('.chat_username-input').onkeydown = function (e) {
            if (e.keyCode === 13 && e.currentTarget.value !== '') {
                setUsernameInputOffset('0');
                self.trigger('sendUsername', [this]);

            }
        };

        document.querySelector('.chat_input').onkeydown = function (e) {

            if (e.keyCode === 13) {
                e.preventDefault();
                if (e.currentTarget.value !== '') {
                    self.trigger('sendMessage', [this]);
                }
            }
        };
        function setUsernameInputOffset(val) {
            var UsernameFormWindowStyles = document.querySelector('.chat_get-username').style;
            UsernameFormWindowStyles.webkitTransform = 'translate(' + val + ')';
            UsernameFormWindowStyles.transform = 'translate(' + val + ')';
        }
    };

    clientView.init();

    return clientView;
});
