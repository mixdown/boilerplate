// Fake database plugin.  This is here to show that you can use anything for data interface.
var FakeDatabase = function(namespace) {

  if (!this instanceof FakeDatabase) {
    throw new Error('Please instantiate using keyword "new."  Broadway expects this.');
  }

  namespace = namespace || 'db';

  this.attach = function(options) {
    this[namespace] = {
      "home": [
        {
          "title": "Mixdown Server",
          "href": "https://github.com/mixdown/server",
          "description": "Main library for mixdown.  Handles configuration parsing, app init for all apps.  Also includes server and cluster support if you are making a web app."
        },
        {
          "title": "Mixdown Plugins",
          "href": "https://github.com/mixdown/plugins",
          "description": "Common plugins for websites."
        },
        {
          "title": "Mixdown Pipelines",
          "href": "https://github.com/mixdown/pipelines",
          "description": "Common plugins for websites."
        },
        {
          "title": "Node Pipeline",
          "href": "https://github.com/tommydudebreaux/pipeline",
          "description": "Task sequencing for handling complex async set of operations.  Similar to async.waterfall, but with a more expressive inteface and more event emitter feedback.  Solves same problem as promises without the overhead."
        },
        {
          "title": "Broadway Handlebars",
          "href": "https://github.com/vast-eng/broadway-handlebars",
          "description": "Broadway / Mixdown plugin for using the Handlebars template engine.  Contains factory support and a few enhancements to helpers.  This will also work clientside as a plugin."
        },
        {
          "title": "Show me a demo!",
          "href": "/geo",
          "description": "Takes you to a geolocation page that redirects to a traffic map."
        }
      ]
    };
  };

};

module.exports = FakeDatabase;
