var KeyManager = function() {
  this.keySequece = '';
  Mode.onModeChange($.proxy(function(currentMode, oldMode) {
    this.currentModeKeyManager = Mode.factory(currentMode);
  }, this));
  this.currentModeKeyManager = Mode.factory();
};

KeyManager.prototype.onKeyDown = function(event) {
  var id = event.keyIdentifier;
  if (id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta') {
    return false;
  }

  this.keySequece += this.getKeyChar(event);

  this.resetTimerForResetKeySequence();

  var candidate = KeyMap.candidate(Mode.getCurrentMode(), this.keySequece);
  if (candidate.length == 1 && candidate[0].key == this.keySequece) {
    this.keySequece = '';
    candidate[0].command.call();
    event.preventDefault();
    event.stopPropagation();
  }
  else if (candidate.length == 0) {
    this.keySequece = '';
    this.currentModeKeyManager.onKeyDown(event);
  }
  else {
    this.setTimerForResetKeySequence(300);
    event.preventDefault();
    event.stopPropagation();
  }
};

KeyManager.prototype.setTimerForResetKeySequence = function(interval) {
  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    var command = KeyMap.command(Mode.getCurrentMode(), this.keySequece);
    this.keySequece = '';

    if (command) {
      command.call();
    }
  }, this), interval);
};

KeyManager.prototype.resetTimerForResetKeySequence = function(interval) {
  clearTimeout(this.resetkeySequeceTimerId);
};

KeyManager.prototype.getKeyChar = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);

  if (event.shiftKey) {
    key = key.toUpperCase();
  }
  if (event.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
};
