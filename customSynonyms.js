var gsjson = require('google-spreadsheet-to-json');

function customSynonyms() {
  return gsjson({
      spreadsheetId: process.env.CUSTOM_SYNONYMS_SHEET_ID
    }).then(function(results) {
      var flatObject = {};
      // Flatten array of objects
      results.forEach(function(element, index, array) {
        if (array[index].synonyms) {
          flatObject[array[index].word] = array[index].synonyms.split(', ');
        }
      });
      return flatObject;
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

module.exports = customSynonyms;
