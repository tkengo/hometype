var HintMode = function() {
  this.keySequece = '';
};

HintMode.prototype.onKeyDown = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);
  if (key.length != 1 || !key.match(/[a-z]/)) {
    return true;
  }

  this.keySequece += key;

  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(this.keySequece);

  if (elements.length == 0) {
    hint.removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
    this.keySequece = '';
  }
  else if (elements.length == 1) {
    elements[0].element.get(0).click();
    hint.removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
    this.keySequece = '';
  }
  else {
    hint.hideUnmatchedElements(this.keySequece);
    for (var i in elements) {
      hint.setRedFirstKey(elements[i].index);
    }
  }
};
