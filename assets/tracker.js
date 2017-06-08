(function() {
  window.lucybot.tracker = function(name, properties) {
    if (window.lucybot.prerender) return;
    if (window.mixpanel) {
      window.mixpanel.track(name, properties);
    }
    if (window.ga) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: name,
        eventAction: name,
        eventLabel: name,
        eventValue: JSON.stringify(properties),
      });
    }
  }
})();
