/**
 * Dispatcher with positioning and stop propagation.
 * Integration in an existing host object.
 */
window.myObject = function () {
    this.listeners = {};
    this.listenerIndex = 0;
};
myObject.prototype = {
    on: function (eventName, fn, position = 0) {
        if (false === (eventName in this.listeners)) {
            this.listeners[eventName] = {};
        }

        if (false === (position in this.listeners[eventName])) {
            this.listeners[eventName][position] = {};
        }
        this.listeners[eventName][position][this.listenerIndex++] = fn;
        return this;
    },
    once: function (eventName, fn, position = 0) {
        var zis = this;
        var _fn = function () {
            fn();
            zis.off(eventName, position, _fn);
        };
        this.on(eventName, _fn, position);
        return this;
    },
    off: function (eventName, position, fn = '') {
        if (eventName in this.listeners) {
            if (position in this.listeners[eventName]) {
                if ('' === fn) {
                    delete this.listeners[eventName][position];
                }
                else {
                    for (var i in this.listeners[eventName][position]) {
                        if (fn === this.listeners[eventName][position][i]) {
                            delete this.listeners[eventName][position][i];
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
                    this.listeners[eventName][pos][i].call(info, ...args);
                    if (true === info.stopPropagation) {
                        return;
                    }
                }
            }
        }
    },
};