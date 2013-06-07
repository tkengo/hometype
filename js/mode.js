/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * モードを管理するオブジェクト。
 */

/**
 * モードの一覧
 */
var ModeList = {
  NORMAL_MODE: 'normal',
  HINT_MODE: 'hint',
  VISUAL_MODE: 'visual',
  COMMAND_MODE: 'command',
  BOOKMARK_MODE: 'bookmark'
};

/**
 * コンストラクタ
 *
 * デフォルトでノーマルモードとなります。
 */
var _Mode = function() {
  this.mode = ModeList.NORMAL_MODE;

  this.callbacks = [];

  this.modeProcessors = {};
  this.modeProcessors[ModeList.NORMAL_MODE]   = new NormalMode();
  this.modeProcessors[ModeList.HINT_MODE]     = new HintMode();
  this.modeProcessors[ModeList.VISUAL_MODE]   = new VisualMode();
  this.modeProcessors[ModeList.COMMAND_MODE]  = new CommandMode();
  this.modeProcessors[ModeList.BOOKMARK_MODE] = new BookmarkMode();
};

/**
 * 現在のモードを取得します。
 *
 * @return string 現在のモード
 */
_Mode.prototype.getCurrentMode = function() {
  return this.mode;
};

/**
 * 現在のモードを指定されたモードに変更します。
 * モードが変更された場合はonModeChangeで登録された
 * イベントハンドラが実行されます。
 *
 * @param string modeName 変更後のモード名
 */
_Mode.prototype.changeMode = function(modeName) {
  // モードが変わってなければ何もしない
  if (this.mode == modeName) {
    return;
  }

  var oldMode = this.mode;
  this.mode = modeName;

  for (var key in this.callbacks) {
    var callback = this.callbacks[key];
    if (typeof callback === 'function') {
      callback.call(callback, this.mode, oldMode);
    }
  }
};

_Mode.prototype.getProcessor = function(mode) {
  mode = mode || this.mode;

  return this.modeProcessors[mode];
};

/**
 * モードが変更された時のイベントを登録します。
 *
 * @param function callback イベントハンドラ。
 *                          <引数>
 *                          newMode : 変更後のモード
 *                          oldMode : 変更前のモード。
 */
_Mode.prototype.onModeChange = function(callback) {
  this.callbacks.push(callback);
};

var Mode = new _Mode();
