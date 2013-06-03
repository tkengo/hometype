var HintMode = function() {
  this.keySequece = '';
};

HintMode.prototype.onKeyDown = function(event) {
  var key = KeyIdentifiers.toChar(event.keyIdentifier);

  if (key == undefined || key.length != 1 || !key.match(/[a-z]/)) {
    return false;
  }

  this.keySequece += key;

  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(this.keySequece);

  if (elements.length == 0) {
    Command.cancelHintMode();
  }
  else if (elements.length == 1 && elements[0].getKey() == this.keySequece) {
    elements[0].click();
    Command.cancelHintMode();
  }
  else {
    hint.hideUnmatchedElements(this.keySequece);
    for (var i in elements) {
      elements[i].setRedFirstKey();
    }
  }
};
