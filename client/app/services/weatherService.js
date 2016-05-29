'use strict';

(function() {
  class weatherService {
    static $inject=['$http']

    constructor($http) {
      this.$http = $http;
    }

    get() {
      return this.$http.get(
        'api/weather'
      ).then(function(rslt) {
        return rslt.data;
      });
    }
  }

  angular.module('65noyesApp').service('weatherService', weatherService);
})();
