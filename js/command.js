/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Define command used in Hometype.
 */
var Command = {};

/**
 * Noop command.
 */
Command.noop = function() { };

/**
 * Scroll down.
 */
Command.scrollDown = function() {
  Viewport.scrollVertical(parseInt(Opt.scroll_amount));
};

/**
 * Scroll up.
 */
Command.scrollUp = function() {
  Viewport.scrollVertical(-parseInt(Opt.scroll_amount));
};

/**
 * Scroll down half display.
 */
Command.scrollDownHalf = function() {
  Viewport.scrollVertical(Viewport.getWindowSize().height / 2);
};

/**
 * Scroll up half display.
 */
Command.scrollUpHalf = function() {
  Viewport.scrollVertical(-Viewport.getWindowSize().height / 2);
};

/**
 * Scroll down display.
 */
Command.scrollDownPage = function() {
  Viewport.scrollVertical(Viewport.getWindowSize().height);
};

/**
 * Scroll up display.
 */
Command.scrollUpPage = function() {
  Viewport.scrollVertical(-Viewport.getWindowSize().height);
};

/**
 * Scroll to document top.
 */
Command.scrollToTop = function() {
  Viewport.scrollTo(0, 0);
};

/**
 * Scroll to document bottom.
 */
Command.scrollToBottom = function() {
  Viewport.scrollTo(0, Viewport.getDocumentSize().height);
};

/**
 * Close the current tab.
 */
Command.closeTab = function() {
  chrome.runtime.sendMessage({ command: 'closeTab' });
};

/**
 * Move to left tab.
 */
Command.moveLeftTab = function() {
  chrome.runtime.sendMessage({ command: 'moveLeftTab' });
};

/**
 * Move to right tab.
 */
Command.moveRightTab = function() {
  chrome.runtime.sendMessage({ command: 'moveRightTab' });
};

/**
 * Select next candidate in a command box.
 */
Command.selectNextCandidate = function() {
  Mode.getProcessor(ModeList.COMMAND_MODE).getCommandBox().selectNext();
};

/**
 * Select previous candidate in a command box.
 */
Command.selectPrevCandidate = function() {
  Mode.getProcessor(ModeList.COMMAND_MODE).getCommandBox().selectPrev();
};

/**
 * Focus out from an active element.
 */
Command.cancelInsertMode = function() {
  $(document.activeElement).blur();
  Mode.changeMode(ModeList.NORMAL_MODE);
};

/**
 * Back history.
 */
Command.backHistory = function() {
  window.history.back();
};

/**
 * Foward history.
 */
Command.forwardHistory = function() {
  window.history.forward();
};

/**
 * Restore closed tabs.
 */
Command.restoreTab = function() {
  chrome.runtime.sendMessage({ command: 'restoreTab' });
};

/**
 * Focus first element in window.
 */
Command.focusFirstInput = function() {
  $(':insertable:screen:first').focus();
};

/**
 * Focus last element in window.
 */
Command.focusLastInput = function() {
  $(':insertable:screen:last').focus();
};

/**
 * Search a tab from closed tab list.
 */
Command.searchClosedTabs = function() {
  var processor = Mode.changeMode(ModeList.COMMAND_MODE);

  processor.onEnter(function(text, selected) {
    chrome.runtime.sendMessage({ command: 'restoreTab', params: selected.tabId });
  });

  chrome.runtime.sendMessage({ command: 'closedTabList' }, function(closedTabs) {
    processor.onUpdateBoxText(function(text) {
      var list = [];
      $.each(closedTabs, function(index, tab) {
        if (Utility.includedInProperties(tab, text, [ 'title', 'url' ])) {
          var listText = Utility.pad(index + 1, 2) + ': ' + tab.title + '(' + tab.url + ')';
          list.push({ text: listText, url: tab.url, tabId: tab.id });
        }
      });
      return list;
    }, true);
  });
};

/**
 * Search a bookmark from chrome bookmark list.
 */
Command.searchBookmarks = function(newTab) {
  var processor = Mode.changeMode(ModeList.COMMAND_MODE);

  processor.onEnter(function(text, selected) {
    chrome.runtime.sendMessage({ command: 'createTab', params: { url: selected.url } });
  });

  var port = chrome.runtime.connect({ name: 'loadBookmarks' });
  port.onMessage.addListener(function(bookmarks) {
    processor.onUpdateBoxText(function(text) {
      var list = [];
      $.each(bookmarks, function(index, bookmark) {
        if (Utility.includedInProperties(bookmark, text, [ 'title', 'url' ])) {
          list.push({ text: bookmark.title + '(' + bookmark.url + ')', url: bookmark.url });
        }
      });
      port.disconnect();
      return list;
    });
  });
  port.postMessage();
};

