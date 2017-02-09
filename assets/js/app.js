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
foolishApp.controller('ArtboardCtrl', function ($scope, $log, $timeout) {
    var self = this;
    var status;
    var index;
    var timeout;
    
    //
    // Note that we no longer initialize variables up top here,
    // but rather we do it in an initialization function below
    //
    //var status = [false, true, true, true];
    //var index = 0;
    //var timeout = null;
    //this.pilot = status[0];
    //this.mercury = status[1];
    //this.apollo = status[2];
    //this.mars = status[3];
    
    //
    // This function schedules a timer to move the SVG forward one step
    // The embedded function is passed to $timeout() which results in a promise
    // which we save as "this.timeout"
    // Note that "this" and "self" mean this controller.
    // However, inside the promise, "this" becomes the context of the promise,
    // and not the context of the controller!  That's why we save the context
    // of the controller in the "self" local variable, so it is visible here.
    //
    var step = function(s) {
        timeout = $timeout(function() {
            // Advance the "index" by one, wrapping around if necessary.
            // This chould also be done as:
            //      index = (index + 1) % status.length
            var lastindex = index;
            index += 1;
            if (index == status.length) {
                index = 0;
            };

            // Update the internal state of the astronauts,
            // then sync the svg to our internal state.
            status[lastindex] = true;
            status[index] = false;
            self.pilot = status[0];
            self.mercury = status[1];
            self.apollo = status[2];
            self.mars = status[3];

            // Finally, call ourselves again to schedule another step
            step(self)
        }, 1000)
    };
    
    // This function sets the variables to a known state.
    // This is the initial configuration for these variables.
    // When the reset is done, we schedule the timer (step())
    var restart = function(){
        // If there is currently a timeout pending, cancel it.
        $timeout.cancel(timeout);
        //timeout = null;

        // Set the variables to a known initial state
        status = [false, true, true, true];
        index = 0;
        
        // Sync the SVG to our internal state
        self.pilot = status[0];
        self.mercury = status[1];
        self.apollo = status[2];
        self.mars = status[3];

        // Start the stepping process
        step(self)
    };
    
    // Bootstrap the SVG the first time we load it.
    //restart(); 
    
    // This is an ng-click callback from an SVG, we reset the state.
    $scope.reloadRoute = function(){
        $log.log("Blahblah!");
        restart()
    }
});



     
foolishApp.controller('AboutCtrl', function () {
    //nothing here yet
});