/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * ブックマーク
 */
var ChromekeyBookmarks = function() {
  this.bookmarks = {};

  // 登録されているすべてのブックマークを読み込んでオブジェクトに保存する
  var port = chrome.runtime.connect({ name: 'loadBookmarks' });
  port.onMessage.addListener($.proxy(function(bookmarks) {
    for (var i in bookmarks) {
      var bookmark = bookmarks[i];
      this.bookmarks[bookmark.id] = bookmark;
    }
    port.disconnect();
  }, this));
  port.postMessage();
};

/**
 * ブックマークを検索します。
 *
 * @param string searchWord 検索語
 */
ChromekeyBookmarks.prototype.search = function(searchWord) {
  var nodes = [];
  for (var i in this.bookmarks) {
    var bookmark = this.bookmarks[i];

    var includeInTitle = bookmark.title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1;
    var includeInUrl   = bookmark.url  .toLowerCase().indexOf(searchWord.toLowerCase()) > -1;

    if (includeInTitle || includeInUrl) {
      nodes.push(bookmark);
    }
  }

  return nodes;
};

var Bookmarks = new ChromekeyBookmarks();
