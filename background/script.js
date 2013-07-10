var RuntimeCommand = {};

RuntimeCommand.closeTab = function(sender) {
  chrome.tabs.remove(sender.tab.id, null);
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

RuntimeCommand.searchBookmarks = function(port) {
  port.onMessage.addListener(function(key) {
    chrome.bookmarks.getSubTree('1', function(tree) {
      key = key.toLowerCase();
      var results = [];
      var search = function(node) {
        if (node.children) {
          for (var i in node.children) {
            search(node.children[i]);
          }
        }
        else if (node.title.toLowerCase().indexOf(key) > -1 || node.url.toLowerCase().indexOf(key) > -1) {
          results.push(node);
        }
      };
      search(tree[0]);
      port.postMessage(results);
    });
  });
};

var Tab = new ChromekeyTab();

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
