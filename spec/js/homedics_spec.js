describe('Homedics', function() {
  beforeEach(function() {
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  var homedics;
  var dict       = 'そん:損 存 遜 村 尊 孫 巽 樽';
  var dictLetter = 's';
  var dictUrl    = chrome.extension.getURL('dicts/' + dictLetter + '.ml');

  beforeEach(function() {
    jasmine.Ajax.stubRequest(dictUrl).andReturn({ 'responseText': dict });
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

      it('should match hiragana', function() {
        expect(homedics.match('さ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('し'))  .toEqual({ match: true, head: true });
        expect(homedics.match('す'))  .toEqual({ match: true, head: true });
        expect(homedics.match('せ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('そ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('しゃ')).toEqual({ match: true, head: true });
        expect(homedics.match('しぃ')).toEqual({ match: true, head: true });
        expect(homedics.match('しゅ')).toEqual({ match: true, head: true });
        expect(homedics.match('しぇ')).toEqual({ match: true, head: true });
        expect(homedics.match('しょ')).toEqual({ match: true, head: true });
        expect(homedics.match('あ'))  .toEqual({ match: false, head: false });

        expect(homedics.match('今度すしを食べたい')).toEqual({ match: true, head: false });
      });

      it('should match katakana', function() {
        expect(homedics.match('サ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('シ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('ス'))  .toEqual({ match: true, head: true });
        expect(homedics.match('セ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('ソ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('シャ')).toEqual({ match: true, head: true });
        expect(homedics.match('シィ')).toEqual({ match: true, head: true });
        expect(homedics.match('シュ')).toEqual({ match: true, head: true });
        expect(homedics.match('シェ')).toEqual({ match: true, head: true });
        expect(homedics.match('ショ')).toEqual({ match: true, head: true });
        expect(homedics.match('ア'))  .toEqual({ match: false, head: false });

        expect(homedics.match('あのスーパースター')).toEqual({ match: true, head: false });
      });

      it('should match kanji in dictionary', function() {
        expect(homedics.match('損')).toEqual({ match: true, head: true });
        expect(homedics.match('猿')).toEqual({ match: false, head: false });

        expect(homedics.match('とても損をする')).toEqual({ match: true, head: false });
      });
    });

    context('when text is two letters', function() {
      beforeEach(function() {
        homedics = new Homedics('so');
      });

      it("should match hiragana 'so'", function() {
        expect(homedics.match('さ'))  .toEqual({ match: false, head: false });
        expect(homedics.match('し'))  .toEqual({ match: false, head: false });
        expect(homedics.match('す'))  .toEqual({ match: false, head: false });
        expect(homedics.match('せ'))  .toEqual({ match: false, head: false });
        expect(homedics.match('そ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('しゃ')).toEqual({ match: false, head: false });
        expect(homedics.match('しぃ')).toEqual({ match: false, head: false });
        expect(homedics.match('しゅ')).toEqual({ match: false, head: false });
        expect(homedics.match('しぇ')).toEqual({ match: false, head: false });
        expect(homedics.match('しょ')).toEqual({ match: false, head: false });

        expect(homedics.match('冷たいそうめん')).toEqual({ match: true, head: false });
      });

      it("should match katakana 'so'", function() {
        expect(homedics.match('サ'))  .toEqual({ match: false, head: false });
        expect(homedics.match('シ'))  .toEqual({ match: false, head: false });
        expect(homedics.match('ス'))  .toEqual({ match: false, head: false });
        expect(homedics.match('セ'))  .toEqual({ match: false, head: false });
        expect(homedics.match('ソ'))  .toEqual({ match: true, head: true });
        expect(homedics.match('シャ')).toEqual({ match: false, head: false });
        expect(homedics.match('シィ')).toEqual({ match: false, head: false });
        expect(homedics.match('シュ')).toEqual({ match: false, head: false });
        expect(homedics.match('シェ')).toEqual({ match: false, head: false });
        expect(homedics.match('ショ')).toEqual({ match: false, head: false });

        expect(homedics.match('冷たいソーメン')).toEqual({ match: true, head: false });
      });

      it('should match kanji in dictionary', function() {
        expect(homedics.match('損')).toEqual({ match: true, head: true });
        expect(homedics.match('猿')).toEqual({ match: false, head: false });

        expect(homedics.match('とても損をする')).toEqual({ match: true, head: false });
      });
    });
  });
});
