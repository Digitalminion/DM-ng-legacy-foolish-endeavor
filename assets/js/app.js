var foolishApp = angular.module('foolishApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ngMaterial', 'ngAria']);
foolishApp.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "assets/tpl/home.html", 
        controller: "ArtboardCtrl",
        controllerAs: "artboard"
    }).when("/about", {
        templateUrl: "assets/tpl/about.html",
        controller: "AboutCtrl",
        controllerAs: "about"
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
//foolishApp.config(function ($mdThemingProvider) {
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

foolishApp.controller('ArtboardCtrl', function ($rootScope, $log, $timeout) {
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
    // !! Fix # 2: is "this.init = function()"
    // !! Because they aren't Classes Javascript functions lack a controller to kick off functions once instantiated.
    // !! I will explain more why this is an important practice in Fix 3. But for now know that the nice thing about 
    // !! Javascript is that we can simply declare a controller. There is no magic to the name init in JavaScript
    // !! we could just as easily call it "magicStartFunction" but I like python so for our practice "init"
    // !!
    // !! Fix # 3: is "return this.__init__();"
    // !! I highly recomend using a constructor for any classes built in Angular. This helps protect from
    // !! issues such as accidental repeat code execution on page load or state changes. Though it isn't relevant
    // !! to the current process it also makes the code significantly more testable. 
    // !!
    // !! In conclusion, 
    // !!
    // !! END AUSTIN COMMENT BLOCK

    var self = this;    

    self.timeout;
    self.pilot;
    self.mercury;
    self.apollo;
    self.mars;
    self.message1;
    self.messsage2;
    
    // self.init -- The constructor
    // Everything that the controller needs to do for normal operation 
    // should be contained in this function.
    self.init = function() {
        self.start();
        self.message_init();
    }  

    //////////////////////////////////

    self.message_init = function() {
        $rootScope.pageMessage = ""
        self.message1 = "This is the first message";
        self.message2 = "This is the message #2!";
        self.timeout_message();
    }

    self.toggle_message = function() {
        console.log("TOGGLE")
        if ($rootScope.pageMessage == self.message1) {
            $rootScope.pageMessage = self.message2;
        }
        else if ($rootScope.pageMessage == self.message2) {
            $rootScope.pageMessage = self.message1;
        }
        else {
            $rootScope.pageMessage = self.message1;
        } 
    }
    
    self.timeout_message = function () {
        $timeout(function() {
                    self.toggle_message();
                    self.timeout_message();
                }, 1000)
    }
    
    
    ///////////////////////////////////

    //
    // self.start - Reset the astronauts to "state 0"
    // State 0 is:
    //  1. Stop any animation
    //  2. Hide all the astronauts
    //  3. Set the "Home" link to underline
    //  4. Set all the link texts to black
    // You will need to restart any animation (by calling self.step()), if appropriate
    //
    self.start = function() {
        $timeout.cancel(self.timeout);
        timeout = null;
        self.pilot = true;
        self.mercury = true;
        self.apollo = true;
        self.mars = true;
        document.getElementsByName("link_Home")[0].style.textDecoration = "underline";
        document.getElementsByName("link_Home")[0].style.color = "#000";
        document.getElementsByName("link_About")[0].style.color = "#000";
        document.getElementsByName("link_Portfolio")[0].style.color = "#000";
        document.getElementsByName("link_Contact")[0].style.color = "#000";
    }
    
    //
    // self.startHover - SVG Callback when you "hover" over the astronauts
    // This function resets the animation:
    //  1. Cancel any timeout that is currently pending
    //  2. Restart the animation (ie, reset the timeout to 1s from now)
    //
    self.startHover = function() {
        //if (self.pilot == true && self.mercury == true && self.apollo == true && self.mars == true) //{
        //    self.start();
        //}
        $timeout.cancel(self.timeout);
        self.step();
    } 

    // 
    // self.stopHover - SVG Callback when you "unhover" the astronauts
    // This function stops the animation, but otherwise leaves everything alone
    //
    self.stopHover = function() {
        $timeout.cancel(self.timeout);
    }

    //
    // self.reloadRoute - SVG Callback when you *click* on the astronauts
    // This function resets the astronauts and restarts the animation.
    // Because you cannot click on the astronauts unless you are hovering
    // over them, it is implied that this function should always restart animation.
    //
    self.reloadRoute = function() {
        self.start();           // Go back to state 0 (from wherever we are at)
        self.moveAhead();       // Advance to state 1 (from state 0)
        self.step();            // Restart the animation process
    }

    //
    // self.toggle_text_color - Given a text label, if it's white, make it black.
    //                          if it's black, make it white.  
    //                          If it's neither, make it black.
    //
    self.toggle_text_color = function(label) {
        console.log(document.getElementsByName(label)[0].style.color)
        // Change white to black...
        if (document.getElementsByName(label)[0].style.color== "rgb(255, 255, 255)"){
            document.getElementsByName(label)[0].style.color="#000";
        }
        // Or change black to white...
        else if (document.getElementsByName(label)[0].style.color== "rgb(0, 0, 0)"){
            document.getElementsByName(label)[0].style.color="#FFF";
        }
        // Or change anything else to black.
        else {
            document.getElementsByName(label)[0].style.color="#000";
        }
    }

    //
    // self.moveAhead - Advance from the current state (0-4) to the next state (1-4)
    //              State 0 -> State 1 -> State 2 -> State 3 -> State 4 -> State 1 ...
    // This function is called by both self.reloadRoute(), and self.step().
    //
    self.moveAhead = function() {
        //set state0 to state1
        if (self.pilot == true && self.mercury == true && self.apollo == true && self.mars == true) {
            self.pilot = false;
            self.mercury = true;
            self.apollo = true;
            self.mars = true;
            self.toggle_text_color("link_Home");
        }
        //set state1 to state2
        else if (self.pilot == false) {
            self.pilot = true;
            self.mercury = false;
            self.apollo = true;
            self.mars = true;
            self.toggle_text_color("link_About");
        }
        //set state2 to state3
        else if (self.mercury == false) {
            self.pilot = true;
            self.mercury = true;
            self.apollo = false;
            self.mars = true;
            self.toggle_text_color("link_Portfolio");
        } 
        //set state3 to state4
        else if (self.apollo == false) {
            self.pilot = true;
            self.mercury = true;
            self.apollo = true;
            self.mars = false;
            self.toggle_text_color("link_Contact");
        }
        //set state4 to state0
        else if (self.mars == false) {
            self.pilot = false;
            self.mercury = true;
            self.apollo = true;
            self.mars = true;
            self.toggle_text_color("link_Home");
        }
        //oops
        else{
            $log.log("oops");
        }
    }
    
    //
    // self.step - Wrap a cyclical call (every second) around self.moveAhead().
    // You should call this when you wish to "begin animation".
    // When you wish to "stop animation", do a $timeout.cancel(self.timeout);
    //
    self.step = function() {
        self.timeout = $timeout(function() {
                            self.moveAhead();
                            self.step();    
                       }, 1000);
                };

    // The only thing at the top level of a controller is a call to self.init().
    self.init();
});

foolishApp.controller('AboutCtrl', function ($scope, $timeout, $log) {
    var self = this;
    var poppy_timeout;
    $log.log("first step");
    
    self.poppy_step = function (a) {
        poppy_timeout = $timeout(function () {
            
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
            self.poppy_step(a);
        }, 1000)
    };
    self.poppy_restart = function () {
        $timeout.cancel(poppy_timeout);
        poppy_timeout = null;
        self.Petal_2 = true;
        self.Petal_1 = true;
        self.Petal_3 = true;
        self.Petal_4 = true;
        self.Petal_5 = true;
        self.poppy_step(self);
    }
    self.poppy_restart();
    
    
    
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