var expect = require('chai').expect;
var thesaurus = require('../filteredThesaurus');

describe('thesaurus', function() {
  it('filters profane phrases', function() {
    expect(thesaurus.find('Sexy')).to.eql([]);
  })

  it('filters profane synonyms', function() {
    var shaftSynonyms = thesaurus.find('shaft');
    expect(shaftSynonyms.length).to.be.greaterThan(10);
    expect(shaftSynonyms.indexOf('cock')).to.equal(-1);
  })
})
