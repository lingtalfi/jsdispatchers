/**
 * Simple dispatcher
 */
var myObject = function () {
    this.listeners = {};
    this.listenerIndex = 0;
};

myObject.prototype = {
    on: function (eventName, fn) {
        if (false === (eventName in this.listeners)) {
            this.listeners[eventName] = {};
        }
        this.listeners[eventName][this.listenerIndex++] = fn;
        return this;
    },
    off: function (eventName, fn) {
        for (var i in this.listeners) {
            for (var j in this.listeners[i]) {
                if (this.listeners[i][j] === fn) {
                    delete this.listeners[i][j];
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