var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngAnimate']);

foolishApp.config(function($routeProvider, $locationProvider){
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
    $locationProvider.html5Mode(true);
});

foolishApp.controller('ArtboardCtrl', function() {
  //nothing here yet
});

foolishApp.controller('AboutCtrl', function() {
  //nothing here yet
});