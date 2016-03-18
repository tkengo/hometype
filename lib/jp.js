/**
 * Library for japanese character Romaji, Hiragana, Katakana.
 */
var Jp = {};

/**
 * Conversion map of alphabet to hiragana.
 */
Jp.conversionMap = {
  'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
  'k': { 'a': 'か', 'i': 'き', 'u': 'く', 'e': 'け', 'o': 'こ',
    'y': { 'a': 'きゃ', 'i': 'きぃ', 'u': 'きゅ', 'e': 'きぇ', 'o': 'きょ' }
  },
  's': { 'a': 'さ', 'i': 'し', 'u': 'す', 'e': 'せ', 'o': 'そ',
    'y': { 'a': 'しゃ', 'i': 'しぃ', 'u': 'しゅ', 'e': 'しぇ', 'o': 'しょ' },
    'h': { 'a': 'しゃ', 'i': 'し',   'u': 'しゅ', 'e': 'しぇ', 'o': 'しょ' }
  },
  't': { 'a': 'た', 'i': 'ち', 'u': 'つ', 'e': 'て', 'o': 'と',
    'y': { 'a': 'ちゃ', 'i': 'ちぃ', 'u': 'ちゅ', 'e': 'ちぇ', 'o': 'ちょ' },
    'h': { 'a': 'てゃ', 'i': 'てぃ', 'u': 'てゅ', 'e': 'てぇ', 'o': 'てょ' }
  },
  'n': { 'a': 'な', 'i': 'に', 'u': 'ぬ', 'e': 'ね', 'o': 'の',
    'y': { 'a': 'にゃ', 'i': 'にぃ', 'u': 'にゅ', 'e': 'にぇ', 'o': 'にょ' },
    'n': 'ん',
  },
  'h': { 'a': 'は', 'i': 'ひ', 'u': 'ふ', 'e': 'へ', 'o': 'ほ',
    'y': { 'a': 'ひゃ', 'i': 'ひぃ', 'u': 'ひゅ', 'e': 'ひぇ', 'o': 'ひょ' }
  },
  'm': { 'a': 'ま', 'i': 'み', 'u': 'む', 'e': 'め', 'o': 'も',
    'y': { 'a': 'みゃ', 'i': 'みぃ', 'u': 'みゅ', 'e': 'みぇ', 'o': 'みょ' }
  },
  'y': { 'a': 'や', 'u': 'ゆ', 'o': 'よ' },
  'r': { 'a': 'ら', 'i': 'り', 'u': 'る', 'e': 'れ', 'o': 'ろ',
    'y': { 'a': 'りゃ', 'i': 'りぃ', 'u': 'りゅ', 'e': 'りぇ', 'o': 'りょ' }
  },
  'w': { 'a': 'わ', 'i': 'うぃ', 'u': 'う', 'e': 'うぇ', 'o': 'を' },
  'g': { 'a': 'が', 'i': 'ぎ', 'u': 'ぐ', 'e': 'げ', 'o': 'ご',
    'y': { 'a': 'ぎゃ', 'i': 'ぎぃ', 'u': 'ぎゅ', 'e': 'ぎぇ', 'o': 'ぎょ' }
  },
  'z': { 'a': 'ざ', 'i': 'じ', 'u': 'ず', 'e': 'ぜ', 'o': 'ぞ',
    'y': { 'a': 'じゃ', 'i': 'じぃ', 'u': 'じゅ', 'e': 'じぇ', 'o': 'じょ' }
  },
  'j': { 'a': 'じゃ', 'i': 'じ', 'u': 'じゅ', 'e': 'じぇ', 'o': 'じょ' },
  'd': { 'a': 'だ', 'i': 'ぢ', 'u': 'づ', 'e': 'で', 'o': 'ど',
    'y': { 'a': 'ぢゃ', 'i': 'ぢぃ', 'u': 'ぢゅ', 'e': 'ぢぇ', 'o': 'ぢょ' },
    'h': { 'a': 'でゃ', 'i': 'でぃ', 'u': 'でゅ', 'e': 'でぇ', 'o': 'でょ' }
  },
  'b': { 'a': 'ば', 'i': 'び', 'u': 'ぶ', 'e': 'べ', 'o': 'ぼ',
    'y': { 'a': 'びゃ', 'i': 'びぃ', 'u': 'びゅ', 'e': 'びぇ', 'o': 'びょ' }
  },
  'p': { 'a': 'ぱ', 'i': 'ぴ', 'u': 'ぷ', 'e': 'ぺ', 'o': 'ぽ',
    'y': { 'a': 'ぴゃ', 'i': 'ぴぃ', 'u': 'ぴゅ', 'e': 'ぴぇ', 'o': 'ぴょ' }
  },
  'c': { 'a': 'か', 'i': 'し', 'u': 'く', 'e': 'せ', 'o': 'こ',
    'y': { 'a': 'ちゃ', 'i': 'ちぃ', 'u': 'ちゅ', 'e': 'ちぇ', 'o': 'ちょ' },
    'h': { 'a': 'ちゃ', 'i': 'ち',   'u': 'ちゅ', 'e': 'ちぇ', 'o': 'ちょ' }
  },
  'q': { 'a': 'くぁ', 'i': 'くぃ', 'u': 'く', 'e': 'くぇ', 'o': 'くぉ' },
  'f': { 'a': 'ふぁ', 'i': 'ふぃ', 'u': 'ふ', 'e': 'ふぇ', 'o': 'ふぉ' },
  'l': { 'a': 'ぁ', 'i': 'ぃ', 'u': 'ぅ', 'e': 'ぇ', 'o': 'ぉ' },
  'x': { 'a': 'ぁ', 'i': 'ぃ', 'u': 'ぅ', 'e': 'ぇ', 'o': 'ぉ' },
  'v': { 'a': 'ヴぁ', 'i': 'ヴぃ', 'u': 'ヴ', 'e': 'ヴぇ', 'o': 'ヴぉ' }
};

