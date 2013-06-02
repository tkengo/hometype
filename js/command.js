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

Command.moveLeftTab = function() {
  chrome.runtime.sendMessage('moveLeftTab');
};

Command.moveRightTab = function() {
  chrome.runtime.sendMessage('moveRightTab');
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
