var NormalMode = function() {
  this.keySequece = '';
  this.resetkeySequeceTimerId = -1;
  this.commandCandidate = {};
};

NormalMode.prototype.onKeyDown = function(event) {
  return true;
  this.keySequece += this.getKeyChar(event);

  this.resetTimerForResetKeySequence();

  var candidate = KeyMap.candidate('nmap', this.keySequece);
  if (candidate.length == 1 && candidate[0].key == this.keySequece) {
    this.keySequece = '';
    candidate[0].command.call();
  }
  else {
    this.setTimerForResetKeySequence(300);
  }
};

NormalMode.prototype.setTimerForResetKeySequence = function(interval) {
  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    var command = KeyMap.command('nmap', this.keySequece);
    this.keySequece = '';

    if (command) {
      command.call();
    }
  }, this), interval);
};

NormalMode.prototype.resetTimerForResetKeySequence = function(interval) {
  clearTimeout(this.resetkeySequeceTimerId);
};

NormalMode.prototype.getKeyChar = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);

  if (event.shiftKey) {
    key = key.toUpperCase();
  }
  if (event.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
};
