/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * キーとコマンドのマッピングを管理します。
 */

/**
 * キーマッピング管理オブジェクト。
 * 各モード毎にマッピング情報を保持します。
 *
 * normal   : ノーマルモード
 * hint     : ヒントモード
 * visual   : ビジュアルモード
 * command  : コマンドモード
 * bookmark : ブックマークモード
 */
var KeyMap = {
};
var _map = {
  normal: {},
  insert: {},
  hint: {},
  visual: {},
  command: {},
  bookmark: {}
}

/**
 * 指定したモードのキーに対してコマンドを割り当てます。
 *
 * @param string mode    キーをマッピングするモード
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.assign = function(mode, key, command) {
  _map[mode][key] = command;
};

/**
 * ノーマルモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.nmap = function(key, command) {
  KeyMap.assign(ModeList.NORMAL_MODE, key, command);
};

/**
 * インサートモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.imap = function(key, command) {
  KeyMap.assign(ModeList.INSERT_MODE, key, command);
};

/**
 * ヒントモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.fmap = function(key, command) {
  KeyMap.assign(ModeList.HINT_MODE, key, command);
};

/**
 * ビジュアルモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.vmap = function(key, command) {
  KeyMap.assign(ModeList.VISUAL_MODE, key, command);
};

/**
 * コマンドモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.cmap = function(key, command) {
  KeyMap.assign(ModeList.COMMAND_MODE, key, command);
};

/**
 * ブックマークモードのキーに対してコマンドを割り当てます。
 *
 * @param string key     マッピングするキー
 * @param string command キーに対して割り当てるコマンド
 */
KeyMap.bmap = function(key, command) {
  KeyMap.assign(ModeList.BOOKMARK_MODE, key, command);
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
