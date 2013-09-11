var MixdownBackboneRouter = function() {};

MixdownBackboneRouter.prototype.attach = function(options) {
  var app = options.app;
  var routes = require('./maproutes.js')(app, options.clientRoutes);

  // publish log event
  eventEmitter.emit('mixdown-log', { module: "MixdownBackboneRouter", data: { routes: routes }, err: null });

  this.backboneRouter = new (app.Backbone.Router.extend({
    routes: routes,
    app: app,

    home: require('./actions/home.js'),
    geo: require('./actions/geo.js'),
    map: require('./actions/map.js'),

    // override here to use the url generator.
    navigate: function(fragment, options) {
      app.Backbone.Router.prototype.navigate(fragment.replace(/^\//, ''), options);
    }

  }));
};

module.exports = MixdownBackboneRouter;