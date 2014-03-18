var HelpModeProcessor = function() {
  this.helpBox = new HometypeHelpBox();
};

/**
 * Callback method that invoke when enter the help mode.
 */
HelpModeProcessor.prototype.notifyEnterMode = function() {
  this.helpBox.show();
};

/**
 * Callback method that invoke when leave the help mode.
 */
HelpModeProcessor.prototype.notifyLeaveMode = function() {
  this.helpBox.hide();
};

/**
 * Key processing.
 *
 * @param string        stack      key stack.
 * @param string        currentKey pushed key.
 * @param KeyboradEvent e          event.
 */
HelpModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  return true;
};

