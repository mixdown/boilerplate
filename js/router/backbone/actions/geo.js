var geoTools = require('mixdown-geotools');

module.exports = function() {

  // https://developer.mozilla.org/en-US/docs/Web/API/window.navigator.geolocation.getCurrentPosition
  navigator.geolocation.getCurrentPosition(

    function(pos) {
      var mapParams = geoTools.rect(pos.coords, 20, 'miles');
      backboneRouter.navigate( router.url('map', mapParams).pathname, { trigger: true } );
    },

    function(err) {
      eventEmitter.emit('mixdown-error', { component: 'geolocation', error: err });
    }, 

    { enableHighAccuracy: true, maximumAge: 0 }
  );
  
};