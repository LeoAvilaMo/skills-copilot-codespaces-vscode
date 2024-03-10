// Create web server
// 1. Load modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

// 2. Set up server
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 3. Set up routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/data/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/data/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(__dirname + '/data/comments.json', JSON.stringify(comments, null, 4), function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  res.end();
});

// 4. Start server
app.listen(port, function() {
  console.log('Server is running on port ' + port);
});