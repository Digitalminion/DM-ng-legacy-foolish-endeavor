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
    
});
foolishApp.controller('ArtboardCtrl', function ($scope, $log, $timeout) {
    var self = this;
    var timeout;
    
    self.pilot = true;
    self.mercury = true;
    self.apollo = true;
    self.mars = true;    

    var step = function(s) {
        timeout = $timeout(function() {
           
            if (s.pilot==false){
            s.pilot = true;
            s.mercury = false;
            s.apollo = true;
            s.mars = true;
            }
            else if(s.mercury==false){
            s.pilot = true;
            s.mercury = true;
            s.apollo = false;
            s.mars = true;               
            }
            else if(s.apollo==false){
            s.pilot = true;
            s.mercury = true;
            s.apollo = true;
            s.mars = false;
            }
            else {
            s.pilot = false;
            s.mercury = true;
            s.apollo = true;
            s.mars = true; 
            }
            // Finally, call ourselves again to schedule another step
            step(s)
        }, 1000)};
    
    // This function sets the variables to a known state.
    // This is the initial configuration for these variables.
    // When the reset is done, we schedule the timer (step())
    var restart = function(){
        // If there is currently a timeout pending, cancel it.
        $timeout.cancel(timeout);
        //timeout = null;
        
        // Sync the SVG to our internal state
        self.pilot = false;
        self.mercury = true;
        self.apollo = true;
        self.mars = true;  

        // Start the stepping process
        step(self)
    };
    
    // Bootstrap the SVG the first time we load it.
    //restart(); 
    
    // This is an ng-click callback from an SVG, we reset the state.
    $scope.reloadRoute = function(){
        $log.log("Blahblah!");
        restart();
    }


    $scope.startHover = function(){
        $timeout.cancel(timeout);
        step();
    }
    $scope.stopHover = function(){
        $timeout.cancel(timeout);
        timeout = null;
    }

});
     
foolishApp.controller('AboutCtrl', function ($scope, $timeout, $log) 
{
    var self= this;
    var timeout;
    
    self.Petal_6=false;
    self.Petal_5=false;
    self.Petal_4=false;
    self.Petal_2=true;
    self.Petal_1=true;
    $log.log("first step");
    
        
//        var step= function(a){
//            timeout = $timeout(function(){
//            
//            if (a.Petal_6==false){
//                    a.Petal_6=false;
//                    a.Petal_5=false;
//                    a.Petal_4=true;
//                    a.Petal_2=true;
//                    a.Petal_1=true;
//                    $log.log("step 2");
//                    }
//            else if (a.Petal_5==false){
//                    a.Petal_6=false;
//                    a.Petal_5=false;
//                    a.Petal_4=false;
//                    a.Petal_2=true;
//                    a.Petal_1=true;
//                    }
//            else if (a.Petal_4==false){
//                    a.Petal_6=false;
//                    a.Petal_5=false;
//                    a.Petal_4=false;
//                    a.Petal_2=true;
//                    a.Petal_1=true;
//                    }
//            else if (a.Petal_3==false){
//                    a.Petal_6=false;
//                    a.Petal_5=false;
//                    a.Petal_4=false;
//                    a.Petal_2=false;
//                    a.Petal_1=true;
//                    }
//            else if (a.Petal_2==false){
//                    a.Petal_6=false;
//                    a.Petal_5=false;
//                    a.Petal_4=false;
//                    a.Petal_2=false;
//                    a.Petal_1=false;
//                    }
////            else{
////                    a.Petal_6=true;
////                    a.Petal_5=true;
////                    a.Petal_4=true;
////                    a.Petal_2=true;
////                    a.Petal_1=true;
////                    }
//            step(a);  
//            }, 1000)};
//
//    var restart= function(){
//        $timeout.cancel(timeout);
//        timeout=null;
//        
//                    a.Petal_6=true;
//                    a.Petal_5=true;
//                    a.Petal_4=true;
//                    a.Petal_2=true;
//                    a.Petal_1=true;
//        
//        step(self);
//    }
//    
//        $scope.startHover = function(){
//        $timeout.cancel(timeout);
//        step();
//    }
//    $scope.stopHover = function(){
//        $timeout.cancel(timeout);
//        timeout = null;
//    }
    
});