var BookmarkMode = function() {
  this.port = chrome.runtime.connect({ name: 'searchBookmarks' });
  this.port.onMessage.addListener(this.onMessage);
};

BookmarkMode.prototype.onKeyDown = function(key, currentKey) {
  setTimeout($.proxy(function() {
    this.port.postMessage(CommandBox.getText());
  }, this), 100);

  if (currentKey == 'Enter') {
    var selected = CommandBox.getSelected();
    window.location.href = selected.url;
    return false;
  }

  return false;
};

BookmarkMode.prototype.onMessage = function(results) {
  var list = [];
  for (var i in results) {
    list.push({
      text: results[i].title + '(' + results[i].url + ')',
      url: results[i].url
    });
  }
  CommandBox.setCandidate(list);
  CommandBox.showCandidate();
};
