/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * オプションの取り扱い
 *
 * newした後に初期化して利用します。
 * var options = new ChromekeyOptions();
 * options.init();
 *
 * オプションオブジェクトはプロトタイプにオプション値を保持しています。
 * options.option_name1
 * options.option_name2
 * このような形式でオプション値にアクセスできます。
 */
var ChromekeyOptions = function() {
  this.options = ChromekeyDefaultOptions;

  // オプション値に変更があった時にこのオブジェクトに通知するように設定
  var port = chrome.runtime.connect({ name: 'notifyOptions' });
  port.onMessage.addListener($.proxy(this.notifyOptions, this));
};

/**
 * オプション値に変更があった時に呼ばれるコールバック関数です。
 * 変更のあったオプション値をこのオブジェクトに保存します。
 *
 * @param Object results 変更のあったオプション値のハッシュ
 */
ChromekeyOptions.prototype.notifyOptions = function(results) {
  this.options = $.extend(this.options, results);
  for (var key in results) {
    ChromekeyOptions.prototype[key] = results[key];
  }
};

/**
 * 初期化します。全オプションを読み込んでオブジェクトに保存します。
 *
 * @param function callback オプションの読み込みが完了した時に実行されるコールバック関数
 */
ChromekeyOptions.prototype.init = function(callback) {
  // オプションのロードが完了した時のコールバック関数を定義
  var getOptionsCallback = function(response) {
    for (var key in this.options) {
      if (response[key]) {
        this.options[key] = response[key];
      }
      ChromekeyOptions.prototype[key] = this.options[key];
    }
    
    // コールバック関数が指定されていれば呼び出す
    if (typeof callback == 'function') {
      callback();
    }
  };

  // オプションのロード
  chrome.runtime.sendMessage({ command: 'getOptions' }, $.proxy(getOptionsCallback, this));
};
