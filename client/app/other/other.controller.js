'use strict';

(function() {
  class other {
    static get $inject() {return []};
  }

  angular.module('65noyesApp').component( 'other',
    {
      controller:other,
      templateUrl: 'app/other/other.html',
      require: {
        main:'^main'
      }
    }
  );
})();
