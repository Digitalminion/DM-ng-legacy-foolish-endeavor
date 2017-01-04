angular.module('foolishApp', ['ngRoute'])

.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "assets/tpl/home.html",
      controller: "ArtboardCtrl",
      controllerAs: "artboard"
    }
  );
})

.controller('ArtboardCtrl', function() {
  //nothing here yet
});