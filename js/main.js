// キーマッピング
(function() {
  KeyMap.nmap('j',     'scrollDown');
  KeyMap.nmap('k',     'scrollUp');
  KeyMap.nmap('G',     'scrollToBottom');
  KeyMap.nmap('gg',    'scrollToTop');
  KeyMap.nmap('f',     'goToHintMode');
  KeyMap.nmap('F',     'goToNHintMode');
  KeyMap.nmap('x',     'closeTab');
  KeyMap.nmap('v',     'goToVisualMode');
  KeyMap.nmap('<C-e>', 'scrollDown');
  KeyMap.nmap('<C-y>', 'scrollUp');
  KeyMap.nmap('<C-d>', 'scrollDownHalf');
  KeyMap.nmap('<C-u>', 'scrollUpHalf');
  KeyMap.nmap('<C-f>', 'scrollDownPage');
  KeyMap.nmap('<C-b>', 'scrollUpPage');
  KeyMap.nmap('<C-h>', 'moveLeftTab');
  KeyMap.nmap('<C-l>', 'moveRightTab');
  KeyMap.nmap(':',     'goToCommandMode');
  KeyMap.nmap('b',     'goToBookmarkMode');
  KeyMap.nmap('B',     'goToNewWindowBookmarkMode');

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('j',   'caretDown');
  KeyMap.vmap('k',   'caretUp');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');

  KeyMap.bmap('<C-n>', 'selectNextCandidate');
  KeyMap.bmap('<C-p>', 'selectPrevCandidate');
  KeyMap.bmap('Esc',   'cancelBookmarkMode');
})();

// 初期化処理
$(document).ready(function() {
  KeySequence.onKeyCertain(function(e, sequence, stack, currentKey) {
    var candidate = KeyMap.candidate(Mode.getCurrentMode(), sequence);
    if (candidate.length == 1 && candidate[0].key == sequence) {
      // コマンドが確定できればそれを実行
      // 次のコマンド入力を待つためにキーシーケンスも同時にリセット
      candidate[0].command.call();
      e.stop();
      this.reset();
    }
    else if (candidate.length == 0) {
      // 候補となるコマンドが1つもなければ
      // 現在のモードのデフォルトキーイベントに処理を委譲
      if (Mode.getProcessor().onKeyDown(stack, currentKey)) {
        this.reset();
      }
    }
  });
});
