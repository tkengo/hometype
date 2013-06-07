var HintMode = function() {
  this.newTab = false;
};

HintMode.prototype.onKeyDown = function(stack) {
  var hint = Viewport.getCurrentHintElement();
  var elements = hint.getMatchedElements(stack);

  if (elements.length <= 1) {
    if (elements.length == 1 && elements[0].getKey() == stack) {
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, this.newTab, 0, null);
      elements[0].getElement().get(0).dispatchEvent(e);
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

HintMode.prototype.setOpenNewTab = function(newTab) {
  this.newTab = newTab;
};
