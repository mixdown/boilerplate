var TemplatesModel = require('./templates.js');
var _ = require('lodash');

module.exports = function(app) {
  var tvm = new TemplatesModel({}, { app: app });
  var pending = [];

  return {
    all: function(callback) {
      pending.push(callback);

      var processPending = function(err, tcache) {

        _.each(pending, function(cb) {
          cb(err, tcache);
        });

        // clear queue.
        pending.length = 0;
      };

      // if cache loaded, then fire all pending callbacks.
      if (tvm.tcache) {
        processPending(null, tvm.tcache);
      }

      // if this is the first time it is being called, then load cache.
      else if (pending.length === 1) {

        tvm.fetch({
          success: function(dict) {
            tvm.tcache = dict.toJSON();
            processPending(null, tvm.tcache);
          },
          error: function(model, response) {

            // send response as error
            processPending(response);
          }
        });
      }
    }
  };

};