/**
 * Manage key.
 *
 * Register callback method to onProcess in KeySequence class, and
 * it is called every keyboard push with below parameters.
 *
 * function callback(e, sequence, stack, key);
 *   e        : Keydown event.
 *   sequence : A string that concat pushed key from keyboard in specified time.
 *              At first, if 'a' was pushed, this argument is 'a'.
 *              Second, if 'b' was pushed in specified time, this argument is 'ab'.
 *              Third, if 'c' was pushed out of specified time, this argument is 'c'.
 *   stack    : A string that concat pushed key from keyboard.
 *              Difference of stack between sequence is that this argument is not reset
 *              in specified time. If you want to reset this argument, you can call
 *              'reset' method.
 *   key      : A pushed key character.
 */
var KeySequence = function() {
  this.keySequece = '';
  this.keyStack = '';
  this.callbacks = [];
  this.resetkeySequeceTimerId = -1;

  var _this = this;
  document.addEventListener('keydown', function(e) {
    _this.processor(e);
  }, true);
};

/**
 * Register callback method called when key was pushed.
 *
 * @param function callback Callback method.
 */
KeySequence.prototype.onProcess = function(callback) {
  this.callbacks.push(callback);
};

/**
 * Process key pushing.
 */
KeySequence.prototype.processor = function(e) {
  // Return if pushed key is only meta key.
  var id = e.keyIdentifier;
  if (id == 'Control' || id == 'Shift' || id == 'Alt' || id == 'Meta') {
    return false;
  }

  // Reset a key input waiting timer.
  this.resetTimerForResetKeySequence();

  // Add pushed key to key sequence.
  var key = this.getKeyChar(e);
  this.keySequece += key;
  this.keyStack   += key;

  // Invoke callback method.
  for (var i in this.callbacks) {
    var callback = this.callbacks[i];
    if (typeof callback == 'function') {
      callback.call(this, e, this.keySequece, this.keyStack, key);
    }
  }

  this.setTimerForResetKeySequence(Options.command_interval);
};

/**
 * Get a string that is translated for key mapping. For example:
 *   If 'a' was pushed with Ctrl, return '<C-a>'
 *   If 'a' was pushed with Shift, return 'A'
 *   If 'a' was pushed with Command, return '<M-a>'
 *
 * @return string A key mapping string.
 */
KeySequence.prototype.getKeyChar = function(e) {
  var key = KeyIdentifiers.toChar(e.keyIdentifier);

  if (!key) {
    return e.keyIdentifier;
  }

  if (e.shiftKey) {
    key = key.toUpperCase();
  }

  if (e.metaKey) {
    key = '<M-' + key + '>';
  }
  else if (e.ctrlKey) {
    key = '<C-' + key + '>';
  }

  return key;
};

/**
 * Reset key sequence.
 */
KeySequence.prototype.reset = function() {
  this.keySequece = '';
  this.keyStack   = '';
  this.resetTimerForResetKeySequence();
};

/**
 * Set a timer to wait a next key.
 *
 * Invoke callback method to confirm key push if there is no key push between
 * argument 'interval' time.
 *
 * @param integer interval Interval time.
 */
KeySequence.prototype.setTimerForResetKeySequence = function(interval) {
  this.resetkeySequeceTimerId = setTimeout($.proxy(function() {
    this.keySequece = '';
    this.resetTimerForResetKeySequence();
  }, this), interval);
};

/**
 * Reset a timer.
 */
KeySequence.prototype.resetTimerForResetKeySequence = function() {
  clearTimeout(this.resetkeySequeceTimerId);
};
