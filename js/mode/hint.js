var HintMode = function() {
  this.keySequece = '';
};

HintMode.prototype.onKeyDown = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);
  var hint = Viewport.getCurrentHintElement();

  if (key == undefined || key.length != 1 || !key.match(/[a-z]/)) {
    return true;
  }

  this.keySequece += key;

  var elements = hint.getMatchedElements(this.keySequece);

  if (elements.length == 0) {
    hint.removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
    this.keySequece = '';
  }
  else if (elements.length == 1) {
    elements[0].click();
    hint.removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
    this.keySequece = '';
  }
  else {
    hint.hideUnmatchedElements(this.keySequece);
    for (var i in elements) {
      elements[i].setRedFirstKey();
    }
  }
};
