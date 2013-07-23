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
  KeyMap.nmap('b',     [ 'searchBookmarks', false ]);
  KeyMap.nmap('B',     [ 'searchBookmarks', true ]);
  KeyMap.nmap('i',     'enterFocusHintMode');
  KeyMap.nmap('a',     'enterFocusHintMode');
  KeyMap.nmap('I',     'focusFirstInput');
  KeyMap.nmap('A',     'focusLastInput');
  KeyMap.nmap('H',     'backHistory');
  KeyMap.nmap('L',     'forwardHistory');
  KeyMap.nmap('u',     'restoreTab');
  KeyMap.nmap('U',     'searchClosedTabs');

  KeyMap.cmap('Esc',   'cancelCommandMode');
  KeyMap.cmap('<C-n>', 'selectNextCandidate');
  KeyMap.cmap('<C-p>', 'selectPrevCandidate');

  KeyMap.imap('Esc',   'blurForm');
  KeyMap.imap('<C-c>', 'blurForm');
  KeyMap.imap('<C-p>', 'moveLeftTab');
  KeyMap.imap('<C-n>', 'moveRightTab');

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('n',   'forwardContentEditable');
  KeyMap.vmap('p',   'backwardContentEditable');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');
})();
