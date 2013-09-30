var geoTools = require('mixdown-geotools');

module.exports = function(httpContext) {
  var router = httpContext.app.plugins.router;

  // https://developer.mozilla.org/en-US/docs/Web/API/window.navigator.geolocation.getCurrentPosition
  navigator.geolocation.getCurrentPosition(

    function(pos) {

      var mapParams = geoTools.rect(pos.coords, 10, 'miles');
      mapParams.sw = mapParams.sw.latitude + ',' + mapParams.sw.longitude;
      mapParams.ne = mapParams.ne.latitude + ',' + mapParams.ne.longitude;
      router.navigate('map', mapParams);
    },

    function(err) {
      eventEmitter.emit('mixdown-error', { component: 'geolocation', error: err });
    }, 

    { enableHighAccuracy: true, maximumAge: 0 }
  );
  
};