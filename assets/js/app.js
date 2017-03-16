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


//foolishApp.run(function ($rootScope, $timeout, $log) {});
foolishApp.controller('ArtboardCtrl', function ($log, $timeout) {
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

self.init= function(){
    self.start;
}
self.start= function(){
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
    
self.startHover = function() {
    if(self.pilot== true && self.mercury== true && self.apollo== true && self.mars== true){
    self.start();}
    $timeout.cancel(self.timeout);
    self.step();
} 

self.stopHover = function() {
    $timeout.cancel(self.timeout);
}

self.reloadRoute = function() {
    self.start();
    self.step();
}

self.step= function(){
    
    self.timeout= $timeout(function(){
    
    //set state0 to state1
    if(self.pilot== true && self.mercury== true && self.apollo== true && self.mars== true){
        self.pilot= false;
        self.mercury= true;
        self.apollo= true;
        self.mars= true;
        document.getElementsByName("link_Home")[0].style.color= "#FFF";
        document.getElementsByName("link_About")[0].style.color="#000";
        document.getElementsByName("link_Portfolio")[0].style.color="#000";
        document.getElementsByName("link_Contact")[0].style.color="#000";
    }
    //set state1 to state2
    else if(self.pilot==false){
        self.pilot= true;
        self.mercury= false;
        self.apollo= true;
        self.mars= true;
        document.getElementsByName("link_Home")[0].style.color= "#FFF";
        document.getElementsByName("link_About")[0].style.color="#FFF";
        document.getElementsByName("link_Portfolio")[0].style.color="#000";
        document.getElementsByName("link_Contact")[0].style.color="#000";
    }
    //set state2 to state3
    else if(self.mercury==false){
        self.pilot= true;
        self.mercury= true;
        self.apollo= false;
        self.mars= true;
        document.getElementsByName("link_Home")[0].style.color= "#FFF";
        document.getElementsByName("link_About")[0].style.color="#FFF";
        document.getElementsByName("link_Portfolio")[0].style.color="#FFF";
        document.getElementsByName("link_Contact")[0].style.color="#000";
    } 
    //set state3 to state4
    else if(self.apollo==false){
        self.pilot= true;
        self.mercury= true;
        self.apollo= true;
        self.mars= false;
        document.getElementsByName("link_Home")[0].style.color= "#FFF";
        document.getElementsByName("link_About")[0].style.color="#FFF";
        document.getElementsByName("link_Portfolio")[0].style.color="#FFF";
        document.getElementsByName("link_Contact")[0].style.color="#FFF";
    }
    //set state4 to state0
    else if(self.mars==false){
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
    //oops
    else{
        $log.log("oops");
    }
    self.step();    
}, 1000);}
self.start();
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