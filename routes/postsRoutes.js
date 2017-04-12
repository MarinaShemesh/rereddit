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
  Post.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, beer) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send(beer);
    }
  });
});

router.post('/:postid/comments', function(req, res, next) {//update the comments
  Post.findById(req.params.id, function(err, foundPost) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!foundPost) {
      return res.send("Error! No post found with that ID");
    } else {
      foundPost.reviews.push(req.body)
      foundPost.save(function(err, updatedPost) {
        if (err) {
          return next(err);
        } else {
          res.send(updatedBeer);
        }
      });
    }
  });
});

router.delete('/:postid', function(req, res, next) {//delete the posts
  req.post.remove(function(err, result) {
    if (err) {
      return next(err);
    } else {
      return res.send(result);
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