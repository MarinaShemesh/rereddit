app.controller('PostController', ["$scope", "postFactory", function ($scope, postFactory) {

    $scope.postFactory = postFactory;
    $scope.posts = postFactory.posts;

    $scope.addPost = function () {
        var newPost = {
            text: $scope.text,
            author: $scope.author,
            upvotes: $scope.upvotes,
            comments: [],
        };

        $scope.postFactory.addPost(newPost).then(function (post) {
            $scope.posts.push(post);
        });
    };

  //    $scope.addPost = function(newPost) {
  //    postFactory.addPost(newPost)).then(function(post) {
  //     $scope.posts.push(post);
  //   });
  // };

  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deletePost = function() {
    //extension todo - only for admins
  }
}]);
