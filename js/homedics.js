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

Homedics.alphabetDict = '';
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

  var dict        = this.loadAlphabetDict();
  var regexp      = [ romaji ];
  var candidate   = [ romaji ];
  var patterns    = [];
  var m, characters, words;

  if (Utility.inArray([ 'a', 'i', 'u', 'e', 'o' ], romaji) || romaji.length > 1) {
    candidate = candidate.concat(Jp.getHiraganaCandidates(romaji));
    dict += "\n" + this.loadDict(romaji.charAt(0));
  }
  regexp.push(candidate.join('|'));
  regexp.push(Jp.toKatakana(candidate.join('|')));

  var dictPattern = new RegExp('^(' + candidate.join('|') + ').*:(.*)$', 'gm');
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

  return new RegExp(regexp.join('|'), 'ig');
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
 * Load an alphabet dictionary from dicts/alphabet.ml with ajax from
 * web_accessible_resources.
 *
 * @return string The content of an alphabet dictionary.
 */
Homedics.prototype.loadAlphabetDict = function() {
  if (Homedics.alphabetDict != '') {
    return Homedics.alphabetDict;
  }

  var xhr     = new XMLHttpRequest()
  var dictUrl = chrome.extension.getURL('dicts/alphabet.ml');

  xhr.open('GET', dictUrl, false);
  xhr.send();
  return Homedics.alphabetDict = xhr.responseText;
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
  var position = -1;
  var matches  = target.match(this.regexp);

  if (matches) {
    matches = $.unique(matches);
    for (var i = 0; i < matches.length; i++) {
      if ((position = target.indexOf(matches[i])) == 0) {
        break;
      }
    }
  }

  return {
    matched: !!matches,
    matches: matches || [],
    head: position == 0
  };
};
