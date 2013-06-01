var RuntimeCommand = {};

RuntimeCommand.closeTab = function(tab) {
  chrome.tabs.remove(tab.id, null);
};

(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var command = RuntimeCommand[message];
    if (command) {
      command.call(command, sender.tab);
    }
  });
})();
