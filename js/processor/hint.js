/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Hint mode processor.
 */
var HintModeProcessor = function() {
  this.chooseElementCallback   = null;
  this.notifyLeaveModeCallback = null;
  this.hintElements            = null;
  this.commandBox              = null;
  this.headElements            = [];
  this.searching               = false;
  this.extendAction            = null;
};

/**
 * Callback method that invoke when enter the hint mode.
 */
HintModeProcessor.prototype.notifyEnterMode = function() {
  if (!this.commandBox) {
    this.commandBox = new HometypeCommandBox('SearchHints');
  }
};

/**
 * Callback method that invoke when leave the hint mode.
 */
HintModeProcessor.prototype.notifyLeaveMode = function() {
  this.chooseElementCallback = null;
  this.hintElements.removeAllHint();
  this.searching    = false;
  this.extendAction = null;

  if (this.commandBox) {
    this.commandBox.hide();
  }

  if (this.notifyLeaveModeCallback) {
    this.notifyLeaveModeCallback();
    this.notifyLeaveModeCallback = null;
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
  // Enter the extend hint mode.
  if (!this.searching && (currentKey == ';' || this.commandBox.getHeaderText() == ';')) {
    if (currentKey == ';') {
      this.commandBox.setHeaderText(';').show();
      return true;
    } else if (this.extendAction = ActionMap[currentKey]) {
      this.commandBox.setHeaderText(this.extendAction).setText('');
      document.activeElement.blur();
      return true;
    } else {
      this.commandBox.setHeaderText(this.getExtendAction());
    }
  }

  // Get elements matched hint key.
  var elements = this.hintElements.getMatchedElements(stack);
  if (elements.length == 0) {
    // Search hint texts if there is no element matched hint key.
    this.startSearching(currentKey);
    return true;
  }

  e.stopPropagation();
  e.preventDefault();

  if (elements.length == 1 && elements[0].getKey() == stack) {
    this.confirm(elements[0].getElement());
    return true;
  } else {
    this.hintElements.hideUnmatchedElements(stack);
    return false;
  }
};

HintModeProcessor.prototype.getExtendAction = function() {
  return this.extendAction || ActionMap.default;
};

/**
 * Confirm an element and invoke a callback method.
 * Return normal mode if the callback method returned false.
 *
 * @param DOMElement element A confirmed element.
 */
HintModeProcessor.prototype.confirm = function(element) {
  // Invoke a callback method if an element is confirmed.
  if (this.chooseElementCallback && this.chooseElementCallback.call(this, element) !== false) {
    // Return normal mode if only callback didn't return false.
    Mode.changeMode(ModeList.NORMAL_MODE);
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
};

/**
 * Set a callback method that is invoked when a hint is confirmed.
 *
 * @param function chooseElementCallback Callback method.
 */
HintModeProcessor.prototype.onChooseElement = function(chooseElementCallback) {
  this.chooseElementCallback = chooseElementCallback;
};

/**
 * Register callback that invokes when Ht leaves from the hint mode.
 *
 * @param function notifyLeaveModeCallback Callback method.
 */
HintModeProcessor.prototype.onNotifyLeaveMode = function(notifyLeaveModeCallback) {
  this.notifyLeaveModeCallback = notifyLeaveModeCallback;
};

/**
 * Start searching in the hint mode.
 *
 * @param string currentKey
 */
HintModeProcessor.prototype.startSearching = function(currentKey) {
  if (!this.searching) {
    this.commandBox.setHeaderText(this.getExtendAction());
    this.searching = true;
  }

  if (!this.commandBox.isFocused()) {
    this.commandBox.show().setText(currentKey);
  }

  var context = this;
  setTimeout(function() {
    context.searchHints(context.commandBox.getText(), currentKey);
  }, 10);
};

/**
 * Search texts in all hints and regenerate hints only matched by a search text.
 * An element will be confirmed if there is only one regenerated hint.
 *
 * @param string text A search text.
 * @param string currentkey
 */
HintModeProcessor.prototype.searchHints = function(text, currentKey) {
  var regenerateElements = this.hintElements.regenerateHintsBy(text.toLowerCase());
  if (regenerateElements.length == 1 && Opt.hint_auto_confirm) {
    this.confirm(regenerateElements[0].getElement());
  } else {
    if (currentKey == 'Enter') {
      var matchedElement = this.hintElements.getFilteringMatchedElement();
      if (matchedElement) {
        this.confirm(matchedElement);
      }
    }
  }
};
