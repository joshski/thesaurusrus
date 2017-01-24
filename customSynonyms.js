var gsjson = require('google-spreadsheet-to-json');

function customSynonyms() {
  return gsjson({
      spreadsheetId: process.env.CUSTOM_SYNONYMS_SHEET_ID
    }).then(function(results) {
      var flatObject = {};
      // Flatten array of objects
      results.forEach(function(element, index, array) {
        var customResults = array[index].synonyms;
        if (customResults) {
          var trimmedResults = customResults.replace(/,\s*$/, '');
          flatObject[array[index].word] = trimmedResults.split(', ');
        }
      });
      return flatObject;
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

module.exports = customSynonyms;
