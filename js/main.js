/** 
MIT License
Everything is in closure scope except event emitter.  
If you need to communicate between app boundaries, then use the global event emitter.  
See app.js for eventEmitter attach and here for docs - http://nodejs.org/api/events.html
**/
var app = require('./app');
var $ = app.$;

/** Load Models.  1 model should be exported from each module. **/
app.models = {
  hello: require('./demo/models/hello.js')
};

/** Model setting - In case you need it. **/
// app.Backbone.emulateHTTP = true;

/** Load Views.  1 view should be exported from each module. **/
app.views = {
  hello: require('./demo/views/hello.js')
};

// Example of page change event.  This should be in a separate file.  Leaving here for now.
eventEmitter.on('mixdown-page-change', function(options) {
  $('body').attr({id: options.page});
});

// Load pointers to main containers.  This is a 2 panel layout with a header.
var Containers = require('./containers.js');
app.plugins.use(new Containers(), { app: app.plugins });
// Now the following will work
// var $wrapper = app.plugins.containers.$wrapper;
// var $main = app.plugins.containers.$main;
// var $left = app.plugins.containers.$left;

var MixdownBackboneRouter = require('./router/backbone/router.js');
app.plugins.use(new MixdownBackboneRouter(), { 
  app: app.plugins, 

  // the list of routes that are available on the client.
  clientRoutes: require('./clientroutes.js')
});
