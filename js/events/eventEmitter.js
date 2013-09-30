// attach pubsub to global namespace
var events = require('events');
var em = global.eventEmitter;

global.eventEmitter = new events.EventEmitter();

// add all of the events from the shim.  The shim is inline script at the top of the page.
if (em) {
  var events = em._events || {};
  for(name in events) {

    events[name].forEach(function(fn) {
      eventEmitter.on(name, fn);
    });
  }
}
