// attach pubsub to global namespace
var events = require('events');
var _ = require('lodash');

global.eventEmitter = new events.EventEmitter();

// add all of the events from the shim.  The shim is inline script at the top of the page.
if (global.eventEmitter) {
  _.each(global.eventEmitter._events, function(evs, name) {
    _.each(evs, function(fn) {
      eventEmitter.on(name, fn);
    });
  });
}
