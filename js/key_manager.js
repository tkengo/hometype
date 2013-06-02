var KeyManager = function() {
  Mode.onModeChange($.proxy(function(currentMode, oldMode) {
    this.currentModeKeyManager = Mode.factory(currentMode);
  }, this));
  this.currentModeKeyManager = Mode.factory();
};

KeyManager.prototype.onKeyDown = function(event) {
  this.currentModeKeyManager.onKeyDown(event);
};
