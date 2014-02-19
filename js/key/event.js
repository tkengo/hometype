/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Keydown event object wrapper.
 */

/**
 * Constructor
 */
var KeyEvent = function(event) {
  this.event = event;
};

/**
 * Check if pushed key is meta key (Shift / Ctrl / Alt / Command).
 *
 * @return boolean true if meta key is pushed.
 */
KeyEvent.prototype.isMetaKey = function() {
  var id = this.event.keyIdentifier;
  return id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta';
};

/**
 * Get the original event.
 *
 * @return KeyboardEvent Original event.
 */
KeyEvent.prototype.getOriginal = function() {
  return this.event;
};

/**
 * Get a string that is translated for key mapping. For example:
 *   If 'a' was pushed with Ctrl, return '<C-a>'
 *   If 'a' was pushed with Shift, return 'A'
 *   If 'a' was pushed with Command, return '<M-a>'
 *
 * @return string A key mapping string.
 */
KeyEvent.prototype.getKeyChar = function() {
  var key = KeyIdentifiers.toChar(this.event.keyIdentifier);

  if (!key) {
    return this.event.keyIdentifier;
  }

  if (event.shiftKey) {
    key = key.toUpperCase();
  }

  if (event.metaKey) {
    key = '<M-' + key + '>';
  }
  else if (event.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
};

/**
 * Get a pushed key.
 *
 * @return string キー文字
 */
KeyEvent.prototype.getChar = function() {
  return KeyIdentifiers.toChar(this.event.keyIdentifier);
};

/**
 * Cancel default process when key was pushed.
 */
KeyEvent.prototype.stop = function() {
  this.event.preventDefault();
  this.event.stopPropagation();
};
