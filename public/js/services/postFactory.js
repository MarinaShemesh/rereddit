app.factory('postFactory', function($http) {

  const postFactory = {};

  postFactory.addPost = function(newPost) {//add the post
    return $http.post('/reddit',newPost)
      .then(function(response) {
        return response.data
      }, function(err) {
     
      });
  };

   postFactory.addComment = function (newComment, postId) {//add the comment
             return $http.post('/reddit/'+ postId + '/comment', newComment)
            .then(function (response) {
                return response.data;
            }, function (err) {
                console.error(err)
            })
    };

  return postFactory;
});


    //add post
    //up/down vote post
    //add comment (to post)
    //up/down vote comment (belonging to post)
    //extension: admin can delete post
    //extension: admin can delete comment (from post)