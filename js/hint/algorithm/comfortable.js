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
  this.rhandKeys1 = convertLettersByOption('JNMH');
  this.rhandKeys2 = convertLettersByOption('KI');
  this.rhandKeys3 = convertLettersByOption('LOP');
  this.lhandKeys1 = convertLettersByOption('RVGCF');
  this.lhandKeys2 = convertLettersByOption('ED');
  this.lhandKeys3 = convertLettersByOption('WS');
  this.lhandKeys4 = convertLettersByOption('QA');

  this.allKeys = this.rhandKeys1 + this.rhandKeys2 + this.rhandKeys3 +
                 this.lhandKeys1 + this.lhandKeys2 + this.lhandKeys3 + this.lhandKeys4;

  this.multiKey = this.allKeys.length < targetLength;

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  if (this.multiKey) {
    this.combinations = [];

    for (var i = 1; i <= 3; i++) {
      for (var j = 1; j <= 3; j++) {
        this.combinations.push([ this['rhandKeys' + i], this['rhandKeys' + j] ]);
      }
    }

    for (var i = 1; i <= 4; i++) {
      for (var j = 1; j <= 4; j++) {
        this.combinations.push([ this['lhandKeys' + i], this['lhandKeys' + j] ]);
      }
    }

    this.currentCombinationIndex = 0;
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

    if (key1 == key2) {
      return this.pop();
    }

    key = key2 + key1;
  } else {
    key = this.allKeys.charAt(this.keyIndex1++);
  }

  return key;
};
