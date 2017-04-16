app.controller('navController', function($scope, authFactory) {
  $scope.currentUser = authFactory.currentUser;
  $scope.getCurrentUser = authFactory.getCurrentUser;
  $scope.logout = authFactory.logout;
   
  // $scope.logout = function() {
  //   authFactory.logout().then(function(){
  //     if( no user ) {
  //       state.go('home');
  //     }
  //   })
  // } 
});
