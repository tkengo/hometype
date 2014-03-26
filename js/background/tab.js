/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Managed tabs.
 */
var HometypeTab = function() {
  this.tabs = {};
  this.history = new HometypeHistory();
  this.closedTabStacks = [];

  this.loadAllTabs();
  chrome.tabs.onCreated.addListener($.proxy(this.createAction, this));
  chrome.tabs.onRemoved.addListener($.proxy(this.removeAction, this));
  chrome.tabs.onUpdated.addListener($.proxy(this.updateAction, this));
};

HometypeTab.prototype.loadAllTabs = function() {
  var context = this;
  chrome.windows.getCurrent({ populate: true }, function(window) {
    for (var i in window.tabs) {
      var tab = window.tabs[i];
      context.tabs[tab.id] = tab;
    }
  });
};

HometypeTab.prototype.createAction = function(tab) {
  this.tabs[tab.id] = tab;
  this.history.set(tab.id, [ { url: tab.url, title: tab.title } ]);
};

HometypeTab.prototype.removeAction = function(tabId) {
  this.closedTabStacks.unshift(this.tabs[tabId]);
  this.history.remove(tabId);

  delete this.tabs[tabId];
};

HometypeTab.prototype.updateAction = function(tabId, changeInfo, tab) {
  this.tabs[tabId] = tab;

  var history = this.history.get(tabId);
  if (changeInfo.url) {
    this.history.push(tabId, changeInfo.url);
  }
  else {
    this.history.update(tabId, tab.title);
  }
};

HometypeTab.prototype.storeClosedTab = function(tabId, removeInfo) {
  this.closedTabStacks.unshift(context.tabs[tabId]);
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
    tab = this.closedTabStacks.shift();
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
