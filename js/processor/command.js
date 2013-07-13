/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * コマンドモードでの処理を担当します。
 */
var CommandModeProcessor = function() {
  this.processor = null;
  this.enterProcessor = null;
  this.commandBox = new ChromekeyCommandBox();
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
    var result = false;
    if (this.enterProcessor) {
      result = this.enterProcessor(this.commandBox.getText(), this.commandBox.getSelected());
    }
    else {
      result = this.enter();
    }

    if (result !== false) {
      this.commandBox.hide();
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return result;
  }
  else if (this.processor) {
    setTimeout($.proxy(function() {
      var result = this.processor(this.commandBox.getText());
      if (result) {
        this.commandBox.setCandidate(result);
        this.commandBox.showCandidate();
      }
    }, this), 10);
  }

  return false;
};

CommandModeProcessor.prototype.onUpdateBoxText = function(callback) {
  this.processor = callback;
};

CommandModeProcessor.prototype.onEnter = function(callback) {
  this.enterProcessor = callback;
};

CommandModeProcessor.prototype.notifyEnterMode = function() {
  this.commandBox.show();
};

CommandModeProcessor.prototype.notifyLeaveMode = function() {
  this.processor = null;
  this.commandBox.hide();
};

CommandModeProcessor.prototype.getCommandBox = function() {
  return this.commandBox;
};

CommandModeProcessor.prototype.setProcessor = function(processor) {
  this.processor = processor;
};

CommandModeProcessor.prototype.setEnter = function(enter) {
  this.enterProcessor = enter;
};

CommandModeProcessor.prototype.enter = function() {
  var command = Command[this.commandBox.getText()]
  if (command) {
    command.call();
  }
};
