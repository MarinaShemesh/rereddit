app.controller('PostController', ["$scope", "postFactory", "myData", "$http", "authFactory", function ($scope, postFactory, myData, $http, authFactory) {
  // console.log(authFactory.currentUser);
   $scope.myData = myData.data;

    $scope.addPost = function () {

        var newPost = {
            text: $scope.text,
            upvotes: $scope.upvotes,
            comments: [],
        };

        postFactory.addPost(newPost).then(function (post) {
          console.log(post)
            $scope.myData.push(post);
        });
    };


 // $scope.upvote = function (postid, post) {
 //        postFactory.upvote(postid).then(function (likedPost) {            
 //                post.upvotes++;//actually done already but saving bandwith
 //             // $scope.myData = posts;//this is repopulating the entire scope
 //                console.log("what a cool post!");
 //            });
 //        };

  $scope.upvote = function (post) {
        postFactory.upvote(post).then(function () {
          postFactory.getPosts().then(function (posts) {
           $scope.myData = posts;
          });

        });
      };
       
  $scope.downvote = function(postid, post) {
        postFactory.downvote(postid).then(function (hatedPost) {
             post.upvotes--;
             // $scope.myData = posts;//this is repopulating the entire scope
                console.log("what an awful post!");
            });
        };


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
