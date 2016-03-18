var HelpModeProcessor = function() {
  this.helpBox = new HometypeHelpBox();
};

/**
 * Callback method that invoke when enter the help mode.
 */
HelpModeProcessor.prototype.notifyEnterMode = function() {
  this.helpBox = new HometypeHelpBox();
  this.helpBox.show();
};

/**
 * Callback method that invoke when leave the help mode.
 */
HelpModeProcessor.prototype.notifyLeaveMode = function() {
  this.helpBox.hide();
};
