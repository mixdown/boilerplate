var http = require('http');

module.exports = function(namespace) {
  namespace = namespace || 'homeApi';

  this.attach = function(options) {
    var app = options.app;

    this[namespace] = {

      fetch: function(callback) {
        var url = { path: app.plugins.router.url('homeApi').pathname };

        // perform xhr
        http.get(url, function (res) {
          var buf = [];

          res.on('data', function (chunk) {
            buf.push(chunk);
          });

          res.on('end', function () {
            var model = null;
            var err = null;

            try {
              model = JSON.parse(buf.join(''));
            }
            catch (e) {
              err = e;
            }
            callback(err, model);
          });

        });

        // return url
        return url;
      }
    }
  };
};
