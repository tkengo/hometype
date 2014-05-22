/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Tab selection mode processor.
 */
var TabSelectionModeProcessor = function() {
  this.notifyLeaveModeCallback = null;
};

/**
 * Key processing.
 *
 * @param string        stack      key stack.
 * @param string        currentKey pushed key.
 * @param KeyboradEvent e          event.
 */
TabSelectionModeProcessor.prototype.onKeyDown = function(key, currentKey, e) {
  return true;
};

/**
 * Callback method that invoke when leave the tab selection mode.
 */
TabSelectionModeProcessor.prototype.notifyLeaveMode = function() {
  if (this.notifyLeaveModeCallback) {
    this.notifyLeaveModeCallback();
    this.notifyLeaveModeCallback = null;
  }
};

/**
 * Register callback that invokes when Ht leaves from the tab selection mode.
 *
 * @param function notifyleavemodeCallback Callback method.
 */
TabSelectionModeProcessor.prototype.onNotifyLeaveMode = function(notifyLeaveModeCallback) {
  this.notifyLeaveModeCallback = notifyLeaveModeCallback;
};
