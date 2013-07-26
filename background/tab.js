var ChromekeyTab = function() {
  this.tabs = {};
  this.histories = {};
  this.closedTabStacks = [];

  var context = this;

  chrome.windows.getCurrent({ populate: true }, function(window) {
    for (var i in window.tabs) {
      var tab = window.tabs[i];
      context.tabs[tab.id] = tab;
    }
  });

  chrome.tabs.onCreated.addListener(function(tab) {
    context.tabs[tab.id] = tab;
    var history = { url: tab.url, title: tab.title };
    localStorage.setItem('history' + tab.id, JSON.stringify({ history: [ history ] }));
  });
  chrome.tabs.onAttached.addListener(function(tab) {
    context.tabs[tab.id] = tab;
    var history = { url: tab.url, title: tab.title };
    localStorage.setItem('history' + tab.id, JSON.stringify({ history: [ history ] }));
  });
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    context.closedTabStacks.push(context.tabs[tabId]);
    delete context.tabs[tabId];
    localStorage.removeItem('history' + tabId);
  });
  chrome.tabs.onDetached.addListener(function(tab) {
    delete context.tabs[tab.id];
    localStorage.removeItem('history' + tabId);
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    context.tabs[tabId] = tab;

    var history = JSON.parse(localStorage.getItem('history' + tabId));
    if (!history) {
      history = { history: [] };
    }

    if (changeInfo.url) {
      history.history.push({ url: changeInfo.url, title: tab.title });
      if (history.history.length > 20) {
        history.history.shift();
      }
      localStorage.setItem('history' + tabId, JSON.stringify(history));
    }
    else if (changeInfo.status == 'complete') {
      history.history[history.history.length - 1].title = tab.title;
      localStorage.setItem('history' + tabId, JSON.stringify(history));
    }
  });
};

ChromekeyTab.prototype.getHistories = function(tabId) {
  var history = localStorage.getItem('history' + tabId);
  if (history) {
    return JSON.parse(history).history;
  }
  else {
    return [];
  }
};

ChromekeyTab.prototype.openClosedTab = function(tabId) {
  if (this.closedTabStacks.length == 0) {
    return;
  }

  var tab = null;
  if (tabId) {
    for (var i in this.closedTabStacks) {
      tab = this.closedTabStacks[i];
      if (tab.id == tabId) {
        this.closedTabStacks.splice(i, 1);
        break;
      }
    }
  }
  else {
    tab = this.closedTabStacks.pop();
  }

  var params = {
    windowId: tab.windowId,
    index: tab.index,
    url: tab.url,
    pinned: tab.pinned,
    openerTabId: tab.openerTabId
  };
  chrome.tabs.create(params);
};

ChromekeyTab.prototype.getClosedTabList = function() {
  return this.closedTabStacks;
};
