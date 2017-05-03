var expect = require('chai').expect;
var cache = require('memory-cache');
var Thesaurus = require('../filteredThesaurus');
var thesaurus = new Thesaurus();

describe('thesaurus', function() {
  cache.put('customSynonyms', {
    speed: [ 'pace' ],
    bumpy: [ 'uneven', 'potholed', 'potholed' ],
    chosen: [ 'chosen', 'selected' ]
  });

  it('includes custom synonyms', function() {
    var speedSynonyms = thesaurus.find('speed');
    expect(speedSynonyms).to.include('pace');
  })

  it('does not return synonyms for single letter phrases', function() {
    expect(thesaurus.find('a')).to.eql([]);
  })

  it('does not include the phrase in the results', function() {
    expect(thesaurus.find('chosen').indexOf('chosen')).to.eql(-1);
  })

  it('removes duplicates from results', function() {
    var bumpySynonyms = thesaurus.find('bumpy');
    expect(bumpySynonyms.length).to.be.equal(2);
  })
})
