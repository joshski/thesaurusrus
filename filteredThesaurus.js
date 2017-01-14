var thesaurus = require('thesaurus');
var cache = require('memory-cache');

function Thesaurus() {}

function removeDuplicates(array) {
  return array.filter(function(elem, pos) {
    return array.indexOf(elem) == pos;
  });
}

Thesaurus.prototype = {
  find: function(phrase) {
    return removeDuplicates(this.findOriginal(phrase).concat(this.findCustom(phrase)));
  },
  findCustom: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    var customSynonyms = cache.get('customSynonyms') || [];
    if (phrase.length == 1 || !customSynonyms[normalisedPhrase]) {
      return [];
    }
    return customSynonyms[normalisedPhrase]
  },
  findOriginal: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    var excludedWords = cache.get('excludedWords') || [];
    if (phrase.length == 1 || excludedWords.indexOf(normalisedPhrase) > -1) {
      return [];
    }
    return thesaurus.find(normalisedPhrase).filter(function(word) {
      return excludedWords.indexOf(word) == -1 && word != normalisedPhrase;
    });
  }
};

module.exports = Thesaurus
