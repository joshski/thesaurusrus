var gsjson = require('google-spreadsheet-to-json');

function excludedWords() {
  return gsjson({
      spreadsheetId: process.env.EXCLUDED_WORDS_SHEET_ID,
      listOnly: true
    }).then(function(results) {
      // Flatten two-dimensional array
      return [].concat.apply([], results);
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

module.exports = excludedWords;
