/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage Hometype dictionaries.
 */

/**
 * You can pass a romaji string to this constructor.
 * Then, Homedics searches candidates from SKK dictionaries
 * and builds a regular expression.
 * You can check a string whether it matches with words in the
 * dictionaries by invoking 'match' method.
 *
 * Dictionary files is placed in the dicts/ directory and separated
 * by a head letter of words.
 *
 * @param string romaji A checking target string.
 */
var Homedics = function(romaji) {
  this.romaji = romaji;
  this.regexp = this.buildRegexp(romaji);
};

Homedics.dict   = '';
Homedics.letter = '';

/**
 * Dictionary letters array.
 */
Homedics.dictLetters = [
  'a', 'i', 'u', 'e', 'o', 'k', 's', 't', 'n', 'h', 'm', 'y',
  'r', 'w', 'g', 'z', 'd', 'b', 'p', 'j', 'c', 'q', 'f'
];

/**
 * Build regular expression for dictionary matching.
 *
 * @param string romaji
 * @return RegExp
 */
Homedics.prototype.buildRegexp = function(romaji) {
  if (romaji == '') {
    return null;
  }

  var hiragana    = Jp.getHiraganaCandidates(romaji);
  var dict        = this.loadDict(romaji.charAt(0));
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
    regexp.push(Jp.toKatakana(hiragana.join('|')));
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
  if (Homedics.dictLetters.indexOf(letter) == -1) {
    return '';
  }

  if (Homedics.letter == letter && Homedics.dict != '') {
    return Homedics.dict;
  }
  Homedics.letter = letter;

  var xhr     = new XMLHttpRequest()
  var dictUrl = chrome.extension.getURL('dicts/' + letter + '.ml');

  xhr.open('GET', dictUrl, false);
  xhr.send();
  return Homedics.dict = xhr.responseText;
};

/**
 * Check whether the target string is matched with words
 * in a dictionary.
 *
 * @param string target
 * @return object A object value that has following key:
 *                match: true if the target string is matched, otherwise false.
 *                head:  true if the target string is matched in the its head, otherwise false.
 */
Homedics.prototype.match = function(target) {
  var position = target.indexOf(this.romaji);
  var matched  = position > -1;

  if (!matched && this.regexp) {
    var matches = target.match(this.regexp);
    matched = !!matches;

    for (var i = 0; matches && i < matches.length; i++) {
      if ((position = target.indexOf(matches[i])) == 0) {
        break;
      }
    }
  }

  return {
    match: matched,
    head: position == 0
  };
};
