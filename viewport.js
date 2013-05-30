var Viewport = function() {
};

Viewport.prototype.getScrollPosition = function() {
  return {
    top: document.body.scrollTop,
    left: document.body.scrollLeft
  }
};

Viewport.prototype.scrollTo = function(x, y) {
  $(document.body).animate({ scrollTop: y + 'px', scrollLeft: x + 'px' }, 100);
};

Viewport.prototype.scrollDown = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top + value);
};

Viewport.prototype.scrollUp = function(value) {
  var pos = this.getScrollPosition();
  this.scrollTo(pos.left, pos.top - value);
};
