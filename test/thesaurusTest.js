var expect = require('chai').expect;
var Thesaurus = require('../filteredThesaurus');
var thesaurus = new Thesaurus();

describe('thesaurus', function() {
  it('does not return synonyms for single letter phrases', function() {
    expect(thesaurus.find('a')).to.eql([]);
  })

  it('does not include the phrase in the results', function() {
    expect(thesaurus.find('Happy').indexOf('happy')).to.eql(-1);
  })

  it('filters profane phrases', function() {
    expect(thesaurus.find('Sexy')).to.eql([]);
  })

  it('filters profane synonyms', function() {
    var jerkSynonyms = thesaurus.find('jerk');
    expect(jerkSynonyms.length).to.be.greaterThan(10);
    expect(jerkSynonyms.indexOf('jerking')).to.equal(-1);
  })

  it('includes custom synonyms', function() {
    var speedSynonyms = thesaurus.find('speed');
    expect(speedSynonyms).to.eql(['pace', 'rate'])
  })
})
