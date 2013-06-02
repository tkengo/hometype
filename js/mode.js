var ModeList = {
  NORMAL_MODE: 'normal',
  HINT_MODE: 'hint',
  NHINT_MODE: 'nhint',
  VISUAL_MODE: 'visual'
};

var _Mode = function() {
  this.mode = ModeList.NORMAL_MODE;

  this.callbacks = [];
};

_Mode.prototype.getCurrentMode = function() {
  return this.mode;
};

_Mode.prototype.changeMode = function(modeName) {
  var oldMode = this.mode;
  this.mode = modeName;

  for (var key in this.callbacks) {
    var callback = this.callbacks[key];
    if (typeof callback === 'function') {
      callback.call(callback, this.mode, oldMode);
    }
  }
};

_Mode.prototype.factory = function(mode) {
  mode = mode || this.mode;

  switch (mode) {
    case ModeList.NORMAL_MODE: return new NormalMode();
    case ModeList.HINT_MODE: return new HintMode();
    case ModeList.NHINT_MODE: return new HintMode();
    case ModeList.VISUAL_MODE: return new NormalMode();
  }
};

_Mode.prototype.onModeChange = function(callback) {
  this.callbacks.push(callback);
};

var Mode = new _Mode();
