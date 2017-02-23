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
foolishApp.config(function($mdThemingProvider) {
    $mdThemingProvider
        .theme('docs-dark', 'default')  // Create a theme "docs-dark" copied from "default"
        .primaryPalette('cyan')         // (Not sure yet)
        .warnPalette('green')           // (Not sure yet)
        .accentPalette('grey')          // These are the colors of the text
        .backgroundPalette('red')       // These are the colors of the underline, and "highlighted".
        //.dark()      // This inverts the colors, in a weird way
        ;
});

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
foolishApp.controller('ArtboardCtrl', function ( $log, $timeout) {
    // !! BEGIN AUSTIN COMMENT BLOCK
    // !!
    // !! The goal of Angular 2 in typescript 1.6 in JavaScript is to make Angular more Object Oriented
    // !! in TypeScript this is pretty straight forward because typescript has syntax for describing  
    // !! various parts of objects such as "Class" and "Function" "constructor"
    // !! Javascript doesn't have syntax that is this clean so to create code this way requires following
    // !! some known patterns.
    // !! In Angular 1.6/JavaScript controller/service/factory function are treated like classes
    // !! their methods are also functions stored locally with "this.<function name> = function()"
    // !! as are local variables
    // !! Sadly Javascript falls short pretending to be object oriented, to bridge the gap we use a couple
    // !! stylistic differences in our code.
    // !!
    // !! Fix # 1: is "var self = this" 
    // !! Any controller implementing the controllerAS syntax to clarify scope in Angular 1.6
    // !! needs to use "this" to store local variables. Variables can then be accessed in templates using
    // !! "<controllerAs>.<local variable>"
    // !! this fixes what has been a painful part of working with scopes in angular but there is an issue.
    // !! in Javascript "this" instantiates variables that are 100% local to and ONLY available to their parent function.
    // !! variables instantiated in this way may only be injected into functions that are children of the local
    // !! function.
    // !! We overcome this problem by leveraging the insane mutability of JavaScript variables,
    // !! because we declare "var self = this" the two variables are essentially married in this local instance
    // !! Javascript with hence forth treat them as pointers to a core object that stores everything.
    // !! Changes to "self" are instantly reflected in "this" and vice versus.
    // !! Because Javascript treates variables as globals for the local function and all child functions 
    // !! self can be access from within the public methods of our class
    // !!
    // !! Fix # 2: is "this.__init__ = function()"
    // !! Because they aren't Classes Javascript functions lack a controller to kick off functions once instantiated.
    // !! I will explain more why this is an important practice in Fix 3. But for now know that the nice thing about 
    // !! Javascript is that we can simply declare a controller. There is no magic to the name __init__ in JavaScript
    // !! we could just as easily call it "magicStartFunction" but I like python so for our practice "__init__"
    // !!
    // !! Fix # 3: is "return this.__init__();"
    // !! I highly recomend using a constructor for any classes built in Angular. This helps protect from
    // !! issues such as accidental repeat code execution on page load or state changes. Though it isn't relevant
    // !! to the current process it also makes the code significantly more testable. 
    // !!
    // !! In conclusion, 
    // !!
    // !! END AUSTIN COMMENT BLOCK
    
    // !! Object Oriented - Fix #1:
    var self = this;
    
    // the variable "timeout" is a constant so that it can be accessed in the static function 
    var timeout;
    
    this.pilot;
    this.mercury;
    this.apollo;
    this.mars;
    this.currentNavItem;
    
    //init is the constructor setting the base state on load
    // !! Object Oriented - Fix #2:
    this.__init__ = function(){
        self.currentNavItem="Home";
        // Bootstrap the SVG the first time we load it.
        self.restart(); 
        // This function sets the variables to a known state.
        // This is the initial configuration for these variables.
        // When the reset is done, we schedule the timer (step())
    }
    this.restart = function () {
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
    // This is an ng-click callback from an SVG, we reset the state.
    this.reloadRoute = function () {
        $log.log("Starting from the Begining");
        self.restart();
    }
    this.startHover = function () {
        $timeout.cancel(timeout);
        step(self);
    }
    this.stopHover = function () {
        $timeout.cancel(timeout);
        //timeout = null;
    }
    
    // You change this to change the "current" highlighted nav item.
    // I haven't tested whether you can change it above and have it show up.

    
    // !! I actually think the following function can probably be switched to "this" instead of var
    // !! as welll as the "var timeout;" above. I decided not to try to fix this and instead propose 
    // !! a scenario where this usage is acceptable. 
    // function "step" is a static function
    var step = function (s) {
        timeout = $timeout(function () {
            if (s.pilot == false) {
                s.pilot = true;
                s.mercury = false;
                s.apollo = true;
                s.mars = true;
                s.currentNavItem="About";
            }
            else if (s.mercury == false) {
                s.pilot = true;
                s.mercury = true;
                s.apollo = false;
                s.mars = true;
                s.currentNavItem="Portfolio";
            }
            else if (s.apollo == false) {
                s.pilot = true;
                s.mercury = true;
                s.apollo = true;
                s.mars = false;
                s.currentNavItem="Contact";
            }
            else {
                s.pilot = false;
                s.mercury = true;
                s.apollo = true;
                s.mars = true;
                s.currentNavItem="Home";
            }
            // Finally, call ourselves again to schedule another step
            step(s)
        }, 1000)
    };
    
    //kicks off things once all the code is loaded
    // !! Object Oriented - Fix #3:
    return this.__init__();
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