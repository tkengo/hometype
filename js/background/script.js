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
 * Close a tab.
 */
RuntimeCommand.closeTab = function(sender) {
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
}

/**
 * Save options to local storage.
 */
RuntimeCommand.setOptions = function(sender, params) {
  for (var i in params) {
    localStorage.setItem(i, params[i]);
  }
  notifyPort.postMessage(params);
};

/**
 * Get options from local storage.
 */
RuntimeCommand.getOptions = function(sender, params, sendResponse) {
  if (params && params.key) {
    var result = localStorage.getItem(params.key);
  }
  else {
    var result = {};
    for (var k in localStorage){
      result[k] = localStorage.getItem(k);
    }
  }
  sendResponse(result);
};

/**
 * Get the history list.
 */
RuntimeCommand.getHistories = function(sender, params, sendResponse) {
  sendResponse(Tab.getHistories(sender.tab.id));
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

var notifyPort;
RuntimeCommand.notifyOptions = function(port) {
  notifyPort = port;
};

var Tab = new HometypeTab();

(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var command = RuntimeCommand[message.command];
    if (command) {
      command.call(command, sender, message.params, sendResponse);
    }
  });

  chrome.runtime.onConnect.addListener(function(port) {
    var command = RuntimeCommand[port.name];
    if (command) {
      command.call(command, port);
    }
  });
})();
