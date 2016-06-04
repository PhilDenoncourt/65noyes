'use strict';

(function() {
  class forecast {
    static get $inject() {return []};
  }

  angular.module('65noyesApp').component( 'forecast',
    {
      controller:forecast,
      templateUrl: 'app/forecast/forecast.html',
      require: {
        main:'^main'
      }
    }
  );
})();
