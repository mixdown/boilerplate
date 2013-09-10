module.exports = function(httpContext) {
  var app = httpContext.app;
  var pipelines = app.plugins.pipelines;
  var res = httpContext.response;
  var pl = pipelines.static();

  var pl = app.plugins.less.pipeline();
  pl.name += ': ' + httpContext.url.path;
  
  var sent = false;
  var sendResponse = function(err, results) {
    if (!sent) {
      sent = true;

      if (err) {
        app.plugins.error.fail(err, res);
      }
      else {
        var cssContent = results && results.length ? results[results.length - 1] : null;

        app.plugins.static.stream({
          path: httpContext.url.pathname,
          res: res,
          content: cssContent 
        }, function(err) {
          app.plugins.error.fail(err, res);
        });

      }
    }
  };

  pl.on('error', sendResponse).on('end', sendResponse).execute({
    file: './less/' + httpContext.params.css_src.replace(/\.css$/, '.less')
  });
  
};