var Homedics = function(str) {
  var hiragana    = this.getHiraganaCandidate(str);
  var dict        = this.loadDict(str.charAt(0));
  var dictPattern = new RegExp('^(' + hiragana.join('|') + ').*:(.*)$', 'gm');
  var patterns    = [];
  var regexp      = [];
  var m, characters, words;

  while (m = dictPattern.exec(dict)) {
    patterns = patterns.concat(m[2].split(' '));
  }
  patterns = patterns.sort().join("\n").replace(/(.+)(\n^\1.+$)+/gm, '$1');

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
    this.regexp = new RegExp(regexp.join('|'));
  }
};

Homedics.dicts = {};
Homedics.convertMap = {
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
  }
};

Homedics.prototype.loadDict = function(letter) {
  if (Homedics.dicts[letter]) {
    return Homedics.dicts[letter];
  }

  var xhr     = new XMLHttpRequest()
  var dictUrl = chrome.extension.getURL('dicts/' + letter + '.ml');

  xhr.open('GET', dictUrl, false);
  xhr.send();
  return Homedics.dicts[letter] = xhr.responseText;
};

Homedics.prototype.getHiraganaCandidate = function(roman) {
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

Homedics.prototype.toKatakana = function(target) {
  return target.replace(/[ぁ-ん]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0x60);
  });
};

Homedics.prototype.convertHalfRomanToHiragana = function(roman, depth) {
  var candidate = [];

  if (roman.length == 1) {
    var map = Homedics.convertMap[roman];
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
    var map = Homedics.convertMap[roman.charAt(0)][roman.charAt(1)];
    for (var i in map) {
      candidate.push(map[i]);
    }
  }

  return candidate;
};

Homedics.prototype.roman2hiragana = function(roman) {
  var hiragana = '';

  for (var i = 0; i < roman.length; i++) {
    var str = roman.charAt(i),
        map = Homedics.convertMap[str];

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

Homedics.prototype.match = function(target, callback) {
  if (this.regexp) {
    return target.match(this.regexp);
  } else {
    return false;
  }
};
