var ModeList = {
  NORMAL_MODE: 'normal',
  HINT_MODE: 'hint',
  VISUAL_MODE: 'visual'
};

var Mode = function() {
  this.mode = ModeList.NORMAL_MODE;
};

Mode.prototype.currentMode = function() {
  this.mode;
};

Mode.prototype.changeMode = function(modeName) {
  this.mode = modeName;
};
