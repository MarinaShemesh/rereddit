var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

mongoose.connect('mongodb://localhost/reddit');

var postsRoutes = require('./routes/postsRoutes');
var authRoutes = require('./routes/authRoutes');
var User = require("./models/UserModel");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy()); // m-l-p creates a local strategy and take care of the bottom two too
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use('/reddit', postsRoutes);
app.use('/users', authRoutes);


app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


app.listen(9000,function() {
console.log("Listening on port 9000")
});
//todo
//everything you need to get a server up and running
//middleware, routes, database connection etc
