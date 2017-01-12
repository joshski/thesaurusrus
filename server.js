var http = require('http');
var Thesaurus = require('./filteredThesaurus');
var thesaurus = new Thesaurus();
var url = require('url');
var updateSheetCache = require('./updateSheetCache');

var server = http.createServer(function(req, res) {
  var qs = url.parse(req.url, true).query;
  res.writeHead(200, {"Content-Type": "application/json"});
  if (qs.phrase) {
    res.write(JSON.stringify(thesaurus.find(qs.phrase)));
    updateSheetCache();
  }
  res.end();
});

updateSheetCache();

server.listen(process.env.PORT || 8007);
