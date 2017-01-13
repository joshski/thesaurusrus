var gsjson = require('google-spreadsheet-to-json');

function excludedWords() {
  return gsjson({
      spreadsheetId: '1T1w-7OScy_LMQPDRihv4uxfVzU8nUgCbpxeIGcQOmVY',
      listOnly: true
    }).then(function(result) {
      // Flatten the two-dimensional array
      return [].concat.apply([], result);
    })
    .catch(function(error) {
      console.log(error.stack);
    });
}

module.exports = excludedWords;
