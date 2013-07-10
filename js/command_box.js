var COMMAND_BOX_HEIGHT = 20;
var CANDIDATE_AREA_HEIGHT = 180;
var COMMAND_BOX_MARGIN = 8;

var ChromekeyCommandBox = function() {
  this.commandBox = $('<div>').addClass('chromekey-command-box').css({
    width: Viewport.getWindowWidth() - COMMAND_BOX_MARGIN * 4,
    height: COMMAND_BOX_HEIGHT
  }).attr('id', '_chromekey-command-box');
  this.text = $('<input type="text">').attr('data-chromekey-not-insert-mode', true).appendTo(this.commandBox);
  this.candidateArea = $('<div>').addClass('chromekey-command-box-candidate-area').css({
    width: Viewport.getWindowWidth() - COMMAND_BOX_MARGIN * 4,
    height: CANDIDATE_AREA_HEIGHT
  }).attr('id', '_chromekey-command-box-candidate-area');;
  this.candidate = [];

  this.notifyCallback = null;
  this.text.get(0).addEventListener('keyup', $.proxy(this.notifyChange, this), true);
};

ChromekeyCommandBox.prototype.notifyChange = function() {
  if (this.notifyCallback) {
    this.notifyCallback.call(this.text, this.text.val());
  }
};

ChromekeyCommandBox.prototype.show = function(notifyCallback) {
  if ($('#_chromekey-command-box').length == 0) {
    this.commandBox.appendTo($('body'));
  }
  this.commandBox.css({
    top: Viewport.getWindowHeight() + Viewport.getScrollPosition().top - (COMMAND_BOX_HEIGHT + COMMAND_BOX_MARGIN * 3),
    left: COMMAND_BOX_MARGIN
  }).fadeIn(300);
  this.text.focus();

  if (typeof notifyCallback == 'function') {
    this.notifyCallback = notifyCallback;
  }
};

ChromekeyCommandBox.prototype.hide = function() {
  this.notifyCallback = null;
  this.commandBox.hide();
  this.candidateArea.hide();
  $('div', this.candidateArea).remove();
  this.text.val('');
};

ChromekeyCommandBox.prototype.showCandidate = function() {
  if ($('#_chromekey-command-box-candidate-area').length == 0) {
    this.candidateArea.appendTo($('body'));
  }
  if (!this.candidateArea.is(':visible')) {
    this.recalculateAndSetPosition();
    this.candidateArea.hide().fadeIn(300);
  }
};

ChromekeyCommandBox.prototype.recalculateAndSetPosition = function() {
  this.candidateArea.css({ top: -9999, left: -9999 }).show();

  var children = this.candidateArea.children();
  this.candidateArea.height($(children[0]).outerHeight() * children.length);
  this.candidateArea.css({
    top: Viewport.getWindowHeight() + Viewport.getScrollPosition().top - this.candidateArea.height() - COMMAND_BOX_HEIGHT - COMMAND_BOX_MARGIN * 4,
    left: COMMAND_BOX_MARGIN
  });
};

ChromekeyCommandBox.prototype.setCandidate = function(list) {
  $('div', this.candidateArea).remove();
  this.candidate = list;
  for (var i in list) {
    var text = typeof list[i] == 'string' ? list[i] : list[i].text;
    var div = $('<div>').text(text).attr('data-index', i);
    if (i == 0) {
      div.addClass('selected');
    }
    this.candidateArea.append(div);
    if (i == 6) {
      break;
    }
  }

  if (this.candidateArea.is(':visible')) {
    this.recalculateAndSetPosition();
  }
};

ChromekeyCommandBox.prototype.selectNext = function() {
  var div = $('div.selected', this.candidateArea);
  div.removeClass('selected');
  var next = div.next();
  if (next.length > 0) {
    next.addClass('selected');
  }
  else {
    $('div:first', this.candidateArea).addClass('selected');
  }
};

ChromekeyCommandBox.prototype.selectPrev = function() {
  var div = $('div.selected', this.candidateArea);
  div.removeClass('selected');
  var prev = div.prev();
  if (prev.length > 0) {
    prev.addClass('selected');
  }
  else {
    $('div:last', this.candidateArea).addClass('selected');
  }
};

ChromekeyCommandBox.prototype.getSelected = function() {
  var div = $('div.selected', this.candidateArea);
  return this.candidate[div.attr('data-index')];
};

ChromekeyCommandBox.prototype.getText = function() {
  return this.text.val().replace(':', '');
};

var CommandBox = new ChromekeyCommandBox();
