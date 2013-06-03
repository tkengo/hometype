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
 * normal : ノーマルモード
 * hint   : ヒントモード
 * visual : ビジュアルモード
 */
var KeyMap = {
  _map: {
    normal: {},
    hint: {},
    visual: {}
  }
};

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
 * 指定したモードの指定したキーに割り当てられたコマンドの
 * 候補を配列で返します。
 *
 * @param string mode コマンドを取得するモード
 * @param string key  マッピングされたキー
 * @return array コマンド名とマッピングキーを持つ配列
 */
KeyMap.candidate = function(mode, key) {
  var result = [];

  for (map in _map[mode]) {
    if (map.indexOf(key) == 0) {
      result.push({
        key: map,
        command: Command[_map[mode][map]]
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
