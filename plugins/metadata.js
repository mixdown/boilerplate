var MetaDataPlugin = function() {};

MetaDataPlugin.prototype.attach = function(options) {
  var metadata = options;

  this.metadata.get = function(key) {
    return metadata[key];
  };
};

module.exports = MetaDataPlugin;