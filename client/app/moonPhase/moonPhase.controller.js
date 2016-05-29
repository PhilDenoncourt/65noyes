'use strict';

(function() {
  class moonPhase {
    static $inject=[];
  }


  angular.module('65noyesApp').component( 'moonPhase',
    {
      controller:moonPhase,
      templateUrl: 'app/moonPhase/moonPhase.html',
      require: {
        main:'^main'
      }
    }
  );
})();
