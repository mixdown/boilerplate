var geoTools = require('mixdown-geotools');
var getContainers = require('../../containers.js');

module.exports = function(httpContext) {
  var sw = geoTools.parsePoint(httpContext.params.sw);
  var ne = geoTools.parsePoint(httpContext.params.ne);
  var mid = geoTools.midpoint([sw,ne]);
  var app = httpContext.app;

  app.plugins.render('map/_map', {}, function(err, html) {
    if (err) {
      eventEmitter.emit('error', { component: 'map controller', err: err });
      return;
    }

    var containers = getContainers();
    containers.main.innerHTML = html;
    containers = getContainers(); // refresh containers since we changed the dom
    
    var map = app.plugins.map.getMap(containers.map);

    map.setCenter(new google.maps.LatLng(mid.latitude, mid.longitude));
    map.setZoom(1);

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // zoom/pan/fit map view port
    app.plugins.map.fitBoundsRect({
      sw: sw, 
      ne: ne
    });

    eventEmitter.emit('mixdown-log', { data: {sw: sw, ne: ne, zoom: map.getZoom(), bounds: map.getBounds() } });
  });
};