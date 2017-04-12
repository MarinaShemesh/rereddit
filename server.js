var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/reddit');

var postsRoutes = require('./routes/postsRoutes');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use('/reddit', postsRoutes);

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});


app.listen(9000);
console.log("Listening on port 9000")

//todo
//everything you need to get a server up and running
//middleware, routes, database connection etc
