var HintMode = function() {
  this.keySequece = '';
};

HintMode.prototype.onKeyDown = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);

  if (key == 'Esc' || (key == 'c' && event.ctrlKey)) {
    this.finish();
    return false;
  }

  if (key == undefined || key.length != 1 || !key.match(/[a-z]/)) {
    return false;
  }

  this.keySequece += key;

  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(this.keySequece);

  if (elements.length == 0) {
    this.finish();
  }
  else if (elements.length == 1) {
    elements[0].click();
    this.finish();
  }
  else {
    hint.hideUnmatchedElements(this.keySequece);
    for (var i in elements) {
      elements[i].setRedFirstKey();
    }
  }
};

HintMode.prototype.finish = function() {
  Viewport.getCurrentHintElement().removeAllHint();
  this.keySequece = '';
  Mode.changeMode(ModeList.NORMAL_MODE);
};
