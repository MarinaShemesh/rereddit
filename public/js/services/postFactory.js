app.factory('postFactory', function($http) {

  const postFactory = {};
   postFactory.posts = [];

  postFactory.addPost = function(newPost) {//add the post
    return $http.post('/reddit',newPost)
      .then(function(response) {
        return response.data
      }, function(err) {
     
      });
  };

  return postFactory;
});

   //todo
    //add post
    //up/down vote post
    //add comment (to post)
    //up/down vote comment (belonging to post)
    //extension: admin can delete post
    //extension: admin can delete comment (from post)