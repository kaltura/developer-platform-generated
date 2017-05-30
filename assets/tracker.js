(function() {
  window.lucybot.tracker = function(name, properties) {
    if (window.lucybot.prerender) return;
    window.mixpanel.track(name, properties);
    window.ga('send', {
      hitType: 'event',
      eventCategory: name,
      eventAction: name,
      eventLabel: name,
      eventValue: JSON.stringify(properties),
    });
  }
})();
