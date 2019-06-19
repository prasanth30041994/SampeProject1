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
    $scope.Submit="Submit";

  //clear records
      $scope.clear=function(){
        $scope.name="";
        $scope.email="";
        $scope.phone="";
        $scope.comments="";
        $scope.pageload();
    }

//hide table
$scope.hideshow=function(){
    
    
    if($scope.IsVisible==true){
        $scope.IsVisible = $scope.IsVisible = false;
       
        
    }else{
        $scope.IsVisible = $scope.IsVisible = true;
       
    }
   
}

//data bind
$scope.doubleclick=function(contactusdetails)
{
    $scope.Submit="Update";
    $scope.name=contactusdetails.name;
    $scope.email=contactusdetails.email;
    $scope.phone=contactusdetails.phone;
    $scope.comments=contactusdetails.comments;
    $scope.id=contactusdetails._id;
}

//save/update data 
  $scope.submit=function(){
          var values = {
                    name:$scope.name,
                    email:$scope.email,
                    phone:$scope.phone,
                    comments:$scope.comments,
                    id:$scope.id
                  
          }
        
          if(values.id==""||values.id==undefined){

            $http.post('http://localhost:8010/submit', values).then(function (response) {                
                if(response.data.code == '0'){ 
                    swal("Submit", "Sucessfully!", "success");
                } else {
                    swal("Sorry", "Failed", "failed");
                }
                $scope.pageload();
            }); 

          }else{

         
            $http.put('http://localhost:8010/update', values).success(function (response) {
                if (response.status == '1') {
                    swal("Update", " Successfully!", "success");
                    $scope.pageload();
                }
            });
          }


      

             
              $scope.clear();
             
      }

          //get datas
          $scope.pageload=function(){
            $scope.Submit="Submit";
            $http.get('http://localhost:8010/contatus/').success(function (response) {
                console.log(response.data)
               
                if (response.status == '1') {
                    console.log(response.data, "response")
                    $scope.demo = response.data;
                    $scope.IsVisible=false;
                }
            });
          }

          $scope.deletedata = function (contactusdetails) {
             
              var id=contactusdetails._id;
            $http.delete('http://localhost:8010/deldata/' + id).success(function (response) {
                if (response.status == '1') {
                    swal("Record Deleted", "Successfully!", "success");
                    $scope.pageload();
                }
            });
        }
      
});

