var http = require('http');
var thesaurus = require('thesaurus');
var url = require('url');
var querystring = require('querystring');
var profanity = require('profanity-util');

var server = http.createServer(function(req, res) {
  var qs = url.parse(req.url, true).query;
  res.writeHead(200, {"Content-Type": "application/json"});
  if (qs.phrase) {
    var results = thesaurus.find(qs.phrase.toLowerCase());
    var badWords = profanity.check(results);
    badWords.map(function(word, index) {
      var resultsIndex = results.indexOf(badWords[index]);
      results.splice(resultsIndex, 1);
    });
    res.write(JSON.stringify(results));
  }
  res.end();
});

server.listen(process.env.PORT || 8007);
