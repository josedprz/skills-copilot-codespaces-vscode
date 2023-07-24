// Create web server
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var path = require('path');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  if (pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (pathname === '/getComments') {
    var commentsData = comments.get();
    var commentsDataStr = JSON.stringify(commentsData);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(commentsDataStr);
  } else if (pathname === '/addComment') {
    var comment = query.comment;
    comments.add(comment);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('success');
  } else {
    fs.readFile('.' + pathname, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  }
});

server.listen(8080, function() {
  console.log('Server is running...');
});