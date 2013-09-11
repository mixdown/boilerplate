var Backbone = require('backbone');
var _ = require('lodash');

module.exports = Backbone.View.extend({
  events: {
    "click a": "navigate"
  },
  render: function(callback) {
    var render = this.options.app.plugins.render;
    var that = this;

    render('home/_content', this.model.toJSON(), function(err, html) {
      that.$el = $(html);
      that.options.$parent.append(that.$el);
      that.delegateEvents();
      _.isFunction(callback) ? callback(err) : null;
    });
  },
  navigate: function(e) {
    var backboneRouter = this.options.app.plugins.backboneRouter;
    var href = $(e.target).attr('href');

    // override local urls so that they are navigated via BB.
    if (!/http/.test(href)) {
      e.preventDefault();
      backboneRouter.navigate( href, { trigger: true } );
    }
  }
});
