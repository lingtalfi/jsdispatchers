js dispatchers
==================
2016-03-16


Some js dispatchers that one might needs from time to time.

Just browse the example and copy paste adapt them.



Simple Dispatcher
------------------

The source is here: https://github.com/lingtalfi/jsdispatchers/blob/master/simple_dispatcher.js

Note: it uses ECMAscript 6.

The source and example is below:


```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Html page</title>
</head>

<body>


<script>
    
    var myObject = function(){
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
    
    
    var o = new myObject();
    o.on('myEvent', function(firstParam){
        console.log("doing something with " + firstParam);
    });
    o.on('myEvent', function(firstParam){
        console.log("doing something else with " + firstParam);
    });
    o.on('myEvent2', function(){
        console.log("Kamehameha!");
    });
    
    
    
    o.trigger('myEvent', 42);
    o.trigger('myEvent2');
    
    
    
    
</script>



</body>
</html>
```



Dispatcher with stopPropagation and positioning
------------------

This dispatcher provides stop propagation mechanism and positioning of events.
It's 37 lines of code including comments and host object's wrapping.

The source is here: https://github.com/lingtalfi/jsdispatchers/blob/master/dispatcher_propagation_position.js

Note: it uses ECMAscript 6.


### How to use

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <script src="dispatcher_propoagation_position.js"></script>
    <title>Event dispatcher with position and stop propagation, example of integration within an exisiting
        object</title>
</head>

<body>
<script type="text/javascript">


    var o = new myObject();
    o.on("eventA", function (eventName, number) {
        console.log("listener1 for " + eventName + ", number is " + number);
    }, 1);
    o.on("eventA", function (eventName, number) {
        console.log("listener3 for " + eventName + ", is never executed");
    }, 3);
    o.on("eventA", function (eventName, number) {
        console.log("listener2 for " + eventName + ", stops propagation at position " + this.position + " and index " + this.index);
        this.stopPropagation = true;
    }, 2);


    o.trigger('eventA', 42);


</script>
</body>
</html>
```






History Log
------------------
    
- 1.1.0 -- 2016-03-17

    - add simple dispatcher
    
- 1.0.0 -- 2016-03-16

    - initial commit
    
