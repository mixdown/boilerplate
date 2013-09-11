var geoTools = require('mixdown-geotools');

var loadMap = function() {
  if (!window.google || !window.google.maps) {

    var src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'maps.googleapis.com/maps/api/js?key=' + 
        window.MIXDOWN.plugins.googleMaps.apikey + '&sensor=false&callback=gmapsLoaded';

    var s = document.createElement('script'); 
    s.type = 'text/javascript'; 
    s.src = src; 
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  else {
    window.gmapsLoaded();  
  }
};




module.exports = function(sw, ne) {
  sw = geoTools.parsePoint(sw);
  ne = geoTools.parsePoint(ne);

  var mid = geoTools.midpoint([sw,ne]);
  
  window.gmapsLoaded = function() {
    var myLatlng = new google.maps.LatLng(mid.latitude, mid.longitude);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(sw.latitude, sw.longitude),
      new google.maps.LatLng(ne.latitude, ne.longitude)
    );

    map.fitBounds(newBounds);

  };

  var $main = this.app.plugins.containers.$main;
  this.app.plugins.render('map/_map', {}, function(err, html) {
    $main.html(html);
    loadMap();
  });
};