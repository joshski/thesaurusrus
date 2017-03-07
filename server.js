var http = require('http');
var Thesaurus = require('./filteredThesaurus');
var thesaurus = new Thesaurus();
var url = require('url');
var rollbar = require('rollbar');
var updateSheetsCache = require('./updateSheetsCache');
var tenMinutes = 600000;

rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN, {
  environment: process.env.NODE_ENV
});
rollbar.handleUncaughtExceptionsAndRejections(process.env.ROLLBAR_ACCESS_TOKEN);

var server = http.createServer(function(req, res) {
  var qs = url.parse(req.url, true).query;
  res.writeHead(200, {"Content-Type": "application/json"});
  if (qs.phrase) {
    res.write(JSON.stringify(thesaurus.find(qs.phrase)));
  }
  res.end();
});

updateSheetsCache();

setInterval(function() {
  updateSheetsCache();
}, tenMinutes);

server.listen(process.env.PORT || 8007);
