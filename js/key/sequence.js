/**
 * キーボードから押下されたキーを取り扱います。
 *
 * KeySequenceクラスのonProcessにコールバック関数を登録すると
 * キーボードのキーが押下される度に登録されたコールバック関数が呼び出され
 * 以下の形式でパラメータが渡されます。
 *
 * function callback(e, sequence, stack, key);
 *   e        : キーダウンイベント
 *   sequence : 特定の時間内に連続して押下されたキーを連結したもの。
 *              1文字目に a を押下した場合は 'a' が渡される。
 *              2文字目に特定時間内に b を押下した場合は 'ab' が渡される。
 *              3文字目に特定時間を過ぎた後に c を押下した場合はリセットされて 'c' が渡される。
 *   stack    : 押下されたキーを連結したもの。
 *              sequenceと違って特定時間内でリセットされない。
 *              リセットする場合は明示的にresetメソッドを呼び出す。
 *   key      : 今回押下されたキー
 */
var _KeySequence = function() {
  this.keySequece = '';
  this.keyStack = '';
  this.callbacks = [];
  this.resetkeySequeceTimerId = -1;

  var _this = this;
  document.addEventListener('keydown', function(e) {
    _this.processor(e);
  }, true);
};

/**
 * キーボード押下時のコールバック関数を登録します。
 *
 * @param function callback コールバック関数
 */
_KeySequence.prototype.onProcess = function(callback) {
  this.callbacks.push(callback);
};

_KeySequence.prototype.processor = function(e) {
  // メタキー単体でのキー押下は処理しない
  var id = e.keyIdentifier;
  if (id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta') {
    return false;
  }

  // キー入力待ちのタイマーをリセット
  this.resetTimerForResetKeySequence();

  // 押下されたキーをキーシーケンスに追加
  var key = this.getKeyChar(e);
  this.keySequece += key;
  this.keyStack   += key;

  // キー入力コールバックを呼び出す
  for (var i in this.callbacks) {
    var callback = this.callbacks[i];
    if (typeof callback == 'function') {
      callback.call(this, e, this.keySequece, this.keyStack, key);
    }
  }

  // 次のキー入力を待つためにタイマーを仕込む
  this.setTimerForResetKeySequence(300);
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
_KeySequence.prototype.getKeyChar = function(e) {
  var key = KeyIdentifiers.toChar(e.keyIdentifier);

  if (!key) {
    return e.keyIdentifier;
  }

  if (e.shiftKey) {
    key = key.toUpperCase();
  }

  if (e.metaKey) {
    key = '<M-' + key + '>';
  }
  else if (e.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
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
 * 次のキー入力を待つためのタイマーを仕込みます。
 *
 * 引数のintervalに指定された秒数だけ待つ間に次のキー入力がなければ
 * 登録されたキー入力が確定されたことを伝えるためにコールバック関数を呼び出します。
 *
 * @param integer interval 次のキー入力を待つまでの時間。ミリセカンド
 */
_KeySequence.prototype.setTimerForResetKeySequence = function(interval) {
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
