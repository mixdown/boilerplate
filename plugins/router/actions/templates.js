module.exports = function(httpContext) {
  var app = httpContext.app;
  var res = httpContext.response;
  var headers = app.config.plugins.static.options.headers;

  app.plugins.templates(function(err, templates) {
    if (err) {
      app.plugins.error.fail(err, res);
    }
    else {
      app.plugins.json(templates, res, headers);
    }
  });
};