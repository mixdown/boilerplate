var geoTools = require('mixdown-geotools');

module.exports = function() {
  var backboneRouter = this;  // backbone calls this handler on page match.
  var router = this.app.plugins.router;

  // https://developer.mozilla.org/en-US/docs/Web/API/window.navigator.geolocation.getCurrentPosition
  navigator.geolocation.getCurrentPosition(

    function(pos) {
      var mapParams = geoTools.rect(pos.coords, 20, 'miles');
      mapParams.sw = mapParams.sw.latitude + ',' + mapParams.sw.longitude;
      mapParams.ne = mapParams.ne.latitude + ',' + mapParams.ne.longitude;
      backboneRouter.navigate( router.url('map', mapParams).pathname, { trigger: true } );
    },

    function(err) {
      eventEmitter.emit('mixdown-error', { component: 'geolocation', error: err });
    }, 

    { enableHighAccuracy: true, maximumAge: 0 }
  );
  
};