var HintKeys = 'jfhkgyuiopqwertnmzxcvblasd';

var HintElementCollection = function(hintTheme, target) {
  this.hintTheme = hintTheme || 'yellow';
  this.elements = [];

  this.htmlElements = target;

  this.keyIndex1 = 0;
  this.keyIndex2 = 0;

  this.hintKeys = [];

  tipText = '';
  this.parent = document.createElement("div");

  // $.each(this.htmlElements, $.proxy(function(index, element) {
  //   var key = this.nextHintKey();
  //   // var element = new HintElement(element, index, key, this.hintTheme);
  //   var element = this.createTipElement(element, key);
  //   this.elements.push(element);
  //   this.hintKeys.push({ index: index, key: key });
  //   // tipText += element.getRawTipElement().get(0).outerHTML;
  //   parent.appendChild(element);
  // }, this));

  this.className = 'hometype-hit-a-hint-' + hintTheme;

  for (var i in this.htmlElements) {
    var key = this.nextHintKey();
    // var htmlElement = this.htmlElements[i];
    // htmlElement.className ?
    //   htmlElement.className += ' ' + this.className :
    //   htmlElement.className  =       this.className;
    // var element = this.createTipElement(htmlElement, key, this.hintTheme);
    var element = new HintElement(this.htmlElements[i], i, key, this.hintTheme);
    this.elements.push(element);
    this.hintKeys.push({ index: i, key: key });
    // tipText += element.getRawTipElement().get(0).outerHTML;
    this.parent.appendChild(element.getRawTipElement());
    // this.parent.appendChild(element);
  }
  console.log('b:' + Date.now());

  document.documentElement.appendChild(this.parent);
  console.log('c:' + Date.now());
  // $('html').append(tipText);
};

/**
 * Create a hint tip element.
 * Calculate a hint tip position to show in left side of a source element.
 */
HintElementCollection.prototype.createTipElement = function(element, key, hintTheme) {
  var top = 0, left = 0;
  var rect = element.getClientRects()[0];

  if (element.tagName == 'area') {
    // Get a position from coords attribute if an element is a clickable map.
    var coords = element.attr('coords').split(',');
    top = coords[1];
    left = coords[0];
  }
  else {
    // Usually get a position from an element offset.
    top  = rect.top  - 10;
    left = rect.left - 10;
  }

  // Correct an element position if it is out of display.
  if (top < 0) {
    top = 0;
  }
  if (left < 0) {
    left = 0;
  }

  // Set hint keys to a hint tip element.
  var tipHtml = '';
  for (var i in key) {
    tipHtml += '<span>' + key[i] + '</span>';
  }
  var elementId = 'hometype-hit-a-hint-element-' + key;

  var tip = document.createElement('div');
  tip.className     = this.className + ' hometype-hit-a-hint-base';
  tip.clickableItem = element;
  tip.style.left    = rect.left + window.scrollX + 'px';
  tip.style.top     = rect.top  + window.scrollY  + 'px';
  tip.rect          = rect;
  tip.innerHTML     = tipHtml;
  tip.id            = elementId;

  return tip;
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
      // this.removeHintTip(hintKey.index);
      this.elements[hintKey.index].removeHintTip();
    }
  }
};

HintElementCollection.prototype.removeHintTip = function(index) {
  this.htmlElements[index].className = this.htmlElements[index].className.replace(this.className, '');
  this.parent.removeChild(this.elements[i]);
};

HintElementCollection.prototype.removeAllHint = function() {
  for (var index in this.elements) {
    this.elements[index].removeHintTip(false);
  }
};

HintElementCollection.prototype.show = function() {
  console.log('d:' + Date.now());
  $('.hometype-hit-a-hint-base').fadeIn(100);
  console.log('e:' + Date.now());
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
