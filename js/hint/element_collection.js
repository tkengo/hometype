// ヒントモードの時のキー
var HintKeys = 'jfhkgyuiopqwertnmzxcvblasd';

var HintElementCollection = function(hintTheme, target) {
  this.hintTheme = hintTheme || 'yellow';
  this.elements = [];

  this.htmlElements = target;

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  this.hintKeys = [];

  for (var i in this.htmlElements) {
    var key = this.nextHintKey();
    this.elements.push(new HintElement(this.htmlElements[i], i, key, this.hintTheme));
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
  var c = 'chromekey-hit-a-hint-' + this.hintTheme + '-area';
  $('.' + c).removeClass(c);
  $('body').css('overflow', this.originalBodyOverflow);
};

HintElementCollection.prototype.show = function() {
  $('.chromekey-hit-a-hint-base').fadeIn(100);

  this.originalBodyOverflow = $('body').css('overflow');
  $('body').css('overflow', 'hidden');
};

HintElementCollection.prototype.nextHintKey = function() {
  var singleKeyCount = HintKeys.length - Math.floor(this.htmlElements.length / HintKeys.length);
  multiKey = this.htmlElements.length > HintKeys.length;

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
