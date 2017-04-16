app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost) {

    $scope.post = relevantPost;
    console.log(relevantPost);

  $scope.addComment = function() {

          var newComment = {
              author: "Julian",//replace with user
              body: $scope.body,
              upvotes: 0,
              post: $scope.post._id
          };

          postFactory.addComment(newComment, $scope.post._id)
              .then(function (newComment) {
                  console.log(newComment);
                  $scope.post.comments.push(newComment);
              }, function (err) {
              console.error(err);

          });
      };


  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deleteComment = function() {
    //extension todo - only for admins
  }

});