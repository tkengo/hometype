var HintMode = function() {
  this.keySequece = '';
};

HintMode.prototype.onKeyDown = function(stack) {
  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(stack);

  if (elements.length <= 1) {
    if (elements.length == 1 && elements[0].getKey() == stack) {
      elements[0].click();
    }
    Command.cancelHintMode();
    return true;
  }
  else {
    hint.hideUnmatchedElements(stack);
    for (var i in elements) {
      elements[i].setRedFirstKey();
    }
    return false;
  }
};

HintMode.prototype._onKeyDown = function(e) {
  var key = e.getChar();

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
