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
var CustomHintAlgorithm = function(keys, targetLength) {
  keys = convertLettersByOption(keys);

  var n = keys.length;
  var l = 1;
  var needKeyLength = n;
  while (needKeyLength < targetLength) {
    needKeyLength = Math.pow(n, l);
  }

  this.keys = keys;
  this.needKeyLength = needKeyLength;
  this.keysIndex = new Array(needKeyLength);
  for (var i = 0; i < this.keysIndex; i++) {
    this.keysIndex[i] = 0;
  }
};

/**
 * Pop a next hint key.
 */
CustomHintAlgorithm.prototype.pop = function() {
  var hintKey = '';

  for (var i = 0; i < this.needKeyLength; i++) {
    hintKey += this.keys[this.keysIndex[i]];
  }
};
