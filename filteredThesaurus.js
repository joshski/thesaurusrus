var thesaurus = require('thesaurus');
var swearWords = require('./swearWords');

module.exports = {
  find: function(phrase) {
    var normalisedPhrase = phrase.toLowerCase();
    if (phrase.length == 1 || swearWords.indexOf(normalisedPhrase) > -1) {
      return [];
    }
    return thesaurus.find(normalisedPhrase).filter(function(word) {
      return swearWords.indexOf(word) == -1 && word != normalisedPhrase;
    });
  }
}
