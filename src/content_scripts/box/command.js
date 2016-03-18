/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage command box that is shown bottom of the display when enter the command mode.
 */
var CANDIDATE_AREA_HEIGHT = 180;
var COMMAND_BOX_MARGIN = 0;
var CANDIDATE_MAX_COUNT = 20;

/**
 * Constructor
 */
var HometypeCommandBox = function(header) {
  var windowWidth = Viewport.getWindowSize().width;

  // Create command box elements.
  var box       = $('<div>')  .addClass('hometype-command-box');
  var header    = $('<div>')  .addClass('hometype-command-box-header')
                              .text(header || 'Command')
                              .appendTo(box);
  var triangle  = $('<div>')  .addClass('hometype-command-box-triangle')
                              .appendTo(box);
  var content   = $('<div>')  .addClass('hometype-command-box-content')
                              .appendTo(box);
  var text      = $('<input>').attr('type', 'text')
                              .appendTo(content);
  var candidate = $('<div>')  .addClass('hometype-command-box-candidate-area')
                              .width(windowWidth)
                              .height(CANDIDATE_AREA_HEIGHT)

  this.list      = [];
  this.box       = box;
  this.header    = header;
  this.text      = text;
  this.candidate = candidate;

  // Append created elements to body
  $(document).ready($.proxy(function() {
    this.box.appendTo($('body'));
    this.candidate.appendTo($('body'));
  }, this));
};

/**
 * Show command box.
 */
HometypeCommandBox.prototype.show = function() {
  // Calculate position.
  var scrollTop = Viewport.getWindowSize().height + Viewport.getScrollPosition().top;

  // Place command box to calculated position and show it.
  this.box.css({
    top: scrollTop - (this.box.outerHeight() + COMMAND_BOX_MARGIN * 3),
    left: COMMAND_BOX_MARGIN
  }).show();

  this.text.focus();

  return this;
};

/**
 * Hide command box.
 */
HometypeCommandBox.prototype.hide = function() {
  this.box.hide();
  this.candidate.hide();
  $('div', this.candidate).remove();
  this.text.val('').blur();
};

/**
 * Show candidate list.
 */
HometypeCommandBox.prototype.showCandidate = function() {
  if (!this.candidate.is(':visible')) {
    this.recalculateAndSetPosition();
    this.candidate.hide().show();
  }
};

/**
 * Recalculate position of candidate list element and move its.
 */
HometypeCommandBox.prototype.recalculateAndSetPosition = function() {
  // Show at out of window because size of an element can't be retrieved.
  this.candidate.css({ top: -9999, left: -9999 }).show();

  // Get the scroll position.
  var scrollTop = Viewport.getWindowSize().height + Viewport.getScrollPosition().top;

  // Set candidate list size and position.
  var children = this.candidate.children();
  this.candidate.height($(children[0]).outerHeight() * children.length);
  this.candidate.css({
    top: scrollTop - this.candidate.height() - this.box.outerHeight() - COMMAND_BOX_MARGIN * 4,
    left: COMMAND_BOX_MARGIN
  });
};

/**
 * Set candidate list.
 *
 * @param array list Candidate list.
 */
HometypeCommandBox.prototype.setCandidate = function(list) {
  $('div', this.candidate).remove();

  this.list = list;

  if (list.length == 0) {
    var div = $('<div>').html('nothing').addClass('hometype-no-candidate');
    this.candidate.append(div);
  }

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var text = typeof item == 'string' ? item : item.text;

    if (typeof item.escape == 'undefined') {
      item.escape = true;
    }
    var div = $('<div>').html(item.escape ? Dom.escapeHTML(text) : text).attr('data-index', i);

    // if (this.text.val() != '') {
    //   Dom.highlight(div.get(0), this.text.val(), { ignoreCase: true });
    // }
    for (var j = 0; item.highlights && j < item.highlights.length; j++) {
      Dom.highlight(div.get(0), item.highlights[j], { ignoreCase: true });
    }

    if (item.icon) {
      var icon = $('<img>').attr('src', item.icon).attr('width', '16').addClass('hometype-command-box-icon');
      icon.prependTo(div);
    }

    // Selected first item.
    if (i == 0) {
      div.addClass('selected');
    }
    this.candidate.append(div);

    // Break if item count was over max count.
    if (i == CANDIDATE_MAX_COUNT) {
      break;
    }
  }

  if (this.candidate.is(':visible')) {
    this.recalculateAndSetPosition();
  }
};

/**
 * Select next candidate.
 */
HometypeCommandBox.prototype.selectNext = function() {
  var div = $('div.selected', this.candidate);
  div.removeClass('selected');
  var next = div.next();
  if (next.length > 0) {
    next.addClass('selected');
  }
  else {
    $('div:first', this.candidate).addClass('selected');
  }
};

/**
 * Select previous candidate.
 */
HometypeCommandBox.prototype.selectPrev = function() {
  var div = $('div.selected', this.candidate);
  div.removeClass('selected');
  var prev = div.prev();
  if (prev.length > 0) {
    prev.addClass('selected');
  }
  else {
    $('div:last', this.candidate).addClass('selected');
  }
};

/**
 * Get a selected candidate.
 */
HometypeCommandBox.prototype.getSelected = function() {
  var div = $('div.selected', this.candidate);
  return this.list[div.attr('data-index')];
};

/**
 * Get a text in the command box.
 */
HometypeCommandBox.prototype.getText = function() {
  return this.text.val();
};

/**
 * Set a text to the command box.
 */
HometypeCommandBox.prototype.setText = function(text) {
  this.text.val(text);
};

/**
 * Set a text to the header of the command box.
 */
HometypeCommandBox.prototype.setHeaderText = function(text) {
  this.header.text(text);
  return this;
};

/**
 * Get a text in the header of the command box.
 */
HometypeCommandBox.prototype.getHeaderText = function() {
  return this.header.text();
};

/**
 * Check if text box has focus.
 */
HometypeCommandBox.prototype.isFocused = function() {
  return document.activeElement == this.text.get(0);
};
