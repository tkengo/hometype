/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage mode.
 */

/**
 * Mode list.
 */
var ModeList = {
  NORMAL_MODE: 'normal',
  INSERT_MODE: 'insert',
  HINT_MODE: 'hint',
  VISUAL_MODE: 'visual',
  COMMAND_MODE: 'command',
  HELP_MODE: 'help'
};

/**
 * Constructor.
 */
var HometypeMode = function() {
  this.mode = ModeList.NORMAL_MODE;

  this.callbacks = [];

  this.modeProcessors = {};
  this.modeProcessors[ModeList.NORMAL_MODE]  = new NoopProcessor();
  this.modeProcessors[ModeList.INSERT_MODE]  = new NoopProcessor();
  this.modeProcessors[ModeList.HINT_MODE]    = new HintModeProcessor();
  this.modeProcessors[ModeList.VISUAL_MODE]  = new VisualModeProcessor();
  this.modeProcessors[ModeList.COMMAND_MODE] = new CommandModeProcessor();
  this.modeProcessors[ModeList.HELP_MODE]    = new HelpModeProcessor();
};

/**
 * Get the current mode.
 *
 * @return string The current mode.
 */
HometypeMode.prototype.getCurrentMode = function() {
  return this.mode;
};

/**
 * Change the current mode to specified mode,
 * and call event handler registered by onModeChange.
 *
 * @param string modeName A mode name
 * @return Object The current mode processor
 */
HometypeMode.prototype.changeMode = function(modeName) {
  // Nothing happens if mode didn't change.
  if (this.mode == modeName) {
    return this.getProcessor(this.mode);
  }

  var oldMode = this.mode;
  this.mode = modeName;

  // call callbacks
  for (var key in this.callbacks) {
    var callback = this.callbacks[key];
    if (typeof callback === 'function') {
      callback.call(callback, this.mode, oldMode);
    }
  }

  // Notify the current mode processor that mode has changed.
  var oldProcessor     = this.getProcessor(oldMode);
  var currentProcessor = this.getProcessor(this.mode);
  if (typeof oldProcessor.notifyLeaveMode == 'function') {
    oldProcessor.notifyLeaveMode();
  }
  if (typeof currentProcessor.notifyEnterMode == 'function') {
    currentProcessor.notifyEnterMode();
  }

  return currentProcessor;
};

/**
 * Enter the hint mode.
 * Specify hint targets and hint theme.
 *
 * @param string theme   hint theme.
 * @param array  targets hint targets.
 * @return Object hint mode processor.
 */
HometypeMode.prototype.enterHintMode = function(theme, targets) {
  var processor = this.changeMode(ModeList.HINT_MODE);
  processor.createHints(theme, targets);
  return processor;
};

/**
 * Enter the visual mode.
 * Specify visual mode target.
 *
 * @param jQueryElement element visual mode target.
 * @return Object visual mode processor.
 */
HometypeMode.prototype.enterVisualMode = function(element) {
  Viewport.setContentEditable(element);
  element.focus().click();
  return Mode.changeMode(ModeList.VISUAL_MODE);
};

/**
 * Get the processor specified mode by argument.
 * Return current mode processor if omit an argument.
 *
 * @param ModeList mode mode
 * @return Object processor
 */
HometypeMode.prototype.getProcessor = function(mode) {
  mode = mode || this.mode;

  return this.modeProcessors[mode];
};

/**
 * Register an event which is called when mode was changed.
 * Callback method has two arguments.
 * newMode is the mode after changed.
 * oldMode is the mode before changed.
 *
 * @param function callback Callback method.
 */
HometypeMode.prototype.onModeChange = function(callback) {
  this.callbacks.push(callback);
};

var Mode = new HometypeMode();
