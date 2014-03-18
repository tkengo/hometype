HometypeDefaultOptions = {
  command_interval: 300,
  scroll_amount: 50,
  nmap: {
    'j': 'scrollDown',
    'k': 'scrollUp',
    'G': 'scrollToBottom',
    'gg': 'scrollToTop',
    'f': 'enterHintMode',
    'F': 'enterNewWindowHintMode',
    'x': 'closeTab',
    'v': 'enterVisualMode',
    '<C-e>': 'scrollDown',
    '<C-y>': 'scrollUp',
    '<C-d>': 'scrollDownHalf',
    '<C-u>': 'scrollUpHalf',
    '<C-f>': 'scrollDownPage',
    '<C-b>': 'scrollUpPage',
    '<C-p>': 'moveLeftTab',
    '<C-n>': 'moveRightTab',
    ':': 'enterCommandMode',
    'b': 'searchBookmarks',
    'B': 'searchBookmarks',
    'i': 'enterInsertMode',
    'a': 'enterInsertMode',
    'I': 'focusFirstInput',
    'A': 'focusLastInput',
    'H': 'backHistory',
    'L': 'forwardHistory',
    'u': 'restoreTab',
    'U': 'searchClosedTabs',
    '<C-h>': 'searchHistories'
  },
  cmap: {
    'Esc': 'cancelCommandMode',
    '<C-n>': 'selectNextCandidate',
    '<C-p>': 'selectPrevCandidate'
  },
  imap: {
    'Esc': 'cancelInsertMode',
    '<C-c>': 'cancelInsertMode',
    '<C-p>': 'moveLeftTab',
    '<C-n>': 'moveRightTab'
  },
  vmap: {
    'Esc': 'cancelVisualMode',
    'n': 'forwardContentEditable',
    'p': 'backwardContentEditable'
  },
  fmap: {
    'Esc': 'cancelHintMode',
    '<C-c>': 'cancelHintMode'
  }
};
