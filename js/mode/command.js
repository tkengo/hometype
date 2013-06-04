var CommandMode = function() {
};

CommandMode.prototype.onKeyDown = function(e) {
  if (e.getOriginal().keyIdentifier == 'Enter') {
    var command = Command[CommandBox.getText()]
    if (command) {
      command.call();
    }

    CommandBox.hide();

    if (Mode.getCurrentMode() == ModeList.COMMAND_MODE) {
      Mode.changeMode(ModeList.NORMAL_MODE);
    }
  }
};
