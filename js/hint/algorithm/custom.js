/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Standard hint key algorithm.
 */

/**
 * Constructor
 *
 * @param array keys The string of hint keys.
 * @param boolean targetLength Length of hint for target.
 */
var CustomHintAlgorithm = function(targetLength) {
  var keys = convertLettersByOption(Opt.custom_hint_keys);

  var n = keys.length;
  var l = 1;
  while (n < targetLength) {
    ++l;
    n *= n;
  }

  this.keys = keys;
  this.needKeyLength = l;
  this.keysIndex = 0;
};

/**
 * Pop a next hint key.
 */
CustomHintAlgorithm.prototype.pop = function() {
  var hintKey = '';

  var keySize = this.keys.length;
  for (var n = 0, len = this.needKeyLength; n < len; n++) {
    var an = Math.floor(this.keysIndex / Math.pow(keySize, n)) % keySize;
    hintKey += this.keys[an];
  }
  this.keysIndex++;

  return hintKey;
};
