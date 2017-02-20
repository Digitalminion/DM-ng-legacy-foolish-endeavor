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
foolishApp.run(function ($rootScope, $timeout, $log) {});
foolishApp.controller('ArtboardCtrl', function ($scope, $log, $timeout) {
    var self = this;
    var timeout;
    self.pilot = true;
    self.mercury = true;
    self.apollo = true;
    self.mars = true;
    var step = function (s) {
        timeout = $timeout(function () {
            if (s.pilot == false) {
                s.pilot = true;
                s.mercury = false;
                s.apollo = true;
                s.mars = true;
            }
            else if (s.mercury == false) {
                s.pilot = true;
                s.mercury = true;
                s.apollo = false;
                s.mars = true;
            }
            else if (s.apollo == false) {
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
        }, 1000)
    };
    // This function sets the variables to a known state.
    // This is the initial configuration for these variables.
    // When the reset is done, we schedule the timer (step())
    var restart = function () {
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
    $scope.reloadRoute = function () {
        $log.log("Blahblah!");
        restart();
    }
    $scope.startHover = function () {
        $timeout.cancel(timeout);
        step(self);
    }
    $scope.stopHover = function () {
        $timeout.cancel(timeout);
        //timeout = null;
    }
});
foolishApp.controller('AboutCtrl', function ($scope, $timeout, $log) {
    var self = this;
    var timeout;
    $log.log("first step");
    var step = function (a) {
        timeout = $timeout(function () {
            
            var m_array = [a.Petal_1, a.Petal_2, a.Petal_3, a.Petal_4, a.Petal_5]
            
            switch (true) {
            case (a.Petal_1 && a.Petal_2 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_1 = false;
                a.Petal_2 = true;
                a.Petal_3 = true;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_1 && a.Petal_2 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_1 = false;
                a.Petal_2 = false;
                a.Petal_3 = true;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_1 && !a.Petal_2 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_1 = false;
                a.Petal_2 = false;
                a.Petal_3 = false;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_1 && !a.Petal_2 && !a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_1 = false;
                a.Petal_2 = false;
                a.Petal_3 = false;
                a.Petal_4 = false;
                a.Petal_5 = true;
                break;
            case (!a.Petal_1 && !a.Petal_2 && !a.Petal_3 && !a.Petal_4 && a.Petal_5):
                a.Petal_1 = false;
                a.Petal_2 = false;
                a.Petal_3 = false;
                a.Petal_4 = false;
                a.Petal_5 = false;
                break;
            default:
                a.Petal_1 = true;
                a.Petal_2 = true;
                a.Petal_3 = true;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            }
            step(a);
        }, 1000)
    };
    var restart = function () {
        $timeout.cancel(timeout);
        timeout = null;
        self.Petal_1 = true;
        self.Petal_2 = true;
        self.Petal_3 = true;
        self.Petal_4 = true;
        self.Petal_5 = true;
        step(self);
    }
    restart();
    //        $scope.reloadRoute = function(){
    //        $log.log("Here I Am!");
    //        restart();
    //    }
    //
    //        $scope.startHover = function(){
    //        $timeout.cancel(timeout);
    //        step(self);
    //    }
    //    $scope.stopHover = function(){
    //        $timeout.cancel(timeout);
    //        timeout = null;
    //    }
});