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
 * Chromekey has below modes.
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
  command: {}
}

/**
 * Assign key to command in specified mode.
 *
 * @param string mode    mode that assign key
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.assign = function(mode, key, command) {
  _map[mode][key] = command;
};

/**
 * Assign key to command in normal mode.
 *
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.nmap = function(key, command) {
  KeyMap.assign(ModeList.NORMAL_MODE, key, command);
};

/**
 * Assign key to command in insert mode.
 *
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.imap = function(key, command) {
  KeyMap.assign(ModeList.INSERT_MODE, key, command);
};

/**
 * Assign key to command in hint mode.
 *
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.fmap = function(key, command) {
  KeyMap.assign(ModeList.HINT_MODE, key, command);
};

/**
 * Assign key to command in visual mode.
 *
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.vmap = function(key, command) {
  KeyMap.assign(ModeList.VISUAL_MODE, key, command);
};

/**
 * Assign key to command in command mode.
 *
 * @param string key     assigned key
 * @param string command command that assigned in key
 */
KeyMap.cmap = function(key, command) {
  KeyMap.assign(ModeList.COMMAND_MODE, key, command);
};

/**
 * 指定したモードの指定したキーに割り当てられたコマンドの
 * 候補を配列で返します。
 *
 * @param string mode コマンドを取得するモード
 * @param string key  マッピングされたキー
 * @return array コマンド名とマッピングキーを持つ配列
 */
KeyMap.candidate = function(mode, key) {
  var result = [];

  var maps = _map[mode];
  for (keyMap in maps) {
    if (keyMap.indexOf(key) == 0) {
      var map = maps[keyMap];

      var command = '', args = [];
      if (map instanceof Array) {
        command = map.shift()
        args = map;
      }
      else {
        command = map;
      }

      result.push({
        key: keyMap,
        command: Command[command],
        args: args
      });
    }
  }

  return result;
};

/**
 * 指定したモードの指定したキーに割り当てられたコマンドを取得します。
 *
 * @param string mode コマンドを取得するモード
 * @param string key  マッピングされたキー
 * @return function キーにマッピングされたコマンド。
 *                  マッピングされたコマンドがない場合はundefined。
 */
KeyMap.command = function(mode, key) {
  return Command[_map[mode][key]];
};
