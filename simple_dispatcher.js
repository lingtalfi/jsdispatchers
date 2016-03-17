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
    trigger: function (eventName, ...args) {
        if (eventName in this.listeners) {
            for (var i in this.listeners[eventName]) {
                this.listeners[eventName][i].call(this, ...args);
            }
        }
    },
};