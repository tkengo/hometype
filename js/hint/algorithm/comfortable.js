/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Comfortable hint key algorithm.
 */

/**
 * Constructor
 *
 * @param boolean targetLength Length of hint for target.
 */
var ComfortableHintAlgorithm = function(targetLength) {
  this.rhandKeys1 = 'jnmh';
  this.rhandKeys2 = 'ki';
  this.rhandKeys3 = 'lop';
  this.lhandKeys1 = 'rvgcf';
  this.lhandKeys2 = 'ed';
  this.lhandKeys3 = 'ws';
  this.lhandKeys4 = 'qa';

  this.allKeys = this.rhandKeys1 + this.rhandKeys2 + this.rhandKeys3 +
                 this.lhandKeys1 + this.lhandKeys2 + this.lhandKeys3 + this.lhandKeys4;

  this.multiKey = this.allKeys.length < targetLength;

  if (this.multiKey) {
    this.combinations = [
      [ this.rhandKeys1, this.rhandKeys2 ],
      [ this.lhandKeys1, this.lhandKeys2 ],
      [ this.rhandKeys1, this.rhandKeys3 ],
      [ this.lhandKeys1, this.lhandKeys3 ],
      [ this.rhandKeys2, this.rhandKeys1 ],
      [ this.lhandKeys1, this.lhandKeys4 ],
      [ this.rhandKeys2, this.rhandKeys3 ],
      [ this.lhandKeys2, this.lhandKeys1 ],
      [ this.rhandKeys3, this.rhandKeys1 ],
      [ this.lhandKeys2, this.lhandKeys3 ],
      [ this.rhandKeys3, this.rhandKeys2 ],
      [ this.lhandKeys2, this.lhandKeys4 ],
      [ this.lhandKeys3, this.lhandKeys1 ],
      [ this.lhandKeys3, this.lhandKeys2 ],
      [ this.lhandKeys3, this.lhandKeys4 ],
      [ this.lhandKeys4, this.lhandKeys1 ],
      [ this.lhandKeys4, this.lhandKeys2 ],
      [ this.lhandKeys4, this.lhandKeys3 ]
    ];

    this.currentCombinationIndex = 0;
    this.keyIndex1 = 0;
    this.keyIndex2 = 0;
  }
};

/**
 * Pop a next hint key.
 */
ComfortableHintAlgorithm.prototype.pop = function() {
  var key = '';

  if (this.multiKey) {
    var keys1 = this.combinations[this.currentCombinationIndex][0];
    var keys2 = this.combinations[this.currentCombinationIndex][1];

    var key1 = keys1.charAt(this.keyIndex1);
    var key2 = keys2.charAt(this.keyIndex2++);
    if (keys2.length <= this.keyIndex2) {
      this.keyIndex2 = 0;
      this.keyIndex1++;
    }
    if (keys1.length <= this.keyIndex1) {
      this.keyIndex1 = 0;
      this.currentCombinationIndex++;
    }

    key = key2 + key1;
  } else {
    key = this.allKeys.charAt(this.keyIndex1++);
  }

  return key;
};
