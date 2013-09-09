/** Client side version of broadway with just what you need to attach client side plugins.  **/

var App = function() {};

App.prototype.use = function(plugin, options) {
  plugin.attach.call(this, options);
};

module.exports = broadway = {
  App: App
};