/**
 * Get hiragana candidates.
 *
 * For example:
 * If romaji is 'sar', then return 'さら', 'さり', 'さる', 'され', 'さろ'
 * If romaji is 'kak', then return 'かか', 'かき', 'かく', 'かけ', 'かこ'
 *
 * @param string romaji A romaji string.
 * @return array Hiragana candidates.
 */
Jp.getHiraganaCandidates = function(romaji) {
  var hiragana = Jp.romaji2hiragana(romaji);
  var halfRoman, candidate = [];

  var e = /([ywjqflxv]|[knhmrgzbp]y?|[stdc][hy]?)$/;
  if (halfRoman = hiragana.match(e)) {
    hiragana = hiragana.replace(e, '');

    var converted = Jp.convertHalfRomanToHiragana(halfRoman[0]);
    for (var i = 0; i < converted.length; i++) {
      candidate.push(hiragana + converted[i]);
    }
  } else {
    candidate.push(hiragana);
  }

  return candidate;
};

/**
 * Convert hiragana to katakana.
 *
 * @param string target A string that converts from hiragana to katakana.
 */
Jp.toKatakana = function(hiragana) {
  return hiragana.replace(/[ぁ-ん]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0x60);
  });
};

/**
 * Convert half romaji to hiragana.
 *
 * For example:
 * If romaji is 'a',  then return 'あ'
 * If romaji is 'k',  then return 'か', 'き', 'く', 'け', 'こ', 'きゃ', 'きぃ', 'きゅ', 'きぇ', 'きょ'
 * If romaji is 'ky', then return 'きゃ', 'きぃ', 'きゅ', 'きぇ', 'きょ'
 *
 * @param string romaji A romaji string.
 * @return array Hiragana candidates.
 */
Jp.convertHalfRomanToHiragana = function(romaji) {
  var candidate = [];

  if (romaji.length == 1) {
    var map = Jp.conversionMap[romaji];
    if (typeof map == 'object') {
      for (var i in map) {
        if (typeof map[i] == 'object') {
          for (var j in map[i]) {
            candidate.push(map[i][j]);
          }
        } else {
          candidate.push(map[i]);
        }
      }
    } else {
      candidate.push(map);
    }
  } else if (romaji.length == 2) {
    var map = Jp.conversionMap[romaji.charAt(0)][romaji.charAt(1)];
    for (var i in map) {
      candidate.push(map[i]);
    }
  }

  return candidate;
};

/**
 * Convert a romaji string to a hiragana.
 *
 * @param string romaji A string you want to convert.
 */
Jp.romaji2hiragana = function(romaji) {
  var hiragana = '';

  for (var i = 0; i < romaji.length; i++) {
    var str = romaji.charAt(i),
        map = Jp.conversionMap[str];

    while (true) {
      if (typeof map == 'string') {
        break;
      } else {
        var c = romaji.charAt(++i);
        if (!map || !(map = map[c])) {
          i--;
          break;
        }
        str += c;
      }
    }

    if (map) {
      hiragana += map;
    } else if (str == romaji.charAt(i + 1)) {
      hiragana += 'っ';
    } else if (str == 'n') {
      hiragana += 'ん';
    } else {
      hiragana += str;
    }
  }

  return hiragana;
};
