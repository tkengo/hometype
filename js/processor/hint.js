/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * ヒントモードのプロセッサ
 */
var HintModeProcessor = function() {
  this.newTab = false;
  this.callback     = null;
  this.hintElements = null;
};

/**
 * ヒントモードを抜ける時に呼ばれるコールバック関数です。
 */
HintModeProcessor.prototype.notifyLeaveMode = function() {
  this.callback = null;
  this.hintElements.removeAllHint();
};

/**
 * キー処理
 *
 * @param string        stack      キースタック。押下されたキー文字列
 * @param string        currentKey 今回押下されたキー文字
 * @param KeyboradEvent e          イベントオブジェクト
 */
HintModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  // デフォルト動作をキャンセル。キーを押していないことにする
  e.stopPropagation();
  e.preventDefault();

  // ヒントキーにマッチする要素一覧を取得する
  var elements = this.hintElements.getMatchedElements(stack);

  if (elements.length == 0) {
    // マッチする要素がなければヒントモードを抜ける
    Mode.changeMode(ModeList.NORMAL_MODE);
    return true;
  }
  else if (elements.length == 1 && elements[0].getKey() == stack) {
    // マッチする要素が確定できればコールバックを呼び出す
    if (this.callback) {
      // コールバック関数でfalseが返されたらノーマルモードには戻らない
      if (this.callback(elements[0].getElement()) === false) {
        return true;
      }
    }

    Mode.changeMode(ModeList.NORMAL_MODE);
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

HintModeProcessor.prototype.setCallback = function(callback) {
  this.callback = callback;
};

HintModeProcessor.prototype.setOpenNewTab = function(newTab) {
  this.newTab = newTab;
};
