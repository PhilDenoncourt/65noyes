'use strict';

(function() {
  class celestial {
    static get $inject() {return []};
  }

  angular.module('65noyesApp').component( 'celestial',
    {
      controller:celestial,
      templateUrl: 'app/celestial/celestial.html',
      require: {
        main:'^main'
      }
    }
  );
})();
