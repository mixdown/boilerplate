var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  initialize: function(model, options) {
    this.url = options.app.plugins.router.format('homeApi');
  } 
});