/**
 * Search a history.
 */
Command.searchHistories = function() {
  var processor = Mode.changeMode(ModeList.COMMAND_MODE);

  processor.onEnter(function(text, selected) {
    Utility.openUrl(selected.url);
  });

  chrome.runtime.sendMessage({ command: 'getHistories' }, function(histories) {
    processor.onUpdateBoxText(function(text) {
      var list = [];
      $.each(histories, function(index, history) {
        if (Utility.includedInProperties(history, text, [ 'title', 'url' ])) {
          list.push({ text: history.title + '(' + history.url + ')', url: history.url });
        }
      });
      return list;
    }, true);
  });
};

/**
 * Enter the visual mode.
 */
Command.enterVisualMode = function() {
  var targets = $(':visualable:screen');
  if (targets.length > 0) {
    var processor = Mode.enterHintMode('red', targets);
    processor.onChooseElement(function(element) {
      Mode.enterVisualMode(element);
      return false;
    });
  }
};

/**
 * Make next element content editable.
 */
Command.forwardContentEditable = function() {
  var current = Viewport.getCurrentContentEditable();
  if (current.length > 0) {
    Viewport.resetContentEditable(current);
    var next = Viewport.getNextContentEditableElement(current);
    if (next && next.length > 0) {
      Viewport.setContentEditable(next);
      setTimeout(function() { next.focus(); }, 100);
    }
    else {
      Command.cancelVisualMode();
    }
  }
};

/**
 * Make previous element content editable.
 */
Command.backwardContentEditable = function() {
  var current = Viewport.getCurrentContentEditable();
  if (current.length > 0) {
    Viewport.resetContentEditable(current);
    var prev = Viewport.getPrevContentEditableElement(current);
    if (prev && prev.length > 0) {
      Viewport.setContentEditable(prev);
      setTimeout(function() { prev.focus(); }, 100);
    }
    else {
      Command.cancelVisualMode();
    }
  }
};

/**
 * Enter the hint mode. Hint targets are clicable and form elements.
 */
Command.enterHintMode = function(option) {
  // Collect hint source targets.
  var targets = Dom.searchVisibleElementsFrom(Dom.clickableAndInsertableXPath());
  var newWindow = option.new || false;
  var theme = newWindow ? 'blue' : 'yellow';

  if (targets.length > 0) {
    // If there are at least one target elements, enter the hint mode with yellow theme,
    // and register choose element event listener.
    var processor = Mode.enterHintMode(theme, targets);
    processor.onChooseElement(function(element) {
      if (element.is(':insertable')) {
        // If choosen element is form tag, focus to it.
        element.focus();
        return false;
      }
      else if (element.is('select')) {
        // If confirmed element is select tag, open the select box.
        var selectBox = new HometypeSelectBox(element);
        processor.createHints('yellow', selectBox.getListElements());
        processor.onNotifyLeaveMode(function() { selectBox.remove(); });
        return false;
      }
      else {
        // Otherwise, emulate click event for element.
        Utility.clickElement(element, newWindow);
        if (option.continuous) {
          processor.createHints(theme, Dom.searchVisibleElementsFrom(Dom.clickableAndInsertableXPath()));
          return false;
        }
      }
    });
  }
};

/**
 * Enter the insert mode.
 */
Command.enterInsertMode = function() {
  Mode.changeMode(ModeList.INSERT_MODE);
};

/**
 * Enter the command mode.
 */
Command.enterCommandMode = function() {
  Mode.changeMode(ModeList.COMMAND_MODE);
};

/**
 * Return the normal mode from the command mode.
 */
Command.cancelCommandMode = function() {
  if (Mode.getCurrentMode() == ModeList.COMMAND_MODE) {
    CommandBox.hide();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

/**
 * Return the normal mode from the hint mode.
 */
Command.cancelHintMode = function() {
  if (Mode.getCurrentMode() == ModeList.HINT_MODE) {
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

/**
 * Return the normal mode from the visual mode.
 */
Command.cancelVisualMode = function() {
  if (Mode.getCurrentMode() == ModeList.VISUAL_MODE) {
    Viewport.resetContentEditable();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

Command.showAssignedCommands = function() {
  Mode.changeMode(ModeList.HELP_MODE);
};

Command.cancelHelpMode = function() {
  if (Mode.getCurrentMode() == ModeList.HELP_MODE) {
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};
