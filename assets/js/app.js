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
    $rootScope.pass=1;
    var countUp = function(message, pass) {
        $log.log(message + ' - ' + pass)
        if(pass == 1){
            message = 'even';
            pass+= 1;
            time = 10000;
        }
        else{
            message = 'odd';
            pass-= 1;
            time = 1000000000;
        }
        $timeout(countUp(message, pass), time);
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