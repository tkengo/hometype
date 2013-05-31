(function() {
  KeyMap.assign('j',     'scrollDown');
  KeyMap.assign('k',     'scrollUp');
  KeyMap.assign('G',     'scrollToBottom');
  KeyMap.assign('gg',    'scrollToTop');
  KeyMap.assign('<C-e>', 'scrollDown');
  KeyMap.assign('<C-y>', 'scrollUp');
  KeyMap.assign('<C-d>', 'scrollDownHalf');
  KeyMap.assign('<C-u>', 'scrollUpHalf');
  KeyMap.assign('<C-f>', 'scrollDownPage');
  KeyMap.assign('<C-b>', 'scrollUpPage');
})();

$(document).ready(function() {
  var caretBrowseMode = false;

  // $(document).keydown(function(event) {
    // if (event.keyCode == KeyCode.C) {
    //   caretBrowseMode = !caretBrowseMode;
    //   $('html').attr('contenteditable', caretBrowseMode);
    // }
  // });
  // $(document).on('keydown', KeyManager.onKeyDown);
  document.addEventListener('keydown', function(event) {
    var km = Resource.KeyManager;
    km.onKeyDown.call(km, event);
  });
});
