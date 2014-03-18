/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Hint mode processor.
 */
var HintModeProcessor = function() {
  this.callback     = null;
  this.hintElements = null;
  this.selectBox    = null;
};

/**
 * Callback method that invoke when leave the hint mode.
 */
HintModeProcessor.prototype.notifyLeaveMode = function() {
  this.callback = null;
  this.hintElements.removeAllHint();

  if (this.selectBox) {
    this.selectBox.remove();
  }
};

/**
 * Key processing.
 *
 * @param string        stack      key stack.
 * @param string        currentKey pushed key.
 * @param KeyboradEvent e          event.
 */
HintModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  // Cancel default.
  e.stopPropagation();
  e.preventDefault();

  // Get elements matched hint key.
  var elements = this.hintElements.getMatchedElements(stack);

  if (elements.length == 0) {
    // Return normal mode if there is no element matched hint key.
    Mode.changeMode(ModeList.NORMAL_MODE);
    return true;
  }
  else if (elements.length == 1 && elements[0].getKey() == stack) {
    var element = elements[0].getElement();

    // Invoke a callback method if an element is confirmed.
    if (this.callback && this.callback(element) !== false) {
      // Return normal mode if only callback didn't return false.
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return true;
  }
  else {
    // Hide unmatched elements if an element didn't confirm.
    this.hintElements.hideUnmatchedElements(stack);
    for (var i in elements) {
      elements[i].setPushed();
    }
    return false;
  }
};

/**
 * Create hints for source elements and show it.
 *
 * @param array elements Source elements.
 */
HintModeProcessor.prototype.createHints = function(theme, elements) {
  if (this.hintElements) {
    this.hintElements.removeAllHint();
  }

  this.hintElements = new HintElementCollection(theme, elements);
  this.hintElements.show();
};

/**
 * Set a callback method that is invoked when a hint is confirmed.
 *
 * @param function callback Callback method.
 */
HintModeProcessor.prototype.onChooseElement = function(callback) {
  this.callback = callback;
};
