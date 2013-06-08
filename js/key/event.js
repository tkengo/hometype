/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * keydownイベントのeventオブジェクトのラッパー。
 */

/**
 * コンストラクタ
 */
var KeyEvent = function(event) {
  this.event = event;
};

/**
 * 押下されたキーがメタキー(Shift / Ctrl / Alt / Command)単体かどうかを調べます。
 *
 * @return boolena メタキー単体であればtrue
 */
KeyEvent.prototype.isMetaKey = function() {
  var id = this.event.keyIdentifier;
  return id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta';
};

/**
 * ラップしているオリジナルのイベントを取得します。
 *
 * @return KeyboardEvent オリジナルイベント
 */
KeyEvent.prototype.getOriginal = function() {
  return this.event;
};

/**
 * 押下されたキーをキーマッピング用の文字列に変換して返します。
 *   * Ctrlキーと同時にaキーを押した場合は<C-a>
 *   * Shiftキーと同時にaキーを押した場合はA
 *   * Commandキーと同時にaキーを押した場合は<M-a>
 * などです。
 *
 * @return string キーマッピング用の文字列
 */
KeyEvent.prototype.getKeyChar = function() {
  var key = KeyIdentifiers.toChar(this.event.keyIdentifier);

  if (!key) {
    return this.event.keyIdentifier;
  }

  if (event.shiftKey) {
    key = key.toUpperCase();
  }

  if (event.metaKey) {
    key = '<M-' + key + '>';
  }
  else if (event.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
};

/**
 * 押下されたキー文字を取得します。
 *
 * @return string キー文字
 */
KeyEvent.prototype.getChar = function() {
  return KeyIdentifiers.toChar(this.event.keyIdentifier);
};

/**
 * キー押下のデフォルトの処理をキャンセルします。
 */
KeyEvent.prototype.stop = function() {
  this.event.preventDefault();
  this.event.stopPropagation();
};
