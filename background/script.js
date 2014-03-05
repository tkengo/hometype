var RuntimeCommand = {};

RuntimeCommand.closeTab = function(sender) {
  chrome.tabs.remove(sender.tab.id, null);
};

RuntimeCommand.createTab = function(sender, params) {
  chrome.tabs.create({ url: params.url, active: true });
};

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

RuntimeCommand.restoreTab = function(sender, tabId) {
  Tab.openClosedTab(tabId);
};

RuntimeCommand.closedTabList = function(sender, params, sendResponse) {
  sendResponse(Tab.getClosedTabList());
}

RuntimeCommand.setOptions = function(sender, params) {
  for (var i in params) {
    localStorage.setItem(i, params[i]);
  }
  notifyPort.postMessage(params);
};

RuntimeCommand.getHistories = function(sender, params, sendResponse) {
  sendResponse(Tab.getHistories(sender.tab.id));
};

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
