var HintElementCollection = function(hintTheme, target) {
  this.originalElements = target;
  this.hintTheme        = hintTheme;

  this.createHints(target);
};

HintElementCollection.prototype.createHints = function(target) {
  this.elements  = [];
  this.hintKeys  = [];

  var keyAl  = HintKeyFactory.create(target.length);
  var parent = document.createElement('div');

  for (var i = 0; i < target.length; i++) {
    var key     = keyAl.pop();
    var element = new HintElement(target[i], i, key, this.hintTheme);

    this.elements.push(element);
    this.hintKeys.push({ index: i, key: key });
    parent.appendChild(element.getTipElement());
  }

  document.documentElement.appendChild(parent);

  return target;
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
  for (var i = 0; i < this.hintKeys.length; i++) {
    var hintKey = this.hintKeys[i];
    var element = this.elements[hintKey.index];
    if (hintKey.key.indexOf(key) != 0) {
      element.removeHintTip();
    } else {
      element.setPushed();
    }
  }
};

HintElementCollection.prototype.regenerateHintsBy = function(text) {
  var homedics           = new Homedics(text);
  var originalElements   = this.originalElements;
  var regenerateElements = [];

  this.removeAllHint();

  if (text == '') {
    regenerateElements = originalElements;
  } else {
    for (var i = 0; i < originalElements.length; i++) {
      var element = originalElements[i];
      var result  = homedics.match(element.innerText.trim().toLowerCase());

      if (result.match) {
        regenerateElements.push(element);
      }
      if (result.head) {
        element.className = element.className + ' hometype-hit-a-hint-head-area';
      }
    }
  }

  return this.createHints(regenerateElements);
};

HintElementCollection.prototype.getHeadMatchedElements = function() {
  var results = [];

  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i].getElement();
    if (element.className.indexOf('hometype-hit-a-hint-head-area') > -1) {
      results.push(element);
    }
  }

  return results;
};

HintElementCollection.prototype.removeAllHint = function() {
  for (var index in this.elements) {
    this.elements[index].removeHintTip();
  }
};

HintElementCollection.prototype.getAllKeys = function() {
  var allKeys = [];

  for (var i = 0; i <this.hintKeys.length; i++) {
    allKeys.push(this.hintKeys[i].key);
  }

  return allKeys;
};
