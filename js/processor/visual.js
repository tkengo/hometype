var VisualMode = function() {
};

VisualMode.prototype.onKeyDown = function(key, currentKey, e) {
  var isMetaKey = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
  if (!isMetaKey && $.inArray(currentKey, [ 'Down', 'Up', 'Right', 'Left' ]) == -1) {
    e.stopPropagation();
    e.preventDefault();
  }
};
