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
  help: {}
};
var _defaultMap = {
  normal: {},
  insert: {},
  hint: {},
  visual: {},
  command: {},
  help: {}
};

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

KeyMap.setDefault = function(defaults) {
  for (var map in defaults) {
    var maps = defaults[map];
    for (var key in maps) {
      var command = maps[key];
      if (Command.isExists(command.split(' ')[0])) {
        _defaultMap[ModeList.from(map)][key] = command;
      }
    }
  }
};

KeyMap.noremap = function(mode, maps) {
  for (var key in maps) {
    var bind = maps[key];
    if (Command.isExists(bind)) {
      KeyMap.assign(mode, key, bind);
    } else {
      var command = _defaultMap[mode][bind];
      if (Command.isExists(command.split(' ')[0])) {
        KeyMap.assign(mode, key, command);
      }
    }
  }
};

KeyMap.remap = function(mode, maps) {
  for (var key in maps) {
    var bind = maps[key];
    if (Command.isExists(bind)) {
      KeyMap.assign(mode, key, bind);
    } else {
      var command = _map[mode][bind];
      if (Command.isExists(command.split(' ')[0])) {
        KeyMap.assign(mode, key, command);
      }
    }
  }
};

/**
 * Clear all key binding and set default key binding.
 */
KeyMap.clear = function() {
  for (var mode in _map) {
    _map[mode] = {};
  }
  for (var mode in _defaultMap) {
    for (var key in _defaultMap[mode]) {
      _map[mode][key] = _defaultMap[mode][key];
    }
  }
};
