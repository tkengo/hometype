var ModeList = {};

(function() {

/**
 * Mode list.
 */
  ModeList = {
    NORMAL_MODE: 'normal',
    INSERT_MODE: 'insert',
    HINT_MODE: 'hint',
    VISUAL_MODE: 'visual',
    COMMAND_MODE: 'command',
    HELP_MODE: 'help'
  };

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
  KeyMap.nmap('i',     'enterInsertMode');
  KeyMap.nmap('a',     'enterInsertMode');
  KeyMap.nmap('I',     'focusFirstInput');
  KeyMap.nmap('A',     'focusLastInput');
  KeyMap.nmap('H',     'backHistory');
  KeyMap.nmap('L',     'forwardHistory');
  KeyMap.nmap('u',     'restoreTab');
  KeyMap.nmap('U',     'searchClosedTabs');
  KeyMap.nmap('<C-h>', 'searchHistories');
  KeyMap.nmap('?',     'showAssignedCommands');

  KeyMap.cmap('Esc',   'cancelCommandMode');
  KeyMap.cmap('<C-n>', 'selectNextCandidate');
  KeyMap.cmap('<C-p>', 'selectPrevCandidate');

  KeyMap.imap('Esc',   'cancelInsertMode');
  KeyMap.imap('<C-c>', 'cancelInsertMode');
  KeyMap.imap('<C-p>', 'moveLeftTab');
  KeyMap.imap('<C-n>', 'moveRightTab');

  KeyMap.vmap('Esc', 'cancelVisualMode');
  KeyMap.vmap('n',   'forwardContentEditable');
  KeyMap.vmap('p',   'backwardContentEditable');

  KeyMap.fmap('Esc',   'cancelHintMode');
  KeyMap.fmap('<C-c>', 'cancelHintMode');

  KeyMap.hmap('Esc', 'cancelHelpMode');
})();
