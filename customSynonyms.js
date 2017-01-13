var gsjson = require('google-spreadsheet-to-json');

function customSynonyms() {
  return gsjson({
      spreadsheetId: '1aAowFg2MbSGEQK1l6suxQpxMYoKLiOViktxt8ipYFEI',
    }).then(function(results) {
      var flatObject = {};

      // Flatten array of objects
      results.forEach(function(element, index, array) {
        flatObject[array[index].word] = array[index].synonyms.split(', ');
      });

      return flatObject;
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

module.exports = customSynonyms;
