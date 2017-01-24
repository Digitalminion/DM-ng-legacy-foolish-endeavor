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
    var timer;
    $log.log("Things are starting");
    $rootScope.pass=1;
    var countUp = function(message, bool) {
        $log.log(message + ' - ' + bool)
        if(bool == 1){
            message = 'even';
            bool+= 1;
        }
        else{
            message = 'odd';
            bool-= 1;
        }
        $rootScope.pass+=1;
        if($rootScope.pass < 10){
            $timeout(countUp(message, bool), 1000);
        }
    }
    var passOne = 'First pass'
    $timeout(countUp(passOne, $rootScope.pass), 1000);
//    COMMENT: The above var passOne declaration is actually redundant but is 
//    included for the clarity that the countUp function can take either a raw 
//    string or a variable that has been set with a string. The following line:
//    $timeout(countUp('First pass', $rootScope.pass), 10000);
//    would be valid without the need to declare var passOne;
});
foolishApp.controller('ArtboardCtrl', function() {
  //nothing here yet
});

foolishApp.controller('AboutCtrl', function() {
  //nothing here yet
});