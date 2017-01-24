var thesaurus = require('thesaurus');
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
    var mergedResults = removeDuplicates(this.findOriginal(normalisedPhrase).concat(this.findCustom(normalisedPhrase)));

    // Remove original phrase from results if present
    var phraseIndexInResults = findWordIndex(mergedResults, normalisedPhrase);
    if (phraseIndexInResults > -1) {
      mergedResults.splice(phraseIndexInResults, 1);
    }

    return mergedResults;
  },
  findOriginal: function(phrase) {
    var excludedWords = cache.get('excludedWords') || [];
    if (phrase.length == 1 || excludedWords.indexOf(phrase) > -1) {
      return [];
    }
    return thesaurus.find(phrase).filter(function(word) {
      return excludedWords.indexOf(word) == -1;
    });
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
