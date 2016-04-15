define(['storage'], function (storage) {
    var emoji = {
        ':angel:': 'assets/images/emoji/angel.png',
        ':smile:': 'assets/images/emoji/smiling.png',
        ':cool:': 'assets/images/emoji/cool.png',
        ':terrified:': 'assets/images/emoji/terrified.png',
        ':tired:': 'assets/images/emoji/tired.png'
    };

    function insertSmiles(message, emoji) {
        "use strict";
        //TODO /:[a-z]{4,9}:/ check if any
            var emojiNames = Object.keys(emoji);
            emojiNames.forEach(function (val) {
                message = message.replace(new RegExp(val, 'g'), '<img src="' + emoji[val] + '" alt="' + val + '">');
            });
        return message;
    }

    function markUsernamesWithinString(message, users) {
        "use strict";
        var amount = 0;
        findAllSubstr(message, '@', function () {
            amount++;
        });
        if (amount) {
            users = makeArrayFromObj(users);
            users.forEach(function (val) {
                message = message.replace(new RegExp('@' + val, 'g'), '<span class="message_user">@' + val + '</span>');
            })
        }
        return message;
    }

    function makeArrayFromObj(obj) {
        "use strict";
        var arr = [];
        for (var key in obj) {
            arr.push(obj[key]);
        }
        return arr;
    }

    /**
     *
     * @param {string} str where
     * @param {string|RegExp} target what
     * @param {function} [callback]
     * return {string} could be transformed by callback
     */
    function findAllSubstr(str, target, callback) {
        var pos = 0;
        while (true) {
            var foundPos = str.indexOf(target, pos);
            if (foundPos == -1) break;

            pos = foundPos + 1;
            if (typeof callback == "function") callback.call(this, pos);
        }
        return str;
    }

    return {
        getUsers: function () {
            return storage.getUsers();
        },
        setUser: function (name, clientID) {
            return storage.setUser(name, clientID);
        },
        getMessages: function () {
            var users = storage.getUsers();
            var messages = storage.getMessages();
            messages.map(function (val) {
                val.name = users[val.name];
                val.value = markUsernamesWithinString(val.value, users);
                val.value = insertSmiles(val.value, emoji);
                return val;
            });
            return messages;
        },
        setMessage: function (content) {
            return storage.setMessage(content);
        },

        getCurrentUsername: function (client_id) {
            return this.getUsers()[client_id];
        }
    }
})
;