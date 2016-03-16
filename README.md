js dispatchers
==================
2016-03-16


Some js dispatchers that one might needs from time to time.

Just browse the example and copy paste adapt them.




Dispatcher with stopPropagation and positioning
------------------

This dispatcher provides stop propagation mechanism and positioning of events.
It's 37 lines of code including comments and host object's wrapping.

The source is here: https://github.com/lingtalfi/jsdispatchers/blob/master/dispatcher_propoagation_position.js

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
    
- 1.0.0 -- 2016-03-16

    - initial commit
    
