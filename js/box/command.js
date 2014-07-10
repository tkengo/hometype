/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage command box that is shown bottom of the display when enter the command mode.
 */
var COMMAND_BOX_HEIGHT = 20;
var CANDIDATE_AREA_HEIGHT = 180;
var COMMAND_BOX_MARGIN = 8;
var CANDIDATE_MAX_COUNT = 20;

/**
 * Constructor
 */
var HometypeCommandBox = function() {
  var windowWidth = Viewport.getWindowSize().width;

  // Create command box elements.
  var box       = $('<div>')  .addClass('hometype-command-box')
                              .attr('id', '_hometype-command-box')
                              .width(windowWidth - COMMAND_BOX_MARGIN * 4)
                              .height(COMMAND_BOX_HEIGHT);
  var text      = $('<input>').attr('type', 'text')
                              .attr('data-hometype-not-insert-mode', true)
                              .appendTo(box);
  var candidate = $('<div>')  .addClass('hometype-command-box-candidate-area')
                              .attr('id', '_hometype-command-box-candidate-area')
                              .width(windowWidth - COMMAND_BOX_MARGIN * 4)
                              .height(CANDIDATE_AREA_HEIGHT)

  this.list      = [];
  this.box       = box;
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
    top: scrollTop - (COMMAND_BOX_HEIGHT + COMMAND_BOX_MARGIN * 3),
    left: COMMAND_BOX_MARGIN
  }).show();

  this.text.focus();
};

/**
 * Hide command box.
 */
HometypeCommandBox.prototype.hide = function() {
  this.box.hide();
  this.candidate.hide();
  $('div', this.candidate).remove();
  this.text.val('');
};

/**
 * Show candidate list.
 */
HometypeCommandBox.prototype.showCandidate = function() {
  if (!this.candidate.is(':visible')) {
    this.recalculateAndSetPosition();
    this.candidate.hide().fadeIn(300);
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
    top: scrollTop - this.candidate.height() - COMMAND_BOX_HEIGHT - COMMAND_BOX_MARGIN * 4,
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

  for (var i in list) {
    var text = typeof list[i] == 'string' ? list[i] : list[i].text;
    var div = $('<div>').text(text).attr('data-index', i);

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
  return this.text.val().replace(':', '');
};

/**
 * Set a text to the command box.
 */
HometypeCommandBox.prototype.setText = function(text) {
  return this.text.val(text);
};
