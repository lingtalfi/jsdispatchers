/**
 * Dispatcher with positioning and stop propagation.
 * Integration in an existing host object.
 */
window.myObject = function () {
    this.listeners = {};
};
myObject.prototype = {
    on: function (eventName, fn, position = 0) {
        if (false === (eventName in this.listeners)) {
            this.listeners[eventName] = [];
        }

        if (false === (position in this.listeners[eventName])) {
            this.listeners[eventName][position] = [];
        }
        this.listeners[eventName][position].push(fn);
        return this;
    },
    off: function (eventName, position, fn = '') {
        if (eventName in this.listeners) {
            if (position in this.listeners[eventName]) {
                if ('' === fn) {
                    this.listeners[eventName].splice(position, 1);
                }
                else {
                    for (var i in this.listeners[eventName][position]) {
                        if (fn === this.listeners[eventName][position][i]) {
                            this.listeners[eventName][position].splice(i, 1);
                        }
                    }
                }
            }
        }
    },
    trigger: function (eventName, ...args) {
        if (eventName in this.listeners) {
            for (var pos in this.listeners[eventName]) {
                for (var i in this.listeners[eventName][pos]) {
                    var info = {
                        stopPropagation: false,
                        position: pos,
                        index: i,
                    };
                    this.listeners[eventName][pos][i].call(info, eventName, ...args);
                    if (true === info.stopPropagation) {
                        return;
                    }
                }
            }
        }
    },
};