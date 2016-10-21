var http = require('http');
var thesaurus = require('./filteredThesaurus');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  var qs = url.parse(req.url, true).query;
  res.writeHead(200, {"Content-Type": "application/json"});
  if (qs.phrase) {
    res.write(JSON.stringify(thesaurus.find(qs.phrase)));
  }
  res.end();
});

server.listen(process.env.PORT || 8007);
