module.exports = function(httpContext) {
  var app = httpContext.app;
  var res = httpContext.response;
  var headers = app.config.plugins.static.options.headers;

  app.plugins.json(app.plugins.db.home, res, headers);
};