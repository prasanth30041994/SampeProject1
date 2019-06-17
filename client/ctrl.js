var app=angular.module("myApp",['ngRoute'])
app.config(function ($routeProvider) {
    $routeProvider

        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutCtrl'
        })
        .when('/contact', {
          templateUrl: 'contact.html',
          controller: 'contactCtrl'
      })
        .otherwise({
            redirectTo: '/home'
        });
});
app.controller("contactCtrl",function($scope,$http){



    $scope.clear=function(){
        $scope.name="";
        $scope.email="";
        $scope.phone="";
        $scope.comments="";
    }
  $scope.submit=function(){
          var values = {
                    name:$scope.name,
                    email:$scope.email,
                    phone:$scope.phone,
                    comments:$scope.comments
                    
          }


          $http.post('http://localhost:8005/submit', values).then(function (response) {                
                  if(response.data.code == '0'){ 
                      swal("Good job!", "Submit Sucessfully!", "success");
                  } else {
                      swal("Sorry", "Failed", "failed");
                  }
              });
      }
});

