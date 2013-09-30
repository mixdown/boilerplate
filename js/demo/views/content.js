var getContainers = require('../../containers.js');

var ContentView = function(options) {

  if (!(this instanceof ContentView)) {
    return new ContentView(options);
  }

  var el = options.el || getContainers().main;
  var app = options.app;
  
  addEventListeners = function() {
    var anchors = el.getElementsByTagName('a');

    // Cannot enumerate NodeList - https://developer.mozilla.org/en-US/docs/Web/API/NodeList
    for (var i = 0; i < anchors.length; i++) {

      anchors[i].addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        e.preventDefault();

        app.plugins.router.navigate(href, function(err, result) {
          if (!result.matched) {
            window.location.href = href;
          }
        });

      }, false);
    }

  };

  this.render = function(model, callback) {
    var buf = [];
    var err = [];

    model.forEach(function(item) {
      app.plugins.render('home/_content', item, function(errRender, html) {
        if (err) { 
          err.push(errRender); 
        }
        buf.push(html);
      });
    });

    el.innerHTML =  buf.join('');
    addEventListeners();
    (typeof callback == 'function') ? callback(err) : null;
  };
};


module.exports = function(namespace) {
  namespace = namespace || 'contentView';

  this.attach = function(options) {
    this[namespace] = function(contentOptions) { 
      contentOptions = contentOptions || {};
      contentOptions.app = options.app;
      return new ContentView(contentOptions);
    };
  };
};
