/**
 * Simple dispatcher
 */
var myObject = function () {
    this.listeners = {};
};

myObject.prototype = {
    on: function (eventName, fn) {
        if (false === (eventName in this.listeners)) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(fn);
        return this;
    },
    off: function (eventName, fn) {
        for (var i in this.listeners) {
            for (var j in this.listeners[i]) {
                if (this.listeners[i][j] === fn) {
                    this.listeners[i].splice(j, 1);
                }
            }
        }
    },
    trigger: function (eventName, ...args) {
        if (eventName in this.listeners) {
            for (var i in this.listeners[eventName]) {
                this.listeners[eventName][i].call(this, ...args);
            }
        }
    },
};