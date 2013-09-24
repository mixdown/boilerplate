var _ = require('lodash');
var util = require('util');
var MixdownRouter = require('mixdown-router');
var path = require('path');
var packageJSON = require( path.join(process.cwd(), '/package.json') );

// router impl.
var Router = function() {
  if (!(this instanceof Router)) {
    return new Router();
  }

  MixdownRouter.apply(this, arguments);
};

util.inherits(Router, MixdownRouter);


// Added server version as a cachebuster.
Router.prototype.attach = function (options) {
  var app = options.app;
  var cachebuster = null;
  var cacheBusterRoutes = ['image', 'css', 'js', 'templateApi'];

  try {
  	// anytime you run npm version, this updates.
    cachebuster = packageJSON.version;
  }
  catch (e) {
    cachebuster = e.message;
  }

  MixdownRouter.prototype.attach.apply(this, arguments);

  var _url = this.router.url;

  // override the default impl and add the cachebuster
  this.router.url = function(route, params) {
    var u = _url.call(this, route, params);

    if (cacheBusterRoutes.indexOf(route) >= 0) {
      u.query = u.query || {};
      u.query.v = cachebuster;
    }

    return u;
  }
};

Router.prototype.init = function (done) {
  if (this.render && this.render.instance && this.router && this.router.format) {
    var router = this.router;

    // attach a helper to generate urls to the rendering engine.
    this.render.instance.registerHelper('url', function(route, options) {
      return router.format(route, options.hash);
    });
  }
  done();
};

Router.prototype.page = require('./actions/page.js');
Router.prototype.image = require('./actions/image.js');
Router.prototype.css = require('./actions/css.js');
Router.prototype.js = require('./actions/js.js');
Router.prototype.templates = require('./actions/templates.js');
Router.prototype.manifest = require('./actions/manifest.js');
Router.prototype.homeApi = require('./actions/home.js');

module.exports = Router;