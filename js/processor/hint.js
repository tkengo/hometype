/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Hint mode processor.
 */
var HintModeProcessor = function() {
  this.newTab = false;
  this.callback     = null;
  this.hintElements = null;
};

/**
 * Callback method that invoke when leave the hint mode.
 */
HintModeProcessor.prototype.notifyLeaveMode = function() {
  this.callback = null;
  this.hintElements.removeAllHint();
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
    // Invoke a callback method if an element is confirmed.
    if (this.callback && this.callback(elements[0].getElement()) !== false) {
      // Return normal mode if only callback didn't return false.
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return true;
  }
  else {
    // マッチしたけどまだ要素が確定していなければ要素を絞り込む
    this.hintElements.hideUnmatchedElements(stack);
    for (var i in elements) {
      elements[i].setPushed();
    }
    return false;
  }
};

/**
 * 要素に対するヒントを生成して表示します。
 *
 * @param array elements ヒントを表示する対象の要素の配列
 */
HintModeProcessor.prototype.createHints = function(theme, elements) {
  if (this.hintElements) {
    this.hintElements.removeAllHint();
  }

  this.hintElements = new HintElementCollection(theme, elements);
  this.hintElements.show();
};

/**
 * ヒントが確定して要素が選ばれた時に呼ばれるコールバック関数を定義します。
 *
 * @param function callback コールバック関す
 */
HintModeProcessor.prototype.onChooseElement = function(callback) {
  this.callback = callback;
};
