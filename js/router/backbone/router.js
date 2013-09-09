var MixdownBackboneRouter = function() {};

MixdownBackboneRouter.prototype.attach = function(options) {
  var app = options.app;
  var routes = require('./maproutes.js')(app, options.clientRoutes);

  this.backboneRouter = new (app.Backbone.Router.extend({
    routes: routes,

    home: function() {
      // TODO: render home content.
    },

    geo: function() {
      // https://developer.mozilla.org/en-US/docs/Web/API/window.navigator.geolocation.getCurrentPosition
      navigator.geolocation.getCurrentPosition(
        function(pos) {

          // default distance is 25 mi
          var searchParams = {
            distance: 25 * 1.60934, // 1 mi = 1.60934 km.  This distance is km
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };

          // TODO: convert to rect.

          backboneRouter.navigate( router.url('map', searchParams).pathname, { trigger: true } );
        },
        function(err) {
          eventEmitter.emit('mixdown-error', { component: 'geolocation', error: err });
        }, 
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    },

    map: function() {
      // TODO: show map.
    },

    // override here to use the url generator.
    navigate: function(fragment, options) {
      Backbone.Router.prototype.navigate(fragment.replace(/^\//, ''), options);
    }

  });
};

module.exports = MixdownBackboneRouter;