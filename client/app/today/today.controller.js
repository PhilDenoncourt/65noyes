'use strict';

(function() {
  class today {
    static $inject=['$interval'];

    constructor($interval) {
      this.now = new Date();
      var self = this;
      $interval(function() {
        self.now = new Date();
      },60000);
    }
  }


  angular.module('65noyesApp').component( 'today',
    {
      controller:today,
      templateUrl: 'app/today/today.html',
      require: {
        main:'^main'
      }
    }
  );
})();
