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

  this.srcElement = $(srcElement);
  this.srcElement.addClass(this.className + '-area');

  this.rawTipElement = this.createTipElement();
};

/**
 * Create a hint tip element.
 * Calculate a hint tip position to show in left side of a source element.
 */
HintElement.prototype.createTipElement = function() {
  var top = 0, left = 0;

  if (this.srcElement.tag() == 'area') {
    // Get a position from coords attribute if an element is a clickable map.
    var coords = this.srcElement.attr('coords').split(',');
    top = coords[1];
    left = coords[0];
  }
  else {
    // Usually get a position from an element offset.
    top  = this.srcElement.offset().top - 10;
    left = this.srcElement.offset().left - 10;
  }

  // Correct an element position if it is out of display.
  if (top < Viewport.getScrollPosition().top) {
    top = Viewport.getScrollPosition().top;
  }
  if (left < 0) {
    left = 0;
  }

  // Create a hint tip element in a calclated position.
  var div = $('<div>').css({
    'top': top + 'px',
    'left': left + 'px'
  }).addClass(this.className + ' hometype-hit-a-hint-base');

  // Set hint keys to a hint tip element.
  for (var i in this.key) {
    div.append($('<span>').text(this.key[i]));
  }

  // Set unique ID attribute to a hint tip element and return it.
  this.elementId = 'hometype-hit-a-hint-element-' + div.text();
  div.attr({ 'id': this.elementId })
  return div;
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
  this.getElement().removeClass(this.className + '-area');
  if (animate === false) {
    this.getTipElement().remove();
  }
  else {
    this.getTipElement().fadeOut(100, function() {
      $(this).remove();
    });
  }
};
