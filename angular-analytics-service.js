angular.module('l42y.analytics').provider('Analytics', function (
) {
  var integrations = {};
  var service = {
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
    integrate: function integrateAnalyticsProvider (identifier, actions) {
      provider.integrations[identifier] = actions;
    },
    $get: function (
      $window,
      $location,
      $rootScope
    ) {
      return service;
    }
  };

  return provider;
});
