var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngAnimate']);

foolishApp.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "assets/tpl/home.html",
      controller: "ArtboardCtrl",
      controllerAs: "artboard"
    }

  $routeProvider.when("/about",
    {
      templateUrl: "assets/tpl/about.html",
      controller: "AboutCtrl",
      controllerAs: "about"
    }
  );
});

foolishApp.controller('ArtboardCtrl', function() {
  //nothing here yet
});