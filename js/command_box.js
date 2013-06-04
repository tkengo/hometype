var _CommandBox = function() {
  this.commandBox = $('<div>').addClass('chromekey-command-box').css({
    width: Viewport.getWindowWidth() - 10,
  }).attr('id', '_chromekey-command-box');
  this.text = $('<input type="text">').appendTo(this.commandBox);
};

_CommandBox.prototype.show = function() {
  if ($('#_chromekey-command-box').length == 0) {
    this.commandBox.appendTo($('body'));
  }
  this.commandBox.css({
    top: Viewport.getWindowHeight() + Viewport.getScrollPosition().top - 35,
    left: 5
  }).fadeIn(300);
  this.text.focus();
};

_CommandBox.prototype.hide = function() {
  this.commandBox.hide();
  this.text.val('');
};

_CommandBox.prototype.getText = function() {
  return this.text.val();
};

var CommandBox = new _CommandBox();
