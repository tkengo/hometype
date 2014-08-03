describe('Jp library', function() {
  describe('convert a romaji to a hiragana', function() {
    it('should convert vowel', function() {
      expect(Jp.romaji2hiragana('a')).toBe('あ');
    });

    it('should convert consonant and vowel', function() {
      expect(Jp.romaji2hiragana('ka')).toBe('か');
    });

    it('should convert two consonant and vowel', function() {
      expect(Jp.romaji2hiragana('kya')).toBe('きゃ');
    });

    it("should convert 'n'", function() {
      expect(Jp.romaji2hiragana('n')).toBe('ん');
      expect(Jp.romaji2hiragana('nn')).toBe('ん');
      expect(Jp.romaji2hiragana('an')).toBe('あん');
      expect(Jp.romaji2hiragana('ann')).toBe('あん');
      expect(Jp.romaji2hiragana('ana')).toBe('あな');
    });

    it('should convert long word', function() {
      expect(Jp.romaji2hiragana('konnnitiha')).toBe('こんにちは');
      expect(Jp.romaji2hiragana('kyounogohan')).toBe('きょうのごはん');
    });
  });

  describe('convert a hiragana to a katakana', function() {
    it('should convert a hiragana to a katakana', function() {
      expect(Jp.toKatakana('ひらがな')).toBe('ヒラガナ');
    });
  });

  describe('get hiragana candidates from a romaji', function() {
    it('should get hiragana candidates', function() {
      expect(Jp.getHiraganaCandidates('a')).toEqual([ 'あ' ]);
      expect(Jp.getHiraganaCandidates('s')).toEqual([ 'さ', 'し', 'す', 'せ', 'そ', 'しゃ', 'しぃ', 'しゅ', 'しぇ', 'しょ', 'しゃ', 'し', 'しゅ', 'しぇ', 'しょ' ]);
      expect(Jp.getHiraganaCandidates('sy')).toEqual([ 'しゃ', 'しぃ', 'しゅ', 'しぇ', 'しょ' ]);
      expect(Jp.getHiraganaCandidates('sh')).toEqual([ 'しゃ', 'し', 'しゅ', 'しぇ', 'しょ' ]);
      expect(Jp.getHiraganaCandidates('sa')).toEqual([ 'さ' ]);
      expect(Jp.getHiraganaCandidates('sar')).toEqual([ 'さら', 'さり', 'さる', 'され', 'さろ', 'さりゃ', 'さりぃ', 'さりゅ', 'さりぇ', 'さりょ' ]);
    });
  });
});
