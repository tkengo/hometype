var BookmarkMode = function() {
  this.port = chrome.runtime.connect({ name: 'searchBookmarks' });
  this.port.onMessage.addListener(this.onMessage);
  this.newTab = false;
};

BookmarkMode.prototype.onKeyDown = function(key, currentKey) {
  if (currentKey == 'Enter') {
    var selected = CommandBox.getSelected();
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, this.newTab, 0, null);
    var link = Viewport.createLink(selected.url);
    link.get(0).dispatchEvent(e);
    link.remove();
    Mode.changeMode(ModeList.NORMAL_MODE);
    CommandBox.hide();
    return true;
  }

  setTimeout($.proxy(function() {
    this.port.postMessage(CommandBox.getText());
  }, this), 100);

  return false;
};

BookmarkMode.prototype.setOpenNewTab = function(newTab) {
  this.newTab = newTab;
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
