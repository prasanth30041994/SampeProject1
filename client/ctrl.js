
var myapp=angular.module('myApp',['ngRoute']);

myapp.config(function($routeProvider){
    $routeProvider

  .when('/', {
    templateUrl : 'home.html',
    controller:'homectrl'
  
  })
  .when('/about', {
    templateUrl : 'about.html',
    controller:'aboutctrl'
   
  })
  .when('/contact', {
    templateUrl : 'contact.html',
    controller:'contactctrl'
  })
  .otherwise({
      redirectTo: '/'
    });
});


myapp.controller('homectrl',function($scope){
    $scope.message = 'Hello from FirstController';

});

myapp.controller('aboutctrl',function($scope){
    $scope.message = 'Hello from';

});

myapp.controller('contactctrl',function($scope){

    $scope.message = 'Hello ';

});

