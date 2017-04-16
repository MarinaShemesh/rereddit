app.controller('PostController', ["$scope", "postFactory", "myData", "$http", function ($scope, postFactory, myData, $http) {

      $scope.myData = myData.data;

    $scope.addPost = function () {
        var newPost = {
            text: $scope.text,
            author: $scope.author,
            upvotes: $scope.upvotes,
            comments: [],
        };

        postFactory.addPost(newPost).then(function (post) {
            $scope.myData.push(post);
        });
    };


  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  // $scope.deletePost = function() {



  $scope.deletePost = function(postToRemove) {
  return $http.delete('/reddit/' + postToRemove._id)
       .then(function(response) {
          $http.get('/reddit').then(function(myData){
              $scope.myData =  myData.data ///now we are reshowing the data after the db removed it
          });
        })

  }

  return postFactory;

}]);
