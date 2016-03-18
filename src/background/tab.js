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
  this.closedTabStacks = JSON.parse(localStorage.getItem('closedTabs')) || [];

  this.loadAllTabs();
  chrome.tabs.onCreated.addListener($.proxy(this.createAction, this));
  chrome.tabs.onRemoved.addListener($.proxy(this.removeAction, this));
  chrome.tabs.onUpdated.addListener($.proxy(this.updateAction, this));
};

/**
 * Load all tabs of current window for this object.
 */
HometypeTab.prototype.loadAllTabs = function() {
  var context = this;
  chrome.windows.getCurrent({ populate: true }, function(window) {
    for (var i in window.tabs) {
      var tab = window.tabs[i];
      context.tabs[tab.id] = tab;
    }
  });
};

/**
 * The method that is invoked when a new tab is created.
 * The tab is saved to this object, and set its first history.
 *
 * @param integer tab A new tab object.
 */
HometypeTab.prototype.createAction = function(tab) {
  this.tabs[tab.id] = tab;
  this.history.set(tab.id, [ { url: tab.url, title: tab.title } ]);
};

/**
 * The method that is invoked when a tab is removed.
 * The tab is saved to this object as closed tab, and remove
 * from its history. Last, it is deleted from this object.
 *
 * @param integer tab Removed tab id.
 */
HometypeTab.prototype.removeAction = function(tabId) {
  this.closedTabStacks.unshift(this.tabs[tabId]);
  if (this.closedTabStacks.length > 20) {
    this.closedTabStacks.pop();
  }
  localStorage.setItem('closedTabs', JSON.stringify(this.closedTabStacks));

  this.history.remove(tabId);
  delete this.tabs[tabId];
};

/**
 * The method that is invoked when a tab is updated.
 *
 * @param integer tabId      Updated tab id.
 * @param object  changeInfo Lists the changes to the state of the tab that was updated.
 * @param integer tab        Updated tab.
 */
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

/**
 * Get histories.
 *
 * @param integer tabId The tab's id you want to get histories.
 * @return array tab's histories.
 */
HometypeTab.prototype.getHistories = function(tabId) {
  return this.history.get(tabId);
};

/**
 * Open recent closed tab.
 *
 * @param integer tabId The tab's id
 */
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
  localStorage.setItem('closedTabs', JSON.stringify(this.closedTabStacks));

  var params = {
    windowId: tab.windowId,
    index: tab.index,
    url: tab.url,
    pinned: tab.pinned,
    openerTabId: tab.openerTabId
  };
  chrome.tabs.create(params);
};

/**
 * Get closed tab list.
 *
 * @return array closed tab list.
 */
HometypeTab.prototype.getClosedTabList = function() {
  return this.closedTabStacks;
};

var Tab = new HometypeTab();
