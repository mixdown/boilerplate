/** 
MIT License
Everything is in closure scope except event emitter.  
If you need to communicate between app boundaries, then use the global event emitter.  
See eventEmitter.js attach and here for docs - http://nodejs.org/api/events.html
**/
var broadway = require('./vendor/broadway/broadway.js');
var Handlebars = require('broadway-handlebars');
var Router = require('./router/router.js');
var TemplateViewResolver = require('./plugins/templates.js');
var Map = require('./plugins/map.js');
var HomeApi = require('./demo/apis/home.js');

var HeaderView = require('./demo/views/header.js');
var ContentView = require('./demo/views/content.js');

// attach pubsub to global namespace
require('./events/eventEmitter.js');

// send load event so others that are listening for app init are notified.
eventEmitter.emit('mixdown-load', app);

var appSettings = window.MIXDOWN;
var app = { plugins: new broadway.App() };

// Attach view resolved plugin for rendering.
app.plugins.use(new TemplateViewResolver(), { app: app });

// Attach Handlebars for rendering.
app.plugins.use(new Handlebars(), {
  app: app,
  viewResolver: app.plugins.templates
});

// Setup the router.
app.plugins.use(new Router(), { 
  routes: appSettings.plugins.router.routes, 
  app: app 
});

// Map plugin
app.plugins.use(new Map(), { 
  apikey: appSettings.plugins.googleMaps.apikey, 
  app: app,
  mapOptions: {
    panControl: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: true,
    overviewMapControl: false, 
    zoom: 1
  }
});

// home api
app.plugins.use(new HomeApi(), { app: app });
app.plugins.use(new HeaderView(), { app: app });
app.plugins.use(new ContentView(), { app: app });

// need to call init so the plugins can do any setup.
app.plugins.init(function(err) {
  if (err) {
    eventEmitter.emit('error', { err: err });
    return;
  } 

  // init header 
  app.plugins.headerView();

  // send load event so others that are listening for app init are notified.
  eventEmitter.emit('mixdown-ready', app);
});
