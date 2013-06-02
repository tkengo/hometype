// ヒントモードの時のキー
var HintKeys = 'jfhklasdgyuiopqwertnmzxcvb';

var HintElementCollection = function() {
  this.elements = [];

  this.htmlElements = Viewport.clickableElementInnerScreen();

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  this.hintKeys = [];

  for (var i in this.htmlElements) {
    var key = this.nextHintKey();
    this.elements.push(new HintElement(this.htmlElements[i], i, key));
    this.hintKeys.push({ index: i, key: key });
  }
};

HintElementCollection.prototype.getElements = function() {
  return this.elements;
};

HintElementCollection.prototype.getMatchedElements = function(key) {
  var results = [];

  for (var i in this.hintKeys) {
    var hintKey = this.hintKeys[i];
    if (hintKey.key.indexOf(key) == 0) {
      results.push(this.elements[hintKey.index]);
    }
  }
  
  return results;
};

HintElementCollection.prototype.hideUnmatchedElements = function(key) {
  for (var i in this.hintKeys) {
    var hintKey = this.hintKeys[i];
    if (hintKey.key.indexOf(key) != 0) {
      this.elements[hintKey.index].hideHintTip();
    }
  }
};

HintElementCollection.prototype.removeAllHint = function() {
  $('div.chromekey-hit-a-hint-base').remove();
  $('.chromekey-hit-a-hint-area').removeClass('chromekey-hit-a-hint-area');;
  $('.chromekey-hit-a-hint-n-area').removeClass('chromekey-hit-a-hint-n-area');;
  $('body').css('overflow', this.originalBodyOverflow);
};

HintElementCollection.prototype.show = function() {
  $('.chromekey-hit-a-hint-base').fadeIn(100);

  this.originalBodyOverflow = $('body').css('overflow');
  $('body').css('overflow', 'hidden');
};

HintElementCollection.prototype.nextHintKey = function() {
  var multiKey = this.htmlElements.length > HintKeys.length;

  var key1 = HintKeys[this.keyIndex1];
  var key2 = '';

  if (multiKey) {
    key2 = HintKeys[this.keyIndex2++];
    if (this.keyIndex2 == HintKeys.length) {
      this.keyIndex2 = 0;
      this.keyIndex1++;
    }
  }
  else {
    this.keyIndex1++;
  }

  return key2 + key1;
};
