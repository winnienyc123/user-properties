var userApp = angular.module("userApp", ["firebase"]);

userApp.controller("MyController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        var ref = new Firebase("https://userproperties.firebaseio.com/");
        $scope.properties = $firebaseArray(ref);
    }
]);

userApp.directive('clickToEdit', function($timeout) {
    return {
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            type: '@type'
        },
        replace: true,
        transclude: false,
        templateUrl: 'directives/user.html',
        link: function (scope, element, attrs) {
            scope.editState = false;
            scope.localMemory = scope.model;
            // save to the real model
            scope.save = function(){
                scope.model = scope.localMemory;
                scope.toggle();
                console.log(scope.localMemory);
            };

            // no change. cancel
            scope.cancel = function(){
                scope.localMemory = scope.model;
                scope.toggle();
            };

            scope.toggle = function () {
                scope.editState = !scope.editState;
                var target = element[0].querySelector("."+scope.type);
                $timeout(function(){
                    scope.editState ? target.focus() : target.blur();
                }, 0);
            }
        }
    }
});

userApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});