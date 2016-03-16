/**
 * Dispatcher with positioning and stop propagation.
 * Integration in an existing host object.
 */
window.myObject = function () {
    this.listeners = {};
};
myObject.prototype = {
    on: function (eventId, fn, position = 0) {
        if (false === (eventId in this.listeners)) {
            this.listeners[eventId] = [];
        }

        if (false === (position in this.listeners[eventId])) {
            this.listeners[eventId][position] = [];
        }
        this.listeners[eventId][position].push(fn);
        return this;
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