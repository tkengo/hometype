/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Command mode processor.
 * Show command box under the window if enter the command mode.
 *
 * This processor has below events, and set event listener.
 *   - onUpdateBoxText Fire up when command box contents is updated.
 *                     If this event listener returns an array, it is shown on a command box
 *                     as candidate list.
 *   - onEnter         Fire up when the enter key was pushed in a command box.
 * These event listeners is reset when leave the command mode.
 */
var CommandModeProcessor = function() {
  this.updateBoxTextCallback   = null;
  this.enterCallback           = null;
  this.notifyLeaveModeCallback = null;

  this.commandBox = new HometypeCommandBox();
};

/**
 * Callback method that invoke when enter the command mode.
 */
CommandModeProcessor.prototype.notifyEnterMode = function() {
  this.commandBox.show();
};

/**
 * Callback method that invoke when leave the command mode.
 */
CommandModeProcessor.prototype.notifyLeaveMode = function() {
  this.updateBoxTextCallback = null;
  this.enterCallback         = null;

  if (this.notifyLeaveModeCallback) {
    this.notifyLeaveModeCallback();
    this.notifyLeaveModeCallback = null;
  }

  this.commandBox.hide();
};

/**
 * Register callback that invokes when Ht leaves from the command mode.
 *
 * @param function notifyLeaveModeCallback Callback method.
 */
CommandModeProcessor.prototype.onNotifyLeaveMode = function(notifyLeaveModeCallback) {
  this.notifyLeaveModeCallback = notifyLeaveModeCallback;
};

/**
 * Key processing.
 *
 * @param string        stack      key stack.
 * @param string        currentKey pushed key.
 * @param KeyboradEvent e          event.
 */
CommandModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  if (currentKey == 'Enter') {
    var result = this.enterCallback ?
                 this.enterCallback(this.commandBox.getText(), this.commandBox.getSelected()) :
                 this.enter();

    if (result !== false) {
      this.commandBox.hide();
      Mode.changeMode(ModeList.NORMAL_MODE);
    }

    return result;
  }

  if (this.updateBoxTextCallback) {
    // Wait a moment, then invoke a callback, because this key event is invalid
    // if processor don't spread it over command box.
    setTimeout($.proxy(function() {
      this.updateCandidate();
    }, this), 10);
  }

  return true;
};

/**
 * Update candidate.
 */
CommandModeProcessor.prototype.updateCandidate = function() {
  var result = this.updateBoxTextCallback(this.commandBox.getText());

  // If a result of callback method is array, set it as candidate,
  // and then show candidates list.
  if (result instanceof Array) {
    this.commandBox.setCandidate(result);
    this.commandBox.showCandidate();
  }
};

/**
 * Set a callback method that invoke when command box contents is updated.
 *
 * @param function callback    Callback method.
 * @param boolean  immediately Execute once registered callback method if true.
 */
CommandModeProcessor.prototype.onUpdateBoxText = function(callback, immediately) {
  this.updateBoxTextCallback = callback;

  if (immediately) {
    this.updateCandidate();
  }
};

/**
 * Set a callback method that invoke when enter key was pushed in command box.
 *
 * @param function callback Callback method.
 */
CommandModeProcessor.prototype.onEnter = function(callback) {
  this.enterCallback = callback;
};

/**
 * Get the command box.
 *
 * @return HometypeCommandBox The command box object.
 */
CommandModeProcessor.prototype.getCommandBox = function() {
  return this.commandBox;
};

CommandModeProcessor.prototype.enter = function() {
  var command = Command[this.commandBox.getText()]
  if (command) {
    command.call();
  }
};
