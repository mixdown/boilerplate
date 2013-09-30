var Router = require('../../plugins/router/router-impl.js');

// Re-declare the client side routes.
Router.prototype.page = require('./actions/page.js');
Router.prototype.geo = require('./actions/geo.js');
Router.prototype.map = require('./actions/map.js');

Router.prototype.init = function(done) {
  // TODO: start browser history
  done();
};

module.exports = Router;