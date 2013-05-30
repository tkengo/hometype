var Command = function() {
  this.viewport = new Viewport();
};

Command.prototype.scrollDown = function() {
  this.viewport.scrollDown(50);
};

Command.prototype.scrollUp = function() {
  this.viewport.scrollUp(50);
};
