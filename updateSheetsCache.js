var cache = require('memory-cache');
var getExcludedWords = require('./excludedWords');
var getCustomSynonyms = require('./customSynonyms');

function updateSheetsCache() {
  getExcludedWords()
    .then(function(excludedWords) {
      cache.put('excludedWords', excludedWords);
      console.log('excludedWords cache updated');
    });

  getCustomSynonyms()
    .then(function(customSynonyms) {
      cache.put('customSynonyms', customSynonyms);
      console.log('customSynonyms cache updated');
    });
}

module.exports = updateSheetsCache;
