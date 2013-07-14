/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Chromekeyで利用するコマンドを定義します。
 */
var Command = {};

/**
 * 下方向にスクロールします。
 */
Command.scrollDown = function() {
  Viewport.scrollDown(parseInt(Options.scroll_amount));
};

/**
 * 上方向にスクロールします。
 */
Command.scrollUp = function() {
  Viewport.scrollUp(parseInt(Options.scroll_amount));
};

/**
 * 下方向に画面半分スクロールします。
 */
Command.scrollDownHalf = function() {
  Viewport.scrollDown(Viewport.getWindowHeight() / 2);
};

/**
 * 上方向に画面半分スクロールします。
 */
Command.scrollUpHalf = function() {
  Viewport.scrollUp(Viewport.getWindowHeight() / 2);
};

/**
 * 下方向に1画面分スクロールします。
 */
Command.scrollDownPage = function() {
  Viewport.scrollDown(Viewport.getWindowHeight());
};

/**
 * 上方向に1画面分スクロールします。
 */
Command.scrollUpPage = function() {
  Viewport.scrollUp(Viewport.getWindowHeight());
};

/**
 * ドキュメント先頭部分へスクロールします。
 */
Command.scrollToTop = function() {
  Viewport.scrollTo(0, 0);
};

/**
 * ドキュメント最後尾部分へスクロールします。
 */
Command.scrollToBottom = function() {
  Viewport.scrollTo(0, Viewport.getDocumentHeight());
};

/**
 * 現在のタブを閉じます
 */
Command.closeTab = function() {
  chrome.runtime.sendMessage({ command: 'closeTab' });
};

/**
 * ひとつ左側のタブへ移動します。
 */
Command.moveLeftTab = function() {
  chrome.runtime.sendMessage({ command: 'moveLeftTab' });
};

/**
 * ひとつ右側のタブへ移動します。
 */
Command.moveRightTab = function() {
  chrome.runtime.sendMessage({ command: 'moveRightTab' });
};

/**
 * コマンドボックスの次の候補を選択します。
 */
Command.selectNextCandidate = function() {
  Mode.getProcessor(ModeList.COMMAND_MODE).getCommandBox().selectNext();
};

/**
 * コマンドボックスの前の候補を選択します。
 */
Command.selectPrevCandidate = function() {
  Mode.getProcessor(ModeList.COMMAND_MODE).getCommandBox().selectPrev();
};

/**
 * アクティブ要素からフォーカスを外します。
 */
Command.blurForm = function() {
  $(document.activeElement).blur();
};

/**
 * 履歴の1つ前に戻ります。
 */
Command.backHistory = function() {
  window.history.back();
};

/**
 * 履歴の1つ先に進みます。
 */
Command.forwardHistory = function() {
  window.history.forward();
};

/**
 * 最後に閉じたタブを復活させます。
 */
Command.restoreTab = function() {
  chrome.runtime.sendMessage({ command: 'restoreTab' });
};

/**
 * 閉じたタブを検索します。
 */
Command.searchClosedTabs = function() {
  chrome.runtime.sendMessage({ command: 'closedTabList' }, function(closedTabs) {
    var processor = Mode.changeMode(ModeList.COMMAND_MODE);

    processor.onUpdateBoxText(function(text) {
      var list = [];
      for (var i in closedTabs) {
        var tab = closedTabs[i];

        var includeInTitle = tab.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
        var includeInUrl   = tab.url  .toLowerCase().indexOf(text.toLowerCase()) > -1;

        if (includeInTitle || includeInUrl) {
          list.push({
            text: tab.title + '(' + tab.url + ')',
            url: tab.url,
            tabId: tab.id
          });
        }
      }

      return list;
    }, true);
    processor.onEnter(function(text, selected) {
      chrome.runtime.sendMessage({ command: 'restoreTab', params: selected.tabId });
    });
  });
};

/**
 * ブックマークを検索します。
 */
Command.searchBookmarks = function(newTab) {
  var processor = Mode.changeMode(ModeList.COMMAND_MODE);

  processor.onUpdateBoxText(function(text) {
    var searchResult = Bookmarks.search(text);
    var bookmarks = [];
    for (var i in searchResult) {
      bookmarks.push({
        text: searchResult[i].title + '(' + searchResult[i].url + ')',
        url: searchResult[i].url
      });
    }
    return bookmarks;
  });
  processor.onEnter(function(text, selected) {
    Utility.openUrl(selected.url, newTab);
  });
};

/**
 * 現在ビジュアルモードになっている要素の次の要素をビジュアルモードにします。
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
 * 現在ビジュアルモードになっている要素の前の要素をビジュアルモードにします。
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
 * ビジュアルモードへ移行します。
 */
Command.enterVisualMode = function() {
  var target = Viewport.divElementInnerScreen();
  if (target.length > 0) {
    Mode.changeMode(ModeList.HINT_MODE);
    Mode.getProcessor().setCallback(function(element) {
      Viewport.setContentEditable(element);
      element.focus().click();
      Mode.changeMode(ModeList.VISUAL_MODE);
    });
    Viewport.createNewHintElement('yellow', target).show();
  }
};

/**
 * ヒントモードへ移行します。ヒント対象はクリック可能要素です。
 */
Command.enterHintMode = function() {
  var target = Viewport.clickableElementInnerScreen();
  if (target.length > 0) {
    Mode.changeMode(ModeList.HINT_MODE);
    Mode.getProcessor().setOpenNewTab(false);
    Viewport.createNewHintElement('yellow', target).show();
  }
};

/**
 * ヒントモードへ移行します。ヒント対象は入力可能フォームです。
 */
Command.enterFocusHintMode = function() {
  var target = Viewport.formElementInnerScreen();
  if (target.length == 1) {
    target[0].focus();
  }
  else if (target.length > 0) {
    Mode.changeMode(ModeList.HINT_MODE);
    Mode.getProcessor().setOpenNewTab(false);
    Viewport.createNewHintElement('green', target).show();
  }
};

/**
 * ヒントモードへ移行します。ヒント対象はクリック可能要素です。
 * リンクをクリックする時に新しいウィンドウで開きます。
 */
Command.enterNewWindowHintMode = function() {
  var target = Viewport.clickableElementInnerScreen();
  if (target.length > 0) {
    Mode.changeMode(ModeList.HINT_MODE);
    Mode.getProcessor().setOpenNewTab(true);
    Viewport.createNewHintElement('blue', target).show();
  }
};

/**
 * コマンドモードへ移行します。
 */
Command.enterCommandMode = function() {
  Mode.changeMode(ModeList.COMMAND_MODE);
};

/**
 * コマンドモードを抜けてノーマルモードへ戻ります。
 */
Command.cancelCommandMode = function() {
  if (Mode.getCurrentMode() == ModeList.COMMAND_MODE) {
    CommandBox.hide();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

/**
 * ヒントモードを抜けてノーマルモードへ戻ります。
 */
Command.cancelHintMode = function() {
  if (Mode.getCurrentMode() == ModeList.HINT_MODE) {
    Viewport.getCurrentHintElement().removeAllHint();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};

/**
 * ビジュアルモードを抜けてノーマルモードへ戻ります。
 */
Command.cancelVisualMode = function() {
  if (Mode.getCurrentMode() == ModeList.VISUAL_MODE) {
    Viewport.resetContentEditable();
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
};
