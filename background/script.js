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

(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var command = RuntimeCommand[message.command];
    if (command) {
      command.call(command, sender, sendResponse);
    }
  });

  chrome.runtime.onConnect.addListener(function(port) {
    var command = RuntimeCommand[port.name];
    if (command) {
      command.call(command, port);
    }
  });
})();
