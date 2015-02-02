angular.module('l42y.analytics').provider('Analytics', function (
) {
  var integrations = {};
  var service = {
    integrations: integrations,
    integrate: integrateAnalyticsProvider,
    page: function trackPageView (current, previous) {
      angular.forEach(integrations, function (actions) {
        actions.page(current, previous);
      });
    },
    track: function trackEvent (event, prop) {
      angular.forEach(integrations, function (actions) {
        actions.track(event, prop);
      });
    }
  };

  var provider = {
    config: {
      integrations: {}
    },
    integrations: integrations,
    integrate: integrateAnalyticsProvider,
    $get: function (
    ) {
      return service;
    }
  };

  function integrateAnalyticsProvider (identifier, actions) {
    integrations[identifier] = actions;
  }

  return provider;
});
