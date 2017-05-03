var cache = require('memory-cache');

function Thesaurus() {}

function removeDuplicates(array) {
  return array.filter(function(elem, pos) {
    return array.indexOf(elem) == pos;
  });
}

function findWordIndex(array, word) {
  return array.findIndex(function(item) {
    return word === item.toLowerCase();
  });
}

Thesaurus.prototype = {
  find: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    var dedupedResults = removeDuplicates(this.findCustom(normalisedPhrase));

    // Remove original phrase from results if present
    var phraseIndexInResults = findWordIndex(dedupedResults, normalisedPhrase);
    if (phraseIndexInResults > -1) {
      dedupedResults.splice(phraseIndexInResults, 1);
    }

    return dedupedResults;
  },
  findCustom: function(phrase) {
    var customSynonyms = cache.get('customSynonyms') || [];
    if (phrase.length == 1 || !customSynonyms[phrase]) {
      return [];
    }
    return customSynonyms[phrase]
  }
};

module.exports = Thesaurus
