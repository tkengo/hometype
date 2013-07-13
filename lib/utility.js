var Utility = {};

Utility.openUrl = function(url, newTab) {
  var e = document.createEvent('MouseEvents');
  e.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, newTab, 0, null);
  var link = Viewport.createLink(url);
  link.get(0).dispatchEvent(e);
  link.remove();
};
