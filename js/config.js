(function() {
  KeyMap.nmap('j',     'scrollDown');
  KeyMap.nmap('k',     'scrollUp');
  KeyMap.nmap('G',     'scrollToBottom');
  KeyMap.nmap('gg',    'scrollToTop');
  KeyMap.nmap('f',     'goToHintMode');
  KeyMap.nmap('F',     'goToNewWindowHintMode');
  KeyMap.nmap('x',     'closeTab');
  KeyMap.nmap('v',     'goToVisualMode');
  KeyMap.nmap('<C-e>', 'scrollDown');
  KeyMap.nmap('<C-y>', 'scrollUp');
  KeyMap.nmap('<C-d>', 'scrollDownHalf');
  KeyMap.nmap('<C-u>', 'scrollUpHalf');
  KeyMap.nmap('<C-f>', 'scrollDownPage');
  KeyMap.nmap('<C-b>', 'scrollUpPage');
  KeyMap.nmap('<C-p>', 'moveLeftTab');
  KeyMap.nmap('<C-n>', 'moveRightTab');
  KeyMap.nmap(':',     'goToCommandMode');
  KeyMap.nmap('b',     'goToBookmarkMode');
  KeyMap.nmap('B',     'goToNewWindowBookmarkMode');
  KeyMap.nmap('i',     'goToFocusHintMode');
  KeyMap.nmap('a',     'goToFocusHintMode');
  KeyMap.nmap('H',     'backHistory');
  KeyMap.nmap('L',     'forwardHistory');

  KeyMap.imap('Esc',   'blurForm');
  KeyMap.imap('<C-c>', 'blurForm');
  KeyMap.imap('<C-p>', 'moveLeftTab');
  KeyMap.imap('<C-n>', 'moveRightTab');

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('j',   'caretDown');
  KeyMap.vmap('k',   'caretUp');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');

  KeyMap.bmap('<C-n>', 'selectNextCandidate');
  KeyMap.bmap('<C-p>', 'selectPrevCandidate');
  KeyMap.bmap('Esc',   'cancelBookmarkMode');
})();
