var ChromekeyTab = function() {
  this.tabs = {};
  this.closedTabStacks = [];

  var context = this;

  chrome.windows.getCurrent(function(window) {
    for (var i in window.tabs) {
      var tab = window.tabs[i];
      context.tabs[tab.tabId] = tab;
    }
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    context.tabs[tab.id] = tab;
  });
  chrome.tabs.onAttached.addListener(function(tab) {
    context.tabs[tab.id] = tab;
  });
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    context.closedTabStacks.push(context.tabs[tabId]);
    delete context.tabs[tabId];
  });
  chrome.tabs.onAttached.addListener(function(tab) {
    delete context.tabs[tab.id];
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    context.tabs[tabId] = tab;
  });
};

ChromekeyTab.prototype.openLastClosedTab = function() {
  if (this.closedTabStacks.length == 0) {
    return;
  }

  var tab = this.closedTabStacks.pop();
  var params = {
    windowId: tab.windowId,
    index: tab.index,
    url: tab.url,
    pinned: tab.pinned,
    openerTabId: tab.openerTabId
  };
  chrome.tabs.create(params);
};
