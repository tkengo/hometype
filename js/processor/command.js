/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * コマンドモードでの処理を担当します。
 * コマンドモードに入ったらコマンドボックスが表示されます。
 * プロセッサに対して以下のイベントを設定できます。
 *
 * イベント
 *   - onUpdateBoxText コマンドボックスの内容が更新された場合に呼び出されます。
 *                     配列を返した場合、それが候補一覧としてコマンドボックス上に表示されます。
 *   - onEnter         コマンドボックス内でエンターキーが押下された場合に呼び出されます
 * これらのイベントはコマンドモードを抜けたらクリアされます。
 */
var CommandModeProcessor = function() {
  this.updateBoxTextCallback = null;
  this.enterCallback         = null;

  // コマンドボックス
  this.commandBox = new ChromekeyCommandBox();
};

/**
 * コマンドモードに入った時に呼ばれるコールバック関数です。
 */
CommandModeProcessor.prototype.notifyEnterMode = function() {
  this.commandBox.show();
};

/**
 * コマンドモードを抜ける時に呼ばれるコールバック関数です。
 */
CommandModeProcessor.prototype.notifyLeaveMode = function() {
  this.updateBoxTextCallback = null;
  this.enterCallback         = null;

  this.commandBox.hide();
};

/**
 * キー処理
 *
 * @param string        stack      キースタック。押下されたキー文字列
 * @param string        currentKey 今回押下されたキー文字
 * @param KeyboradEvent e          イベントオブジェクト
 */
CommandModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  if (currentKey == 'Enter') {
    // エンターキー押下の処理を実行。定義されていなければデフォルト動作
    var result = this.enterCallback ?
                 this.enterCallback(this.commandBox.getText(), this.commandBox.getSelected()) :
                 this.enter();

    // falseが返ってきたらコマンドモードは抜けないでおく
    if (result !== false) {
      this.commandBox.hide();
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return result;
  }

  // コマンドボックスの更新イベントが設定されていれば呼び出す
  if (this.updateBoxTextCallback) {
    // コマンドボックス内にキーイベントが浸透しないとこのキー押下のキーが
    // 適用されていないので、少し待ってからイベントを呼び出す
    setTimeout($.proxy(function() {
      this.updateCandidate();
    }, this), 10);
  }

  return true;
};

/**
 * コールバック関数を実行して候補一覧を更新します。
 */
CommandModeProcessor.prototype.updateCandidate = function() {
  var result = this.updateBoxTextCallback(this.commandBox.getText());

  // 結果が配列であればそれをセットして候補として表示する
  if (result instanceof Array) {
    this.commandBox.setCandidate(result);
    this.commandBox.showCandidate();
  }
};

/**
 * コマンドボックスが更新された時に呼ばれるコールバック関数を指定します。
 *
 * @param function callback    コールバック関数
 * @param boolean  immediately trueを指定すればコールバック関数を登録と同時に1度実行します
 */
CommandModeProcessor.prototype.onUpdateBoxText = function(callback, immediately) {
  this.updateBoxTextCallback = callback;
  
  if (immediately) {
    this.updateCandidate();
  }
};

/**
 * コマンドボックス内でエンターキーが押下された時に呼ばれるコールバック関数を指定します。
 *
 * @param function callback コールバック関数
 */
CommandModeProcessor.prototype.onEnter = function(callback) {
  this.enterCallback = callback;
};

/**
 * コマンドボックスを取得します。
 *
 * @return ChromekeyCommandBox コマンドボックス
 */
CommandModeProcessor.prototype.getCommandBox = function() {
  return this.commandBox;
};

CommandModeProcessor.prototype.setProcessor = function(processor) {
  this.updateBoxTextCallback = processor;
};

CommandModeProcessor.prototype.setEnter = function(enter) {
  this.enterCallback = enter;
};

CommandModeProcessor.prototype.enter = function() {
  var command = Command[this.commandBox.getText()]
  if (command) {
    command.call();
  }
};
