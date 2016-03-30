js dispatchers
==================
2016-03-16


Some js dispatchers that one might needs from time to time.

Just browse the example and copy paste adapt them.



Simple Dispatcher
------------------

The simple dispatcher script is here: https://github.com/lingtalfi/jsdispatchers/blob/master/simple_dispatcher.js

Note: it uses ECMAscript 6.

The source and example is below:


```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Html page</title>
    <script src="simple_dispatcher.js"></script>
</head>

<body>


<script>


    var o = new window.myObject();


    var fn2 = function(firstParam){
        console.log("fn2");
    };

    o.on('myEvent', function(firstParam){
        console.log("fn1");
    });
    o.on('myEvent', fn2);
    o.on('myEvent2', function(){
        console.log("event2Fn");
    });

    o.trigger('myEvent', 42); // fn1 fn2
    o.trigger('myEvent2'); // event2Fn

    console.log("removing function 2 listener");
    o.off('myEvent', fn2);
    o.trigger('myEvent', 42); // fn1
    

    o.trigger('myEvent2'); // event2Fn




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
    <script src="dispatcher_propagation_position.js"></script>
    <title>Event dispatcher with position and stop propagation</title>
</head>

<body>
<script type="text/javascript">


    var o = new myObject();


    var fn = function (number) {
        console.log("listener1b");
    };

    o.once("eventA", function (number) {
        console.log("listeneronce");
    }, 1);


    o.on("eventA", function (number) {
        console.log("listener1a");
    }, 1);
    o.on("eventA", fn, 1);

    o.on("eventA", function (number) {
        console.log("listener3");
    }, 3);
    o.on("eventA", function (number) {
        console.log("listener2");
        this.stopPropagation = true;
    }, 2);


    o.trigger('eventA', 42); // listeneronce listener1a listener1b listener2
    o.off('eventA', 2); // removing listener2
    o.trigger('eventA', 42);  // listener1a listener1b listener3

    o.off('eventA', 1, fn); // removing listener1b
    o.trigger('eventA', 42);  // listener1a listener3


</script>
</body>
</html>
```




Simple dispatcher with dotted event name
----------------------------

If you are lazy and you don't like to pass the function reference to an off method, then this dispatcher might be the one you are looking for.

The code and documentation (in comments) is here: https://github.com/lingtalfi/jsdispatchers/blob/master/simple_dispatcher_dot.js

Here is how to use it.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Html page</title>
    <script src="main.js"></script>
</head>

<body>


<script>


    var o = new window.myObject();


    o.on('myEvent', function (firstParam) {
        console.log("doing something with " + firstParam);
    });
    o.on('myEvent.id', function (firstParam) {
        console.log("doing something else with " + firstParam);
    });
    o.on('myEvent2', function () {
        console.log("Kamehameha!");
    });

    o.trigger('myEvent', 42);
    o.trigger('myEvent2');

    console.log("removing function 2 listener");
    o.off('myEvent.id'); // notice: we don't need a reference to the function, that's the whole point of the dotted event name
    o.trigger('myEvent', 42);

</script>


</body>
</html>
```









History Log
------------------
    
- 1.4.0 -- 2016-03-26
    
    - removed the first argument eventName from listeners in dispatcher_propagation_position


- 1.3.0 -- 2016-03-19

    - fix off method of stop propagation dispatcher
    - fix off method of simple dispatcher
    - add once method to stop propagation dispatcher

- 1.2.0 -- 2016-03-18

    - add simple dispatcher dot
    - add off method to simple dispatcher
    - add off method to stop propagation dispatcher

- 1.1.0 -- 2016-03-17

    - add simple dispatcher
    
- 1.0.0 -- 2016-03-16

    - initial commit
    
