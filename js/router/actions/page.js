var containers = require('../../containers.js')();

module.exports = function(httpContext) {
  var app = httpContext.app;

  // On the server, there is a single page handler that sends an html container
  // On the client, we need to do a controller switch.  
  // I would like to find a better way to inject differences btw server and client.
  if (httpContext.route.name !== 'home') {

    // This sucks b/c it is predicated on the name and client handler matching.  This is opaque and I need to come back to it.
    try {
      app.plugins.router.getHandler(httpContext.route.name)(httpContext);
    }
    catch (e) {
      e.message = 'Route failed. ' + e.message;
      throw e;
    }
    return;
  }

  // handle home.
  app.plugins.render('home/_home', {}, function(err, html) {

    containers.main.innerHTML = html;
    var ul = containers.main.getElementsByTagName('ul')[0];

    app.plugins.homeApi.fetch(function(err, data) {

      if (err) {
        eventEmitter.emit('mixdown-error', { module: "Home", data: data, err: err });
        return;
      }

      var contentView = app.plugins.contentView({ el: ul });
      contentView.render(data, function(err) {
        if (err) {
          eventEmitter.emit('mixdown-error', { module: "Home", data: data, err: err });
        }
      });
    });
  });
};