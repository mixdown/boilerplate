/** 
MIT License
Everything is in closure scope except event emitter.  
If you need to communicate between app boundaries, then use the global event emitter.  
See eventEmitter.js attach and here for docs - http://nodejs.org/api/events.html
**/
require('./events/eventEmitter.js');
var app = require('./app');
var $ = app.$;
var Backbone = app.Backbone;

/** Model setting - In case you need it. **/
// app.Backbone.emulateHTTP = true;

// Start backbone router and interact with it.
Backbone.history.start({
  pushState: true, 
  hashChange: false
});


// notify listeners that app is ready
eventEmitter.emit('mixdown-ready', app);
