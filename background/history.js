/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage every tab history
 */
var HometypeHistory = function() {
  this.prefix = 'hometype-history-';
};

/**
 * Get tab's histories.
 *
 * @param integer tabId tab ID
 * @return array histories
 */
HometypeHistory.prototype.get = function(tabId) {
  var history = JSON.parse(localStorage.getItem(this.prefix + tabId));

  if (!history) {
    return [];
  }

  return history.history;
};

/**
 * Set tab's histories.
 *
 * @param integer tabId   tab ID
 * @param array   history history set in tab have tab id
 */
HometypeHistory.prototype.set = function(tabId, history) {
  localStorage.setItem(this.prefix + tabId, JSON.stringify({ history: history }));
};

/**
 * Delete the tab's history.
 *
 * @param integer tabId tab ID you want to delete.
 */
HometypeHistory.prototype.remove = function(tabId) {
  localStorage.removeItem(this.prefix + tabId);
};

/**
 * Add a history. Max count is 20.
 *
 * @param integer tabId tab ID you want to add.
 * @param string  url   history url.
 */
HometypeHistory.prototype.push = function(tabId, url) {
  var history = this.get(tabId);
  history.push({ url: url, title: '' });

  if (history.length > 20) {
    history.shift();
  }

  this.set(tabId, history);
};

/**
 * Update history title.
 *
 * @param integer tabId tab ID you want to update.
 * @param string  title update title.
 */
HometypeHistory.prototype.update = function(tabId, title) {
  var history = this.get(tabId);
  history[history.length - 1].title = title;
  this.set(tabId, history);
};
