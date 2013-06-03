/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * キー操作管理用オブジェクト。
 * documentに対するキーを拾ってコマンドにバインドします。
 */

/**
 * コンストラクタ
 */
var KeyManager = function() {
  // 入力されたキーシーケンス
  // キーシーケンスはリセットされるまで入力値を保持し続けます
  this.keySequece = '';

  Mode.onModeChange($.proxy(function(currentMode, oldMode) {
    this.currentModeKeyManager = Mode.factory(currentMode);
  }, this));
  this.currentModeKeyManager = Mode.factory();
};

/**
 * 押下されたキーを拾って、そのキーにマッピングされているコマンドを実行します。
 *
 * @param KeyEvent e イベント変数
 */
KeyManager.prototype.onKeyDown = function(e) {
  // メタキー(Shift / Ctrl / Alt / Command)単体でのキー押下は処理しない
  if (e.isMetaKey()) {
    return false;
  }

  // キー入力待ちのタイマーをリセット
  this.resetTimerForResetKeySequence();

  // 押下されたキーをキーシーケンスに追加
  this.keySequece += e.getKeyChar();

  // 現在までに入力されたキーでコマンドの候補を取得する
  var candidate = KeyMap.candidate(Mode.getCurrentMode(), this.keySequece);

  if (candidate.length == 1 && candidate[0].key == this.keySequece) {
    // コマンドが確定できればそれを実行
    // 次のコマンド入力を待つためにキーシーケンスも同時にリセット
    this.keySequece = '';
    candidate[0].command.call();
    e.stop();
  }
  else if (candidate.length == 0) {
    // 候補となるコマンドが1つもなければキーシーケンスをリセットして
    // 現在のモードのデフォルトキーイベントに処理を委譲
    this.keySequece = '';
    this.currentModeKeyManager.onKeyDown(e.getOriginal());
  }
  else {
    // 候補が複数あれば次のキー入力を待つためにタイマーを仕込む
    this.setTimerForResetKeySequence(300);
    e.stop();
  }
};

/**
 * 次のキー入力を待つためのタイマーを仕込みます。
 *
 * 引数のintervalに指定された秒数だけ待つ間に次のキー入力がなければ
 * 現在のキーシーケンスに合致するコマンドがあるかどうかを調べて
 * あればそのコマンドを実行します。
 *
 * @param integer interval 次のキー入力を待つまでの時間。ミリセカンド
 */
KeyManager.prototype.setTimerForResetKeySequence = function(interval) {
  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    var command = KeyMap.command(Mode.getCurrentMode(), this.keySequece);
    this.keySequece = '';

    if (command) {
      command.call();
    }
  }, this), interval);
};

/**
 * キー入力を待つタイマーを解除します。
 */
KeyManager.prototype.resetTimerForResetKeySequence = function() {
  // これによってsetTimerForResetKeySequenceでセットしたタイマーが
  // 実行されなくなる
  clearTimeout(this.resetkeySequeceTimerId);
};
