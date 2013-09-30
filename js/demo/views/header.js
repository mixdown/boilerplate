var getContainers = require('../../containers.js');

var HeaderView = function(options) {

  if (!(this instanceof HeaderView)) {
    return new HeaderView(options);
  }

  var el = options.el || getContainers().header;
  var app = options.app;
  var anchors = el.getElementsByTagName('a');

  // Cannot enumerate NodeList - https://developer.mozilla.org/en-US/docs/Web/API/NodeList
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
      app.plugins.router.navigate(this.getAttribute('href'));
      e.preventDefault();
    }, false);
  }

};


module.exports = function(namespace) {
  namespace = namespace || 'headerView';

  this.attach = function(options) {
    this[namespace] = function(headerOptions) { 
      headerOptions = headerOptions || {};
      headerOptions.app = options.app;
      return new HeaderView(headerOptions);
    };
  };
};