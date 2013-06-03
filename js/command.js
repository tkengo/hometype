var Command = {};

Command.scrollDown = function() {
  Viewport.scrollDown(50);
};

Command.scrollUp = function() {
  Viewport.scrollUp(50);
};

Command.scrollDownHalf = function() {
  Viewport.scrollDown(Viewport.getWindowHeight() / 2);
};

Command.scrollUpHalf = function() {
  Viewport.scrollUp(Viewport.getWindowHeight() / 2);
};

Command.scrollDownPage = function() {
  Viewport.scrollDown(Viewport.getWindowHeight());
};

Command.scrollUpPage = function() {
  Viewport.scrollUp(Viewport.getWindowHeight());
};

Command.scrollToTop = function() {
  Viewport.scrollTo(0, 0);
};

Command.scrollToBottom = function() {
  Viewport.scrollTo(0, Viewport.getDocumentHeight());
};

Command.caretDown = function() {
  var sel = document.getSelection();
  var range = sel.getRangeAt(0);
  var nestedCount = 0;
  var el = $(sel.baseNode);
  while (el.length != 0 && nestedCount++ < 100) {
    var next = el.next();
    if (next.length > 0) {
      while (next.length > 0 && next.text() == '') {
        next = next.next();
      }

      if (next.length > 0) {
        el = next.get(0);
        break;
      }
    }

    if (next.length == 0) {
      el = el.parent();
    }
  }
  range.setStart(el, 0);
  range.setEnd(el, 0);
  sel.removeAllRanges();
  sel.addRange(range);
};

Command.caretUp = function() {
  var sel = document.getSelection();
  var range = sel.getRangeAt(0);
  var nestedCount = 0;
  var el = $(sel.baseNode);
  while (el.length != 0 && nestedCount++ < 100) {
    var prev = el.prev();
    if (prev.length > 0) {
      while (prev.length > 0 && prev.text() == '') {
        prev = prev.prev();
      }

      if (prev.length > 0) {
        el = prev.get(0);
        break;
      }
    }

    if (prev.length == 0) {
      el = el.parent();
    }
  }
  range.setStart(el, 0);
  range.setEnd(el, 0);
  sel.removeAllRanges();
  sel.addRange(range);
};

Command.closeTab = function() {
  chrome.runtime.sendMessage('closeTab');
};

Command.moveLeftTab = function() {
  chrome.runtime.sendMessage('moveLeftTab');
};

Command.moveRightTab = function() {
  chrome.runtime.sendMessage('moveRightTab');
};

Command.goToVisualMode = function() {
  var element = Viewport.setContentEditable(true);
  setTimeout(function() { element.focus(); }, 100);
  Mode.changeMode(ModeList.VISUAL_MODE);
};

Command.goToHintMode = function() {
  Mode.changeMode(ModeList.HINT_MODE);

  var currentHint = Viewport.getCurrentHintElement();
  if (currentHint) {
    currentHint.removeAllHint();
  }

  var hint = Viewport.createNewHintElement();
  hint.show();
};

Command.goToNHintMode = function() {
  Mode.changeMode(ModeList.NHINT_MODE);

  var currentHint = Viewport.getCurrentHintElement();
  if (currentHint) {
    currentHint.removeAllHint();
  }

  var hint = Viewport.createNewHintElement();
  hint.show();
};

Command.cancelHintMode = function() {
  if (Mode.getCurrentMode() == ModeList.HINT_MODE) {
    Viewport.getCurrentHintElement().removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

Command.cancelVisualMode = function() {
  if (Mode.getCurrentMode() == ModeList.VISUAL_MODE) {
    Viewport.setContentEditable(false);
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};
