// container pointers
var Containers = function() {

  this.attach = function(options) {
    var app = options.app;
    var $ = app.$;

    this.containers = {
      $wrapper: $('#mixdown-container'),
      $main: $('#mixdown-main'),
      $left: $('#mixdown-left')
    };
  };

};
module.exports = Containers;