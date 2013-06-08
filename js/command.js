/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Chromekeyで利用するコマンドを定義します。
 */
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
  var el = $(sel.baseNode);
  range.setStart(document, 30);
  range.setEnd(document, 30);
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
  Mode.getProcessor().setOpenNewTab(false);

  Viewport.createNewHintElement('yellow').show();
};

Command.goToFocusHintMode = function() {
  Mode.changeMode(ModeList.HINT_MODE);
  Mode.getProcessor().setOpenNewTab(false);

  var target = Viewport.formElementInnerScreen();
  Viewport.createNewHintElement('green', target).show();
};

Command.goToNewWindowHintMode = function() {
  Mode.changeMode(ModeList.HINT_MODE);
  Mode.getProcessor().setOpenNewTab(true);

  Viewport.createNewHintElement('blue').show();
};

Command.goToCommandMode = function() {
  CommandBox.show();
  Mode.changeMode(ModeList.COMMAND_MODE);
};

Command.goToBookmarkMode = function() {
  CommandBox.show();
  Mode.changeMode(ModeList.BOOKMARK_MODE);
  Mode.getProcessor().setOpenNewTab(false);
};

Command.goToNewWindowBookmarkMode = function() {
  CommandBox.show();
  Mode.changeMode(ModeList.BOOKMARK_MODE);
  Mode.getProcessor().setOpenNewTab(true);
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

Command.cancelBookmarkMode = function() {
  if (Mode.getCurrentMode() == ModeList.BOOKMARK_MODE) {
    CommandBox.hide();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

Command.selectNextCandidate = function() {
  CommandBox.selectNext();
};

Command.selectPrevCandidate = function() {
  CommandBox.selectPrev();
};

Command.blurForm = function() {
  $(document.activeElement).blur();
};
