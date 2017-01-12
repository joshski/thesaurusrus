var thesaurus = require('thesaurus');
var excludedWords = require('./excludedWords');
var customSynonyms = require('./customSynonyms');
function Thesaurus() {}

Thesaurus.prototype = {
  find: function(phrase) {
    return this.findOriginal(phrase).concat(this.findCustom(phrase))
  },
  findCustom: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    if (phrase.length == 1 || !customSynonyms[phrase]) {
      return [];
    }
    return customSynonyms[phrase]
  },
  findOriginal: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    if (phrase.length == 1 || excludedWords.indexOf(normalisedPhrase) > -1) {
      return [];
    }
    return thesaurus.find(normalisedPhrase).filter(function(word) {
      return excludedWords.indexOf(word) == -1 && word != normalisedPhrase;
    });
  }
};

module.exports = Thesaurus
