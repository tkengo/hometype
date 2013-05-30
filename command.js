var Command = function() {
  this.viewport = new Viewport();
};

Command.prototype.scrollDown = function() {
  this.viewport.scrollDown(50);
};

Command.prototype.scrollUp = function() {
  this.viewport.scrollUp(50);
};

Command.prototype.scrollDownHalf = function() {
  this.viewport.scrollDown(this.viewport.getWindowHeight() / 2);
};

Command.prototype.scrollUpHalf = function() {
  this.viewport.scrollUp(this.viewport.getWindowHeight() / 2);
};
