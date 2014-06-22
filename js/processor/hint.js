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
  this.hintElements = null;
  this.headElements = [];
  this.searching = false;
  this.commandBox = null;
};

/**
 * Callback method that invoke when leave the hint mode.
 */
HintModeProcessor.prototype.notifyLeaveMode = function() {
  this.chooseElementCallback = null;
  this.hintElements.removeAllHint();
  this.searching = false;

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
  if (this.searching) {
    if (currentKey == 'Enter' && this.headElements.length > 0) {
      this.chooseElementCallback($(this.headElements[0]));
    }

    if (this.hintElements.getAllKeys().join().indexOf(currentKey) == -1) {
      return true;
    }
  }

  // Get elements matched hint key.
  var elements = this.hintElements.getMatchedElements(stack);

  if (elements.length == 0) {
    // Return normal mode if there is no element matched hint key.
    this.startSearching();
    return true;
  }

  // Cancel default.
  e.stopPropagation();
  e.preventDefault();

  return this.choose(elements, stack);
};

HintModeProcessor.prototype.choose = function(elements, stack) {
  if (elements.length == 1 && elements[0].getKey() == stack) {
    var element = elements[0].getElement();

    // Invoke a callback method if an element is confirmed.
    if (this.chooseElementCallback && this.chooseElementCallback($(element)) !== false) {
      // Return normal mode if only callback didn't return false.
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return true;
  } else {
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
  this.theme = theme;
  this.originalElements = elements;
};

HintModeProcessor.prototype.regenerateHintsBy = function(text) {
  if (this.hintElements) {
    this.hintElements.removeAllHint();
  }

  text = text.toLowerCase();

  var regenerateElements = [];
  var headMatchedElements = [];
  for (var i = 0; i < this.originalElements.length; i++) {
    var element = this.originalElements[i];
    var innerText = element.innerText.trim().toLowerCase();

    if (innerText.indexOf(text) > -1) {
      regenerateElements.push(element);
    }
    if (innerText.substr(0, text.length) == text) {
      headMatchedElements.push(element);
    }
  }

  if (regenerateElements.length > 0) {
    this.hintElements = new HintElementCollection(this.theme, regenerateElements);

    headMatchedElements[0].className = headMatchedElements[0].className + ' hometype-hit-a-hint-head-area';
    this.headElements = headMatchedElements;
  } else {
    this.hintElements = null;
  }

  return regenerateElements;
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
 * @param function notifyleavemodeCallback Callback method.
 */
HintModeProcessor.prototype.onNotifyLeaveMode = function(notifyLeaveModeCallback) {
  this.notifyLeaveModeCallback = notifyLeaveModeCallback;
};

HintModeProcessor.prototype.startSearching = function() {
  if (this.searching) {
    return;
  }

  if (!this.commandBox) {
    this.commandBox = new HometypeCommandBox();

    var context = this;
    this.commandBox.onUpdate(function(text) {
      // var uppers = text.match(/[A-Z]+/);
      // if (uppers) {
      //   context.choose(context.hintElements.getElements(), uppers[0]);
      // } else {
        var regenerateElements = context.regenerateHintsBy(text);
        if (regenerateElements.length == 1) {
          context.chooseElementCallback($(regenerateElements[0]));
        } else {
          this.regenerateElements = regenerateElements;
        }
      // }
    });
  }

  this.commandBox.show();

  this.searching = true;
};
