/**
 * Copyright (c) 2013 Kengo Tateishi (@tkengo)
 * Licensed under MIT license.
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Chromekeyの起動処理
 */

var Options = new ChromekeyOptions();

// Chromekeyのオプションをロードする
Options.init(function() {
  // ロードが完了したらキー入力待ちのイベントを設定する
  var key = new KeySequence();
  key.onProcess(function (e, sequence, stack, currentKey) {
    // 入力されたキーでコマンド候補を取得する
    var candidate = KeyMap.candidate(Mode.getCurrentMode(), sequence);

    if (candidate.length == 1 && candidate[0].key == sequence) {
      // コマンドが確定できればそれを実行
      candidate[0].command.call();
      e.stopPropagation();
      e.preventDefault();

      // 次のコマンド入力を待つためにキーシーケンスも同時にリセット
      this.reset();
    }
    else if (candidate.length == 0) {
      // 候補となるコマンドが1つもなければ
      // 現在のモードのデフォルトキーイベントに処理を委譲
      if (Mode.getProcessor().onKeyDown(stack, currentKey, e)) {
        this.reset();
      }
    }
  });
});

$(document).ready(function() {
  // テキストエリアにフォーカスがあたればインサートモードへ
  // フォーカスが外れればノーマルモードへ移行する
  var focusTargets = ':text, :password, textarea, [contenteditable]';
  $(document).on('focus', focusTargets, function() { Mode.changeMode(ModeList.INSERT_MODE); })
             .on('blur',  focusTargets, function() { Mode.changeMode(ModeList.NORMAL_MODE); });
  $(document.activeElement).blur();

  Mode.onModeChange(function(mode) {
    $('.chromekey-current-mode').remove();
    if (mode != ModeList.NORMAL_MODE) {
      var modeElement = $('<div>').addClass('chromekey-current-mode').text(mode + ' mode');
      modeElement.appendTo($('body')).css('opacity', 0.4).fadeTo('slow', 1.0);
    }
  });
});
