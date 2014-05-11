HometypeDefaultOptions = {
  command_interval: 300,
  scroll_amount: 50,
  default_key_bind: {
    nmap: {
      'j': 'scrollDown',
      'k': 'scrollUp',
      'G': 'scrollToBottom',
      'gg': 'scrollToTop',
      'f': 'enterHintMode',
      'F': 'enterHintMode --new',
      'cf': 'enterHintMode --continuous',
      'cF': 'enterHintMode --new --continuous',
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
      '<C-h>': 'searchHistories',
      '?': 'showAssignedCommands'
    },
    cmap: {
      'Esc': 'enterNormalMode',
      '<C-n>': 'selectNextCandidate',
      '<C-p>': 'selectPrevCandidate'
    },
    imap: {
      'Esc': 'cancelInsertMode',
      '<C-c>': 'cancelInsertMode',
      '<C-e>': 'scrollDown',
      '<C-y>': 'scrollUp',
      '<C-d>': 'scrollDownHalf',
      '<C-u>': 'scrollUpHalf',
      '<C-f>': 'scrollDownPage',
      '<C-b>': 'scrollUpPage',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab',
      '<C-f>': 'enterHintMode --continuous'
    },
    vmap: {
      'Esc': 'enterNormalMode'
    },
    fmap: {
      'Esc': 'enterNormalMode',
      '<C-c>': 'enterNormalMode',
      '<C-e>': 'scrollDown enterHintMode',
      '<C-y>': 'scrollUp enterHintMode',
      '<C-d>': 'scrollDownHalf enterHintMode',
      '<C-u>': 'scrollUpHalf enterHintMode',
      '<C-f>': 'scrollDownPage enterHintMode',
      '<C-b>': 'scrollUpPage enterHintMode',
      '<C-p>': 'moveLeftTab',
      '<C-n>': 'moveRightTab'
    },
    hmap: {
      'Esc': 'enterNormalMode'
    }
  }
};
