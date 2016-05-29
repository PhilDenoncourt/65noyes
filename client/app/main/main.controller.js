'use strict';

(function() {

class MainController {

  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  $onInit() {
    var ctrl = this;
    this.weatherService.get().then(function(weather) {
      ctrl.weather = weather;
    });
  }


}

angular.module('65noyesApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
