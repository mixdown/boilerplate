var Backbone = require('backbone');
var Pipeline = require('node-pipeline');
var _ = require('lodash');
var HomeModel = require('../models/home.js');
var HomeContentView = require('./content.js');

module.exports = Backbone.View.extend({

  initialize: function(options) {
    this.model = new HomeModel({}, { app: options.app });
    this.model.on('sync', this.renderContent.bind(this));
  },

  render: function(callback) {
    var render = this.options.app.plugins.render;
    var that = this;

    // render the container, content will fill when available.
    render('home/_home', {}, function(err, html) {
      that.$el.html(html);
      that.delegateEvents();
      _.isFunction(callback) ? callback(err) : null;

      // triggers a refresh which will call renderContent when sync completes.
      that.model.fetch();
    });

  },
  renderContent: function(callback) {
    var that = this;
    var pl = Pipeline.create('Render Content Items');
    var $list = this.$el.find('ul');
    var app = this.options.app;

    // clear old content just in case.
    $list.empty();

    // ensure only fire callback once.
    var cbFired = false;
    var cb = function(err, results) {
      if (!cbFired) {
        cbFired = true;
        if (err) {
          $list.html(err);
          eventEmitter.emit('mixdown-error', { module: "HomeView", data: that.model.toJSON(), err: err });
        }
        _.isFunction(callback) ? callback(err) : null;
      }
    };

    // model is a collection here.
    _.each(this.model.models, function(contentModel) {

      pl.use(function(results, next) {

        var contentView = new HomeContentView({
          model: contentModel,
          $parent: $list,
          app: app
        });
        contentView.render(next);
      });

    });

    pl.on('error', cb).on('end', cb).execute({});
  },

  getListContainer: function() {
    return this.$el.find('ul');
  }

});