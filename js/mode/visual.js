var VisualMode = function() {
};

VisualMode.prototype.onKeyDown = function(key, currentKey, e) {
  if ($.inArray(currentKey, [ 'Down', 'Up', 'Right', 'Left' ]) == -1) {
    e.stopPropagation();
    e.preventDefault();
  }
};
