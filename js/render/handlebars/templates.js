var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  initialize: function(model, options) {
    this.url = options.app.plugins.router.format('templateApi');
  } 
});
