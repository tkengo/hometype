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

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('j',   'caretDown');
  KeyMap.vmap('k',   'caretUp');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');
})();

// 初期化処理
$(document).ready(function() {
  // キーダウンのイベントハンドラ登録
  // 全部のキーを拾えるようにdocumentに対してイベントハンドラを登録
  var m = new KeyManager();
  document.addEventListener('keydown', function(e) {
    m.onKeyDown.call(m, new KeyEvent(e));
  });
});
