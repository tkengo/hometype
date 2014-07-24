/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Event page script.
 * Define commands used through the chrome runtime.
 */
var RuntimeCommand = {};

/**
 * ------------------------------------
 * OnMessage callback runtime methods.
 * ------------------------------------
 */

/**
 * Close a tab.
 */
RuntimeCommand.closeTab = function(sender, params, response) {
  chrome.tabs.remove(sender.tab.id, null);
};

/**
 * Create a new tab.
 */
RuntimeCommand.createTab = function(sender, params) {
  chrome.tabs.create({ url: params.url, active: true });
};

/**
 * Move the current tab to the left tab.
 */
RuntimeCommand.moveLeftTab = function(sender) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var index;
    if (sender.tab.index == 0) {
      index = tabs.length - 1;
    }
    else {
      index = sender.tab.index - 1;
    }
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

/**
 * Move the current tab to the right tab.
 */
RuntimeCommand.moveRightTab = function(sender) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var index;
    if (sender.tab.index == tabs.length - 1) {
      index = 0;
    }
    else {
      index = sender.tab.index + 1;
    }
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

/**
 * Restore a tab that have specified tab id.
 */
RuntimeCommand.restoreTab = function(sender, tabId) {
  Tab.openClosedTab(tabId);
};

/**
 * Get the closed tab list.
 */
RuntimeCommand.closedTabList = function(sender, params, sendResponse) {
  sendResponse(Tab.getClosedTabList());
};

/**
 * Get the history list.
 */
RuntimeCommand.getHistories = function(sender, params, sendResponse) {
  sendResponse(Tab.getHistories(sender.tab.id));
};

/**
 * Select a tab.
 */
RuntimeCommand.selectTab = function(sender, tabId, sendResponse) {
  chrome.tabs.update(tabId, { active: true, highlighted: true });
};

/**
 * Set continuous option.
 *
 * If continuous is true in local storage, Hometype immediately enters the hint
 * mode after document ready. So you can follow a link continuous.
 */
RuntimeCommand.enterContinuousMode = function(sender, params, sendResponse) {
  localStorage.setItem('continuous_tab_id', sender.tab.id);
  sendResponse(true);
};
/**
 * Unset continuous option.
 */
RuntimeCommand.leaveContinuousMode = function(sender, params, sendResponse) {
  localStorage.removeItem('continuous_tab_id');
  sendResponse(false);
};
/**
 * Get continuous state.
 */
RuntimeCommand.getContinuousState = function(sender, params, sendResponse) {
  sendResponse(localStorage.getItem('continuous_tab_id') == sender.tab.id);
};

/**
 * Set a tab hint key to the document title.
 */
RuntimeCommand.setTitleForAllTabs = function(sender, params, sendResponse) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var code = "document.title = '[" + params.tab_selection_hint_keys.charAt(i) + "]' + document.title";
      chrome.tabs.executeScript(tabs[i].id, { code: code });
    }
  });
};

/**
 * Reset the document title.
 */
RuntimeCommand.resetTitleForAllTabs = function(sender, params, sendResponse) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      if (!tab.url.match(/^chrome.*:\/\//)) {
        var code = "document.title = document.title.replace(/^\\[[0-9a-z]\\]/i, '')";
        chrome.tabs.executeScript(tab.id, { code: code });
      }
    }
  });
};

RuntimeCommand.launchApplication = function(sender, params, sendResponse) {
  chrome.management.launchApp(params);
};

/**
 * ------------------------------------
 * OnConnect callback runtime methods.
 * ------------------------------------
 */

/**
 * Load tabs.
 */
RuntimeCommand.loadTabs = function(port) {
  port.onMessage.addListener(function() {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      var urls = [];
      for (var i = 0; i < tabs.length; i++) {
        urls.push(tabs[i].url);
      }
      convertFaviconsToDataURL(urls, function(results) {
        for (var i = 0; i < results.length; i++) {
          tabs[i].faviconDataUrl = results[i];
        }
        port.postMessage(tabs);
      });
    });
  });
};

/**
 * Get the bookmark list.
 */
RuntimeCommand.loadBookmarks = function(port) {
  port.onMessage.addListener(function() {
    chrome.bookmarks.getSubTree('1', function(tree) {
      var results = [];
      var find = function(node) {
        if (node.children) {
          for (var i in node.children) {
            if (node.id != '1') {
              node.children[i].title = node.title + '/' + node.children[i].title;
            }
            find(node.children[i]);
          }
        }
        if (node.url) {
          results.push(node);
        }
      };
      find(tree[0]);
      port.postMessage(results);
    });
  });
};

/**
 * Get a list of applications.
 */
RuntimeCommand.loadApplications = function(port) {
  port.onMessage.addListener(function() {
    chrome.management.getAll(function(items) {
      var results = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.type.indexOf('_app') > -1) {
          results.push(item);
        }
      }
      port.postMessage(results);
    });
  });
};

(function() {
  /**
   * This is invoked when called chrome.runtime.sendMessage in content script.
   *
   * @param object   message      Message from content script. This should include 'command' key
   *                              to determine invoked runtime method. If this has 'params'
   *                              key, it is passed to the runtime method as a second argument.
   * @param object   sender       The message sender.
   * @param function sendResponse The callback method.
   */
  var messageCallback = function(message, sender, sendResponse) {
    var command = RuntimeCommand[message.command];
    if (command) {
      command.call(command, sender, message.params, sendResponse);
    }
  };
  var connectCallback = function(port) {
    var command = RuntimeCommand[port.name];
    if (command) {
      command.call(command, port);
    }
  }

  chrome.runtime.onMessage.addListener(messageCallback);
  chrome.runtime.onConnect.addListener(connectCallback);
})();
