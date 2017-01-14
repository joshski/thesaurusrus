var expect = require('chai').expect;
var cache = require('memory-cache');
var Thesaurus = require('../filteredThesaurus');
var thesaurus = new Thesaurus();

describe('thesaurus', function() {
  cache.put('excludedWords', [
    'sexy',
    'spliff',
    'speed'
  ]);
  cache.put('customSynonyms', {
    speed: [ 'pace' ],
    bumpy: [ 'jarring' ]
  });

  it('does not return synonyms for single letter phrases', function() {
    expect(thesaurus.find('a')).to.eql([]);
  })

  it('does not include the phrase in the results', function() {
    expect(thesaurus.find('Happy').indexOf('happy')).to.eql(-1);
  })

  it('filters undesirable phrases', function() {
    expect(thesaurus.find('Sexy')).to.eql([]);
  })

  it('filters undesirables from desirable results', function() {
    var stickSynonyms = thesaurus.find('stick');
    expect(stickSynonyms.length).to.be.greaterThan(10);
    expect(stickSynonyms.indexOf('spliff')).to.equal(-1);
  })

  it('includes custom synonyms', function() {
    var speedSynonyms = thesaurus.find('speed');
    expect(speedSynonyms).to.include('pace', 'rate');
  })

  it('removes duplicates from merged results', function() {
    var bumpySynonyms = thesaurus.find('bumpy');
    expect(bumpySynonyms.length).to.be.equal(5);
  })
})
