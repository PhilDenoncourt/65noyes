'use strict';

(function() {
  class temperature {
    static get $inject() { return []};
  }


  angular.module('65noyesApp').component( 'temperature',
    {
      controller:temperature,
      templateUrl: 'app/temperature/temperature.html',
      require: {
        main:'^main'
      }
    }
  ).filter('capitalize', function() {
    return function(token) {
      if (token) {
        return token.charAt(0).toUpperCase() + token.slice(1);
      }
    }
  });
})();
