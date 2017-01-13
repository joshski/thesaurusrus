var cache = require('memory-cache');
var getExcludedWords = require('./excludedWords');
var getCustomSynonyms = require('./customSynonyms');

function updateSheetsCache() {
  getExcludedWords()
    .then(function(excludedWords) {
      cache.put('excludedWords', excludedWords);
      console.log('Updated excludedWords cache');
    });

  getCustomSynonyms()
    .then(function(customSynonyms) {
      cache.put('customSynonyms', customSynonyms);
      console.log('Updated customSynonyms cache');
    });
}

module.exports = updateSheetsCache;
