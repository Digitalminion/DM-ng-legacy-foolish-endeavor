var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngAnimate']);
foolishApp.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "assets/tpl/home.html"
        , controller: "ArtboardCtrl"
        , controllerAs: "artboard"
    }).when("/about", {
        templateUrl: "assets/tpl/about.html"
        , controller: "AboutCtrl"
        , controllerAs: "about"
    });
});
foolishApp.run(function ($rootScope, $timeout, $log) {
    //    var hide = true;
    //    $rootScope.pageMessage =" Sometimes art happens. For such occassions, we have this space to contain it all"
    //    var timer;
    //    $log.log("Things are starting");
    //    $rootScope.pass=1;
    //    var countUp = function(message, bool) {
    //        $log.log(message + ' - ' + bool)
    //        if(bool == 1){
    //            message = 'even';
    //            bool+= 1;
    //        }
    //        else{
    //            message = 'odd';
    //            bool-= 1;
    //        }
    //        $rootScope.pass+=1;
    //        if($rootScope.pass < 10){
    //            $timeout(function(){countUp(message, bool)}, 1000);
    //        }
    //    }
    //    var passOne = 'First pass'
    //    $timeout(countUp(passOne, $rootScope.pass), 1000);
    //    COMMENT: The above var passOne declaration is actually redundant but is 
    //    included for the clarity that the countUp function can take either a raw 
    //    string or a variable that has been set with a string. The following line:
    //    $timeout(countUp('First pass', $rootScope.pass), 10000);
    //    would be valid without the need to declare var passOne;
    //    TASK: In this area create a new function that changes the 
    //    "$rootScope.pageMessage" to another message after 10 seconds
    //    <--- Begin task code --->
    //   var changeMessage = function(bool) {
    //       if (bool == 1) {
    //           bool += 1
    //           $rootScope.pageMessage = " Sometimes art happens. For such occassions, we have this space to contain it all"
    //       }
    //       else {
    //           bool -= 1
    //           $rootScope.pageMessage = "Hi Austin! I got it to say another thing"
    //       }
    //       $timeout(function(){changeMessage(bool)}, 10000)
    //   }
    //   changeMessage(1)
    //    <--- End task code --->
});
foolishApp.controller('ArtboardCtrl', function ($scope,$log, $timeout) {
    var status = [false, true, true, true];
    var index = 0;
    var timer = 1000;
    
    this.pilot = status[0];
    this.mercury = status[1];
    this.apollo = status[2];
    this.mars = status[3];
    
    var refresh = function(s){
        $timeout(function(){
        var lastindex = index;
        index += 1;
        if (index == status.length) {
            index = 0;
        };
        
        status[lastindex] = true;
        status[index] = false;
        $log.log("test");

        s.pilot = status[0];
        s.mercury = status[1];
        s.apollo = status[2];
        s.mars = status[3];
        refresh(s)
        
        }, 1000);
    };
    
    refresh(this); 
    
    $scope.reloadRoute = function(){
        $log.log("Blahblah!");
        $route.reload(); 
    }
});



     
foolishApp.controller('AboutCtrl', function () {
    //nothing here yet
});