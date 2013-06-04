var _KeySequence = function() {
  this.keySequece = '';
  this.keyStack = '';
  this.callbacks = [];
  this.resetkeySequeceTimerId = -1;
  this.interval = 300;
};

_KeySequence.prototype.onKeyCertain = function(callback) {
  this.callbacks.push(callback);
};

_KeySequence.prototype.processor = function(e) {
  // メタキー(Shift / Ctrl / Alt / Command)単体でのキー押下は処理しない
  if (e.isMetaKey()) {
    return false;
  }

  // キー入力待ちのタイマーをリセット
  this.resetTimerForResetKeySequence();

  // 押下されたキーをキーシーケンスに追加
  this.keySequece += e.getKeyChar();
  this.keyStack   += e.getKeyChar();

  // キー入力コールバックを呼び出す
  this.executeCallbacks();

  // 次のキー入力を待つためにタイマーを仕込む
  this.setTimerForResetKeySequence(this.interval);
};

/**
 * キーシーケンスをリセットします。
 */
_KeySequence.prototype.reset = function() {
  this.keySequece = '';
  this.keyStack   = '';
  this.resetTimerForResetKeySequence();
};

/**
 * キー確定までのインターバルを変更します。
 *
 * @param integer interval キー確定までのインターバル。
 *                         0を指定すると明示的にリセットするまでキー確定しない。
 */
_KeySequence.prototype.setInterval = function(interval) {
  this.resetTimerForResetKeySequence();
  this.interval = interval;
  this.setTimerForResetKeySequence(this.interval);
};

_KeySequence.prototype.executeCallbacks = function() {
  for (var i in this.callbacks) {
    var callback = this.callbacks[i];
    if (typeof callback == 'function') {
      callback.call(this, this.keySequece, this.keyStack);
    }
  }
};

/**
 * 次のキー入力を待つためのタイマーを仕込みます。
 *
 * 引数のintervalに指定された秒数だけ待つ間に次のキー入力がなければ
 * 登録されたキー入力が確定されたことを伝えるためにコールバック関数を呼び出します。
 *
 * @param integer interval 次のキー入力を待つまでの時間。ミリセカンド
 */
_KeySequence.prototype.setTimerForResetKeySequence = function(interval) {
  if (interval == 0) {
    return;
  }

  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    this.keySequece = '';
    this.resetTimerForResetKeySequence();
  }, this), interval);
};

/**
 * キー入力を待つタイマーを解除します。
 */
_KeySequence.prototype.resetTimerForResetKeySequence = function() {
  // これによってsetTimerForResetKeySequenceでセットしたタイマーが
  // 実行されなくなる
  clearTimeout(this.resetkeySequeceTimerId);
};

var KeySequence = new _KeySequence();

$(document).ready(function() {
  document.addEventListener('keydown', function(e) {
    KeySequence.processor(new KeyEvent(e));
  });
});
