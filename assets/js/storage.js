'use strict';
window.Storage  = {
    getUsers: function () {
        var data = sessionStorage.getItem('users');
        return data !== null ? JSON.parse(data) : {};
    },
    setUser: function (name, clientID) {
        var data = Storage.getUsers();
        data[clientID] = name;
        data = JSON.stringify(data);
        sessionStorage.setItem('users', data);
    },
    setMessage: function (content) {
        var data = Storage.getMessages();
        data.push(content);
        data = JSON.stringify(data);
        sessionStorage.setItem('message', data);
    },
    getMessages: function () {
        var data = sessionStorage.getItem('message');
        return data !== null ? JSON.parse(data) : [];
    }
};
