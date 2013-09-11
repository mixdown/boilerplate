var fs = require('fs');

module.exports = function(httpContext) {
  var app = httpContext.app;
  var pipelines = app.plugins.pipelines;
  var req = httpContext.request;
  var res = httpContext.response;
  var pl = pipelines.generic();

  var compress = function(path, callback) {
    fs.exists(path, function(exists) {
      if (exists) {
        try {
          app.plugins.browserify(path, callback);
        } catch (e) {
          callback(e);
        }
      }
      else {
        callback();
      }
    });
  };
  
  pl.name += ': ' + httpContext.url.path;

  pl.on('error', function(err, results) {
    if (err) {
      logger.error('Caught error on JS pipeline', err);
    }

    app.plugins.error.fail(err, res);
  });

  pl.use(function(results, next) {
    compress(results[0].pathname, next);
  });

  pl.on('end', function(err, results) {
    
    if (!err) {
      var jscontent = 'window.MIXDOWN = ' + 
      JSON.stringify({
        plugins: {
          // send the routes down to the client with the main.js file.
          router: { "routes" : app.plugins.router.lightRoutes },
          googleMaps: app.plugins.googleMaps
        }
      }) + ';'
      + results[results.length-1];

      app.plugins.static.stream({
        path: httpContext.url.pathname,
        res: res,
        content: jscontent
      }, function(err) {
        app.plugins.error.fail(err, res);
      });
    }
  });

  pl.execute({ req: req, res: res, pathname: './js/' + httpContext.params.js_src });

};