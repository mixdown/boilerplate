// Load our version of jquery (2.x) and then no conflict global scope back to previous.
require('./vendor/jquery/jquery.js');

var $ = global.jQuery;
jQuery.noConflict(true);

var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;

var broadway = require('./vendor/broadway/broadway-shim.js');
var app = {
  $: $,
  _: _,
  Backbone: Backbone,
  broadway: broadway,
  plugins: new broadway.App()
};

var Handlebars = require('broadway-handlebars');

// attach mixdown router/generator
var UrlGenerator = require('mixdown-router/lib/generator.js');
app.plugins.use(new UrlGenerator(), _.extend(window.MIXDOWN.plugins.router, { app: app }));

// attach rendering plugin.  The view resolver pulls all the templates via Backbone model.
app.plugins.use(new Handlebars(), {
  app: app,
  viewResolver: require('./render/handlebars/viewresolver.js')
});

// Load pointers to main containers.  This is a 2 panel layout with a header.
var Containers = require('./containers.js');
app.plugins.use(new Containers(), { app: app });
// Now the following will work
// var $wrapper = app.plugins.containers.$wrapper;
// var $main = app.plugins.containers.$main;
// var $left = app.plugins.containers.$left;

var MixdownBackboneRouter = require('./router/backbone/router.js');
app.plugins.use(new MixdownBackboneRouter(), { 
  app: app, 

  // the list of routes that are available on the client.
  clientRoutes: require('./clientroutes.js')
});

// send load event so others that are listening for app init are notified.
eventEmitter.emit('mixdown-load', app);

// export the app.
module.exports = app;