var VisualMode = function() {
};

VisualMode.prototype.onKeyDown = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);
  if (key == 'Esc') {
    Viewport.setContentEditable(false);
    Mode.changeMode(ModeList.NORMAL_MODE);
    return false;
  }
};
