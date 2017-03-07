var gsjson = require('google-spreadsheet-to-json');
var rollbar = require('rollbar');

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
      rollbar.handleError(error);
    });
}

module.exports = excludedWords;
