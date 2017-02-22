var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ngMaterial', 'ngAria']);
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

// See https://material.angularjs.org/1.1.1/api/service/$mdThemingProvider
// See https://material.angularjs.org/1.1.0/demo/colors for the list of "pallettes" you can use.

//
// In theory, you could control the theming here, using javascript:
// But I also specified the color unconditionally in the html 
//      <md-content class="md-padding" style="background:#66313f" />
// Unconditionally setting the CSS like this nullifies a lot of the neat animations
// that Material gives you.  You may want to remove that CSS in the html, and uncomment
// this, if you want to play around with it.
//
//foolishApp.config(function($mdThemingProvider) {
//    $mdThemingProvider
//        .theme('docs-dark', 'default')  // Create a theme "docs-dark" copied from "default"
//        .primaryPalette('cyan')         // (Not sure yet)
//        .warnPalette('green')           // (Not sure yet)
//        .accentPalette('grey')          // These are the colors of the text
//        .backgroundPalette('red')       // These are the colors of the underline, and "highlighted".
//        //.dark()      // This inverts the colors, in a weird way
//        ;
//});

//
// For more informatino about how to define a pallette (ie, with your own colors),
// check out https://material.angularjs.org/latest/Theming/03_configuring_a_theme.
//
// The colors used by a theme are identified by a number (like "500"), and you can
// create a new pallette as a clone from an existing one, and redefine the colors.
// 
// There are also builtin themes, using builtin pallettees, but you can apparently
// create a new theme as a clone from an existing one, and replace the pallettes.
// 
// All these changes appear to be made through javascript, not CSS.
//


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
                $scope.currentNavItem="About";
            }
            else if (s.mercury == false) {
                s.pilot = true;
                s.mercury = true;
                s.apollo = false;
                s.mars = true;
                $scope.currentNavItem="Portfolio";
            }
            else if (s.apollo == false) {
                s.pilot = true;
                s.mercury = true;
                s.apollo = true;
                s.mars = false;
                $scope.currentNavItem="Contact";
            }
            else {
                s.pilot = false;
                s.mercury = true;
                s.apollo = true;
                s.mars = true;
                $scope.currentNavItem="Home";
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
    
    // You change this to change the "current" highlighted nav item.
    // I haven't tested whether you can change it above and have it show up.
    $scope.currentNavItem="Home";
});
foolishApp.controller('AboutCtrl', function ($scope, $timeout, $log) {
    var self = this;
    var timeout;
    $log.log("first step");
    var step = function (a) {
        timeout = $timeout(function () {
            
            var m_array = [a.Petal_2, a.Petal_1, a.Petal_3, a.Petal_4, a.Petal_5]
            
            switch (true) {
            case (a.Petal_2 && a.Petal_1 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_2 = false;
                a.Petal_1 = true;
                a.Petal_3 = true;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_2 && a.Petal_1 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_2 = false;
                a.Petal_1 = false;
                a.Petal_3 = true;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_2 && !a.Petal_1 && a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_2 = false;
                a.Petal_1 = false;
                a.Petal_3 = false;
                a.Petal_4 = true;
                a.Petal_5 = true;
                break;
            case (!a.Petal_2 && !a.Petal_1 && !a.Petal_3 && a.Petal_4 && a.Petal_5):
                a.Petal_2 = false;
                a.Petal_1 = false;
                a.Petal_3 = false;
                a.Petal_4 = false;
                a.Petal_5 = true;
                break;
            case (!a.Petal_2 && !a.Petal_1 && !a.Petal_3 && !a.Petal_4 && a.Petal_5):
                a.Petal_2 = false;
                a.Petal_1 = false;
                a.Petal_3 = false;
                a.Petal_4 = false;
                a.Petal_5 = false;
                break;
            default:
                a.Petal_2 = true;
                a.Petal_1 = true;
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
        self.Petal_2 = true;
        self.Petal_1 = true;
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