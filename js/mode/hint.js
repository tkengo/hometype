var HintMode = function() {
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
