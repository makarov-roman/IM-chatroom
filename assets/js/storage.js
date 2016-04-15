define(function () {
    'use strict';
    return {
        getUsers: function () {
            var data = sessionStorage.getItem('users');
            return data !== null ? JSON.parse(data) : {};
        },
        setUser: function (name, clientID) {
            var data = this.getUsers();
            data[clientID] = name;
            data = JSON.stringify(data);
            sessionStorage.setItem('users', data);
        },
        setMessage: function (content) {
            var data = this.getMessages();
            data.push(content);
            data = JSON.stringify(data);
            sessionStorage.setItem('message', data);
        },
        getMessages: function () {
            var data = sessionStorage.getItem('message');
            return data !== null ? JSON.parse(data) : [];
        }
    }
});


