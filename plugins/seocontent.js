var MetaDataPlugin = function() {};

MetaDataPlugin.prototype.attach = function(options) {
  var metadata = options;

  this.seocontent = {
    get: function(key) {
      return metadata[key];
    }
  };
};

module.exports = MetaDataPlugin;