var Mixdown = require('mixdown');
var config = require( './mixdown.json');
var packageJSON = require('./package.json');
var util = require('util');

var mixdown = new Mixdown(config);

mixdown.on('error', function(err) {
  console.info(err);
});

try {
  var env = require('./mixdown-' + process.env.MIXDOWN_ENV + '.json');
  mixdown.env(env);
}
catch(e) {}

mixdown.start(function(err) {

  logger.info(packageJSON.name + ' version: ' + packageJSON.version);

  if (err) {
    if (logger) {
      logger.error('Server did not start');
    }
    else {
      console.log('Server did not start');
    }

    process.exit();
  }
});