var Backbone = require('backbone');

var HeaderView = Backbone.View.extend({
  events: {
    "click a": "navigate"
  },
  navigate: function(e) {
    var backboneRouter = this.options.app.plugins.backboneRouter;
    var $t = $(e.target);

    backboneRouter.navigate( $t.attr('href'), { trigger: true } );
    e.preventDefault();
  }
});

module.exports = HeaderView;