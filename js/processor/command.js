var CommandMode = function() {
  this.processor = null;
  this.enterProcessor = null;
  this.commandBox = new ChromekeyCommandBox();
};

CommandMode.prototype.onKeyDown = function(key, currentKey) {
  if (currentKey == 'Enter') {
    var result = false;
    if (this.enterProcessor) {
      result = this.enterProcessor(CommandBox.getText(), CommandBox.getSelected());
    }
    else {
      result = this.enter();
    }

    if (result !== false) {
      CommandBox.hide();

      if (Mode.getCurrentMode() == ModeList.COMMAND_MODE) {
        Mode.changeMode(ModeList.NORMAL_MODE);
      }
    }

    return result;
  }
  else if (this.processor) {
    this.processor();
  }

  return false;
};

CommandMode.prototype.setProcessor = function(processor) {
  this.processor = processor;
};

CommandMode.prototype.setEnter = function(enter) {
  this.enterProcessor = enter;
};

CommandMode.prototype.enter = function() {
  var command = Command[CommandBox.getText()]
  if (command) {
    command.call();
  }
};
