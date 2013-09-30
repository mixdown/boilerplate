/** Client side version of broadway with just what you need to attach client side plugins.  **/
var async = require('async');

var App = function() {
  this.initList = [];
};

App.prototype.use = function(plugin, options) {
  if (plugin.init) {
    this.initList.push(plugin.init);
  }
  
  plugin.attach.call(this, options);
};

App.prototype.init = function(done) {
  async.parallel(this.initList, done);
};

module.exports = broadway = {
  App: App
};