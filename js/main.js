// キーマッピング
(function() {
  KeyMap.nmap('j',     'scrollDown');
  KeyMap.nmap('k',     'scrollUp');
  KeyMap.nmap('G',     'scrollToBottom');
  KeyMap.nmap('gg',    'scrollToTop');
  KeyMap.nmap('f',     'goToHintMode');
  KeyMap.nmap('x',     'closeTab');
  KeyMap.nmap('<C-e>', 'scrollDown');
  KeyMap.nmap('<C-y>', 'scrollUp');
  KeyMap.nmap('<C-d>', 'scrollDownHalf');
  KeyMap.nmap('<C-u>', 'scrollUpHalf');
  KeyMap.nmap('<C-f>', 'scrollDownPage');
  KeyMap.nmap('<C-b>', 'scrollUpPage');
})();

// 初期化処理
$(document).ready(function() {
  // var caretBrowseMode = false;

  // $(document).keydown(function(event) {
    // if (event.keyCode == KeyCode.C) {
    //   caretBrowseMode = !caretBrowseMode;
    //   $('html').attr('contenteditable', caretBrowseMode);
    // }
  // });
  // $(document).on('keydown', KeyManager.onKeyDown);

  // イベントハンドラ登録
  var km = Resource.KeyManager;
  document.addEventListener('keydown', function(event) {
    km.onKeyDown.call(km, event);
  });
});
