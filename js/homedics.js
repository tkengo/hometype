/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage Hometype dictionaries.
 */

/**
 * You can pass a roman string to this constructor.
 * Then, Homedics searches candidates from SKK dictionaries
 * and builds a regular expression.
 * You can check a string whether it matches with words in the
 * dictionaries by invoking 'match' method.
 *
 * Dictionary files is placed in the dicts/ directory and separated
 * by a head letter of words.
 *
 * @param string roman A checking target string.
 */
var Homedics = function(roman) {
  this.regexp = this.buildRegexp(roman);
};

Homedics.dicts = {};

/**
 * Dictionary letters array.
 */
Homedics.dictLetters = [
  'a', 'i', 'u', 'e', 'o', 'k', 's', 't', 'n', 'h', 'm', 'y',
  'r', 'w', 'g', 'z', 'd', 'b', 'p', 'j', 'c', 'q', 'f'
];

/**
 * Conversion map of roman to hiragana.
 */
Homedics.conversionMap = {
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
  'w': { 'a': 'わ', 'o': 'を' },
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
 * Build regular expression for dictionary matching.
 *
 * @param string roman
 * @return RegExp
 */
Homedics.prototype.buildRegexp = function(roman) {
  var hiragana    = this.getHiraganaCandidates(roman);
  var dict        = this.loadDict(roman.charAt(0));
  var dictPattern = new RegExp('^(' + hiragana.join('|') + ').*:(.*)$', 'gm');
  var patterns    = [];
  var regexp      = [];
  var m, characters, words;

  while (m = dictPattern.exec(dict)) {
    patterns = patterns.concat(m[2].split(' '));
  }
  patterns = patterns.sort().join("\n").replace(/^(.+)$(\n^\1.+$)+/gm, '$1');

  if (characters = patterns.match(/^.$/gm)) {
    regexp.push('[' + characters.join('').replace(/(.)(\1)+/g, '$1') + ']');
  }
  if (words = patterns.match(/^..+$/gm)) {
    regexp.push(words.join('|'));
  }
  if (hiragana) {
    regexp.push(hiragana.join('|'));
    regexp.push(this.toKatakana(hiragana.join('|')));
  }

  if (regexp.length > 0) {
    return new RegExp(regexp.join('|'));
  } else {
    return null;
  }
};

/**
 * Load a dictionary from dicts/*.ml with ajax from
 * web_accessible_resources.
 *
 * @param string letter A head letter of a dictionary you want to load.
 * @return string The content of a dictionary.
 */
Homedics.prototype.loadDict = function(letter) {
  if (!Homedics.dictLetters.indexOf(letter)) {
    return '';
  }

  if (Homedics.dicts[letter]) {
    return Homedics.dicts[letter];
  }

  var xhr     = new XMLHttpRequest()
  var dictUrl = chrome.extension.getURL('dicts/' + letter + '.ml');

  xhr.open('GET', dictUrl, false);
  xhr.send();
  return Homedics.dicts[letter] = xhr.responseText;
};

/**
 * Get hiragana candidates.
 *
 * For example:
 * If roman is 'sar', then return 'さら', 'さり', 'さる', 'され', 'さろ'
 * If roman is 'kak', then return 'かか', 'かき', 'かく', 'かけ', 'かこ'
 *
 * @param string roman A roman string.
 * @return array Hiragana candidates.
 */
Homedics.prototype.getHiraganaCandidates = function(roman) {
  var hiragana = this.roman2hiragana(roman);
  var halfRoman, candidate = [];

  if (halfRoman = hiragana.match(/[a-z]+$/)) {
    hiragana = hiragana.replace(/[a-z]/g, '');

    var converted = this.convertHalfRomanToHiragana(halfRoman[0]);
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
Homedics.prototype.toKatakana = function(target) {
  return target.replace(/[ぁ-ん]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0x60);
  });
};

/**
 * Convert half roman to hiragana.
 *
 * For example:
 * If roman is 'a',  then return 'あ'
 * If roman is 'k',  then return 'か', 'き', 'く', 'け', 'こ', 'きゃ', 'きぃ', 'きゅ', 'きぇ', 'きょ'
 * If roman is 'ky', then return 'きゃ', 'きぃ', 'きゅ', 'きぇ', 'きょ'
 *
 * @param string roman A roman string.
 * @return array Hiragana candidates.
 */
Homedics.prototype.convertHalfRomanToHiragana = function(roman, depth) {
  var candidate = [];

  if (roman.length == 1) {
    var map = Homedics.conversionMap[roman];
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
  } else if (roman.length == 2) {
    var map = Homedics.conversionMap[roman.charAt(0)][roman.charAt(1)];
    for (var i in map) {
      candidate.push(map[i]);
    }
  }

  return candidate;
};

/**
 * Convert a roman string to a hiragana.
 *
 * @param string roman A string you want to convert.
 */
Homedics.prototype.roman2hiragana = function(roman) {
  var hiragana = '';

  for (var i = 0; i < roman.length; i++) {
    var str = roman.charAt(i),
        map = Homedics.conversionMap[str];

    while (true) {
      if (typeof map == 'string') {
        break;
      } else {
        var c = roman.charAt(++i);
        if (!(map = map[c])) {
          i--;
          break;
        }
        str += c;
      }
    }

    if (map) {
      hiragana += map;
    } else if (str == roman.charAt(i + 1)) {
      hiragana += 'っ';
    } else if (str == 'n') {
      hiragana += 'ん';
    } else {
      hiragana += str;
    }
  }

  return hiragana;
};

/**
 * Check whether the target string is matched with words
 * in a dictionary.
 *
 * @param string target
 * @return boolean Return true if the target string is matched, otherwise false.
 */
Homedics.prototype.match = function(target) {
  if (this.regexp) {
    return target.match(this.regexp);
  } else {
    return false;
  }
};
