// container pointers
module.exports = function() {
  return {
    wrapper: document.getElementById('mixdown-container'),
    main: document.getElementById('mixdown-main'),
    left: document.getElementById('mixdown-left'),
    right: document.getElementById('mixdown-right'),
    map: document.getElementById('mixdown-map'),
    header: document.getElementsByTagName('header')[0]
  };
}