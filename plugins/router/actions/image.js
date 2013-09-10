module.exports = function(httpContext) {
  var app = httpContext.app;
  var pipelines = app.plugins.pipelines;
  var res = httpContext.response;
  var pl = pipelines.static();

  pl.name += ': ' + httpContext.url.path;

  pl.on('error', function(err, results) {
    if (err) {
      logger.error('Caught error on image pipeline', err);
      console.log(httpContext.params.image_src);
    }

    app.plugins.error.fail(err, res);
  });

  pl.execute({ 
    path: httpContext.url.pathname.replace(/\/img/, ''),
    res: 
    res, 
    locations: ['./img', './' + app.id + '/img'] 
  });

};