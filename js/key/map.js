/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Manage key and command mapping.
 */

/**
 * Key mapping managing object.
 * Mapping information is saved to this object.
 *
 * Hometype has below modes.
 *   normal mode
 *   hint mode
 *   visual mode
 *   command mode
 */
var KeyMap = {
};
var _map = {
  normal: {},
  insert: {},
  hint: {},
  visual: {},
  command: {},
  help: {},
  tabSelection: {}
}

/**
 * Assign key to command in specified mode.
 *
 * @param string mode    The mode that assign key
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.assign = function(mode, key, command) {
  _map[mode][key] = command;
};

/**
 * Assign key to command in normal mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.nmap = function(key, command) {
  KeyMap.assign(ModeList.NORMAL_MODE, key, command);
};

/**
 * Assign key to command in insert mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.imap = function(key, command) {
  KeyMap.assign(ModeList.INSERT_MODE, key, command);
};

/**
 * Assign key to command in hint mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.fmap = function(key, command) {
  KeyMap.assign(ModeList.HINT_MODE, key, command);
};

/**
 * Assign key to command in visual mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.vmap = function(key, command) {
  KeyMap.assign(ModeList.VISUAL_MODE, key, command);
};

/**
 * Assign key to command in command mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.cmap = function(key, command) {
  KeyMap.assign(ModeList.COMMAND_MODE, key, command);
};

/**
 * Assign key to command in help mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.hmap = function(key, command) {
  KeyMap.assign(ModeList.HELP_MODE, key, command);
};

/**
 * Assign key to command in tab selection mode.
 *
 * @param string key     Assigned key
 * @param string command Command that assigned in key
 */
KeyMap.tmap = function(key, command) {
  KeyMap.assign(ModeList.TAB_SELECTION_MODE, key, command);
};

/**
 * Get the command that is assigned specified key in specified mode.
 *
 * @param string mode The mode.
 * @param string key  Assigned key.
 * @return function Command name.
 */
KeyMap.command = function(mode, key) {
  return Command[_map[mode][key]];
};

KeyMap.assignedCommands = function() {
  return _map;
};

/**
 * Clear all key binding.
 */
KeyMap.clear = function() {
  $.each(_map, function(key, map) {
    _map[key] = {};
  });
};
