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
  INSERT_MODE: 'insert',
  HINT_MODE: 'hint',
  VISUAL_MODE: 'visual',
  COMMAND_MODE: 'command'
};

/**
 * コンストラクタ
 *
 * デフォルトでノーマルモードとなります。
 */
var ChromekeyMode = function() {
  this.mode = ModeList.NORMAL_MODE;

  this.callbacks = [];

  // 各モードのプロセッサを生成
  this.modeProcessors = {};
  this.modeProcessors[ModeList.NORMAL_MODE]  = new NoopProcessor();
  this.modeProcessors[ModeList.INSERT_MODE]  = new NoopProcessor();
  this.modeProcessors[ModeList.HINT_MODE]    = new HintModeProcessor();
  this.modeProcessors[ModeList.VISUAL_MODE]  = new VisualModeProcessor();
  this.modeProcessors[ModeList.COMMAND_MODE] = new CommandModeProcessor();
};

/**
 * 現在のモードを取得します。
 *
 * @return string 現在のモード
 */
ChromekeyMode.prototype.getCurrentMode = function() {
  return this.mode;
};

/**
 * 現在のモードを指定されたモードに変更します。
 * モードが変更された場合はonModeChangeで登録された
 * イベントハンドラが実行されます。
 *
 * @param string modeName 変更後のモード名
 * @return Object 現在のモードのプロセッサ
 */
ChromekeyMode.prototype.changeMode = function(modeName) {
  // モードが変わってなければ何もしない
  if (this.mode == modeName) {
    return;
  }

  // モード変更
  var oldMode = this.mode;
  this.mode = modeName;

  // コールバックが登録されていれば呼び出す
  for (var key in this.callbacks) {
    var callback = this.callbacks[key];
    if (typeof callback === 'function') {
      callback.call(callback, this.mode, oldMode);
    }
  }

  // プロセッサにモードが変更されたことを通知する
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
 * 指定されたモードのプロセッサを取得します。
 * 引数が省略された場合は現在のモードのプロセッサを取得します。
 *
 * @param ModeList mode モード。省略時は現在のモード
 * @return モードプロセッサ
 */
ChromekeyMode.prototype.getProcessor = function(mode) {
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
ChromekeyMode.prototype.onModeChange = function(callback) {
  this.callbacks.push(callback);
};

var Mode = new ChromekeyMode();
