module.exports = function(httpContext) {
  var app = httpContext.app;
  var res = httpContext.response;
  var routeName = httpContext.route.name;
debugger;
  if (!app.plugins.seocontent) {
    app.plugins.error.fail(new Error('Metadata plugin not attached. Did you attach it?'), res);
    return;
  }

  var viewModel = {
    seocontent: app.plugins.seocontent.get(routeName)
  };

  app.plugins.render(routeName, viewModel, function(err, html) {
    if (err) {
      app.plugins.error.fail(err, res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

  });

};