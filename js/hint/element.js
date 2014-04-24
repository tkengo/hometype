/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Hint element.
 */

/**
 * Constructor
 *
 * @param element srcElement A source element of this hint element.
 * @param integer index      Hint element index.
 * @param array   key        Hint key.
 * @param string  hintTheme  Hint theme.
 */
var HintElement = function(srcElement, index, key, hintTheme) {
  this.className = 'hometype-hit-a-hint-' + hintTheme;
  this.index     = index;
  this.key       = key;

  this.srcElement = srcElement;
  this.srcElement.className ?
    this.srcElement.className += ' ' + this.className + '-area' :
    this.srcElement.className  =       this.className + '-area';

  this.rawTipElement = this.createTipElement();
};

/**
 * Create a hint tip element.
 * Calculate a hint tip position to show in left side of a source element.
 */
HintElement.prototype.createTipElement = function() {
  var top = 0, left = 0;
  var rect = this.srcElement.getClientRects()[0];

  if (this.srcElement.tagName == 'AREA') {
    // Get a position from coords attribute if an element is a clickable map.
    var coords = this.srcElement.coords.split(',');
    rect = this.srcElement.parentNode.getClientRects()[0];

    top  = rect.top  + parseInt(coords[1]) - 10;
    left = rect.left + parseInt(coords[0]) - 10;
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
  for (var i in this.key) {
    tipHtml += '<span>' + this.key[i] + '</span>';
  }
  this.elementId = 'hometype-hit-a-hint-element-' + this.key;

  var tip = document.createElement('div');
  tip.className     = this.className + ' hometype-hit-a-hint-base';
  tip.clickableItem = this.srcElement;
  tip.style.left    = left + window.scrollX + 'px';
  tip.style.top     = top  + window.scrollY + 'px';
  tip.rect          = rect;
  tip.innerHTML     = tipHtml;
  tip.id            = this.elementId;

  return tip;
};

/**
 * Get the source element.
 */
HintElement.prototype.getElement = function() {
  return this.srcElement;
};

/**
 * Get the hint tip element.
 */
HintElement.prototype.getTipElement = function() {
  return $('#' + this.elementId);
};

/**
 * Get the hint tip element.
 * Use this if it is not still rendered to DOM.
 */
HintElement.prototype.getRawTipElement = function() {
  return this.rawTipElement;
};

/**
 * Get the hint keys.
 */
HintElement.prototype.getKey = function() {
  return this.key;
};

/**
 * Pushed first hint key.
 */
HintElement.prototype.setPushed = function() {
  $(this.getTipElement().children()[0]).addClass('hometype-hit-a-hint-pushed');
};

/**
 * Remove hint tip element.
 */
HintElement.prototype.removeHintTip = function(animate) {
  this.srcElement.className = this.srcElement.className.replace(this.className + '-area', '');
  if (animate === false) {
    this.getTipElement().remove();
  }
  else {
    this.getTipElement().fadeOut(100, function() {
      $(this).remove();
    });
  }
};
