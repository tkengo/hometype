(function() {
  KeyMap.nmap('j',     'scrollDown');
  KeyMap.nmap('k',     'scrollUp');
  KeyMap.nmap('G',     'scrollToBottom');
  KeyMap.nmap('gg',    'scrollToTop');
  KeyMap.nmap('f',     'enterHintMode');
  KeyMap.nmap('F',     'enterNewWindowHintMode');
  KeyMap.nmap('x',     'closeTab');
  KeyMap.nmap('v',     'enterVisualMode');
  KeyMap.nmap('<C-e>', 'scrollDown');
  KeyMap.nmap('<C-y>', 'scrollUp');
  KeyMap.nmap('<C-d>', 'scrollDownHalf');
  KeyMap.nmap('<C-u>', 'scrollUpHalf');
  KeyMap.nmap('<C-f>', 'scrollDownPage');
  KeyMap.nmap('<C-b>', 'scrollUpPage');
  KeyMap.nmap('<C-p>', 'moveLeftTab');
  KeyMap.nmap('<C-n>', 'moveRightTab');
  KeyMap.nmap(':',     'enterCommandMode');
  KeyMap.nmap('b',     'enterBookmarkMode');
  KeyMap.nmap('B',     'enterNewWindowBookmarkMode');
  KeyMap.nmap('i',     'enterFocusHintMode');
  KeyMap.nmap('a',     'enterFocusHintMode');
  KeyMap.nmap('H',     'backHistory');
  KeyMap.nmap('L',     'forwardHistory');
  KeyMap.nmap('u',     'restoreTab');

  KeyMap.imap('Esc',   'blurForm');
  KeyMap.imap('<C-c>', 'blurForm');
  KeyMap.imap('<C-p>', 'moveLeftTab');
  KeyMap.imap('<C-n>', 'moveRightTab');

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('n',   'forwardContentEditable');
  KeyMap.vmap('p',   'backwardContentEditable');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');

  KeyMap.bmap('<C-n>', 'selectNextCandidate');
  KeyMap.bmap('<C-p>', 'selectPrevCandidate');
  KeyMap.bmap('Esc',   'cancelBookmarkMode');
})();
