// Once initialization is complete, we should hook up events.

eventEmitter.on('mixdown-ready', function(app) {
  var $wrapper = require('../containers.js')(app).$wrapper;

  // This little buddy handles the state transitions between the left and right panels.  
  // It does it using css classes, but you could do anything here.
  eventEmitter.on('mixdown-responsive-change', function (data) {
    var newClass = null;
    var state = data.state;

    // ignore invalid state value
    if (['left', 'clear'].indexOf(state) < 0) {
      return;
    }

    if (state === 'left') {
      newClass = 'show-left';
    }

    $wrapper.removeClass().addClass(newClass);
  });

});