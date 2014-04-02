var HintKeys = 'jfhkgyuiopqwertnmzxcvblasd';

var HintElementCollection = function(hintTheme, target) {
  this.hintTheme = hintTheme || 'yellow';
  this.elements = [];

  this.htmlElements = target;

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  this.hintKeys = [];

  var parent = document.createElement("div");
  for (var i in this.htmlElements) {
    var key = this.nextHintKey();
    var element = new HintElement(this.htmlElements[i], i, key, this.hintTheme);
    this.elements.push(element);
    this.hintKeys.push({ index: i, key: key });
    parent.appendChild(element.getRawTipElement());
  }

  document.documentElement.appendChild(parent);
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
      this.elements[hintKey.index].removeHintTip();
    }
  }
};

HintElementCollection.prototype.removeAllHint = function() {
  for (var index in this.elements) {
    this.elements[index].removeHintTip(false);
  }
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
