var cache = require('memory-cache');
var getExcludedWords = require('./excludedWords');

function updateSheetCache() {
  return getExcludedWords()
    .then(function(excludedWords) {
      cache.put('excludedWords', excludedWords);
    });
}

module.exports = updateSheetCache;
