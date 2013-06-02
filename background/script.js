var RuntimeCommand = {};

RuntimeCommand.closeTab = function(tab) {
  chrome.tabs.remove(tab.id, null);
};

RuntimeCommand.moveLeftTab = function(tab) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var index;
    if (tab.index == 0) {
      index = tabs.length - 1;
    }
    else {
      index = tab.index - 1;
    }
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

RuntimeCommand.moveRightTab = function(tab) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    var index;
    if (tab.index == tabs.length - 1) {
      index = 0;
    }
    else {
      index = tab.index + 1;
    }
    chrome.tabs.update(tabs[index].id, { active: true });
  });
};

(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var command = RuntimeCommand[message];
    if (command) {
      command.call(command, sender.tab);
    }
  });
})();
