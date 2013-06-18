(function() {
  document.addEventListener('keydown', function(e) {
    KeySequence.processor(e);
  });

  KeySequence.onKeyCertain(function(e, sequence, stack, currentKey) {
    var candidate = KeyMap.candidate(Mode.getCurrentMode(), sequence);
    if (candidate.length == 1 && candidate[0].key == sequence) {
      // コマンドが確定できればそれを実行
      // ただしテキストエリアにフォーカスがあれば何もしない
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
})();

// 初期化処理
$(document).ready(function() {
  $(document).on('focus', ':text, :password, textarea', function() {
    Mode.changeMode(ModeList.INSERT_MODE);
  }).on('blur', ':text, :password, textarea', function() {
    Mode.changeMode(ModeList.NORMAL_MODE);
  });
  $(document.activeElement).blur();
});
