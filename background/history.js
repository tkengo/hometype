/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * タブ毎の履歴を管理します。
 */
var ChromekeyHistory = function() {
  this.prefix = 'chromekey-history-';
};

/**
 * タブの履歴を取得します。
 *
 * @param integer tabId タブID
 * @return array 履歴
 */
ChromekeyHistory.prototype.get = function(tabId) {
  var history = JSON.parse(localStorage.getItem(this.prefix + tabId));

  if (!history) {
    return [];
  }

  return history.history;
};

/**
 * タブの履歴を取得します。
 *
 * @param integer tabId   タブID
 * @param array   history 履歴
 */
ChromekeyHistory.prototype.set = function(tabId, history) {
  localStorage.setItem(this.prefix + tabId, JSON.stringify({ history: history }));
};

/**
 * タブの履歴を削除します。
 *
 * @param integer タブID
 */
ChromekeyHistory.prototype.remove = function(tabId) {
  localStorage.removeItem(this.prefix + tabId);
};

/**
 * 履歴を追加します。最大20件まで保持。
 *
 * @param integer tabId タブID
 * @param string  url   履歴URL
 */
ChromekeyHistory.prototype.push = function(tabId, url) {
  var history = this.get(tabId);
  history.push({ url: url, title: '' });

  if (history.length > 20) {
    history.shift();
  }

  this.set(tabId, history);
};

/**
 * 履歴のタイトルを更新します。
 *
 * @param integer tabId タブID
 * @param string  title タイトル
 */
ChromekeyHistory.prototype.update = function(tabId, title) {
  var history = this.get(tabId);
  history[history.length - 1].title = title;
  this.set(tabId, history);
};
