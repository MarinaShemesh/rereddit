var express = require('express');
var router = express.Router();

const Post = require("../models/postModel").Post;//rememer this is an object
const Comment = require("../models/postModel").Comment;

//as we are using modular route handlers we use router.param an not app.param
router.param('postid', function(req, res, next, id) {
  Post.findById(id, function(err, post) {
    if (err) {
      return next(err);
    } else if (!post) {
      return next(new Error('Post does not exist'));
    } else {
      req.post = post;  //put the post on the request object for the next function in line to use
      return next();
    }
  });
});

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(401, { message: "Unauthorized" });
  }
};

router.get('/', function (req, res, next) {//get the posts
  Post.find(function (error, posts) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      console.log(posts)
      res.send(posts);
    }
  });
});

router.post('/', ensureAuthenticated, function(req, res, next) {//create the posts
 
  var newPost = new Post(); //{text: , upvotes: , author: , comments }

  newPost.text = req.body.text;
  newPost.comments = req.body.comments;
  newPost.upvotes = 0;
  newPost.author = req.user;

  newPost.save(function(err, post){
    if(err){
      return next(err);
    }
    res.send(post)
  });


//     Post.create(Object.assign({author: req.user.username}, req.body), function (err, post) {
//         if (err) {
//             console.error(err);
//             return next(err);
//         } else {
//             console.log(post);
//             res.send(post);
//         }
//     });
// }); - from Karina


  
});

router.put('/:postid', ensureAuthenticated, function(req, res, next) {//update/edit the posts
  Post.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, post) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(post);
    }
  });
});

router.put('/:postid/upvote', ensureAuthenticated, function(req, res) {
  req.post.upvote();
  req.post.save(function(err, post) {
    res.send(post);
  });
});

router.put('/:postid/downvote', ensureAuthenticated, function(req, res) {
  req.post.downvote();
  req.post.save(function(err, post) {
    res.send(post);
  });
});

router.get('/:postid2', function (req, res, next) {
    Post.findOne({_id: req.params.postid2}).populate('comments')
        .exec(function (err, post) {
        if (err) {
            return next(err);
        }
          else {
            console.log("the population stuff");
            console.log(post);
            res.send(post);
        }
    })
  });

router.delete('/:postid',ensureAuthenticated, function(req, res, next) {//this is from the database
  req.post.remove(function(err, result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

router.post('/:postid/comment', ensureAuthenticated, function (req, res, next) {
    let newComment = new Comment(req.body);
     newComment.save(function (err, commentWithId) {
        if (err) {
            return next(err);
        }
        else {
            req.post.comments.push(commentWithId);
            req.post.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send(commentWithId)
            })
        }
    });
});

router.param('commentId', function(req, res, next, id) {
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    } else if (!comment) {
      return next(new Error('Comment does not exist'));
    } else {
      req.comment = comment;  //put the post on the request object for the next function in line to use
      return next();
    }
  });
});


router.put('/:commentId/upvote', ensureAuthenticated, function(req, res, next) {//update/edit the posts
  Comment.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, comment) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(comment);
    }
  });
});


//add post
//up/down vote post
//get posts
//get post (and it's comments)
//add comment (to post)
//up/down vote comment (belonging to post)
//extension: delete post (admin only)
//extension: remove comment from post (admin only)
module.exports = router;