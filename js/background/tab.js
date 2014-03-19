var HometypeTab = function() {
  this.tabs = {};
  this.history = new HometypeHistory();
  this.closedTabStacks = [];

  var context = this;

  chrome.windows.getCurrent({ populate: true }, function(window) {
    for (var i in window.tabs) {
      var tab = window.tabs[i];
      context.tabs[tab.id] = tab;
    }
  });

  chrome.tabs.onCreated .addListener($.proxy(this.createAction, this));
  chrome.tabs.onAttached.addListener($.proxy(this.createAction, this));
  chrome.tabs.onRemoved .addListener($.proxy(this.removeAction, this));
  chrome.tabs.onDetached.addListener($.proxy(this.removeAction, this));

  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    context.closedTabStacks.unshift(context.tabs[tabId]);
  });
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    context.tabs[tabId] = tab;

    var history = context.history.get(tabId);
    if (changeInfo.url) {
      context.history.push(tabId, changeInfo.url);
    }
    else {
      context.history.update(tabId, tab.title);
    }
  });
};

HometypeTab.prototype.createAction = function(tab) {
  this.tabs[tab.id] = tab;
  this.history.set(tab.id, [ { url: tab.url, title: tab.title } ]);
};

HometypeTab.prototype.removeAction = function(tab) {
  delete this.tabs[tab.id];
  this.history.remove(tab.id);
};

HometypeTab.prototype.getHistories = function(tabId) {
  return this.history.get(tabId);
};

HometypeTab.prototype.openClosedTab = function(tabId) {
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

HometypeTab.prototype.getClosedTabList = function() {
  return this.closedTabStacks;
};

var Tab = new HometypeTab();
