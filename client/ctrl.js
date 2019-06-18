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

$scope.hideshow=function(){
    if($scope.IsVisible==true){
        $scope.IsVisible = $scope.IsVisible = false;
        
    }else{
        $scope.IsVisible = $scope.IsVisible = true;
    }
    
}


$scope.doubleclick=function()
{
    $scope.name=$scope.contactusdetails.name;
}

  $scope.submit=function(){
          var values = {
                    name:$scope.name,
                    email:$scope.email,
                    phone:$scope.phone,
                    comments:$scope.comments
                  
          }
        


          $http.post('http://localhost:8010/submit', values).then(function (response) {                
                  if(response.data.code == '0'){ 
                      swal("Good job!", "Submit Sucessfully!", "success");
                  } else {
                      swal("Sorry", "Failed", "failed");
                  }
              });

          
              $scope.clear();
              $scope.pageload();
      }

          //get datas
          $scope.pageload=function(){
            $http.get('http://localhost:8010/contatus/').success(function (response) {
                console.log(response.data)
               
                if (response.status == '1') {
                    console.log(response.data, "response")
                    $scope.demo = response.data;
                    $scope.IsVisible=false;
                }
            });
          }
      
});

