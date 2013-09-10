var Backbone = require('backbone');

var Templates = Backbone.Model.extend({
  initialize: function(model, options) {
    this.url = options.app.plugins.router.format('templateApi');
  } 
});

module.exports = Templates;