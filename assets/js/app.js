var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngAnimate']);

foolishApp.config(function($routeProvider){
  $routeProvider.when("/",
   {
     templateUrl: "assets/tpl/home.html",
     controller: "ArtboardCtrl",
     controllerAs: "artboard"
   }).when("/about",
   {
     templateUrl: "assets/tpl/about.html",
     controller: "AboutCtrl",
     controllerAs: "about"
   }
 );
});
foolishApp.run(function($rootScope,$timeout, $log) {
    $log.log("Things are starting");
    $rootScope.timeInMs=0;
    var countUp = function(data) {
        $rootScope.timeInMs+= 500;
        $log.log(data + ' - Current time: ' + $rootScope.timeInMs)
        $timeout(countUp('Not the first time any more'), 500);
    }
    $log.log("Start - Current time: 0")
    $timeout(countUp('First pass'), 500);
});
foolishApp.controller('ArtboardCtrl', function() {
  //nothing here yet
});

foolishApp.controller('AboutCtrl', function() {
  //nothing here yet
});