// Load our version of jquery (2.x) and then no conflict global scope back to previous.
require('./vendor/jquery/jquery.js');

var $ = global.jQuery;
jQuery.noConflict(true);

var Backbone = require('backbone');
Backbone.$ = $;

module.exports = {
  $: $,
  _: require('lodash'),
  Backbone: Backbone,
  broadway: require('./vendor/broadway/broadway-shim.js'),
  TemplatesModel: require('./models/templates/templates.js')
};
