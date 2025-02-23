# Offline Battles Guide

If you cant make online battles theres a second solution

But what?
Offline Battles!

But how do we enable it?
Its easy just patch the fourth argument and change it to 3

You can use this code to enable that!

```javascript
Interceptor.attach(base.add(HomePage::startGame),{
        onEnter: function(args) {
            args[3] = ptr(3);
        }
    });
```
And Here you got!

But how do we find the HomePage::startGame function in IDA Pro?

Its very easy again! just search for the string : "TID_MATCHMAKE_FAILED_15" 
if you dont know how to find a string its easy!

