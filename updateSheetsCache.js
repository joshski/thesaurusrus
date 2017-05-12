var cache = require('memory-cache');
var getCustomSynonyms = require('./customSynonyms');

function updateSheetsCache() {
  getCustomSynonyms()
    .then(function(customSynonyms) {
      cache.put('customSynonyms', customSynonyms);
      console.log('customSynonyms cache updated');
    });
}

module.exports = updateSheetsCache;
