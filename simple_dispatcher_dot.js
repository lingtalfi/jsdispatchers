/**
 * Simple dispatcher, dotted event name variation.
 * 
 * 
 * In this variation, a dot in the event name has a special meaning.
 * 
 * Your event name can be of two types:
 * 
 * - regular event name
 * - dotted event name
 * 
 * You would normally use the regular event name as usual.
 * There is one case where you would use dotted event names though: when you know that you are going to remove 
 * the event (via the off function).
 * 
 * A dotted event name has the following structure:
 * 
 *          dotEventName: <eventName> <.> <id>
 *              
 * You use it like this:
 * 
 * o.on ( 'myEvent.one', function(){ alert("oo"); } );
 * o.off ( 'myEvent.one');
 * 
 * 
 * Notice how we didn't pass a function as the second argument of the off method; that's the whole point of 
 * the dot event name mechanism.
 * 
 * 
 * 
 */
window.myObject = function () {
    this.listeners = {};
    this.listenersCpt = 0;
};

myObject.prototype = {
    on: function (eventName, fn) {
        var info = this._getDotEventInfo(eventName);
        if (false === (info[0] in this.listeners)) {
            this.listeners[info[0]] = {};
        }
        var index = info[1];
        if ('undefined' === typeof index) {
            index = this.listenersCpt++;
        }
        this.listeners[info[0]][index] = fn;
        return this;
    },
    off: function (dotEventName) {
        var info = this._getDotEventInfo(dotEventName);
        if (info[0] in this.listeners) {
            delete this.listeners[info[0]][info[1]];
        }
    },
    trigger: function (eventName, ...args) {
        var info = this._getDotEventInfo(eventName);
        if (info[0] in this.listeners) {
            for (var i in this.listeners[info[0]]) {
                this.listeners[info[0]][i].call(this, ...args);
            }
        }
    },
    //------------------------------------------------------------------------------/
    // PRIVATE
    //------------------------------------------------------------------------------/
    _getDotEventInfo: function (eventName) {
        return [eventName.split('.')[0], eventName.split('.')[1]];
    },
};