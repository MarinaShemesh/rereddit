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

router.get('/', function (req, res, next) {//get the posts
  Post.find(function (error, posts) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(posts);
    }
  });
});

router.post('/', function(req, res, next) {//create the posts
  Post.create(req.body, function(err, post) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(post);
    }
  });
});

router.put('/:postid', function(req, res, next) {//update/edit the posts
  Post.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, post) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(post);
    }
  });
});

router.put('/posts/:postid/upvote', function(req, res) {
  req.post.upvote();
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

router.delete('/:postid', function(req, res, next) {//this is from the database
  req.post.remove(function(err, result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
    }
  });
});

router.post('/:postid/comment', function (req, res, next) {
    let newComment = new Comment(req.body);
    // newComment.post = req.post._id;
    // console.log(newComment);
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
//add post
//up/down vote post
//get posts
//get post (and it's comments)
//add comment (to post)
//up/down vote comment (belonging to post)
//extension: delete post (admin only)
//extension: remove comment from post (admin only)
module.exports = router;