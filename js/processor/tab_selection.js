/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Tab selection mode processor.
 */
var TabSelectionModeProcessor = function() {
  this.tabListBox = null;
  this.notifyLeaveModeCallback = null;
};

/**
 * Key processing.
 *
 * @param string        stack      key stack.
 * @param string        currentKey pushed key.
 * @param KeyboradEvent e          event.
 */
TabSelectionModeProcessor.prototype.onKeyDown = function(stack, currentKey, e) {
  var tab = this.tabListBox.getBy(currentKey);
  if (tab) {
    chrome.runtime.sendMessage({ command: 'selectTab', params: tab.id });
    Mode.changeMode(ModeList.NORMAL_MODE);
  }
  return true;
};

/**
 * Create hints for source elements and show it.
 *
 * @param array elements Source elements.
 */
TabSelectionModeProcessor.prototype.createTabListBox = function(tabs) {
  if (this.tabListBox) {
    this.tabListBox.remove();
  }

  this.tabListBox = new HometypeTabListBox(tabs);
};

/**
 * Callback method that invoke when leave the tab selection mode.
 */
TabSelectionModeProcessor.prototype.notifyLeaveMode = function() {
  this.tabListBox.remove();
};
