module.exports = function(namespace) {
  namespace = namespace || 'map';

  var _map = null;
  var options = null;
  var liveMarkers = {};
  var markerPool = []; // create a pool of markers for re-use
  var hoverListener = null;

  this.attach = function(opt) {
    options = opt;

    var self = {

      getMap: function(el, mapOptions) {

        if (_map) {
          return _map;
        }

        mapOptions = mapOptions || {};

        // defaults
        for(key in options.mapOptions) {
          if (!mapOptions[key]) {
            mapOptions[key] = options.mapOptions[key];
          }
        }

        if (!mapOptions.center) {
          mapOptions.center = new google.maps.LatLng(-29, -95);
        }

        _map = new google.maps.Map(el, options.mapOptions);
        self.addEventListeners();
        return _map;
      },

      fitBoundsRect: function(rect) {
        var map = self.getMap();

        // size and position map.
        map.fitBounds(new google.maps.LatLngBounds(
          new google.maps.LatLng(rect.sw.latitude, rect.sw.longitude),
          new google.maps.LatLng(rect.ne.latitude, rect.ne.longitude)
        ));

      },

      removeEventListeners: function() {
        var map = self.getMap();

        google.maps.event.clearListeners(map, 'dragend');
        google.maps.event.clearListeners(map, 'zoom_changed');
        google.maps.event.clearListeners(map, 'dblclick');

        // If we don't remove the event emitter, then 
        // 1. EventEmitter throws an exception because too many listeners are attached.
        // 2. this event listener (and by closure this instance) will never get GC'd and memory will grow. 
        if (hoverListener) {
          eventEmitter.removeListener('vast-property-hover', hoverListener);
          hoverListener = null;
        }
      },
      
      addEventListeners: function() {
        var map = self.getMap();
        var bounds = null;
        var mapTimeout = null;

        var handleMapChange = function() {
          if (!bounds) {
            return;
          }
          eventEmitter.emit('vast-search-changed', {
            sw: bounds.getSouthWest().toUrlValue(),
            ne: bounds.getNorthEast().toUrlValue()
          });
        };

        var mapChange = function() {

          // refresh search
          var bounds = map.getBounds();

          if (mapTimeout) {
            clearTimeout(mapTimeout);
          }

          mapTimeout = setTimeout(handleMapChange, 800);
        };

        // first load should load the events after the entire map is up.
        google.maps.event.addListener(map, 'dragend', mapChange);
        google.maps.event.addListener(map, 'dblclick', mapChange);
        google.maps.event.addListener(map, 'zoom_changed', mapChange);


        // // create pointer to the event handler for marker change so we can undelegate this event.
        // // These events are fired from external widgets or page events.
        // hoverListener = function (options) {
        //   var marker = self.getMarker(options.id);

        //   // check that we are showing a marker for this property 
        //   // (in a transition state, an old one may have been removed before this event handler executes)
        //   if (marker) {
        //     marker.setMarkerType(options.marker);
        //   }
        // };

        // // add the marker
        // eventEmitter.on('vast-property-hover', hoverListener);

      },

      addMarker: function(markerOptions) {
        var map = self.getMap();
        var marker = app.plugins.map.getMarker();

        marker.model = markerOptions.model;
        marker.setMap(map);
        marker.setPosition(markerOptions.latitude || model.latitude, markerOptions.longitude || model.longitude);

        return marker;
      },

      getMarker: function(id) {
        if (id && liveMarkers[id]) {
          return liveMarkers[id];
        }

        var m = markerPool.pop();

        if (!m) {
          m = new MarkerView({          
            title: 'Click for details',
            app: app
          });

          m.id = Object.keys(liveMarkers).length + 1;  // assign a tracking id.
        }

        liveMarkers[m.id] = m;

        return m;
      },

      clearMarkers: function() {
        for(k in liveMarkers) {
          self.removeMarker(liveMarkers[k]);
        }
      },

      removeMarker: function(m) {
        // remove from used hash
        delete liveMarkers[m.id];

        m.map = null;
        m.position = null;

        // add to marker pool.
        markerPool.push(m);
      }

    };

    this[namespace] = self;
  };

  this.init = function(done) {

    window.gmapsLoaded = function() {
      delete window.gmapsLoaded;
      done();
    };

    var s = document.createElement('script'); 
    s.type = 'text/javascript'; 
    s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'maps.googleapis.com/maps/api/js?key=' + 
        options.apikey + '&sensor=false&callback=gmapsLoaded'; 
    document.getElementsByTagName('head')[0].appendChild(s);
  };
};