var VisualModeProcessor = function() {
};

VisualModeProcessor.prototype.onKeyDown = function(key, currentKey, e) {
  var isMetaKey = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
  if (!isMetaKey && $.inArray(currentKey, [ 'Down', 'Up', 'Right', 'Left' ]) == -1) {
    e.stopPropagation();
    e.preventDefault();
  }
};

/**
 * Callback method that invoke when leave the visual mode.
 */
VisualModeProcessor.prototype.notifyLeaveMode = function() {
  Viewport.resetContentEditable();
};
