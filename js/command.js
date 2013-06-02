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

Command.closeTab = function() {
  chrome.runtime.sendMessage('closeTab');
};

Command.goToHintMode = function() {
  Mode.changeMode(ModeList.HINT_MODE);

  var currentHint = Viewport.getCurrentHintElement();
  if (currentHint) {
    currentHint.removeAllHint();
  }

  var hint = Viewport.createNewHintElement();
  for (var index in hint.getElements()) {
    hint.setHintTip(index, hint.nextHintKey());
  }

  hint.show();
};
