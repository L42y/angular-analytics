angular.module('l42y.analytics').directive('analytics', function (
  Analytics
) {
  var identifier = 'analytics';
  var EVENTS = 'click dblclick ' +
        'mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave '
        + 'keydown keyup keypress submit focus blur copy cut paste';

  function getTrackingProps ($attrs) {
    var tracking = {
      props: {}
    };

    angular.forEach($attrs, function (val, key) {
      if (key.substring(0, identifier.length) === identifier &&
          key.length > identifier.length) {
        var param = key.substring(identifier.length).toLowerCase();
        if (param === 'event') {
          tracking.event = val;
        } else {
          tracking.props[param] = val;
        }
      }
    });

    return tracking;
  }

  return {
    compile: function ($element, $attrs) {
      var trackEvents = [];

      $attrs.analytics.split(' ').forEach(function (event) {
        if (EVENTS.indexOf(event) !== -1) {
          trackEvents.push(event);
        }
      });

      trackEvents.forEach(function (event) {
        $element.on(event, function (event) {
          var tracking = getTrackingProps($attrs);
          Analytics.track(tracking.event, tracking.props);
        });
      });
    }
  };
});
