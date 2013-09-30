var http = require('http');

// Fetch templates using XHR
module.exports = function(namespace) {
  namespace = namespace || 'templates';

  var self;
  var app;

  this.attach = function(options) {
    app = options.app;

    self = {
      templateCache: null,

      all: function(callback) {

        if (self.templateCache) {
          callback(null, self.templateCache);
          return;
        }

        http.get({ path: app.plugins.router.url('templateApi').pathname }, function (res) {
          var buf = [];

          res.on('data', function (chunk) {
            buf.push(chunk);
          });

          res.on('end', function () {
            self.templateCache = JSON.parse(buf.join(''));
            callback(null, self.templateCache);
          });

        });
      }

    };

    this[namespace] = self;
  };

  // Initialize the plugin here.
  this.init = function(done) {
    self.all(done);
  };

};
