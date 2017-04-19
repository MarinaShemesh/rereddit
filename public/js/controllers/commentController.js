app.controller('CommentController', function($scope, $stateParams, postFactory, relevantPost, authFactory) {

    $scope.post = relevantPost;
    console.log(relevantPost);

  $scope.addComment = function() {

          var newComment = {
              author:  authFactory.currentUser.username,
              body: $scope.body,
              upvotes: $scope.upvotes,
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


    $scope.upvote = function (comment) {
        postFactory.upvote(comment).then(function () {
          postFactory.getComments().then(function (comments) {
           $scope.myData = comments;
          });

        });
      };
       

  $scope.downvote = function() {
    //todo
  }

  $scope.deleteComment = function() {
    //extension todo - only for admins
  }

});