module.exports = function(app, clientRoutes) {
  var routes = {};
  var _ = app._;

  _.each(app.plugins.router.routes, function(route, name) {
    var handler = clientRoutes[name];

    if (handler) {

      // remove the leading slash cause BB no-likey
      route = route.path.replace(/^\//, '');

      // flip the key vals because backbone is different
      routes[route] = handler;
    }

  });

  return routes;
};