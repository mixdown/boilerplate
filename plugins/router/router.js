var Router = require('./router-impl.js');

Router.prototype.page = require('./actions/page.js');
Router.prototype.image = require('./actions/image.js');
Router.prototype.css = require('./actions/css.js');
Router.prototype.js = require('./actions/js.js');
Router.prototype.templates = require('./actions/templates.js');
Router.prototype.manifest = require('./actions/manifest.js');
Router.prototype.homeApi = require('./actions/home.js');

module.exports = Router;