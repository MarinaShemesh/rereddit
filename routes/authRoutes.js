var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");
var passport = require('passport');

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
        }
        console.log("got here")
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user.username);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // `req.user` contains the authenticated user.
  res.send(req.user.username)
});

router.get('/currentuser', function(req, res) {
  if (req.user) {
    res.send(req.user.username)
  } else {
    res.send(null)
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});




module.exports = router;//todo
