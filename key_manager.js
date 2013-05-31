var KeyManager = function() {
  this.keySequece = '';
  this.resetkeySequeceTimerId = -1;
};

KeyManager.prototype.onKeyDown = function(event) {
  var id = event.keyIdentifier;
  if (id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta') {
    return false;
  }

  this.keySequece += this.getKeyChar(event);

  this.resetTimerForResetKeySequence();

  var command = KeyMap.command(this.keySequece);
  if (command) {
    this.keySequece = '';
    command.call();
  }
  else {
    this.setTimerForResetKeySequence(500);
  }
};

KeyManager.prototype.setTimerForResetKeySequence = function(interval) {
  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    this.keySequece = '';
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
