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
  this.allKeys = convertLettersByOption('JFHKGYUIOPQWERTNMZXCVBLASD');
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

// /**
//  * Constructor
//  *
//  * @param boolean targetLength Length of hint for target.
//  */
// var StandardHintAlgorithm = function(targetLength) {
//   var characters = Opt.hint_characters;
//   var keyLength  = 1;
//   var keyList    = [];
//
//   while (Math.pow(characters.length, keyLength) < targetLength) {
//     keyLength++;
//   }
//
//   for (var keyLengthIndex = keyLength - 1; keyLengthIndex > -1; keyLengthIndex--) {
//     var key = '';
//     for (var x = 0; x < characters.length; x++) {
//       key += new Array(Math.pow(characters.length, keyLengthIndex) + 1).join(characters.charAt(x));
//     }
//     key = new Array(Math.pow(characters.length, keyLength - keyLengthIndex - 1) + 1).join(key);
//     keyList.push(key);
//   }
//
//   this.keyList      = keyList;
//   this.currentIndex = 0;
// };
//
// /**
//  * Pop a next hint key.
//  */
// StandardHintAlgorithm.prototype.pop = function() {
//   var key = '';
//   for (var i = this.keyList.length - 1; i > -1; i--) {
//     key += this.keyList[i].charAt(this.currentIndex);
//   }
//   this.currentIndex++;
//   return key;
// };
