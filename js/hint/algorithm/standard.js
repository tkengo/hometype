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
 * @param boolean targetLength Length of hint for target.
 */
var StandardHintAlgorithm = function(targetLength) {
  this.allKeys = 'JFHKGYUIOPQWERTNMZXCVBLASD';
  this.multiKey = this.allKeys.length < targetLength;
  this.keyIndex1 = 0;
  this.keyIndex2 = 0;
};

/**
 * Pop a next hint key.
 */
StandardHintAlgorithm.prototype.pop = function() {
  var key1 = this.allKeys.charAt(this.keyIndex1);
  var key2 = '';

  if (this.multiKey) {
    key2 = this.allKeys.charAt(this.keyIndex2++);
    if (this.keyIndex2 == this.allKeys.length) {
      this.keyIndex2 = 0;
      this.keyIndex1++;
    }
  }
  else {
    this.keyIndex1++;
  }

  return key2 + key1;
};
