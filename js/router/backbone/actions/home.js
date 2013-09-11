var HomeView = require('../../../demo/views/home.js');

module.exports = function() {
  var app = this.app;
  var homeView = new HomeView({
    el: app.plugins.containers.$main,
    app: app
  });

  homeView.render(function(err) {
    if (err) {
      eventEmitter.emit('mixdown-error', { module: "HomeView", data: null, err: err });
    }
  });
}