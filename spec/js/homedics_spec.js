describe('Homedics', function() {
  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  var homedics;
  var dict       = 'そん:損 存 遜 村 尊 孫 巽 樽';
  var alDict     = 'my:マイ';
  var dictLetter = 's';
  var dictUrl    = chrome.extension.getURL('dicts/' + dictLetter + '.ml');
  var alDictUrl  = chrome.extension.getURL('dicts/alphabet.ml');

  beforeEach(function() {
    jasmine.Ajax.stubRequest(dictUrl).andReturn({ 'responseText': dict });
    jasmine.Ajax.stubRequest(alDictUrl).andReturn({ 'responseText': alDict });
  });

  describe('loading of a dictionary', function() {
    beforeEach(function() {
      Homedics.dict = '';
      homedics = new Homedics('');
    });

    it('should return a dictionary content', function() {
      expect(homedics.loadDict(dictLetter)).toBe(dict);
    });

    it('should cache a dictionary content', function() {
      expect(homedics.loadDict(dictLetter)).toBe(dict);
      jasmine.Ajax.stubRequest(dictUrl).andReturn({ 'responseText': '' });
      expect(homedics.loadDict(dictLetter)).toBe(dict);
    });

    context('when dict letter does not exist', function() {
      var dictLetter = 'x';

      it('should return empty string', function() {
        expect(homedics.loadDict(dictLetter)).toBe('');
      });
    });
  });

  describe('matching', function() {
    context('when text is one letter', function() {
      beforeEach(function() {
        homedics = new Homedics('s');
      });

      it('should match alphabet', function() {
        expect(homedics.match('superstar')).toEqual({ matched: true, matches: [ 's' ], head: true });
        expect(homedics.match('lockstar')).toEqual({ matched: true, matches: [ 's' ], head: false });
      });

      it('should match hiragana', function() {
        expect(homedics.match('さ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('し'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('す'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('せ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('そ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('しゃ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('しぃ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('しゅ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('しぇ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('しょ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('あ'))  .toEqual({ matched: false, matches: null, head: false });

        expect(homedics.match('今度すしを食べたい')).toEqual({ matched: false, matches: null, head: false });
      });

      it('should match katakana', function() {
        expect(homedics.match('サ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('シ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('ス'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('セ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('ソ'))  .toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('シャ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('シィ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('シュ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('シェ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('ショ')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('ア'))  .toEqual({ matched: false, matches: null, head: false });

        expect(homedics.match('あのスーパースター')).toEqual({ matched: false, matches: null, head: false });
      });

      it('should match kanji in dictionary', function() {
        expect(homedics.match('損')).toEqual({ matched: false, matches: null, head: false });
        expect(homedics.match('猿')).toEqual({ matched: false, matches: null, head: false });

        expect(homedics.match('とても損だ')).toEqual({ matched: false, matches: null, head: false });
      });
    });

    context('when text is two letters', function() {
      beforeEach(function() {
        homedics = new Homedics('so');
      });

      it('should match alphabet', function() {
        expect(homedics.match('source')).toEqual({ matched: true, matches: [ 'so' ], head: true });
        expect(homedics.match('open source')).toEqual({ matched: true, matches: [ 'so' ], head: false });
      });

      it("should match hiragana 'so'", function() {
        expect(homedics.match('さ'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('し'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('す'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('せ'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('そ'))  .toEqual({ matched: true,  matches: [ 'そ' ], head: true  });
        expect(homedics.match('しゃ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('しぃ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('しゅ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('しぇ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('しょ')).toEqual({ matched: false, matches: null,     head: false });

        expect(homedics.match('冷たいそうめん')).toEqual({ matched: true, matches: [ 'そ' ], head: false });
      });

      it("should match katakana 'so'", function() {
        expect(homedics.match('サ'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('シ'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('ス'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('セ'))  .toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('ソ'))  .toEqual({ matched: true,  matches: [ 'ソ' ], head: true  });
        expect(homedics.match('シャ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('シィ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('シュ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('シェ')).toEqual({ matched: false, matches: null,     head: false });
        expect(homedics.match('ショ')).toEqual({ matched: false, matches: null,     head: false });

        expect(homedics.match('冷たいソーメン')).toEqual({ matched: true, matches: [ 'ソ' ], head: false });
      });

      it('should match kanji in dictionary', function() {
        expect(homedics.match('損')).toEqual({ matched: true,  matches: [ '損' ], head: true });
        expect(homedics.match('猿')).toEqual({ matched: false, matches: null,     head: false });

        expect(homedics.match('とても損だ')).toEqual({ matched: true, matches: [ '損' ], head: false });
      });
    });

    context('when text is in an alphabet dictionary', function() {
      beforeEach(function() {
        homedics = new Homedics('my');
      });

      it("should match 'マイ'", function() {
        expect(homedics.match('マイ・オークション')).toEqual({ matched: true, matches: [ 'マイ' ], head: true });
        expect(homedics.match('念願のマイホーム')).  toEqual({ matched: true, matches: [ 'マイ' ], head: false });
      });
    });
  });
});
