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
  Mode.release();
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
 * Enter the tab selection mode.
 */
Command.enterTabSelectionMode = function() {
  chrome.runtime.sendMessage({
    command: 'setTitleForAllTabs',
    params: { tab_selection_hint_keys: Opt.tab_selection_hint_keys }
  });

  var port = chrome.runtime.connect({ name: 'loadTabs' });
  port.onMessage.addListener(function(tabs) {
    var processor = Mode.changeMode(ModeList.TAB_SELECTION_MODE);
    processor.createTabListBox(tabs);
    processor.onNotifyLeaveMode(function() {
      chrome.runtime.sendMessage({ command: 'resetTitleForAllTabs' });
    });

    port.disconnect();
  });
  port.postMessage();
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
        if (tab && Utility.includedInProperties(tab, text, [ 'title', 'url' ])) {
          var listText = Utility.pad(list.length + 1, 2) + ': ' + tab.title + '(' + tab.url + ')';
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
Command.searchBookmarks = function(option) {
  var newTab = option.new || false;
  var processor = Mode.changeMode(ModeList.COMMAND_MODE);

  processor.onEnter(function(text, selected) {
    if (newTab) {
      chrome.runtime.sendMessage({ command: 'createTab', params: { url: selected.url } });
    } else {
      window.location.href = selected.url;
    }
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
  var targets = Dom.searchVisibleElementsFrom(Dom.visualableXPath());
  if (targets.length > 0) {
    var processor = Mode.enterHintMode('red', targets);
    processor.onChooseElement(function(element) {
      Mode.enterVisualMode(element);
      return false;
    });
  }
};

/**
 * Enter the hint mode. Hint targets are clickable and form elements.
 */
Command.followLink = function(option) {
  // Collect hint source targets.
  var targets = Dom.searchVisibleElementsFrom(Dom.clickableAndInsertableXPath());
  var newTab = option.new || false;
  var theme = newTab ? 'blue' : 'yellow';

  // Do nothing if there are not targets or the current mode is the insert mode.
  if (targets.length == 0 || Mode.isInsertMode()) {
    return;
  }

  // Sometimes, browser may have an active editable element in the hint mode,
  // So Ht shifts the current mode to the insert mode if it have ones.
  if (Dom.isEditable(document.activeElement)) {
    Mode.changeMode(ModeList.INSERT_MODE);
    return;
  }

  // Set continuous state in background if continuous option is true.
  if (option.continuous) {
    chrome.runtime.sendMessage({ command: 'enterContinuousMode' });
  }

  // enter the hint mode, and register event listener to handle choosen element.
  // 1. If choosen element is form tag, focus to it.
  // 2. If choosen element is select tag, open the select box.
  // 3. Otherwise, emulate click event for an element.
  var processor = Mode.enterHintMode(theme, targets);
  processor.onChooseElement(function(element) {
    if (Dom.isEditable(element.get(0))) {
      element.focus();
    } else if (element.is('select')) {
      var selectBox = new HometypeSelectBox(element);
      processor.createHints('yellow', selectBox.getListElements());
      processor.onNotifyLeaveMode(function() { selectBox.remove(); });
      return false;
    } else {
      if (option.continuous) {
        var timer = setTimeout(function() { new Executer('@followLink').execute(); }, 300);
        window.onbeforeunload = function() { clearInterval(timer); };
      }
      Utility.clickElement(element, newTab);
      if (option.continuous) {
        window.onbeforeunload = undefined;
        return false;
      }
    }

    return true;
  });
};

/**
 * Enter the insert mode.
 */
Command.enterInsertMode = function() {
  Mode.changeMode(ModeList.INSERT_MODE);
  Mode.lock();
};

/**
 * Enter the command mode.
 */
Command.enterCommandMode = function() {
  Mode.changeMode(ModeList.COMMAND_MODE);
};

/**
 * Enter the normal mode.
 */
Command.enterNormalMode = function() {
  Mode.changeMode(ModeList.NORMAL_MODE);
  chrome.runtime.sendMessage({ command: 'leaveContinuousMode' });
};

Command.showAssignedCommands = function() {
  Mode.changeMode(ModeList.HELP_MODE);
};
